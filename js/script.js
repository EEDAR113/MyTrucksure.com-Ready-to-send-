// ═══════════════ MULTI-PAGE SCRIPT ═══════════════
// Simplified: No more SPA page-switching. Each page is its own HTML file.

// ── Smooth scroll to section (for same-page anchor links) ──
function smoothScrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    const navH = 72;
    const rect = el.getBoundingClientRect();
    const elTop = rect.top + window.scrollY - navH - 20;
    smoothScrollTo(elTop, 800);
  }
}

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

// ── Handle hash-based section scrolling on page load ──
// e.g. partners.html#integrations will scroll to #integrations
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (hash) {
    // Small delay to let page render
    setTimeout(() => {
      smoothScrollToSection(hash.substring(1));
    }, 200);
  }
});

// ── Hamburger toggle ──
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

// ── Scroll-triggered reveals ──
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

// ── Navbar scroll effect + hero background fade ──
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Hero background fade-out on scroll (only on home page)
  const heroBg = document.getElementById('heroBg');
  const heroSection = document.getElementById('hero-section');
  if (heroBg && heroSection) {
    const heroH = heroSection.offsetHeight;
    const scrollY = window.scrollY;
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

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  observeReveals();

  // Set active nav link based on current page
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && path.endsWith(href.replace(/^\.\.\//, '').replace(/^\.\//, ''))) {
      link.classList.add('active');
    }
  });

  // Home page special case
  if (path.endsWith('index.html') || path.endsWith('/') || path === '') {
    const homeLink = document.querySelector('.nav-link[href*="index.html"]');
    if (homeLink) homeLink.classList.add('active');
  }

  // Events sub-pages: highlight Events nav link
  if (path.includes('/events/')) {
    const eventsLink = document.querySelector('.nav-link[data-page="events"]');
    if (eventsLink) eventsLink.classList.add('active');
  }
});

// ── Benefits carousel is handled by inline script in index.html ──
// (self-contained: auto-rotate, drag/swipe, arrows, dots)

// ═══════════════ SITE SEARCH (NAV BAR) ═══════════════
// Handles the search icon in the navbar on all pages.
// Clicking the icon expands a small input; pressing Enter navigates to search.html?q=...

function initNavSearch() {
  var btn = document.getElementById('navSearchBtn');
  var form = document.getElementById('navSearchForm');
  var input = document.getElementById('navSearchInput');
  if (!btn || !form || !input) return;

  btn.addEventListener('click', function(e) {
    e.preventDefault();
    if (form.classList.contains('expanded')) {
      // Submit if there's a query
      submitNavSearch(input);
    } else {
      form.classList.add('expanded');
      input.focus();
    }
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitNavSearch(input);
    }
    if (e.key === 'Escape') {
      form.classList.remove('expanded');
      input.value = '';
    }
  });

  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (form.classList.contains('expanded') && !form.contains(e.target)) {
      if (!input.value.trim()) {
        form.classList.remove('expanded');
      }
    }
  });
}

function submitNavSearch(input) {
  var q = input.value.trim();
  if (!q) return;
  // Determine the correct path to search.html based on current page depth
  var path = window.location.pathname;
  var searchUrl;
  if (path.indexOf('/pages/events/') !== -1) {
    // We're in pages/events/ — go up 2 levels
    searchUrl = '../search.html?q=' + encodeURIComponent(q);
  } else if (path.indexOf('/pages/') !== -1) {
    // We're in pages/ — same directory
    searchUrl = 'search.html?q=' + encodeURIComponent(q);
  } else {
    // We're at root (index.html)
    searchUrl = 'pages/search.html?q=' + encodeURIComponent(q);
  }
  window.location.href = searchUrl;
}

document.addEventListener('DOMContentLoaded', initNavSearch);
