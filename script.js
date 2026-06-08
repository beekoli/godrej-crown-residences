/* ==========================================
   CRC THE PERIDONA - JavaScript
   Mobile & Google Ads Optimized
   ========================================== */

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- MOBILE MENU ----
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const ham = document.getElementById('hamburger');
  links.classList.toggle('open');
  ham.classList.toggle('active');
  document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
}

function closeMenu() {
  const links = document.getElementById('navLinks');
  const ham = document.getElementById('hamburger');
  links.classList.remove('open');
  ham.classList.remove('active');
  document.body.style.overflow = '';
}

// Hamburger animation
document.getElementById('hamburger').addEventListener('click', function() {
  const spans = this.querySelectorAll('span');
  if (this.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// ---- MODAL FUNCTIONALITY ----
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');

function openModal(title = 'Enquire Now') {
  modalTitle.textContent = title;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Google Ads conversion trigger (add your conversion ID)
  // gtag('event', 'conversion', { 'send_to': 'AW-XXXXXXX/XXXXXXXX' });

  // Track which button triggered modal (for analytics)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'open_lead_form', {
      'event_category': 'engagement',
      'event_label': title
    });
  }
}

function closeModal(event) {
  if (!event || event.target === modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeThankyou();
  }
});

// ---- FORM SUBMISSIONS ----
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Submitting...';
  btn.disabled = true;

  // Simulate API call – replace with your actual form submission endpoint
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Enquiry – Get Best Price';
    btn.disabled = false;
    showThankyou();

    // Google Ads conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', { 'send_to': 'AW-XXXXXXX/XXXXXXXX' });
      gtag('event', 'generate_lead', { 'event_category': 'form', 'event_label': 'main_form' });
    }
  }, 1200);
}

function handleModalSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Submitting...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Get Best Price Now';
    btn.disabled = false;
    closeModal();
    showThankyou();

    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', { 'send_to': 'AW-XXXXXXX/XXXXXXXX' });
      gtag('event', 'generate_lead', { 'event_category': 'form', 'event_label': 'modal_form' });
    }
  }, 1200);
}

function showThankyou() {
  const overlay = document.getElementById('thankyouOverlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeThankyou() {
  const overlay = document.getElementById('thankyouOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ---- VIDEO LAZY LOAD ----
function loadVideo() {
  const thumb = document.getElementById('video-thumb');
  const frame = document.getElementById('video-frame');

  // Replace YOUTUBE_VIDEO_ID with the actual YouTube video ID
  // Example: if URL is https://www.youtube.com/watch?v=abcd1234 → use abcd1234
  const videoId = 'YOUR_YOUTUBE_VIDEO_ID';

  frame.innerHTML = `<iframe
    src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
    title="CRC The Peridona Video Review"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy">
  </iframe>`;

  thumb.style.display = 'none';
  frame.style.display = 'block';

  if (typeof gtag !== 'undefined') {
    gtag('event', 'play_video', { 'event_category': 'engagement' });
  }
}

// ---- SCROLL ANIMATIONS ----
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Add animation to key sections
document.addEventListener('DOMContentLoaded', () => {
  const animatables = [
    '.usp-card',
    '.stat-item',
    '.amenity-card',
    '.plan-card',
    '.gallery-item',
    '.location-item',
    '.highlight-item',
    '.overview-text',
    '.overview-image'
  ];

  animatables.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.setAttribute('data-animate', '');
      el.style.transitionDelay = `${i * 0.08}s`;
      animateObserver.observe(el);
    });
  });

  // Floating CTA show after scroll
  const floatingCta = document.getElementById('floatingCta');
  floatingCta.style.transform = 'translateY(100%)';
  floatingCta.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      floatingCta.style.transform = 'translateY(0)';
    }
  }, { passive: true });
});

// ---- PHONE NUMBER TRACKING FOR GOOGLE ADS ----
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'phone_call', {
        'event_category': 'contact',
        'event_label': link.href
      });
    }
  });
});

// ---- WHATSAPP TRACKING ----
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'whatsapp_click', {
        'event_category': 'contact',
        'event_label': 'whatsapp'
      });
    }
  });
});

// ---- SMOOTH SCROLL OFFSET FOR FIXED HEADER ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- STICKY CTA BODY PADDING (prevents content hidden under floating bar) ----
document.body.style.paddingBottom = '56px';
