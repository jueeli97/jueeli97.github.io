/* ============================================================
   HERO — ambient decorative pieces (drift / parallax / magnetic tilt)
   ============================================================ */
const ambientPieces = [
  { label: 'Python', color: 'var(--lavender)', x: 5, y: 20, size: 84, depth: 0.03, delay: 0.1,
    icon: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 9h6M9 15h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' },
  { label: 'SQL', color: 'var(--rose)', x: 5, y: 78, size: 78, depth: 0.05, delay: 0.25,
    icon: '<ellipse cx="12" cy="6" rx="7" ry="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" fill="none" stroke="currentColor" stroke-width="1.6"/>' },
  { label: 'ML', color: 'var(--sage)', x: 38, y: 14, size: 82, depth: 0.02, delay: 0.15,
    icon: '<path d="M4 18l5-8 4 5 4-9 3 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' },
  { label: 'Power BI', color: 'var(--butter)', x: 41, y: 82, size: 72, depth: 0.06, delay: 0.35,
    icon: '<rect x="5" y="11" width="3" height="8" fill="currentColor"/><rect x="10.5" y="6" width="3" height="13" fill="currentColor"/><rect x="16" y="3" width="3" height="16" fill="currentColor"/>' },
  { label: 'AI', color: 'var(--peach)', x: 1, y: 47, size: 68, depth: 0.045, delay: 0.4,
    icon: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' },
  { label: 'Cloud', color: 'var(--lavender)', x: 45, y: 47, size: 66, depth: 0.055, delay: 0.5,
    icon: '<path d="M7 17a4 4 0 01-.4-7.98A5 5 0 0116.9 8.5 3.5 3.5 0 0117.3 17H7z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' },
  { label: 'DB', color: 'var(--sage)', x: 22, y: 92, size: 64, depth: 0.04, delay: 0.6,
    icon: '<rect x="4" y="4" width="16" height="4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="10" width="16" height="4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="16" width="16" height="4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/>' }
];

const field = document.getElementById('pieceField');
ambientPieces.forEach(p => {
  const floatEl = document.createElement('div');
  floatEl.className = 'piece-float';
  floatEl.style.left = p.x + '%';
  floatEl.style.top = p.y + '%';
  floatEl.style.setProperty('--r', (Math.random() * 10 - 5) + 'deg');
  floatEl.style.animationDuration = (6 + Math.random() * 3) + 's';
  floatEl.style.animationDelay = (Math.random() * 2) + 's';
  floatEl.dataset.depth = p.depth;

  const parallaxEl = document.createElement('div');
  parallaxEl.className = 'piece-parallax';
  const pieceEl = document.createElement('div');
  pieceEl.className = 'piece';
  pieceEl.style.setProperty('--color', p.color);
  pieceEl.style.setProperty('--size', p.size + 'px');
  pieceEl.style.setProperty('--delay', p.delay + 's');
  pieceEl.innerHTML = `<svg viewBox="0 0 24 24">${p.icon}</svg><span>${p.label}</span>`;

  parallaxEl.appendChild(pieceEl);
  floatEl.appendChild(parallaxEl);
  field.appendChild(floatEl);
});

const heroSection = document.getElementById('hero');
const spotlight = document.getElementById('spotlight');
const floatEls = document.querySelectorAll('.piece-float');

heroSection.addEventListener('mousemove', (e) => {
  spotlight.style.setProperty('--x', e.clientX + 'px');
  spotlight.style.setProperty('--y', e.clientY + 'px');
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const relX = (e.clientX - cx) / cx, relY = (e.clientY - cy) / cy;

  floatEls.forEach(el => {
    const depth = parseFloat(el.dataset.depth);
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const parallaxEl = el.querySelector('.piece-parallax');
    const px = relX * depth * 900, py = relY * depth * 900;
    let tiltX = 0, tiltY = 0, scale = 1, lift = 0;
    const magnetRadius = 240;
    if (dist < magnetRadius) {
      const s = 1 - dist / magnetRadius;
      tiltY = (dx / magnetRadius) * 16 * s;
      tiltX = -(dy / magnetRadius) * 16 * s;
      scale = 1 + 0.08 * s;
      lift = 16 * s;
    }
    parallaxEl.style.transform = `translate3d(${px + tiltY * 0.3}px, ${py + tiltX * 0.3 - lift}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`;
  });
});

/* Ambient particles */
const particleCount = 22;
for (let i = 0; i < particleCount; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = 2 + Math.random() * 4;
  p.style.width = size + 'px'; p.style.height = size + 'px';
  p.style.left = Math.random() * 100 + '%';
  p.style.top = 55 + Math.random() * 45 + '%';
  p.style.animationDuration = (10 + Math.random() * 12) + 's';
  p.style.animationDelay = (Math.random() * 10) + 's';
  heroSection.appendChild(p);
}

/* ============================================================
   HERO — photo assembly (puzzle tiles fly in & become the portrait)
   ============================================================ */
const portraitURL = 'assets/profile.jpg';

const COLS = 6, ROWS = 7;
const photoFrame = document.getElementById('photoFrame');
const frameGlow = document.getElementById('frameGlow');
const tileLayer = document.getElementById('tileLayer');
const tileColors = ['var(--lavender)', 'var(--peach)', 'var(--sage)', 'var(--rose)', 'var(--butter)', 'var(--cream)'];

let tiles = [];
let tileW = 70, tileH = 70; // recomputed from the frame's real rendered size

function getFrameRect() {
  return photoFrame.getBoundingClientRect();
}

function buildTiles() {
  const rect = getFrameRect();
  tileW = rect.width / COLS;
  tileH = rect.height / ROWS;

  tileLayer.innerHTML = '';
  tiles = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.style.width = tileW + 'px';
      tile.style.height = tileH + 'px';

      const colorLayer = document.createElement('div');
      colorLayer.className = 'tile-color';
      colorLayer.style.background = tileColors[(r + c) % tileColors.length];

      const photoLayer = document.createElement('div');
      photoLayer.className = 'tile-photo';
      photoLayer.style.backgroundImage = `url("${portraitURL}")`;
      photoLayer.style.backgroundSize = `${rect.width}px ${rect.height}px`;
      photoLayer.style.backgroundPosition = `-${c * tileW}px -${r * tileH}px`;

      tile.appendChild(colorLayer);
      tile.appendChild(photoLayer);
      tileLayer.appendChild(tile);
      tiles.push({ el: tile, r, c });
    }
  }
}

