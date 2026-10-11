create extension if not exists pgcrypto;

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  login_id text not null unique
    check (login_id = lower(trim(login_id)))
    check (login_id ~ '^[a-z0-9._-]{2,80}$'),
  display_name text not null,
  role text not null check (role in ('student', 'stall_staff', 'stall_manager', 'admin')),
  status text not null default 'active' check (status in ('active', 'suspended')),
  created_at timestamptz not null default now()
);

create table public.stalls (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  opening_hours text not null,
  manager_user_id uuid references public.profiles(user_id) on delete set null,
  status text not null default 'open' check (status in ('open', 'paused', 'closed')),
  created_at timestamptz not null default now()
);

create table public.campus_places (
  id text primary key,
  name text not null,
  kind text not null,
  map_query text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  stall_id uuid not null references public.stalls(id) on delete restrict,
  name text not null,
  category text not null,
  description text not null default '',
  price numeric(10, 2) not null check (price > 0),
  image_url text,
  available boolean not null default true,
  offer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  student_user_id uuid not null references public.profiles(user_id) on delete restrict,
  stall_id uuid not null references public.stalls(id) on delete restrict,
  status text not null default 'placed'
    check (status in ('placed', 'preparing', 'ready', 'completed', 'cancelled')),
  payment_method text not null check (payment_method in ('upi', 'card', 'cash', 'credits')),
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  total numeric(10, 2) not null check (total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  menu_item_id uuid not null references public.menu_items(id) on delete restrict,
  item_name text not null,
  unit_price numeric(10, 2) not null check (unit_price > 0),
  quantity integer not null check (quantity between 1 and 50)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete restrict,
  method text not null check (method in ('upi', 'card', 'cash', 'credits')),
  amount numeric(10, 2) not null check (amount >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'verified', 'failed', 'refund_recorded')),
  reference text,
  updated_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  active boolean not null default true,
  created_by uuid references public.profiles(user_id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.activity_log (
  id bigint generated always as identity primary key,
  actor_user_id uuid references public.profiles(user_id) on delete set null,
  action text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index orders_student_created_idx on public.orders(student_user_id, created_at desc);
create index orders_stall_created_idx on public.orders(stall_id, created_at desc);
create index order_items_order_idx on public.order_items(order_id);
create index menu_items_stall_available_idx on public.menu_items(stall_id, available);
create index announcements_active_created_idx on public.announcements(active, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger menu_items_set_updated_at
before update on public.menu_items
for each row execute function public.set_updated_at();
create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();
create trigger payments_set_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

create or replace function public.is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where user_id = (select auth.uid())
      and role = 'admin'
      and status = 'active'
  );
$$;

create or replace function public.is_active_student()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where user_id = (select auth.uid())
      and role = 'student'
      and status = 'active'
  );
$$;

create or replace function public.create_order(
  p_stall_id uuid,
  p_items jsonb,
  p_payment_method text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_order_id uuid;
  v_subtotal numeric(10, 2) := 0;
  v_item jsonb;
  v_menu_item public.menu_items%rowtype;
  v_quantity integer;
begin
  if not public.is_active_student() then
    raise exception 'An active student account is required to place an order';
  end if;
  if p_payment_method is null
     or p_payment_method not in ('upi', 'card', 'cash', 'credits') then
    raise exception 'Unsupported payment method';
  end if;
  if jsonb_typeof(p_items) is distinct from 'array' then
    raise exception 'Order items must be an array';
  end if;
  if jsonb_array_length(p_items) < 1 or jsonb_array_length(p_items) > 30 then
    raise exception 'Order must contain between 1 and 30 items';
  end if;
  if not exists (
    select 1 from public.stalls
    where id = p_stall_id and status = 'open'
  ) then
    raise exception 'The selected stall is not open';
  end if;

  for v_item in select value from jsonb_array_elements(p_items)
  loop
    if jsonb_typeof(v_item) <> 'object'
       or (v_item->>'menu_item_id') is null
       or (v_item->>'quantity') is null then
      raise exception 'Each order item needs a menu item ID and quantity';
    end if;

    v_quantity := (v_item->>'quantity')::integer;
    if v_quantity < 1 or v_quantity > 50 then
      raise exception 'Item quantity must be between 1 and 50';
    end if;

    select * into v_menu_item
    from public.menu_items
    where id = (v_item->>'menu_item_id')::uuid
      and stall_id = p_stall_id
      and available = true;
    if not found then
      raise exception 'A selected menu item is unavailable';
    end if;

    v_subtotal := v_subtotal + v_menu_item.price * v_quantity;
  end loop;

  insert into public.orders (
    student_user_id, stall_id, payment_method, subtotal, total
  ) values (
    (select auth.uid()), p_stall_id, p_payment_method, v_subtotal, v_subtotal
  ) returning id into v_order_id;

  for v_item in select value from jsonb_array_elements(p_items)
  loop
    v_quantity := (v_item->>'quantity')::integer;
    select * into v_menu_item
    from public.menu_items
    where id = (v_item->>'menu_item_id')::uuid
      and stall_id = p_stall_id
      and available = true;

    insert into public.order_items (
      order_id, menu_item_id, item_name, unit_price, quantity
    ) values (
      v_order_id, v_menu_item.id, v_menu_item.name, v_menu_item.price, v_quantity
    );
  end loop;

  insert into public.payments (order_id, method, amount)
  values (v_order_id, p_payment_method, v_subtotal);

  return v_order_id;
end;
$$;

alter table public.profiles enable row level security;
alter table public.stalls enable row level security;
alter table public.campus_places enable row level security;
alter table public.menu_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.announcements enable row level security;
alter table public.activity_log enable row level security;

create policy "Profiles visible to self or admins"
on public.profiles for select to authenticated
using (user_id = (select auth.uid()) or (select public.is_active_admin()));
create policy "Admins manage profiles"
on public.profiles for update to authenticated
using ((select public.is_active_admin()))
with check ((select public.is_active_admin()));

create policy "Stalls visible to visitors"
on public.stalls for select to anon, authenticated
using (status = 'open' or (select public.is_active_admin()));
create policy "Admins manage stalls"
on public.stalls for all to authenticated
using ((select public.is_active_admin()))
with check ((select public.is_active_admin()));

create policy "Active campus places visible to visitors"
on public.campus_places for select to anon, authenticated
using (active or (select public.is_active_admin()));
create policy "Admins manage campus places"
on public.campus_places for all to authenticated
using ((select public.is_active_admin()))
with check ((select public.is_active_admin()));

create policy "Available menu visible to visitors"
on public.menu_items for select to anon, authenticated
using ((available and exists (
  select 1 from public.stalls where id = stall_id and status = 'open'
)) or (select public.is_active_admin()));
create policy "Admins manage menu"
on public.menu_items for all to authenticated
using ((select public.is_active_admin()))
with check ((select public.is_active_admin()));

create policy "Students and admins read orders"
on public.orders for select to authenticated
using (student_user_id = (select auth.uid()) or (select public.is_active_admin()));
create policy "Admins update orders"
on public.orders for update to authenticated
using ((select public.is_active_admin()))
with check ((select public.is_active_admin()));

create policy "Order owners and admins read order items"
on public.order_items for select to authenticated
using (
  exists (
    select 1 from public.orders
    where orders.id = order_id
      and (orders.student_user_id = (select auth.uid()) or (select public.is_active_admin()))
  )
);

create policy "Payment owners and admins read payments"
on public.payments for select to authenticated
using (
  exists (
    select 1 from public.orders
    where orders.id = order_id
      and (orders.student_user_id = (select auth.uid()) or (select public.is_active_admin()))
  )
);
create policy "Admins update payments"
on public.payments for update to authenticated
using ((select public.is_active_admin()))
with check ((select public.is_active_admin()));

create policy "Active announcements visible to visitors"
on public.announcements for select to anon, authenticated
using (active or (select public.is_active_admin()));
create policy "Admins manage announcements"
on public.announcements for all to authenticated
using ((select public.is_active_admin()))
with check ((select public.is_active_admin()));

create policy "Admins read activity log"
on public.activity_log for select to authenticated
using ((select public.is_active_admin()));
create policy "Admins append activity log"
on public.activity_log for insert to authenticated
with check (
  (select public.is_active_admin())
  and actor_user_id = (select auth.uid())
);

grant select on public.stalls, public.campus_places, public.menu_items, public.announcements to anon, authenticated;
grant select on public.profiles, public.orders, public.order_items, public.payments, public.activity_log to authenticated;
grant update on public.profiles, public.orders, public.payments to authenticated;
grant insert, update, delete on public.stalls, public.campus_places, public.menu_items, public.announcements to authenticated;
grant insert on public.activity_log to authenticated;
grant usage, select on sequence public.activity_log_id_seq to authenticated;
grant execute on function public.create_order(uuid, jsonb, text) to authenticated;
grant execute on function public.is_active_admin() to anon, authenticated;
grant execute on function public.is_active_student() to authenticated;

revoke all on function public.create_order(uuid, jsonb, text) from public, anon;
revoke all on function public.is_active_student() from public, anon;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'orders'
    ) then
      execute 'alter publication supabase_realtime add table public.orders';
    end if;
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'menu_items'
    ) then
      execute 'alter publication supabase_realtime add table public.menu_items';
    end if;
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'stalls'
    ) then
      execute 'alter publication supabase_realtime add table public.stalls';
    end if;
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'announcements'
    ) then
      execute 'alter publication supabase_realtime add table public.announcements';
    end if;
  end if;
end;
$$;
