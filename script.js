'use strict';

const KEY = 'campusbite_simple_v1';
const STUDENT_SESSION_KEY = 'campusbite_student_session';
const ADMIN_SESSION_KEY = 'campusbite_admin_session';
const initial = {
  menu: [
    { id: 1, name: 'Masala Dosa', cat: 'South Indian', price: 65, emoji: '🥞', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80', desc: 'Crispy dosa with potato masala and chutneys.', available: true, offer: '' },
    { id: 2, name: 'Paneer Wrap', cat: 'Quick Bites', price: 90, emoji: '🌯', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80', desc: 'Spiced paneer, crunchy vegetables and mint sauce.', available: true, offer: 'Student favourite' },
    { id: 3, name: 'Veg Fried Rice', cat: 'Meals', price: 110, emoji: '🍚', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80', desc: 'Wok-tossed rice with vegetables and herbs.', available: true, offer: '' },
    { id: 4, name: 'Chicken Rice Bowl', cat: 'Meals', price: 145, emoji: '🍗', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80', desc: 'Comforting rice bowl with savoury chicken.', available: true, offer: '' },
    { id: 5, name: 'Samosa Pair', cat: 'Quick Bites', price: 35, emoji: '🥟', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80', desc: 'Golden, flaky samosas with tangy chutney.', available: true, offer: 'Combo deal' },
    { id: 6, name: 'Cold Coffee', cat: 'Drinks', price: 55, emoji: '🥤', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80', desc: 'Chilled coffee for your study break.', available: true, offer: '' },
    { id: 7, name: 'Fresh Lime Soda', cat: 'Drinks', price: 40, emoji: '🍋', image: 'https://images.unsplash.com/photo-1621330716555-5cad596c4562?auto=format&fit=crop&w=900&q=80', desc: 'Refreshing lime with a fizzy finish.', available: true, offer: '' },
    { id: 8, name: 'Idli & Sambar', cat: 'South Indian', price: 50, emoji: '🍘', image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=900&q=80', desc: 'Soft idlis served with sambar and chutney.', available: true, offer: '' },
    { id: 9, name: 'Brownie', cat: 'Desserts', price: 60, emoji: '🍫', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80', desc: 'Rich chocolate brownie, baked fresh.', available: true, offer: 'Fresh today' }
  ],
  orders: [
    { id: 'CB1001', studentId: 'cb1024', stallId: 1, items: [{ id: 1, name: 'Masala Dosa', price: 65, qty: 1 }, { id: 6, name: 'Cold Coffee', price: 55, qty: 1 }], subtotal: 120, bonusDiscount: 0, total: 120, paymentMethod: 'upi', paymentStatus: 'Verified', status: 'Preparing', createdAt: new Date(Date.now() - 12 * 60000).toISOString(), bonusAwarded: false },
    { id: 'CB1002', studentId: 'cb2088', stallId: 2, items: [{ id: 2, name: 'Paneer Wrap', price: 90, qty: 1 }], subtotal: 90, bonusDiscount: 0, total: 90, paymentMethod: 'cash', paymentStatus: 'Pending on pickup', status: 'Ready for pickup', createdAt: new Date(Date.now() - 27 * 60000).toISOString(), bonusAwarded: false },
    { id: 'CB1003', studentId: 'cb1024', stallId: 1, items: [{ id: 5, name: 'Samosa Pair', price: 35, qty: 2 }], subtotal: 70, bonusDiscount: 0, total: 70, paymentMethod: 'upi', paymentStatus: 'Verified', status: 'Completed', createdAt: new Date(Date.now() - 86400000).toISOString(), bonusAwarded: true }
  ],
  points: { cb1024: 12, cb2088: 0 },
  students: [
    { id: 'cb1024', name: 'Aarav Menon', role: 'Student', status: 'Active', joined: '2025-08-12' },
    { id: 'cb2088', name: 'Diya Sharma', role: 'Student', status: 'Active', joined: '2025-09-03' },
    { id: 'cb3041', name: 'Kabir Rao', role: 'Student', status: 'Active', joined: '2025-10-19' },
    { id: 'staff01', name: 'Meera Nair', role: 'Stall manager', status: 'Active', joined: '2025-07-01' }
  ],
  stalls: [
    { id: 1, name: 'New Canteen', location: 'KPRCAS campus', manager: 'Meera Nair', hours: '08:00–20:00', status: 'Open' },
    { id: 2, name: 'Old Canteen', location: 'KPRCAS campus', manager: 'Unassigned', hours: '08:00–18:00', status: 'Open' }
  ],
  campusPlaces: [
    { id: 'block-a', name: 'A Block', kind: 'Academic block', query: 'KPR College of Arts Science and Research A Block' },
    { id: 'block-b', name: 'B Block', kind: 'Academic block', query: 'KPR College of Arts Science and Research B Block' },
    { id: 'block-c', name: 'C Block', kind: 'Academic block', query: 'KPR College of Arts Science and Research C Block' },
    { id: 'new-canteen', name: 'New Canteen', kind: 'Food & pickup', query: 'KPR College of Arts Science and Research New Canteen' },
    { id: 'old-canteen', name: 'Old Canteen', kind: 'Food & pickup', query: 'KPR College of Arts Science and Research Old Canteen' }
  ],
  announcements: [{ id: 1, title: 'Welcome to CampusBite', message: 'Order ahead and collect from your favourite campus stall.', active: true, createdAt: new Date().toISOString() }],
  activity: [{ action: 'Admin workspace initialized', actor: 'CampusBite system', at: new Date().toISOString() }],
  settings: { upiId: 'campusbite@upi', payeeName: 'CampusBite' },
  nextOrder: 1004,
  nextMenu: 10,
  nextStall: 4,
  nextPerson: 2
};
const defaultMenuImages = new Map(initial.menu.map(item => [item.id, item.image]));

function loadDB() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    let needsMigration = !Array.isArray(saved.campusPlaces);
    const db = {
      ...structuredClone(initial),
      ...saved,
      settings: { ...initial.settings, ...(saved.settings || {}) },
      menu: Array.isArray(saved.menu) ? saved.menu.map(item => ({ available: true, offer: '', ...item })) : structuredClone(initial.menu),
      orders: Array.isArray(saved.orders) ? saved.orders : structuredClone(initial.orders),
      points: saved.points || structuredClone(initial.points),
      students: Array.isArray(saved.students) ? saved.students : structuredClone(initial.students),
      stalls: Array.isArray(saved.stalls) ? saved.stalls : structuredClone(initial.stalls),
      campusPlaces: Array.isArray(saved.campusPlaces) ? saved.campusPlaces : structuredClone(initial.campusPlaces),
      announcements: Array.isArray(saved.announcements) ? saved.announcements : structuredClone(initial.announcements),
      activity: Array.isArray(saved.activity) ? saved.activity : structuredClone(initial.activity)
    };
    const legacyStallNames = ['Central Canteen', 'Library Brew Bar', 'North Gate Bites'];
    if (db.stalls.some(stall => legacyStallNames.includes(stall.name))) {
      db.stalls = db.stalls.filter(stall => !legacyStallNames.includes(stall.name));
      needsMigration = true;
    }
    for (const stall of initial.stalls) {
      if (!db.stalls.some(existing => existing.name === stall.name)) db.stalls.push(structuredClone(stall));
    }
    if (needsMigration) {
      try { localStorage.setItem(KEY, JSON.stringify(db)); }
      catch (error) { console.error('CampusBite could not migrate saved campus locations:', error); }
    }
    return db;
  } catch (error) {
    console.error('CampusBite could not load saved data:', error);
    return structuredClone(initial);
  }
}
let db = loadDB(), cart = {}, category = 'All', isAdmin = window.location.hash === '#admin' && localStorage.getItem(ADMIN_SESSION_KEY) === 'signed-in', selectedView = 'shop', activeAdminTab = 'overview';
if (window.location.hash === '#admin') document.body.classList.add('admin-standalone');
const $ = id => document.getElementById(id);
const money = amount => '₹' + Number(amount || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
function menuImage(item) { return item.image || defaultMenuImages.get(item.id) || ''; }
function saveDB() {
  try { localStorage.setItem(KEY, JSON.stringify(db)); }
  catch (error) { console.error('CampusBite could not save changes:', error); toast('Could not save changes. Check browser storage permissions.'); }
}
function logAction(action, actor = 'Admin') {
  db.activity.unshift({ action, actor, at: new Date().toISOString() });
  db.activity = db.activity.slice(0, 150);
}
function toast(message) {
  $('toast').textContent = message;
  $('toast').classList.remove('hidden');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => $('toast').classList.add('hidden'), 2800);
}
function studentKey() { return ($('checkoutStudent')?.value || $('studentName')?.value || '').trim().toLowerCase(); }
function studentPoints(id) { return Number(db.points[(id || '').trim().toLowerCase()] || 0); }
function activeStudentSession() {
  try {
    const session = JSON.parse(localStorage.getItem(STUDENT_SESSION_KEY) || 'null');
    return db.students.find(account =>
      account.id.toLowerCase() === String(session?.id || '').toLowerCase() &&
      account.role === 'Student' && account.status === 'Active'
    ) || null;
  } catch (error) {
    console.error('CampusBite could not read the student sign-in:', error);
    return null;
  }
}
function renderCategories() {
  const cats = ['All', ...new Set(db.menu.map(item => item.cat))];
  if (!cats.includes(category)) category = 'All';
  $('categories').innerHTML = cats.map(cat => `<button class="chip ${cat === category ? 'active' : ''}" data-cat="${esc(cat)}">${esc(cat)}</button>`).join('');
}
function renderMenu() {
  const query = ($('search').value || '').toLowerCase();
  const items = db.menu.filter(item => item.available !== false && (category === 'All' || item.cat === category) && (item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)));
  const suggestions = $('mealSuggestions');
  if (suggestions) suggestions.innerHTML = db.menu.filter(item => item.available !== false).map(item => `<option value="${esc(item.name)}" label="${esc(item.cat)} · ${money(item.price)}"></option>`).join('');
  $('menu').innerHTML = items.length ? items.map(item => `<article class="food-card"><div class="food-art"><span class="food-fallback" aria-hidden="true">${esc(item.emoji || '🍴')}</span>${menuImage(item) ? `<img src="${esc(menuImage(item))}" alt="${esc(item.name)}" loading="lazy" onerror="this.remove()">` : ''}</div><div class="food-info"><small class="eyebrow">${esc(item.cat)}</small>${item.offer ? `<span class="offer-tag">${esc(item.offer)}</span>` : ''}<h3>${esc(item.name)}</h3><p>${esc(item.desc)}</p><div class="food-bottom"><span class="price">${money(item.price)}</span><button class="add" data-add="${item.id}">+ Add</button></div></div></article>`).join('') : '<p class="empty-state">No available meals match your search.</p>';
  renderAnnouncement();
}
function renderAnnouncement() {
  const bar = $('announcementBar');
  if (!bar) return;
  const announcement = db.announcements.find(item => item.active);
  bar.innerHTML = announcement ? `<div class="announcement-banner"><span>✦ CAMPUS UPDATE</span><div><b>${esc(announcement.title)}</b><p>${esc(announcement.message)}</p></div></div>` : '';
}
function subtotal() {
  return Object.entries(cart).reduce((sum, [id, quantity]) => sum + (db.menu.find(item => item.id === Number(id))?.price || 0) * quantity, 0);
}
function discount() {
  const id = studentKey();
  if (!id) return 0;
  const usable = Math.min(studentPoints(id), Math.floor(subtotal() / 10) * 100);
  return Math.min(subtotal(), Math.floor(usable / 100) * 10);
}
function renderCart() {
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  $('cartCount').textContent = count;
  const stallSelect = $('orderStall');
  if (stallSelect) {
    const previous = stallSelect.value;
    const openStalls = db.stalls.filter(stall => stall.status === 'Open');
    stallSelect.innerHTML = openStalls.map(stall => `<option value="${stall.id}">${esc(stall.name)} · ${esc(stall.location)}</option>`).join('') || '<option value="">No stalls are currently open</option>';
    if (openStalls.some(stall => String(stall.id) === previous)) stallSelect.value = previous;
  }
  $('cartItems').innerHTML = count ? Object.entries(cart).map(([id, quantity]) => {
    const item = db.menu.find(menuItem => menuItem.id === Number(id));
    return item ? `<div class="cart-line"><span class="emoji">${esc(item.emoji || '🍴')}</span><div class="details"><b>${esc(item.name)}</b><small>${money(item.price)} each</small></div><div class="qty"><button data-qty="${id}" data-delta="-1">−</button><b>${quantity}</b><button data-qty="${id}" data-delta="1">+</button></div></div>` : '';
  }).join('') : '<p>Your cart is empty. Add a campus favourite to get started.</p>';
  const sub = subtotal(), savings = discount();
  $('subtotal').textContent = money(sub);
  $('discount').textContent = '−' + money(savings);
  $('total').textContent = money(Math.max(0, sub - savings));
  renderPaymentArea();
}
function renderPaymentArea() {
  const method = $('paymentMethod').value, total = Math.max(0, subtotal() - discount());
  let html = '';
  if (method === 'upi') {
    const upi = (db.settings.upiId || '').trim(), payee = db.settings.payeeName || 'CampusBite';
    const uri = `upi://pay?pa=${encodeURIComponent(upi)}&pn=${encodeURIComponent(payee)}&am=${total.toFixed(2)}&cu=INR&tn=${encodeURIComponent('CampusBite order')}`;
    html = `<div class="payment-box"><b>Pay by UPI / QR</b><p>Payment requests are not verified automatically. Staff must verify payment before fulfilment.</p>${upi ? `<img class="qr" alt="UPI payment QR" src="https://api.qrserver.com/v1/create-qr-code/?size=190x190&data=${encodeURIComponent(uri)}"><p><b>Payee:</b> ${esc(payee)}<br><b>UPI ID:</b> ${esc(upi)}<br><b>Amount:</b> ${money(total)}</p><a href="${uri}">Open UPI app</a>` : '<p>UPI is not configured. Choose cash or ask an admin to set it up.</p>'}</div>`;
  } else if (method === 'card') {
    html = '<div class="payment-box"><b>Card payment (demo only)</b><p>No real payment is taken. Never enter real card details.</p><label>Test card number<input id="testCard" inputmode="numeric" maxlength="19" placeholder="4242 4242 4242 4242"></label><div class="row"><label>Expiry<input id="testExpiry" placeholder="MM/YY" maxlength="5"></label><label>CVV<input id="testCvv" inputmode="numeric" maxlength="4" placeholder="123"></label></div><label>Name on card<input id="testCardName" placeholder="Test User"></label></div>';
  } else {
    html = `<div class="payment-box">${method === 'cash' ? 'Pay cash at your selected pickup point. Payment is pending until staff verifies it.' : 'Meal credits are a demo option; no real campus wallet is connected.'}</div>`;
  }
  $('paymentArea').innerHTML = html;
}
function showView(view) {
  selectedView = view;
  document.body.classList.toggle('admin-page-active', view === 'admin');
  document.querySelectorAll('.view').forEach(element => element.classList.add('hidden'));
  const target = $({ shop: 'shopView', orders: 'ordersView', map: 'mapView', rewards: 'rewardsView', admin: 'adminView' }[view]);
  target.classList.remove('hidden');
  document.querySelectorAll('.top .nav').forEach(button => button.classList.toggle('active', button.dataset.view === view));
  if (view === 'shop') renderAnnouncement();
  if (view === 'orders') renderOrders();
  if (view === 'rewards') renderRewards();
  if (view === 'map') renderMap('campusMap', 'mapLegend');
  if (view === 'admin') renderAdmin();
}
function renderOrders() {
  const student = activeStudentSession();
  if (!student) {
    $('studentName').value = '';
    $('ordersList').innerHTML = '<div class="panel"><h3>Sign in to view your orders</h3><p class="muted-copy">Your order history is private to your student account.</p><a class="primary student-order-link" href="student-login.html">Student sign in →</a></div>';
    return;
  }
  const id = student.id.toLowerCase();
  $('studentName').value = student.id;
  const orders = db.orders.filter(order => order.studentId === id);
  $('ordersList').innerHTML = orders.length ? orders.slice().reverse().map(order => `<article class="order-card"><div><b>${esc(order.id)}</b> <span class="badge">${esc(order.status)}</span><p>${order.items.map(item => `${esc(item.name)} × ${item.qty}`).join(', ')}</p><small>${esc(db.stalls.find(stall => stall.id === order.stallId)?.name || 'Campus stall')} · ${new Date(order.createdAt).toLocaleString()} · ${esc(order.paymentMethod.toUpperCase())} · ${esc(order.paymentStatus)}</small></div><strong>${money(order.total)}</strong></article>`).join('') : '<div class="panel">No orders found. Enter the student ID used at checkout to filter your orders.</div>';
}
function renderRewards() {
  const id = studentKey() || ($('studentName').value || '').trim().toLowerCase();
  $('pointsBalance').textContent = studentPoints(id);
  $('rewardHint').textContent = id ? `Student: ${id} · 100 points = ₹10 off at checkout.` : 'Enter your student ID in My orders or checkout to see your balance.';
}
function adminStats() {
  const revenue = db.orders.filter(order => order.status !== 'Cancelled').reduce((sum, order) => sum + Number(order.total || 0), 0);
  const open = db.orders.filter(order => !['Completed', 'Cancelled'].includes(order.status)).length;
  $('stats').innerHTML = [['Orders today', db.orders.filter(order => new Date(order.createdAt).toDateString() === new Date().toDateString()).length], ['Gross sales', money(revenue)], ['In progress', open], ['Active stalls', db.stalls.filter(stall => stall.status === 'Open').length]].map(([label, value]) => `<div class="stat"><span>${label}</span><b>${value}</b></div>`).join('');
}
function setAdminTab(tab) {
  activeAdminTab = tab;
  document.querySelectorAll('.admin-tab').forEach(button => button.classList.toggle('active', button.dataset.adminTab === tab));
  renderAdminContent();
}
function renderAdmin() {
  $('adminLogin').classList.toggle('hidden', isAdmin);
  $('adminPanel').classList.toggle('hidden', !isAdmin);
  if (!isAdmin) return;
  adminStats();
  renderAdminContent();
}
function orderCard(order) {
  const states = ['Placed', 'Preparing', 'Ready', 'Ready for pickup', 'Completed', 'Cancelled'];
  return `<article class="order-card"><div class="order-main"><b>${esc(order.id)}</b><span class="badge">${esc(order.status)}</span><p>${order.items.map(item => `${esc(item.name)} × ${item.qty}`).join(', ')}</p><small>${new Date(order.createdAt).toLocaleString()} · Student ${esc(order.studentId || 'Guest')} · ${esc(db.stalls.find(stall => stall.id === (order.stallId ?? 1))?.name || 'Campus stall')} · ${esc(order.paymentMethod)} · ${money(order.total)}</small><small class="payment-state">Payment: ${esc(order.paymentStatus)}</small></div><div class="order-controls">${order.status === 'Placed' ? `<button class="small-action" data-accept="${esc(order.id)}">Accept order</button><button class="small-action danger-text" data-reject="${esc(order.id)}">Reject</button>` : ''}<label>Update status<select data-status="${esc(order.id)}">${states.map(state => `<option ${state === order.status ? 'selected' : ''}>${state}</option>`).join('')}</select></label><button class="secondary" data-paid="${esc(order.id)}">Verify payment</button></div></article>`;
}
function renderAdminContent() {
  if (!isAdmin) return;
  document.querySelectorAll('.admin-tab').forEach(button => button.classList.toggle('active', button.dataset.adminTab === activeAdminTab));
  const content = $('adminContent');
  if (activeAdminTab === 'overview') {
    const newest = db.orders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
    content.innerHTML = `<div class="dashboard-grid"><section class="panel"><div class="panel-heading"><div><p class="eyebrow">LIVE QUEUE</p><h3>Recent orders</h3></div><button class="text-button" data-admin-tab="orders">View all →</button></div>${newest.length ? newest.map(orderCard).join('') : '<p class="empty-state">No orders yet. New orders will appear here.</p>'}</section><section class="panel"><div class="panel-heading"><div><p class="eyebrow">CAMPUS STATUS</p><h3>Stall operations</h3></div><button class="text-button" data-admin-tab="stalls">Manage →</button></div>${db.stalls.map(stall => `<div class="compact-row"><span class="stall-dot ${stall.status === 'Open' ? '' : 'off'}"></span><b>${esc(stall.name)}</b><span class="status-text">${esc(stall.status)}</span></div>`).join('')}<div class="announcement-preview"><p class="eyebrow">LIVE ANNOUNCEMENT</p>${esc(db.announcements.find(item => item.active)?.title || 'No active announcement')}</div></section></div><section class="panel"><div class="panel-heading"><div><p class="eyebrow">QUICK ACTION</p><h3>Give a student bonus points</h3></div></div><div class="row"><input id="bonusStudent" placeholder="Student ID / name"><input id="bonusAmount" type="number" min="1" placeholder="Points to add"><button id="addBonus" class="primary">Add points</button></div><p id="bonusMessage" class="form-message"></p></section><section class="panel"><div class="panel-heading"><div><p class="eyebrow">PAYMENT SETUP</p><h3>UPI payment settings</h3></div></div><div class="row"><label>UPI ID<input id="upiId" placeholder="yourname@upi"></label><label>Payee name<input id="payeeName" placeholder="CampusBite"></label><button id="saveSettings" class="primary">Save settings</button></div><small>UPI requests require manual verification. Demo card and meal-credit modes do not process real payments.</small></section>`;
  } else if (activeAdminTab === 'orders') {
    content.innerHTML = `<section class="panel"><div class="panel-heading"><div><p class="eyebrow">ORDER MANAGEMENT</p><h3>All student orders <span class="count-pill">${db.orders.length}</span></h3></div><input id="orderSearch" class="search-field" placeholder="Search order ID or student"></div><div id="orderResults">${renderOrderRows(db.orders)}</div></section>`;
  } else if (activeAdminTab === 'menu') {
    content.innerHTML = `<section class="panel"><div class="panel-heading"><div><p class="eyebrow">FOOD & MENU CONTROL</p><h3>Menu catalogue</h3></div></div><form id="menuForm" class="editor-grid"><label>Food name<input name="name" required maxlength="60" placeholder="e.g. Veggie burger"></label><label>Category<input name="cat" required maxlength="32" placeholder="Quick Bites"></label><label>Price (₹)<input name="price" type="number" min="1" step="1" required placeholder="85"></label><label>Food emoji<input name="emoji" maxlength="6" placeholder="🍔"></label><label class="wide-field">Description<input name="desc" required maxlength="140" placeholder="Short menu description"></label><label>Special offer<input name="offer" maxlength="40" placeholder="Combo deal (optional)"></label><label>Food image<input name="imageFile" type="file" accept="image/*"></label><button class="primary" type="submit">Add food item</button></form><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Item</th><th>Category / offer</th><th>Price</th><th>Availability</th><th>Actions</th></tr></thead><tbody>${db.menu.map(item => `<tr><td><span class="table-food">${menuImage(item) ? `<img src="${esc(menuImage(item))}" alt="" loading="lazy" onerror="this.remove()">` : esc(item.emoji || '🍴')}<b>${esc(item.name)}</b></span></td><td>${esc(item.cat)}${item.offer ? `<small>${esc(item.offer)}</small>` : ''}</td><td>${money(item.price)}</td><td><button class="toggle-pill ${item.available === false ? 'disabled' : ''}" data-availability="${item.id}">${item.available === false ? 'Sold out' : 'Available'}</button></td><td><button class="small-action" data-edit-menu="${item.id}">Edit</button><button class="small-action" data-upload-menu="${item.id}">Image</button><button class="small-action danger-text" data-delete-menu="${item.id}">Delete</button></td></tr>`).join('')}</tbody></table></div></section>`;
  } else if (activeAdminTab === 'stalls') {
    content.innerHTML = `<section class="panel"><div class="panel-heading"><div><p class="eyebrow">STALL MANAGEMENT</p><h3>Campus food stalls</h3></div></div><form id="stallForm" class="editor-grid"><label>Stall name<input name="name" required maxlength="60" placeholder="South Quad Snacks"></label><label>Campus location<input name="location" required maxlength="60" placeholder="South quad"></label><label>Opening hours<input name="hours" required placeholder="08:00–19:00"></label><label>Assign manager<select name="manager">${db.students.filter(person => ['Stall staff', 'Stall manager', 'Admin'].includes(person.role)).map(person => `<option>${esc(person.name)}</option>`).join('')}<option>Unassigned</option></select></label><button class="primary" type="submit">Add stall</button></form><div class="stall-list">${db.stalls.map(stall => `<article class="stall-card"><div class="stall-icon">⌂</div><div class="stall-info"><h4>${esc(stall.name)}</h4><p>${esc(stall.location)} · ${esc(stall.hours)}</p><small>Manager: ${esc(stall.manager || 'Unassigned')}</small></div><span class="badge ${stall.status !== 'Open' ? 'badge-muted' : ''}">${esc(stall.status)}</span><button class="small-action" data-edit-stall="${stall.id}">Details</button><button class="secondary" data-stall-toggle="${stall.id}">${stall.status === 'Open' ? 'Pause stall' : 'Reopen stall'}</button><button class="small-action danger-text" data-delete-stall="${stall.id}">Remove</button></article>`).join('')}</div></section>`;
  } else if (activeAdminTab === 'people') {
    content.innerHTML = `<section class="panel"><div class="panel-heading"><div><p class="eyebrow">STUDENT & STAFF MANAGEMENT</p><h3>Campus accounts <span class="count-pill">${db.students.length}</span></h3></div><input id="peopleSearch" class="search-field" placeholder="Search name or account ID"></div><form id="personForm" class="editor-grid compact-editor"><label>Full name<input name="name" required maxlength="70" placeholder="Full name"></label><label>Account ID<input name="id" required maxlength="24" placeholder="e.g. cb5001"></label><label>Role<select name="role"><option>Student</option><option>Stall staff</option><option>Stall manager</option><option>Admin</option></select></label><button class="primary" type="submit">Create account</button></form><div id="peopleResults">${renderPeopleRows(db.students)}</div></section>`;
  } else if (activeAdminTab === 'payments') {
    const records = db.orders.slice().reverse();
    content.innerHTML = `<section class="panel"><div class="panel-heading"><div><p class="eyebrow">PAYMENTS & REFUNDS</p><h3>Payment records</h3></div><span class="count-pill">${records.length} records</span></div><p class="muted-copy">Payments are demo records only. UPI and cash transactions must be verified by staff; no real card payment is processed.</p><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Order</th><th>Student</th><th>Method</th><th>Amount</th><th>Payment status</th><th>Refund</th></tr></thead><tbody>${records.length ? records.map(order => `<tr><td><b>${esc(order.id)}</b><small>${new Date(order.createdAt).toLocaleString()}</small></td><td>${esc(order.studentId)}</td><td>${esc(order.paymentMethod.toUpperCase())}</td><td>${money(order.total)}</td><td>${esc(order.paymentStatus)}</td><td>${order.refundStatus ? `<span class="badge badge-muted">${esc(order.refundStatus)}</span>` : `<button class="small-action danger-text" data-refund="${esc(order.id)}">Record refund</button>`}</td></tr>`).join('') : '<tr><td colspan="6">No payment records yet.</td></tr>'}</tbody></table></div></section><section class="panel"><div class="panel-heading"><div><p class="eyebrow">CAMPUS UPDATES</p><h3>Announcements & offers</h3></div></div><form id="announcementForm" class="editor-grid compact-editor"><label>Title<input name="title" required maxlength="70" placeholder="Today’s lunch special"></label><label class="wide-field">Message<input name="message" required maxlength="180" placeholder="Share an update with students"></label><button class="primary" type="submit">Publish announcement</button></form>${db.announcements.map(item => `<div class="announcement-row"><div><b>${esc(item.title)}</b><p>${esc(item.message)}</p></div><button class="small-action" data-announcement="${item.id}">${item.active ? 'Hide' : 'Publish'}</button><button class="small-action danger-text" data-delete-announcement="${item.id}">Delete</button></div>`).join('')}</section>`;
  } else if (activeAdminTab === 'analytics') {
    const totals = periods();
    const topItems = itemSales();
    content.innerHTML = `<section class="panel"><div class="panel-heading"><div><p class="eyebrow">ANALYTICS & REPORTS</p><h3>Sales performance</h3></div><button class="secondary" data-export>Download CSV report</button></div><div class="report-kpis"><div><small>Daily revenue</small><b>${money(totals.day.revenue)}</b><span>${totals.day.orders} orders today</span></div><div><small>Weekly revenue</small><b>${money(totals.week.revenue)}</b><span>${totals.week.orders} orders this week</span></div><div><small>Monthly revenue</small><b>${money(totals.month.revenue)}</b><span>${totals.month.orders} orders this month</span></div></div><h4 class="subheading">Revenue and order volume · last 7 days</h4>${weeklyAnalyticsGraph()}<div class="analytics-columns"><div><h4>Best-selling food</h4>${topItems.length ? topItems.slice(0, 5).map(([name, quantity]) => `<div class="rank-row"><span>${esc(name)}</span><b>${quantity} sold</b></div>`).join('') : '<p class="muted-copy">Order data will appear here.</p>'}</div><div><h4>Most active stalls</h4>${stallSales().map(([name, count]) => `<div class="rank-row"><span>${esc(name)}</span><b>${count} orders</b></div>`).join('')}</div></div></section>`;
  } else if (activeAdminTab === 'map') {
    content.innerHTML = `<section class="panel"><div class="panel-heading"><div><p class="eyebrow">CAMPUS OPERATIONS MAP</p><h3>KPRCAS blocks & canteens</h3></div><span class="live-pill"><i></i> ${db.stalls.filter(stall => stall.status === 'Open').length} STALLS OPEN</span></div><p class="muted-copy">Map centred on KPR College of Arts, Science and Research. Open a place below to search its campus location.</p><div id="adminMap" class="campus-map"></div><a class="map-directions" href="https://maps.app.goo.gl/b4Qj6D6JesuhcDkSA" target="_blank" rel="noopener noreferrer">Open KPRCAS in Google Maps ↗</a><div id="adminMapLegend" class="map-legend"></div></section>`;
    renderMap('adminMap', 'adminMapLegend');
  } else {
    content.innerHTML = `<section class="panel"><div class="panel-heading"><div><p class="eyebrow">ADMIN AUDIT TRAIL</p><h3>Important actions</h3></div><span class="count-pill">${db.activity.length} events</span></div><div class="activity-list">${db.activity.length ? db.activity.map(event => `<article class="activity-item"><span class="activity-mark"></span><div><b>${esc(event.action)}</b><p>${esc(event.actor)} · ${new Date(event.at).toLocaleString()}</p></div></article>`).join('') : '<p class="empty-state">Admin actions will be recorded here.</p>'}</div></section>`;
  }
  bindDynamicControls();
}
function renderOrderRows(orders) { return orders.length ? orders.slice().reverse().map(orderCard).join('') : '<p class="empty-state">No orders yet. New orders will appear here.</p>'; }
function renderPeopleRows(people) {
  return `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Account</th><th>Role</th><th>Joined</th><th>Bonus points</th><th>Status</th><th>Actions</th></tr></thead><tbody>${people.map(person => `<tr><td><b>${esc(person.name)}</b><small>${esc(person.id)}</small></td><td>${esc(person.role)}</td><td>${esc(person.joined || '—')}</td><td>${studentPoints(person.id)}</td><td><span class="badge ${person.status !== 'Active' ? 'badge-muted' : ''}">${esc(person.status)}</span></td><td><button class="small-action" data-person-role="${esc(person.id)}">Change role</button><button class="small-action" data-person-toggle="${esc(person.id)}">${person.status === 'Active' ? 'Suspend' : 'Activate'}</button><button class="small-action" data-reset-person="${esc(person.id)}">Reset points</button></td></tr>`).join('')}</tbody></table></div>`;
}
function periods() {
  const now = new Date(), startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()), startWeek = new Date(startDay), startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  startWeek.setDate(startWeek.getDate() - 6);
  const result = {};
  for (const [key, start] of [['day', startDay], ['week', startWeek], ['month', startMonth]]) {
    const matching = db.orders.filter(order => order.status !== 'Cancelled' && new Date(order.createdAt) >= start);
    result[key] = { orders: matching.length, revenue: matching.reduce((sum, order) => sum + Number(order.total || 0), 0) };
  }
  return result;
}
function itemSales() {
  const counts = {};
  db.orders.filter(order => order.status !== 'Cancelled').forEach(order => order.items.forEach(item => { counts[item.name] = (counts[item.name] || 0) + item.qty; }));
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}
function stallSales() {
  const count = db.stalls.map(stall => [stall.name, db.orders.filter(order => order.status !== 'Cancelled' && order.stallId === stall.id).length]);
  const unassigned = db.orders.filter(order => order.status !== 'Cancelled' && !Number.isInteger(order.stallId)).length;
  if (unassigned) count.push(['Unassigned', unassigned]);
  return count.sort((a, b) => b[1] - a[1]);
}
function weeklyAnalyticsGraph() {
  const days = [];
  for (let offset = 6; offset >= 0; offset--) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - offset);
    const orders = db.orders.filter(order => order.status !== 'Cancelled' && new Date(order.createdAt).toDateString() === date.toDateString());
    days.push({
      date,
      orders: orders.length,
      revenue: orders.reduce((sum, order) => sum + Number(order.total || 0), 0)
    });
  }
  const width = 720, height = 270, left = 68, right = 52, top = 25, bottom = 44;
  const graphWidth = width - left - right, graphHeight = height - top - bottom;
  const maxRevenue = Math.max(1, ...days.map(day => day.revenue));
  const maxOrders = Math.max(1, ...days.map(day => day.orders));
  const points = days.map((day, index) => ({
    ...day,
    x: left + graphWidth * index / (days.length - 1),
    revenueY: top + graphHeight * (1 - day.revenue / maxRevenue),
    ordersHeight: graphHeight * day.orders / maxOrders
  }));
  const grid = Array.from({ length: 5 }, (_, index) => {
    const y = top + graphHeight * index / 4;
    const revenue = maxRevenue * (1 - index / 4);
    const orders = Math.round(maxOrders * (1 - index / 4));
    return `<g class="analytics-grid"><line x1="${left}" y1="${y}" x2="${width - right}" y2="${y}"></line><text x="${left - 10}" y="${y + 4}" text-anchor="end">${esc(money(revenue))}</text><text x="${width - right + 10}" y="${y + 4}">${orders}</text></g>`;
  }).join('');
  const bars = points.map(point => `<rect class="analytics-order-bar" x="${point.x - 17}" y="${top + graphHeight - point.ordersHeight}" width="34" height="${point.ordersHeight}" rx="6"><title>${esc(point.date.toLocaleDateString('en-IN'))}: ${point.orders} orders</title></rect>`).join('');
  const line = points.map(point => `${point.x},${point.revenueY}`).join(' ');
  const dots = points.map(point => `<circle class="analytics-revenue-dot" cx="${point.x}" cy="${point.revenueY}" r="5"><title>${esc(point.date.toLocaleDateString('en-IN'))}: ${esc(money(point.revenue))}</title></circle>`).join('');
  const labels = points.map(point => `<text class="analytics-day-label" x="${point.x}" y="${height - 13}" text-anchor="middle">${esc(point.date.toLocaleDateString('en-IN', { weekday: 'short' }))}</text>`).join('');
  return `<div class="analytics-chart-wrap"><div class="analytics-chart-legend"><span><i class="analytics-legend-line"></i>Revenue</span><span><i class="analytics-legend-bar"></i>Orders</span></div><svg class="analytics-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Combined seven-day chart of daily revenue and order counts"><text class="analytics-axis-title" transform="translate(16 ${top + graphHeight / 2}) rotate(-90)">Revenue (₹)</text><text class="analytics-axis-title" transform="translate(${width - 7} ${top + graphHeight / 2}) rotate(90)">Orders</text>${grid}${bars}<polyline class="analytics-revenue-line" points="${line}"></polyline>${dots}${labels}</svg></div>`;
}
function renderMap(mapId, legendId) {
  const map = $(mapId);
  if (!map) return;
  const locations = db.campusPlaces.map(place => {
    const stall = db.stalls.find(item => item.name.toLowerCase() === place.name.toLowerCase());
    const query = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.query)}`;
    return `<a class="campus-place" href="${query}" target="_blank" rel="noopener noreferrer"><span class="place-marker ${place.kind === 'Food & pickup' ? 'food-marker' : ''}">${place.kind === 'Food & pickup' ? '⌂' : esc(place.name.charAt(0))}</span><span><b>${esc(place.name)}</b><small>${esc(place.kind)}${stall ? ` · ${esc(stall.status)} · ${esc(stall.hours)}` : ''}</small></span><span class="place-arrow">↗</span></a>`;
  }).join('');
  map.innerHTML = '<iframe class="osm-map" title="OpenStreetMap centred on KPR College of Arts, Science and Research" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.openstreetmap.org/export/embed.html?bbox=77.1300%2C11.0770%2C77.1410%2C11.0840&layer=mapnik&marker=11.0805985%2C77.1355352"></iframe><span class="map-attribution">© OpenStreetMap contributors</span>';
  $(legendId).innerHTML = `<div class="campus-place-grid">${locations}</div>`;
}
function placeOrder() {
  const items = Object.entries(cart).map(([id, quantity]) => {
    const item = db.menu.find(menuItem => menuItem.id === Number(id));
    return item ? { id: item.id, name: item.name, price: item.price, qty: quantity } : null;
  }).filter(Boolean);
  if (!items.length) { $('checkoutMessage').textContent = 'Your cart is empty.'; return; }
  const method = $('paymentMethod').value, studentId = $('checkoutStudent').value.trim().toLowerCase();
  if (!studentId) { $('checkoutMessage').textContent = 'Please enter your student ID to place an order and earn rewards.'; return; }
  if (db.students.some(person => person.id.toLowerCase() === studentId && person.status !== 'Active')) { $('checkoutMessage').textContent = 'This account is suspended. Please contact campus support.'; return; }
  if (method === 'upi' && !db.settings.upiId) { $('checkoutMessage').textContent = 'UPI is not configured. Choose another method or ask admin to set UPI ID.'; return; }
  const stallId = Number($('orderStall').value);
  if (!db.stalls.some(stall => stall.id === stallId && stall.status === 'Open')) { $('checkoutMessage').textContent = 'Choose a stall that is currently open before placing your order.'; return; }
  if (method === 'card') {
    const number = ($('testCard')?.value || '').replace(/\s/g, '');
    if (!/^\d{12,19}$/.test(number) || !$('testExpiry')?.value || !$('testCvv')?.value || !$('testCardName')?.value.trim()) { $('checkoutMessage').textContent = 'Fill the demo card form with test values. Never use real card details.'; return; }
  }
  const orderSubtotal = subtotal(), savings = discount(), pointsRedeemed = Math.min(studentPoints(studentId), Math.floor(savings / 10) * 100);
  if (pointsRedeemed) db.points[studentId] = Math.max(0, studentPoints(studentId) - pointsRedeemed);
  const order = { id: 'CB' + db.nextOrder++, studentId, stallId, items, subtotal: orderSubtotal, bonusDiscount: savings, bonusPointsRedeemed: pointsRedeemed, total: Math.max(0, orderSubtotal - savings), paymentMethod: method, paymentStatus: method === 'cash' ? 'Pending on pickup' : method === 'card' ? 'Demo only — not charged' : method === 'credits' ? 'Needs staff verification' : 'Pending UPI verification', status: 'Placed', createdAt: new Date().toISOString(), bonusAwarded: false };
  db.orders.push(order);
  logAction(`New order ${order.id} placed`, studentId);
  saveDB(); cart = {}; renderCart();
  $('checkoutMessage').textContent = '';
  $('cartDrawer').classList.add('hidden'); $('shade').classList.add('hidden');
  toast(`Order ${order.id} placed!`); showView('orders'); $('studentName').value = studentId; renderOrders();
}
function signInAdmin(event) {
  event.preventDefault();
  const username = $('adminUser').value.trim();
  const password = $('adminPass').value;
  if (username !== 'admin' || password !== 'CampusBite@123') {
    $('adminError').textContent = 'Incorrect demo username or password. Use admin / CampusBite@123.';
    return;
  }
  isAdmin = true;
  localStorage.removeItem(STUDENT_SESSION_KEY);
  localStorage.setItem(ADMIN_SESSION_KEY, 'signed-in');
  activeAdminTab = 'overview';
  $('adminError').textContent = '';
  $('adminPass').value = '';
  logAction('Admin signed in');
  saveDB();
  renderAdmin();
}
function updateOrderStatus(order, status) {
  order.status = status;
  if (status === 'Completed' && !order.bonusAwarded) {
    if (order.studentId) { const earned = Math.floor(order.total / 10); db.points[order.studentId] = studentPoints(order.studentId) + earned; order.bonusAwarded = true; order.bonusPointsEarned = earned; }
    else order.bonusAwarded = true;
  }
  logAction(`Updated ${order.id} status to ${status}`); saveDB(); renderAdmin(); renderOrders(); toast(`Order ${order.id}: ${status}`);
}
function formData(form) { return Object.fromEntries(new FormData(form).entries()); }
function exportReport() {
  const rows = [['Order ID', 'Student ID', 'Date', 'Status', 'Payment method', 'Payment status', 'Total']];
  db.orders.forEach(order => rows.push([order.id, order.studentId, order.createdAt, order.status, order.paymentMethod, order.paymentStatus, order.total]));
  const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  link.download = `campusbite-orders-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click(); URL.revokeObjectURL(link.href);
  logAction('Downloaded sales report'); saveDB(); toast('CSV report downloaded');
}
function syncFilteredOrders() {
  const query = ($('orderSearch')?.value || '').trim().toLowerCase();
  const filtered = db.orders.filter(order => `${order.id} ${order.studentId}`.toLowerCase().includes(query));
  $('orderResults').innerHTML = renderOrderRows(filtered);
}
function bindDynamicControls() {
  const form = $('menuForm');
  if (form) form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = formData(form), file = form.elements.imageFile.files[0];
    if (file && file.size > 2 * 1024 * 1024) { toast('Choose an image smaller than 2 MB.'); return; }
    const saveItem = image => {
      db.menu.push({ id: db.nextMenu++, name: data.name.trim(), cat: data.cat.trim(), price: Number(data.price), emoji: data.emoji.trim() || '🍴', desc: data.desc.trim(), offer: data.offer.trim(), available: true, ...(image ? { image } : {}) });
      logAction(`Added menu item: ${data.name.trim()}`); saveDB(); renderCategories(); renderMenu(); renderAdmin(); toast('Food item added');
    };
    if (file) {
      const reader = new FileReader();
      reader.onload = () => saveItem(reader.result);
      reader.onerror = () => toast('Could not read the selected image.');
      reader.readAsDataURL(file);
    } else saveItem('');
  });
  const stallForm = $('stallForm');
  if (stallForm) stallForm.addEventListener('submit', event => {
    event.preventDefault(); const data = formData(stallForm);
    db.stalls.push({ id: db.nextStall++, name: data.name.trim(), location: data.location.trim(), manager: data.manager, hours: data.hours.trim(), status: 'Open', x: 18 + Math.random() * 64, y: 20 + Math.random() * 58 });
    logAction(`Added stall: ${data.name.trim()}`); saveDB(); renderAdmin(); toast('Stall added to the campus map');
  });
  const personForm = $('personForm');
  if (personForm) personForm.addEventListener('submit', event => {
    event.preventDefault(); const data = formData(personForm), id = data.id.trim().toLowerCase();
    if (db.students.some(person => person.id.toLowerCase() === id)) { toast('That account ID already exists.'); return; }
    db.students.push({ id, name: data.name.trim(), role: data.role, status: 'Active', joined: new Date().toISOString().slice(0, 10) });
    logAction(`Created ${data.role.toLowerCase()} account: ${id}`); saveDB(); renderAdmin(); toast('Account created');
  });
  const announcementForm = $('announcementForm');
  if (announcementForm) announcementForm.addEventListener('submit', event => {
    event.preventDefault(); const data = formData(announcementForm);
    db.announcements.unshift({ id: Date.now(), title: data.title.trim(), message: data.message.trim(), active: true, createdAt: new Date().toISOString() });
    logAction(`Published announcement: ${data.title.trim()}`); saveDB(); renderAdmin(); toast('Announcement published');
  });
  $('orderSearch')?.addEventListener('input', syncFilteredOrders);
  $('peopleSearch')?.addEventListener('input', event => {
    const query = event.target.value.toLowerCase();
    $('peopleResults').innerHTML = renderPeopleRows(db.students.filter(person => `${person.id} ${person.name} ${person.role}`.toLowerCase().includes(query)));
  });
  $('addBonus')?.addEventListener('click', () => {
    const id = $('bonusStudent').value.trim().toLowerCase(), amount = Number($('bonusAmount').value);
    if (!id || !Number.isInteger(amount) || amount < 1) { $('bonusMessage').textContent = 'Enter a student ID and a positive whole number of points.'; return; }
    db.points[id] = studentPoints(id) + amount;
    logAction(`Added ${amount} bonus points to ${id}`); saveDB(); $('bonusMessage').textContent = `Added ${amount} points to ${id}. New balance: ${db.points[id]}.`; renderAdmin();
  });
  $('saveSettings')?.addEventListener('click', () => {
    db.settings.upiId = $('upiId').value.trim(); db.settings.payeeName = $('payeeName').value.trim() || 'CampusBite';
    logAction('Updated payment settings'); saveDB(); toast('Payment settings saved'); renderCart();
  });
}

