// Minimal, robust interactions: nav toggle, reveal on scroll, hero parallax, set year.
(() => {
  // set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => mainNav.classList.toggle('show'));
  }

  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, {threshold: 0.12});
    reveals.forEach(r => io.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('visible'));
  }

  // hero parallax (mouse) - only where .hero exists
  const hero = document.querySelector('.hero');
  if (hero) {
    const imgs = document.querySelectorAll('.hg');
    hero.addEventListener('mousemove', (ev) => {
      const rect = hero.getBoundingClientRect();
      const x = (ev.clientX - rect.left) / rect.width - 0.5;
      const y = (ev.clientY - rect.top) / rect.height - 0.5;
      imgs.forEach((img, i) => {
        const depth = (i - 1) * 14; // -14, 0, +14
        img.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      });
    });
    hero.addEventListener('mouseleave', () => {
      imgs.forEach((img) => img.style.transform = '');
    });
  }

  // smooth anchor scrolling for internal links (if any)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({behavior:'smooth'});
    });
  });
})();