function scatterTiles() {
  const vw = window.innerWidth, vh = window.innerHeight;
  tiles.forEach(t => {
    t.el.classList.remove('assembled');
    const sx = Math.random() * (vw - 100) + 20;
    const sy = Math.random() * (vh - 100) + 20;
    const rot = (Math.random() * 110 - 55);
    t.el.style.transition = 'none';
    t.el.style.transform = `translate(${sx}px, ${sy}px) rotate(${rot}deg) scale(0.6)`;
    void t.el.offsetWidth;
    t.el.style.transition = '';
  });
}

function assembleTiles() {
  const frameRect = getFrameRect();
  const shuffled = [...tiles].sort(() => Math.random() - 0.5);
  shuffled.forEach((t, i) => {
    const targetX = frameRect.left + t.c * tileW;
    const targetY = frameRect.top + t.r * tileH;
    const delay = i * 42;
    setTimeout(() => {
      t.el.style.transform = `translate(${targetX}px, ${targetY}px) rotate(0deg) scale(1)`;
      setTimeout(() => t.el.classList.add('assembled'), 1150);
    }, delay);
  });
  const totalDelay = shuffled.length * 42 + 1900;
  setTimeout(() => {
    frameGlow.classList.remove('active');
    void frameGlow.offsetWidth;
    frameGlow.classList.add('active');
    // Bake the finished photo onto the frame itself (scrolls normally with
    // the page), then retire the fixed tile layer so nothing stays glued
    // to the viewport once the user scrolls past the hero.
    photoFrame.style.backgroundImage = `url("${portraitURL}")`;
    photoFrame.style.backgroundSize = 'cover';
    photoFrame.style.backgroundPosition = 'center';
    tileLayer.style.transition = 'opacity 0.4s ease';
    tileLayer.style.opacity = '0';
    setTimeout(() => { tileLayer.style.visibility = 'hidden'; }, 400);
  }, totalDelay);
}

