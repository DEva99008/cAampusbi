insert into public.stalls (id, name, location, opening_hours, status)
values
  ('11111111-1111-4111-8111-111111111111', 'New Canteen', 'KPRCAS campus', '08:00–20:00', 'open'),
  ('22222222-2222-4222-8222-222222222222', 'Old Canteen', 'KPRCAS campus', '08:00–18:00', 'open')
on conflict (id) do nothing;

insert into public.campus_places (id, name, kind, map_query)
values
  ('block-a', 'A Block', 'Academic block', 'KPR College of Arts Science and Research A Block'),
  ('block-b', 'B Block', 'Academic block', 'KPR College of Arts Science and Research B Block'),
  ('block-c', 'C Block', 'Academic block', 'KPR College of Arts Science and Research C Block'),
  ('new-canteen', 'New Canteen', 'Food & pickup', 'KPR College of Arts Science and Research New Canteen'),
  ('old-canteen', 'Old Canteen', 'Food & pickup', 'KPR College of Arts Science and Research Old Canteen')
on conflict (id) do nothing;

insert into public.menu_items (
  id, stall_id, name, category, description, price, image_url, available, offer
)
values
  ('a1111111-1111-4111-8111-111111111111', '11111111-1111-4111-8111-111111111111', 'Masala Dosa', 'South Indian', 'Crispy dosa with potato masala and chutneys.', 65, 'hero-food-dosa.jpg', true, null),
  ('a2222222-2222-4222-8222-222222222222', '11111111-1111-4111-8111-111111111111', 'Paneer Wrap', 'Quick Bites', 'Spiced paneer, crunchy vegetables and mint sauce.', 90, 'hero-food-wrap.jpg', true, 'Student favourite'),
  ('a3333333-3333-4333-8333-333333333333', '11111111-1111-4111-8111-111111111111', 'Veg Fried Rice', 'Meals', 'Wok-tossed rice with vegetables and herbs.', 110, 'hero-food-rice.jpg', true, null),
  ('a4444444-4444-4444-8444-444444444444', '22222222-2222-4222-8222-222222222222', 'Chicken Rice Bowl', 'Meals', 'Comforting rice bowl with savoury chicken.', 145, 'hero-food-rice.jpg', true, null),
  ('a5555555-5555-4555-8555-555555555555', '22222222-2222-4222-8222-222222222222', 'Samosa Pair', 'Quick Bites', 'Golden, flaky samosas with tangy chutney.', 35, null, true, 'Combo deal'),
  ('a6666666-6666-4666-8666-666666666666', '11111111-1111-4111-8111-111111111111', 'Cold Coffee', 'Drinks', 'Chilled coffee for your study break.', 55, null, true, null),
  ('a7777777-7777-4777-8777-777777777777', '22222222-2222-4222-8222-222222222222', 'Fresh Lime Soda', 'Drinks', 'Refreshing lime with a fizzy finish.', 40, null, true, null),
  ('a8888888-8888-4888-8888-888888888888', '11111111-1111-4111-8111-111111111111', 'Idli & Sambar', 'South Indian', 'Soft idlis served with sambar and chutney.', 50, null, true, null),
  ('a9999999-9999-4999-8999-999999999999', '22222222-2222-4222-8222-222222222222', 'Brownie', 'Desserts', 'Rich chocolate brownie, baked fresh.', 60, null, true, 'Fresh today')
on conflict (id) do nothing;
