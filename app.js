/* ============================================
   YASH PATIL — PORTFOLIO  |  script.js
   ============================================ */

// ── Navbar glass on scroll ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('glassy', scrollY > 30);
}, { passive: true });

// ── Hamburger toggle ──
const burger = document.getElementById('burger');
const mnav   = document.getElementById('mnav');
burger.addEventListener('click', () => {
  burger.classList.toggle('on');
  mnav.classList.toggle('open');
});
mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('on');
  mnav.classList.remove('open');
}));

// ── Typewriter ──
const tw    = document.getElementById('tw');
const WORDS = ['AI agents.', 'ML models.', 'RAG pipelines.', 'data products.', 'AI-powered apps.'];
let wi = 0, ci = 0, deleting = false, frozen = false;

function typeLoop() {
  if (frozen) return;
  const w = WORDS[wi];
  if (!deleting) {
    ci++;
    tw.textContent = w.slice(0, ci);
    if (ci === w.length) {
      frozen = true;
      setTimeout(() => { deleting = true; frozen = false; }, 1800);
    }
  } else {
    ci--;
    tw.textContent = w.slice(0, ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % WORDS.length; }
  }
  setTimeout(typeLoop, deleting ? 50 : 95);
}

// ── GSAP Entrance Sequence ──
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({ delay: 0.1 });

tl
  // Badge + intro
  .fromTo('.avail',  { opacity:0, y:14 }, { opacity:1, y:0, duration:.5,  ease:'power2.out' })
  .fromTo('.hintro', { opacity:0, y:12 }, { opacity:1, y:0, duration:.45, ease:'power2.out' }, '-=.2')
  // Name — the hero moment
  .fromTo('.nfirst', { opacity:0, y:52 }, { opacity:1, y:0, duration:.75, ease:'power3.out' }, '-=.15')
  .fromTo('.nlast',  { opacity:0, y:52 }, { opacity:1, y:0, duration:.75, ease:'power3.out' }, '-=.52')
  // Role, about, CTAs
  .fromTo('.hrole',  { opacity:0, y:10 }, { opacity:1, y:0, duration:.45, ease:'power2.out' }, '-=.3')
  .fromTo('.habout', { opacity:0, y:10 }, { opacity:1, y:0, duration:.5,  ease:'power2.out' }, '-=.25')
  .fromTo('.hctas',  { opacity:0, y:10 }, { opacity:1, y:0, duration:.45, ease:'power2.out' }, '-=.25')
  // Orb scales in with elastic ease
  .fromTo('#orb',    { opacity:0, scale:.45 }, { opacity:1, scale:1, duration:1.1, ease:'elastic.out(0.65,.5)' }, .25)
  // Rings expand in
  .fromTo('.oring',  { opacity:0, scale:.75 }, { opacity:1, scale:1, duration:.7, stagger:.12, ease:'power2.out' }, '-=.55')
  // Icons fade in (opacity only — scale lives on .oi a so it doesn't conflict with orbit transform)
  .fromTo('.oi',     { opacity:0 }, { opacity:1, duration:.4, stagger:.09, ease:'power2.out' }, '-=.3')
  // Kick off typewriter
  .call(typeLoop);

// ── Gentle continuous float on the orb ──
gsap.to('#orb', {
  y: -15, duration: 3.8,
  ease: 'sine.inOut',
  yoyo: true, repeat: -1, delay: 1.4
});