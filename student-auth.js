'use strict';

const DATA_KEY = 'campusbite_simple_v1';
const SESSION_KEY = 'campusbite_student_session';
const ADMIN_SESSION_KEY = 'campusbite_admin_session';
const form = document.getElementById('studentLoginForm');
const errorMessage = document.getElementById('studentLoginError');
const phoneMode = document.getElementById('studentPhoneMode');
let loginMode = 'studentId';
const demoPhoneByStudent = new Map([
  ['cb1024', '9000001024'],
  ['cb2088', '9000002088'],
  ['cb3041', '9000003041']
]);

function setLoginMode(mode) {
  loginMode = mode;
  const usingPhone = mode === 'phone';
  document.getElementById('studentIdMode').classList.toggle('active', !usingPhone);
  document.getElementById('studentPhoneMode').classList.toggle('active', usingPhone);
  document.getElementById('studentIdMode').setAttribute('aria-pressed', String(!usingPhone));
  phoneMode.setAttribute('aria-pressed', String(usingPhone));
  document.getElementById('loginIdentityLabel').textContent = usingPhone ? 'Demo mobile number' : 'Student ID';
  document.getElementById('studentId').placeholder = usingPhone ? 'e.g. 9000001024' : 'e.g. cb1024';
  document.getElementById('studentId').type = usingPhone ? 'tel' : 'text';
  document.getElementById('studentId').inputMode = usingPhone ? 'tel' : 'text';
  document.getElementById('loginSecretLabel').textContent = usingPhone ? 'Demo verification code' : 'Campus PIN';
  document.getElementById('studentPin').placeholder = usingPhone ? 'Enter the demo code' : 'Enter your campus PIN';
  document.getElementById('studentPin').autocomplete = usingPhone ? 'one-time-code' : 'current-password';
  document.getElementById('loginModeHelp').textContent = usingPhone
    ? 'Demo only: enter a sample number and code 1234. No SMS is sent.'
    : 'Use your student ID and campus PIN to sign in.';
  document.getElementById('loginSubmitLabel').textContent = usingPhone ? 'Continue with demo mobile' : 'Sign in to student portal';
  errorMessage.textContent = '';
}

document.getElementById('studentIdMode').addEventListener('click', () => setLoginMode('studentId'));
phoneMode.addEventListener('click', () => setLoginMode('phone'));

function seedDemoData() {
  const now = Date.now();
  return {
    students: [
      { id: 'cb1024', name: 'Aarav Menon', role: 'Student', status: 'Active', joined: '2025-08-12' },
      { id: 'cb2088', name: 'Diya Sharma', role: 'Student', status: 'Active', joined: '2025-09-03' },
      { id: 'cb3041', name: 'Kabir Rao', role: 'Student', status: 'Active', joined: '2025-10-19' },
      { id: 'staff01', name: 'Meera Nair', role: 'Stall manager', status: 'Active', joined: '2025-07-01' }
    ],
    points: { cb1024: 12, cb2088: 0 },
    orders: [
      { id: 'CB1001', studentId: 'cb1024', stallId: 1, items: [{ id: 1, name: 'Masala Dosa', price: 65, qty: 1 }, { id: 6, name: 'Cold Coffee', price: 55, qty: 1 }], subtotal: 120, bonusDiscount: 0, total: 120, paymentMethod: 'upi', paymentStatus: 'Verified', status: 'Preparing', createdAt: new Date(now - 12 * 60000).toISOString(), bonusAwarded: false },
      { id: 'CB1002', studentId: 'cb2088', stallId: 2, items: [{ id: 2, name: 'Paneer Wrap', price: 90, qty: 1 }], subtotal: 90, bonusDiscount: 0, total: 90, paymentMethod: 'cash', paymentStatus: 'Pending on pickup', status: 'Ready for pickup', createdAt: new Date(now - 27 * 60000).toISOString(), bonusAwarded: false },
      { id: 'CB1003', studentId: 'cb1024', stallId: 1, items: [{ id: 5, name: 'Samosa Pair', price: 35, qty: 2 }], subtotal: 70, bonusDiscount: 0, total: 70, paymentMethod: 'upi', paymentStatus: 'Verified', status: 'Completed', createdAt: new Date(now - 86400000).toISOString(), bonusAwarded: true }
    ],
    stalls: [
      { id: 1, name: 'New Canteen', location: 'KPRCAS campus', manager: 'Meera Nair', hours: '08:00–20:00', status: 'Open' },
      { id: 2, name: 'Old Canteen', location: 'KPRCAS campus', manager: 'Unassigned', hours: '08:00–18:00', status: 'Open' }
    ],
    announcements: [{ id: 1, title: 'Welcome to CampusBite', message: 'Order ahead and collect from your favourite campus stall.', active: true, createdAt: new Date(now).toISOString() }]
  };
}

form.addEventListener('submit', event => {
  event.preventDefault();
  errorMessage.textContent = '';
  let database;
  try {
    const saved = localStorage.getItem(DATA_KEY);
    database = saved ? JSON.parse(saved) : seedDemoData();
    if (!saved) localStorage.setItem(DATA_KEY, JSON.stringify(database));
  } catch (error) {
    console.error('Could not read CampusBite student accounts:', error);
    errorMessage.textContent = 'Student account data could not be read in this browser.';
    return;
  }

  const identity = document.getElementById('studentId').value.trim();
  const pin = document.getElementById('studentPin').value.trim();
  const id = loginMode === 'phone'
    ? [...demoPhoneByStudent.entries()].find(([, mobile]) => mobile === identity.replace(/\D/g, ''))?.[0]
    : identity.toLowerCase();
  const student = (Array.isArray(database.students) ? database.students : []).find(account =>
    String(account.id).toLowerCase() === id && account.role === 'Student'
  );
  if (!student || student.status !== 'Active') {
    errorMessage.textContent = loginMode === 'phone'
      ? 'No active demo account is linked to this sample number.'
      : 'We could not find an active student account with that ID.';
    return;
  }
  if (pin !== '1234') {
    errorMessage.textContent = loginMode === 'phone'
      ? 'Incorrect demo verification code. Use 1234 for local demo accounts.'
      : 'Incorrect demo PIN. Use 1234 for local demo accounts.';
    return;
  }
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: student.id, signedInAt: new Date().toISOString() }));
    localStorage.removeItem(ADMIN_SESSION_KEY);
    window.location.href = 'student.html';
  } catch (error) {
    console.error('Could not save the CampusBite student session:', error);
    errorMessage.textContent = 'Sign-in could not be saved. Check browser storage settings.';
  }
});