function startAssemblySequence(delayBeforeAssemble) {
  tileLayer.style.visibility = 'visible';
  tileLayer.style.opacity = '1';
  photoFrame.style.backgroundImage = 'none';
  buildTiles();
  scatterTiles();
  setTimeout(assembleTiles, delayBeforeAssemble);
}

requestAnimationFrame(() => startAssemblySequence(1500));

photoFrame.addEventListener('click', () => startAssemblySequence(700));

// Once the user has genuinely scrolled the hero out of view, remember that
// permanently — a later layout reflow (e.g. rotating a phone, which can
// drastically resize the page) might coincidentally reposition the scroll
// offset back near the hero's pixel range, but that doesn't mean the user
// wants to see the intro animation replay over whatever they're reading now.
let hasScrolledPastHero = false;
window.addEventListener('scroll', () => {
  if (hasScrolledPastHero) return;
  // Use the hero's top edge, not its bottom — waiting for the entire
  // hero height to clear the viewport is too strict on tall screens,
  // where a user can already be well into reading the About section
  // while the last sliver of the hero is technically still in range.
  if (heroSection.getBoundingClientRect().top < -200) {
    hasScrolledPastHero = true;
    // If the scatter/assemble sequence is still mid-flight when the user
    // scrolls away (very possible — it takes several seconds), don't let
    // the fixed, full-viewport tile layer keep floating over whatever
    // section they've scrolled to. Skip straight to the finished state:
    // bake the real photo onto the frame and hide the tiles immediately.
    if (tileLayer.style.visibility !== 'hidden') {
      photoFrame.style.backgroundImage = `url("${portraitURL}")`;
      photoFrame.style.backgroundSize = 'cover';
      photoFrame.style.backgroundPosition = 'center';
      tileLayer.style.transition = 'none';
      tileLayer.style.opacity = '0';
      tileLayer.style.visibility = 'hidden';
    }
  }
}, { passive: true });

let resizeTimer;
let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
  // Mobile browsers fire 'resize' when the address bar collapses/expands
  // during ordinary scrolling — that only changes innerHeight, never width.
  // Without filtering that out, an innocent scroll on mobile would replay
  // the entire scatter-and-reassemble animation while the user is already
  // reading a completely different section further down the page (since
  // the tile layer is position:fixed and covers the full viewport).
  const newWidth = window.innerWidth;
  const widthChanged = Math.abs(newWidth - lastWidth) > 10;
  if (!widthChanged) return;
  lastWidth = newWidth;

  if (hasScrolledPastHero) return;

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => startAssemblySequence(400), 200);
});

/* ============================================================
   SCROLL REVEAL — fade/rise sections into view as user scrolls
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   ABOUT — cube-explode: headline, motto, and the 4 strength
   tiles start as one spinning 3D cube, then unfold into their
   real CSS Grid positions (FLIP technique — measures actual
   rendered layout, so it stays correct at any screen size).
   ============================================================ */
