/* =============================================
   MGI — Hi-Tech Interactive Layer
   ============================================= */
(function () {
  'use strict';

  /* ── HERO CANVAS — Geometric network ──────── */
  var canvas = document.getElementById('hero-canvas');
  if (canvas && !window.matchMedia('(max-width: 960px)').matches) {
    var ctx   = canvas.getContext('2d');
    var nodes = [];
    var N     = 28;
    var DIST  = 200;
    var raf;

    function resizeCanvas() {
      canvas.width  = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    function initNodes() {
      nodes = [];
      for (var i = 0; i < N; i++) {
        nodes.push({
          x:  30 + Math.random() * (canvas.width  - 60),
          y:  30 + Math.random() * (canvas.height - 60),
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.48
        });
      }
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Lines only — no dots, no glow */
      ctx.lineWidth = 1.4;
      for (var i = 0; i < N; i++) {
        for (var j = i + 1; j < N; j++) {
          var dx   = nodes[j].x - nodes[i].x;
          var dy   = nodes[j].y - nodes[i].y;
          var d    = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            ctx.globalAlpha = (1 - d / DIST) * 0.95;
            ctx.strokeStyle = '#e0285a';
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      /* Move — bounce softly off edges */
      for (var i = 0; i < N; i++) {
        var n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0)              { n.x = 0;              n.vx *= -1; }
        if (n.x > canvas.width)   { n.x = canvas.width;   n.vx *= -1; }
        if (n.y < 0)              { n.y = 0;              n.vy *= -1; }
        if (n.y > canvas.height)  { n.y = canvas.height;  n.vy *= -1; }
      }

      raf = requestAnimationFrame(tick);
    }

    resizeCanvas();
    initNodes();

    window.addEventListener('resize', function () {
      cancelAnimationFrame(raf);
      resizeCanvas();
      initNodes();
      tick();
    }, { passive: true });

    tick();
  }

  /* ── NAV SCROLL ────────────────────────────── */
  var nav = document.getElementById('main-nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 44);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── HAMBURGER MENU ────────────────────────── */
  var burger = document.querySelector('.nav-hamburger');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── STAT COUNTER ANIMATION ────────────────── */
  function initCounters() {
    var els = document.querySelectorAll('.stat-num[data-target], .metric-num[data-target]');
    if (!els.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        var el      = entry.target;
        var target  = parseInt(el.dataset.target, 10);
        var dur     = 1700;
        var t0      = performance.now();

        function fmt(n) {
          return Math.round(n).toLocaleString('en-US');
        }

        function step(now) {
          var progress = Math.min((now - t0) / dur, 1);
          var eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = fmt(target * eased);
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });

    els.forEach(function (el) { obs.observe(el); });
  }

  /* ── SCROLL REVEAL ─────────────────────────── */
  function initReveals() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { obs.observe(el); });
  }

  /* ── HERO IMAGE PARALLAX ───────────────────── */
  var heroImg = document.querySelector('.hero-image img');
  if (heroImg) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          heroImg.style.transform = 'scale(1.08) translateY(' + (window.scrollY * 0.16) + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── INIT ──────────────────────────────────── */
  function init() {
    initCounters();
    initReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
