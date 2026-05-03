(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      if (el.dataset.animDelay) el.style.animationDelay = el.dataset.animDelay;
      el.classList.add('is-visible');
      observer.unobserve(el);
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  });

  function reveal(el, cls, delay) {
    el.classList.add(cls);
    if (delay) el.dataset.animDelay = delay;
    observer.observe(el);
  }

  /* Stagger siblings by parent container */
  function revealGroup(selector, cls, stepMs) {
    var groups = new Map();
    document.querySelectorAll(selector).forEach(function (el) {
      var key = el.parentElement;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(el);
    });
    groups.forEach(function (items) {
      items.forEach(function (el, i) {
        reveal(el, cls, stepMs ? (i * stepMs / 1000) + 's' : null);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* Section-level content: only direct .container children so we never
       double-animate elements that are nested inside .two-col columns */
    ['.section-white', '.section-off', '.section-dark'].forEach(function (s) {
      document.querySelectorAll(s + ' .container > .section-eyebrow').forEach(function (el) {
        reveal(el, 'anim-fade-in', null);
      });
      document.querySelectorAll(s + ' .container > .section-title').forEach(function (el) {
        reveal(el, 'anim-fade-up', null);
      });
      document.querySelectorAll(s + ' .container > .lead').forEach(function (el) {
        reveal(el, 'anim-fade-up', null);
      });
      document.querySelectorAll(s + ' .container > .highlight-box').forEach(function (el) {
        reveal(el, 'anim-fade-up', null);
      });
      document.querySelectorAll(s + ' .container > .btn-actions').forEach(function (el) {
        reveal(el, 'anim-fade-up', null);
      });
    });

    /* Pull quote */
    document.querySelectorAll('.pull-quote').forEach(function (el) {
      reveal(el, 'anim-fade-up', null);
    });

    /* Two-column layout children: animate each column with a slight stagger.
       Skip columns that host their own staggered card groups to avoid double-animate. */
    document.querySelectorAll('.two-col').forEach(function (col) {
      Array.from(col.children).forEach(function (child, i) {
        if (child.querySelector('.contact-card, .sector-card, .value-card')) return;
        reveal(child, 'anim-fade-up', i > 0 ? '0.15s' : null);
      });
    });

    /* Card / grid groups — staggered by parent */
    revealGroup('.sector-card',   'anim-scale-up', 100);
    revealGroup('.value-card',    'anim-scale-up', 100);
    revealGroup('.portfolio-col', 'anim-fade-up',  120);
    revealGroup('.contact-card',  'anim-fade-up',  100);
    revealGroup('.photo-cell',    'anim-scale-up',  70);
    revealGroup('.step',          'anim-fade-up',  100);

    /* Contact form */
    document.querySelectorAll('.contact-form-wrap').forEach(function (el) {
      reveal(el, 'anim-fade-up', null);
    });

    /* Footer */
    document.querySelectorAll('.footer-brand').forEach(function (el) {
      reveal(el, 'anim-fade-in', null);
    });
    revealGroup('.footer-col', 'anim-fade-up', 80);

    /* Hamburger menu */
    var hamburger = document.querySelector('.nav-hamburger');
    var mainNav   = document.querySelector('nav');
    if (hamburger && mainNav) {
      hamburger.addEventListener('click', function () {
        var isOpen = mainNav.classList.toggle('nav-open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
      });
      mainNav.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
          mainNav.classList.remove('nav-open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }

  });
})();
