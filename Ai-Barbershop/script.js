/* ═══════════════════════════════════════
   NOIR & GOLD — SCRIPT.JS
   ═══════════════════════════════════════ */

/* ── NAVBAR: scroll behaviour ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── BURGER MENU ── */
const burger    = document.getElementById('burger');
const navLinks  = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(
  '.section-header, .service-card, .contact-card, .about-visual, .about-text, .booking-form'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), Number(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── BOOKING FORM ── */
const bookingForm   = document.getElementById('booking-form');
const formSuccess   = document.getElementById('form-success');
const submitBtn     = bookingForm.querySelector('.submit-btn');

// Set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Basic validation
  const fields = bookingForm.querySelectorAll('[required]');
  let valid = true;

  fields.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#e05c5c';
      valid = false;
    }
  });

  if (!valid) {
    shakeForm();
    return;
  }

  // Simulate submission
  submitBtn.innerHTML = '<span>Sending…</span><i class="fa-solid fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.innerHTML = '<span>Confirm Booking</span><i class="fa-solid fa-check"></i>';
    submitBtn.disabled = false;
    formSuccess.classList.add('show');
    bookingForm.reset();

    setTimeout(() => formSuccess.classList.remove('show'), 6000);
  }, 1800);
});

function shakeForm() {
  bookingForm.style.animation = 'none';
  bookingForm.offsetHeight; // reflow
  bookingForm.style.animation = 'shake 0.4s ease';
}

// Inject shake keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
`;
document.head.appendChild(style);

/* ── SMOOTH ACTIVE NAV HIGHLIGHT on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navItems.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
  });
}, { passive: true });