function initAboutCube() {
  const grid = document.getElementById('aboutGrid');
  if (!grid) return;
  const pieces = Array.from(grid.querySelectorAll('.about-cube-piece'));
  if (!pieces.length) return;

  const FACE = 180, R = FACE / 2;
  const faceMap = {
    front:  { ry: 0,   rx: 0   },
    right:  { ry: 90,  rx: 0   },
    top:    { ry: 0,   rx: 90  },
    bottom: { ry: 0,   rx: -90 },
    back:   { ry: 180, rx: 0   },
    left:   { ry: -90, rx: 0   },
  };

  function runCube() {
    const rects = pieces.map(p => p.getBoundingClientRect());
    const cx = rects.reduce((s, r) => s + r.left + r.width / 2, 0) / rects.length;
    const cy = rects.reduce((s, r) => s + r.top + r.height / 2, 0) / rects.length;

    const state = pieces.map((p, i) => {
      const r = rects[i];
      const face = faceMap[p.dataset.face];
      // Rotating a face onto the top/bottom of the cube geometrically shifts
      // its center up/down by R (a plain "rotateX then translateZ" always
      // does this) — uncorrected, that leaves the top/bottom pieces sitting
      // permanently higher/lower than the other four during the whole spin.
      // Compensate it out so every piece's center converges on the exact
      // same point, front/back/left/right included.
      const rxRad = face.rx * Math.PI / 180;
      const inherentOffsetY = -R * Math.sin(rxRad);
      const dx = cx - (r.left + r.width / 2);
      const dy = (cy - (r.top + r.height / 2)) - inherentOffsetY;
      const scaleX = FACE / r.width;
      const scaleY = FACE / r.height;
      return { p, dx, dy, scaleX, scaleY, face };
    });

    state.forEach(s => {
      s.p.style.transition = 'none';
      s.p.style.transform =
        `translate3d(${s.dx}px, ${s.dy}px, 0) rotateX(-10deg) rotateY(${s.face.ry}deg) rotateX(${s.face.rx}deg) translateZ(${R}px) scale(${s.scaleX}, ${s.scaleY})`;
      s.p.style.opacity = '1';
    });

    void grid.offsetWidth; // force reflow so the instant cube state actually paints

    let spinning = true;
    const spinStart = performance.now();
    const SPIN_DURATION = 2000;

    function tick(now) {
      if (!spinning) return;
      const elapsed = now - spinStart;
      const spin = elapsed * 0.18;
      state.forEach(s => {
        s.p.style.transform =
          `translate3d(${s.dx}px, ${s.dy}px, 0) rotateX(-10deg) rotateY(${spin}deg) rotateY(${s.face.ry}deg) rotateX(${s.face.rx}deg) translateZ(${R}px) scale(${s.scaleX}, ${s.scaleY})`;
      });
      if (elapsed < SPIN_DURATION) {
        requestAnimationFrame(tick);
      } else {
        spinning = false;
        settle();
      }
    }
    requestAnimationFrame(tick);

    function settle() {
      state.forEach((s, i) => {
        s.p.style.transition = 'transform 1.1s cubic-bezier(0.16,1,0.3,1)';
        s.p.style.transform = 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1,1)';
        setTimeout(() => s.p.classList.add('landed'), 600 + i * 40);
      });
      setTimeout(() => {
        document.querySelectorAll('.about-connector').forEach(c => c.classList.add('show'));
      }, 1300);
    }
  }

  const aboutCubeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCube();
        aboutCubeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  aboutCubeObserver.observe(grid);
}
initAboutCube();

/* ============================================================
   PROJECTS — puzzle-assembly intro (auto-plays once in view,
   then collapses to reveal the card grid — no scroll-jacking)
   ============================================================ */
const projMeta = [
  { color: 'var(--lavender)', label: 'InsightPulse' },
  { color: 'var(--peach)',    label: 'Forecasting' },
  { color: 'var(--rose)',     label: 'Healthcare' },
  { color: 'var(--butter)',   label: 'E-commerce' },
  { color: 'var(--sage)',     label: 'HerRestartAI' }
];

const projIntroWrapper = document.getElementById('projIntroWrapper');
const projTilesContainer = document.getElementById('projIntroTiles');
const projIntroFill = document.getElementById('projIntroFill');
const projIntroCounter = document.getElementById('projIntroCounter');

