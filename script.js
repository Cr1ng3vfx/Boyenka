
/* ==========================================================================
   SECTION 10 — INTERACTION LAYER
   Header state, mobile menu, marquee, WhatsApp links, reveal-on-scroll,
   FAQ accordion, drill-ring draw-in.
   ========================================================================== */
(function(){
  // --- WhatsApp links: single source of truth ---
  const waNumber = getComputedStyle(document.documentElement).getPropertyValue('--wa-number').trim();
  const waMsg = encodeURIComponent("Hi Boyenka 24/7 Ent, I'd like to enquire about your drilling services.");
  const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;
  ['waHero','waHeroBtn','waCtaBtn','waFloat','waFooterLink'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.href = waUrl;
  });

  // --- header scroll state ---
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });

  // --- mobile menu ---
  const burger = document.getElementById('burgerBtn');
  const mmenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => mmenu.classList.toggle('open'));
  mmenu.querySelectorAll('.mm-link').forEach(a => a.addEventListener('click', () => mmenu.classList.remove('open')));

  // --- reveal on scroll ---
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
  document.querySelectorAll('.reveal, .reveal-scale').forEach(el=>io.observe(el));

  // --- hero + rings entrance ---
  const hero = document.getElementById('heroSection');
  const rings = document.getElementById('heroRings');
  requestAnimationFrame(()=>{
    setTimeout(()=>{ hero.classList.add('in'); rings.classList.add('in'); }, 120);
  });

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    const setHeight = () => { a.style.maxHeight = item.classList.contains('open') ? a.scrollHeight + 'px' : '0px'; };
    setHeight();
    q.addEventListener('click', ()=>{
      const willOpen = !item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>{
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = '0px';
      });
      if(willOpen){ item.classList.add('open'); setHeight(); }
    });
    window.addEventListener('resize', ()=>{ if(item.classList.contains('open')) setHeight(); });
  });
})();

const HOMEPAGE_URL = 'Boyenka.html';

// Logo / Home link → go to homepage
const logoLink = document.querySelector('.logoLink');
if (logoLink) {
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = HOMEPAGE_URL;
  });
}

// After a successful login/register, send them back to the homepage
const loginForm = document.querySelector('.form-box.login form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: call your real login API here — redirect only on success
    window.location.href = HOMEPAGE_URL;
  });
}
