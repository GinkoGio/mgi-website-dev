/* ===========================
   MGI — Fancy Enhancement JS
   Drop this at end of <body>, after animations.js
   =========================== */

(function () {
  'use strict';

  /* ── 1. NAV DARK-ON-SCROLL ──────────────────────── */
  var nav = document.querySelector('nav');
  function updateNav() {
    if (!nav) return;
    nav.classList.toggle('nav--dark', window.scrollY > 48);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── 2. PARALLAX ON HERO IMAGE ──────────────────── */
  var heroImg = document.querySelector('.hero-image img');
  function updateParallax() {
    if (!heroImg) return;
    var scrollY = window.scrollY;
    var shift = scrollY * 0.22;
    heroImg.style.transform = 'scale(1.12) translateY(' + shift + 'px)';
  }
  window.addEventListener('scroll', updateParallax, { passive: true });

  /* ── 3. INJECT DECORATIVE DIAMONDS ─────────────── */
  function injectDeco() {
    var heroImage   = document.querySelector('.hero-image');
    var heroContent = document.querySelector('.hero-content');

    if (heroImage) {
      var main = document.createElement('div');
      main.className = 'hero-deco hero-deco--main';
      heroImage.appendChild(main);
    }

    if (heroContent) {
      var sm = document.createElement('div');
      sm.className = 'hero-deco hero-deco--sm';
      heroContent.appendChild(sm);

      var line = document.createElement('div');
      line.className = 'hero-deco hero-deco--line';
      heroContent.appendChild(line);
    }
  }

  /* ── 4. GRADIENT FIRST WORD OF HERO TITLE ───────── */
  function wrapFirstWord() {
    var title = document.querySelector('.hero-title');
    if (!title) return;
    // wrap only the very first text node word
    var html = title.innerHTML;
    // Replace first word with gradient span, preserve <br>
    title.innerHTML = html.replace(/^(\S+)/, '<span class="gradient-word">$1</span>');
  }

  /* ── 5. STAT COUNTER ANIMATION ───────────────────── */
  function animateCounters() {
    var stats = document.querySelectorAll('.stat-num');
    if (!stats.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        var raw   = el.textContent.trim();
        // extract numeric part and suffix
        var match = raw.match(/^([\d,\.]+)(.*)$/);
        if (!match) return;
        var numStr  = match[1].replace(/,/g, '');
        var suffix  = match[2];
        var target  = parseFloat(numStr);
        var isFloat = numStr.indexOf('.') !== -1;
        var decimals = isFloat ? (numStr.split('.')[1] || '').length : 0;
        var hasComa = match[1].indexOf(',') !== -1;
        var duration = 1400;
        var start = performance.now();

        function format(val) {
          var fixed = isFloat ? val.toFixed(decimals) : Math.round(val).toString();
          if (hasComa) {
            // insert comma thousands separators
            fixed = fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
          return fixed + suffix;
        }

        function step(now) {
          var elapsed  = now - start;
          var progress = Math.min(elapsed / duration, 1);
          // ease out cubic
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = format(target * eased);
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });

    stats.forEach(function (el) { observer.observe(el); });
  }

  /* ── INIT ────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    injectDeco();
    wrapFirstWord();
    animateCounters();
  }

})();
