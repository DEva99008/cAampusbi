'use strict';

const DATA_KEY = 'campusbite_simple_v1';
const SESSION_KEY = 'campusbite_student_session';
const $ = id => document.getElementById(id);
const money = amount => '₹' + Number(amount || 0).toLocaleString('en-IN');
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Could not read ${key}:`, error);
    $('studentPortalError').textContent = 'Your saved CampusBite data could not be read. Check browser storage settings.';
    $('studentPortalError').classList.remove('hidden');
    return fallback;
  }
}

function startPortal() {
  const session = readJSON(SESSION_KEY, null);
  if (!session?.id) {
    window.location.replace('student-login.html');
    return;
  }
  const database = readJSON(DATA_KEY, {});
  const account = (Array.isArray(database.students) ? database.students : []).find(student =>
    String(student.id).toLowerCase() === String(session.id).toLowerCase() && student.role === 'Student'
  );
  if (!account || account.status !== 'Active') {
    localStorage.removeItem(SESSION_KEY);
    window.location.replace('student-login.html');
    return;
  }

  $('studentDisplayName').textContent = account.name;
  $('studentPoints').textContent = Number(database.points?.[account.id.toLowerCase()] || 0);
  const orders = (Array.isArray(database.orders) ? database.orders : [])
    .filter(order => String(order.studentId).toLowerCase() === account.id.toLowerCase())
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  $('studentOrderCount').textContent = orders.length;
  const openCanteens = (Array.isArray(database.stalls) ? database.stalls : []).filter(stall =>
    stall.status === 'Open' && /canteen/i.test(stall.name)
  ).length;
  $('openCanteenCount').textContent = openCanteens;

  const announcement = (Array.isArray(database.announcements) ? database.announcements : []).find(item => item.active);
  $('studentAnnouncement').innerHTML = announcement
    ? `<article class="student-notice"><span>✦</span><div><b>${esc(announcement.title)}</b><p>${esc(announcement.message)}</p></div></article>`
    : '<p class="muted-copy">No new campus updates right now. Check back before your next break.</p>';

  $('studentOrders').innerHTML = orders.length
    ? orders.slice(0, 6).map(order => {
      const stall = (database.stalls || []).find(item => item.id === order.stallId);
      return `<article class="student-order-row"><div class="student-order-id"><b>${esc(order.id)}</b><small>${new Date(order.createdAt).toLocaleString()}</small></div><div class="student-order-details"><span>${order.items.map(item => `${esc(item.name)} × ${item.qty}`).join(', ')}</span><small>${esc(stall?.name || 'KPRCAS canteen')} · ${esc(order.paymentStatus)}</small></div><span class="badge">${esc(order.status)}</span><strong>${money(order.total)}</strong></article>`;
    }).join('')
    : '<div class="empty-state">No orders yet. Browse the menu and order from the New Canteen or Old Canteen.</div>';
}

$('studentSignOut').addEventListener('click', () => {
  localStorage.removeItem(SESSION_KEY);
  window.location.replace('index.html');
});
window.addEventListener('storage', event => {
  if (event.key === DATA_KEY || event.key === SESSION_KEY) startPortal();
});
startPortal();
