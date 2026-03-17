// Event data for detail pages
const eventOrder = ['itc-vegas', 'insurtech-chicago', 'mcief', 'insurtech-ny', 'atd-show'];

// Navigation — smooth scrolling from current position
function navigateTo(page, section) {
  const currentPage = document.querySelector('.page.active');
  const targetPageId = 'page-' + page;
  const isSamePage = currentPage && currentPage.id === targetPageId;

  if (!isSamePage) {
    // Switching pages: hide all, show target
    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('active');
      p.style.display = 'none';
    });

    const targetPage = document.getElementById(targetPageId);
    if (targetPage) {
      targetPage.style.display = 'block';
      targetPage.classList.add('active');
    }

    if (section) {
      // Going to a new page + section: jump to top instantly, then smooth scroll to section
      window.scrollTo(0, 0);
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          const navH = 72;
          const rect = el.getBoundingClientRect();
          const elTop = rect.top + window.scrollY - navH - 20;
          smoothScrollTo(elTop, 800);
        }
      }, 100);
    } else {
      // Going to a new page without section: just go to top
      window.scrollTo(0, 0);
    }
  } else {
    // Same page: smooth scroll from current position to the section
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        const navH = 72;
        const rect = el.getBoundingClientRect();
        const elTop = rect.top + window.scrollY - navH - 20;
        smoothScrollTo(elTop, 800);
      }
    }
  }

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector('[data-page="' + page + '"]');
  if (activeLink) activeLink.classList.add('active');

  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');

  // Re-observe reveals after page switch
  setTimeout(observeReveals, 200);
}

// Custom smooth scroll with easing (slower, more elegant)
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + diff * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Show event detail page (within same SPA)
function showEventDetail(eventId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });

  const detailPage = document.getElementById('page-event-' + eventId);
  if (detailPage) {
    detailPage.style.display = 'block';
    detailPage.classList.add('active');
  }

  // Update nav
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const eventsLink = document.querySelector('[data-page="events"]');
  if (eventsLink) eventsLink.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hamburger toggle
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

// Scroll-triggered reveals
function observeReveals() {
  const reveals = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}

// Navbar scroll effect + hero background fade
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Hero background fade-out on scroll
  const heroBg = document.getElementById('heroBg');
  const heroSection = document.getElementById('hero-section');
  if (heroBg && heroSection) {
    const heroH = heroSection.offsetHeight;
    const scrollY = window.scrollY;
    // Start fading at 20% scroll, fully faded at 80%
    const fadeStart = heroH * 0.15;
    const fadeEnd = heroH * 0.7;
    if (scrollY <= fadeStart) {
      heroBg.style.opacity = '1';
    } else if (scrollY >= fadeEnd) {
      heroBg.style.opacity = '0';
    } else {
      const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
      heroBg.style.opacity = String(1 - progress);
    }
  }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  observeReveals();
  // Ensure only the active page is visible
  document.querySelectorAll('.page').forEach(p => {
    if (!p.classList.contains('active')) {
      p.style.display = 'none';
    }
  });
});

// Benefits carousel
let currentSlide = 0;
function carouselGo(n) {
  const slides = document.querySelectorAll('.benefits-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function carouselNav(direction) {
  const slides = document.querySelectorAll('.benefits-slide');
  if (!slides.length) return;
  let next = currentSlide + direction;
  if (next < 0) next = slides.length - 1;
  if (next >= slides.length) next = 0;
  carouselGo(next);
}