if (projIntroWrapper && projTilesContainer) {
  const containerWidth = projTilesContainer.getBoundingClientRect().width || 900;
  const spacing = Math.min(120, containerWidth / 6);

  const projTiles = projMeta.map((p, i) => {
    const el = document.createElement('div');
    el.className = 'proj-intro-tile';
    el.style.background = p.color;
    const label = document.createElement('div');
    label.className = 'proj-intro-tile-label';
    label.textContent = p.label;
    el.appendChild(label);
    projTilesContainer.appendChild(el);

    // scattered starting pose, computed once, scaled to the container so it
    // never overflows on narrow (mobile) viewports
    const scatterRange = Math.min(240, containerWidth * 0.42);
    const startX = (Math.random() * scatterRange * 2 - scatterRange);
    const startY = (Math.random() * 160 - 80);
    const startRot = (Math.random() * 220 - 110);
    const endX = (i - 2) * spacing;

    el.style.transform = `translate(${startX}px, ${startY}px) rotate(${startRot}deg) scale(0.55)`;

    return { el, label, endX };
  });

  function runAssembly() {
    projTiles.forEach((t, i) => {
      setTimeout(() => {
        t.el.style.transition = 'transform 1.3s cubic-bezier(0.19,1,0.22,1)';
        t.el.style.transform = `translate(${t.endX}px, 0px) rotate(0deg) scale(1)`;
        setTimeout(() => { t.label.style.opacity = '1'; }, 850);

        if (projIntroCounter) projIntroCounter.textContent = String(i + 1).padStart(2, '0') + ' / 05';
        if (projIntroFill) projIntroFill.style.width = (((i + 1) / projTiles.length) * 100) + '%';
      }, i * 380);
    });

    // hold longer once fully assembled so it actually registers, then collapse away to reveal the grid
    const totalAssembleTime = projTiles.length * 380 + 1300;
    setTimeout(() => {
      projIntroWrapper.style.opacity = '0';
      setTimeout(() => {
        projIntroWrapper.style.height = '0px';
        projIntroWrapper.style.marginBottom = '0px';
      }, 480);
    }, totalAssembleTime + 1100);
  }

  const projIntroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runAssembly();
        projIntroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  projIntroObserver.observe(projIntroWrapper);

  // Same category of bug as the hero: if the user scrolls past this block
  // while it's still sitting in its assembled/hold state (hasn't started
  // its own collapse yet), don't let it keep reserving space and showing
  // puzzle pieces above the real project cards that have scrolled into
  // view below it. Force it to skip straight to collapsed.
  let projIntroForceDone = false;
  window.addEventListener('scroll', () => {
    if (projIntroForceDone) return;
    if (projIntroWrapper.getBoundingClientRect().bottom < 80) {
      projIntroForceDone = true;
      projIntroWrapper.style.transition = 'none';
      projIntroWrapper.style.opacity = '0';
      projIntroWrapper.style.height = '0px';
      projIntroWrapper.style.marginBottom = '0px';
    }
  }, { passive: true });
}

/* ============================================================
   PROJECT CARDS — count-up metrics + magnetic tilt on hover
   ============================================================ */
function animateProjCounters(scope) {
  scope.querySelectorAll('[data-count]').forEach(el => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const isDecimal = el.dataset.count.includes('.');
    let start = null;
    const duration = 1100;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.innerHTML = prefix + (isDecimal ? current.toFixed(2) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

const projCounterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProjCounters(entry.target);
      projCounterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.proj-card').forEach(card => projCounterObserver.observe(card));

document.querySelectorAll('.proj-card[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-relY * 5}deg) rotateY(${relX * 5}deg) translateY(-3px)`;
    card.style.boxShadow = '0 22px 42px rgba(50,43,58,0.22)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
    card.style.boxShadow = '';
  });
});

/* ============================================================
   NAV — subtle shrink/shadow on scroll + mobile hamburger toggle
   ============================================================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 4px 20px rgba(50,43,58,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  // close the menu once a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