document.addEventListener('click', event => {
  const target = event.target;
  const add = target.closest('[data-add]');
  if (add) { const id = Number(add.dataset.add); cart[id] = (cart[id] || 0) + 1; renderCart(); toast('Added to cart'); return; }
  const quantity = target.closest('[data-qty]');
  if (quantity) { const id = quantity.dataset.qty; cart[id] = (cart[id] || 0) + Number(quantity.dataset.delta); if (cart[id] <= 0) delete cart[id]; renderCart(); return; }
  const chip = target.closest('[data-cat]');
  if (chip) { category = chip.dataset.cat; renderCategories(); renderMenu(); return; }
  const nav = target.closest('[data-view]');
  if (nav) { showView(nav.dataset.view); return; }
  const tab = target.closest('[data-admin-tab]');
  if (tab && isAdmin) { setAdminTab(tab.dataset.adminTab); return; }
  const paid = target.closest('[data-paid]');
  if (paid && isAdmin) {
    const order = db.orders.find(item => item.id === paid.dataset.paid);
    if (order) { order.paymentStatus = 'Verified by admin'; logAction(`Verified payment for ${order.id}`); saveDB(); renderAdmin(); toast('Payment marked verified'); }
    return;
  }
  const acceptOrder = target.closest('[data-accept]');
  if (acceptOrder && isAdmin) {
    const order = db.orders.find(item => item.id === acceptOrder.dataset.accept);
    if (order && order.status === 'Placed') updateOrderStatus(order, 'Preparing');
    return;
  }
  const rejectOrder = target.closest('[data-reject]');
  if (rejectOrder && isAdmin) {
    const order = db.orders.find(item => item.id === rejectOrder.dataset.reject);
    if (order && order.status === 'Placed') updateOrderStatus(order, 'Cancelled');
    return;
  }
  const availability = target.closest('[data-availability]');
  if (availability && isAdmin) {
    const item = db.menu.find(food => food.id === Number(availability.dataset.availability));
    if (item) { item.available = item.available === false; logAction(`${item.available ? 'Marked available' : 'Marked sold out'}: ${item.name}`); saveDB(); renderMenu(); renderAdmin(); }
    return;
  }
  const deleteMenu = target.closest('[data-delete-menu]');
  if (deleteMenu && isAdmin && confirm('Delete this food item from the menu?')) {
    const item = db.menu.find(food => food.id === Number(deleteMenu.dataset.deleteMenu));
    db.menu = db.menu.filter(food => food.id !== Number(deleteMenu.dataset.deleteMenu));
    if (item) logAction(`Deleted menu item: ${item.name}`);
    saveDB(); renderCategories(); renderMenu(); renderAdmin(); return;
  }
  const editMenu = target.closest('[data-edit-menu]');
  if (editMenu && isAdmin) {
    const item = db.menu.find(food => food.id === Number(editMenu.dataset.editMenu));
    if (!item) return;
    const name = prompt('Food name:', item.name); if (name === null) return;
    const categoryName = prompt('Category:', item.cat); if (categoryName === null) return;
    const price = prompt('Price in rupees:', String(item.price)); if (price === null) return;
    const description = prompt('Description:', item.desc); if (description === null) return;
    const offer = prompt('Special offer (leave blank for none):', item.offer || ''); if (offer === null) return;
    const emoji = prompt('Food emoji:', item.emoji || '🍴'); if (emoji === null) return;
    if (!name.trim() || !categoryName.trim() || !description.trim() || !Number.isFinite(Number(price)) || Number(price) < 1) { toast('Enter a name, category, description and valid positive price.'); return; }
    item.name = name.trim(); item.cat = categoryName.trim(); item.price = Number(price); item.desc = description.trim(); item.offer = offer.trim(); item.emoji = emoji.trim() || '🍴';
    logAction(`Edited menu item: ${item.name}`); saveDB(); renderCategories(); renderMenu(); renderAdmin(); return;
  }
  const uploadMenuImage = target.closest('[data-upload-menu]');
  if (uploadMenuImage && isAdmin) {
    const item = db.menu.find(food => food.id === Number(uploadMenuImage.dataset.uploadMenu));
    if (!item) return;
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files[0]; if (!file) return;
      if (file.size > 2 * 1024 * 1024) { toast('Choose an image smaller than 2 MB.'); return; }
      const reader = new FileReader();
      reader.onload = () => { item.image = reader.result; logAction(`Updated food image: ${item.name}`); saveDB(); renderMenu(); renderAdmin(); toast('Food image updated'); };
      reader.onerror = () => toast('Could not read the selected image.');
      reader.readAsDataURL(file);
    };
    input.click(); return;
  }
  const stallToggle = target.closest('[data-stall-toggle]');
  if (stallToggle && isAdmin) {
    const stall = db.stalls.find(item => item.id === Number(stallToggle.dataset.stallToggle));
    if (stall) { stall.status = stall.status === 'Open' ? 'Paused' : 'Open'; logAction(`${stall.status === 'Open' ? 'Reopened' : 'Paused'} stall: ${stall.name}`); saveDB(); renderAdmin(); }
    return;
  }
  const editStall = target.closest('[data-edit-stall]');
  if (editStall && isAdmin) {
    const stall = db.stalls.find(item => item.id === Number(editStall.dataset.editStall));
    if (!stall) return;
    const location = prompt('Campus location:', stall.location); if (location === null) return;
    const hours = prompt('Opening hours:', stall.hours); if (hours === null) return;
    const manager = prompt('Assigned stall manager:', stall.manager || 'Unassigned'); if (manager === null) return;
    if (!location.trim() || !hours.trim() || !manager.trim()) { toast('Location, opening hours and manager are required.'); return; }
    stall.location = location.trim(); stall.hours = hours.trim(); stall.manager = manager.trim();
    logAction(`Updated stall details: ${stall.name}`); saveDB(); renderAdmin(); return;
  }
  const deleteStall = target.closest('[data-delete-stall]');
  if (deleteStall && isAdmin && confirm('Remove this stall from the campus?')) {
    const stall = db.stalls.find(item => item.id === Number(deleteStall.dataset.deleteStall));
    db.stalls = db.stalls.filter(item => item.id !== Number(deleteStall.dataset.deleteStall));
    if (stall) logAction(`Removed stall: ${stall.name}`);
    saveDB(); renderAdmin(); return;
  }
  const personToggle = target.closest('[data-person-toggle]');
  if (personToggle && isAdmin) {
    const person = db.students.find(item => item.id === personToggle.dataset.personToggle);
    if (person) { person.status = person.status === 'Active' ? 'Suspended' : 'Active'; logAction(`${person.status === 'Active' ? 'Activated' : 'Suspended'} account: ${person.id}`); saveDB(); renderAdmin(); }
    return;
  }
  const personRole = target.closest('[data-person-role]');
  if (personRole && isAdmin) {
    const person = db.students.find(item => item.id === personRole.dataset.personRole);
    if (!person) return;
    const role = prompt('Set account role (Student, Stall staff, Stall manager, Admin):', person.role);
    if (role === null) return;
    const allowed = ['Student', 'Stall staff', 'Stall manager', 'Admin'];
    if (!allowed.includes(role.trim())) { toast('Choose Student, Stall staff, Stall manager, or Admin.'); return; }
    person.role = role.trim(); logAction(`Changed ${person.id} role to ${person.role}`); saveDB(); renderAdmin(); return;
  }
  const resetPerson = target.closest('[data-reset-person]');
  if (resetPerson && isAdmin && confirm('Reset this account’s bonus points to zero?')) {
    const id = resetPerson.dataset.resetPerson; db.points[id] = 0; logAction(`Reset bonus points for ${id}`); saveDB(); renderAdmin(); return;
  }
  const refund = target.closest('[data-refund]');
  if (refund && isAdmin) {
    const order = db.orders.find(item => item.id === refund.dataset.refund);
    if (order) { order.refundStatus = 'Refund recorded'; order.paymentStatus = `${order.paymentStatus} · refund recorded`; logAction(`Recorded refund for ${order.id} (${money(order.total)})`); saveDB(); renderAdmin(); toast('Refund recorded in the local demo ledger'); }
    return;
  }
  const announcement = target.closest('[data-announcement]');
  if (announcement && isAdmin) {
    const item = db.announcements.find(value => value.id === Number(announcement.dataset.announcement));
    if (item) { item.active = !item.active; logAction(`${item.active ? 'Published' : 'Hid'} announcement: ${item.title}`); saveDB(); renderAdmin(); }
    return;
  }
  const deleteAnnouncement = target.closest('[data-delete-announcement]');
  if (deleteAnnouncement && isAdmin && confirm('Delete this announcement?')) {
    const item = db.announcements.find(value => value.id === Number(deleteAnnouncement.dataset.deleteAnnouncement));
    db.announcements = db.announcements.filter(value => value.id !== Number(deleteAnnouncement.dataset.deleteAnnouncement));
    if (item) logAction(`Deleted announcement: ${item.title}`);
    saveDB(); renderAdmin(); return;
  }
  const mapPin = target.closest('[data-map-stall]');
  if (mapPin) {
    const stall = db.stalls.find(item => item.id === Number(mapPin.dataset.mapStall));
    const popup = mapPin.parentElement.querySelector('.map-popup');
    if (stall && popup) { popup.innerHTML = `<b>${esc(stall.name)}</b><span>${esc(stall.location)} · ${esc(stall.hours)}</span><span>${esc(stall.status)} · Manager: ${esc(stall.manager || 'Unassigned')}</span>`; popup.classList.remove('hidden'); }
    return;
  }
  if (target.closest('[data-export]') && isAdmin) { exportReport(); return; }
  if (target.closest('#cartBtn')) { $('cartDrawer').classList.remove('hidden'); $('shade').classList.remove('hidden'); renderCart(); return; }
  if (target.closest('#closeCart') || target === $('shade')) { $('cartDrawer').classList.add('hidden'); $('shade').classList.add('hidden'); return; }
  if (target.closest('#logoutAdmin')) {
    logAction('Admin signed out');
    saveDB();
    isAdmin = false;
    localStorage.removeItem(ADMIN_SESSION_KEY);
    if (window.location.hash === '#admin') window.top.location.href = 'index.html';
    else renderAdmin();
    return;
  }
  if (target.closest('#placeOrder')) { placeOrder(); return; }
  if (target.closest('#redeemInfo')) toast('At checkout, enter your student ID. Each 100 points gives ₹10 off.');
});
document.addEventListener('change', event => {
  const status = event.target.closest('[data-status]');
  if (status && isAdmin) {
    const order = db.orders.find(item => item.id === status.dataset.status);
    if (!order) return;
    updateOrderStatus(order, status.value);
  }
});
$('search').addEventListener('input', renderMenu);
$('checkoutStudent').addEventListener('input', renderCart);
$('paymentMethod').addEventListener('change', renderPaymentArea);
$('studentName').addEventListener('input', () => { renderOrders(); renderRewards(); });
$('adminLoginForm').addEventListener('submit', signInAdmin);
document.addEventListener('keydown', event => { if (event.key === 'Escape') { $('cartDrawer').classList.add('hidden'); $('shade').classList.add('hidden'); } });
window.addEventListener('storage', event => {
  if (event.key === STUDENT_SESSION_KEY) {
    const student = activeStudentSession();
    $('checkoutStudent').value = student?.id || '';
    $('studentName').value = student?.id || '';
    renderOrders(); renderRewards(); renderCart();
    return;
  }
  if (event.key !== KEY || !event.newValue) return;
  db = loadDB();
  renderCategories(); renderMenu(); renderCart(); renderOrders(); renderRewards();
  if (selectedView === 'map') renderMap('campusMap', 'mapLegend');
  if (selectedView === 'admin') renderAdmin();
});
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#map') showView('map');
  if (window.location.hash === '#admin') showView('admin');
});
if (localStorage.getItem(KEY) === null) saveDB();
const signedInStudent = activeStudentSession();
if (signedInStudent) {
  $('checkoutStudent').value = signedInStudent.id;
  $('studentName').value = signedInStudent.id;
}
const initialSearch = new URLSearchParams(window.location.search).get('search');
if (initialSearch) $('search').value = initialSearch;
renderCategories(); renderMenu(); renderCart();
if (window.location.hash === '#map') showView('map');
if (window.location.hash === '#admin') showView('admin');
