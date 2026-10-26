// Everything that moves, in one place. Each behaviour is opt-in through a
// data attribute in the markup, so a section only has to declare what it
// wants:
//   data-reveal      fade and rise when scrolled into view (--i staggers)
//   data-split       words rise out of a mask (see components/Split.astro)
//   data-count       count up to the number when in view
//   data-magnetic    pulled a little towards the pointer
//   data-cursor      the custom cursor shows this label over the element
//   data-sfx         hover tick, with an optional pitch step
//   data-toggle      button that opens the panel it aria-controls
//   data-copy        copies its value to the clipboard
//   data-clock       live local time in Bengaluru
//   data-theme-toggle / data-sound-toggle
import Lenis from 'lenis';
import { startField } from './gl';
import { sfx } from './sfx';

const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, el: ParentNode = document) => [...el.querySelectorAll<T>(sel)] as T[];

// WebGL field.
const canvas = document.querySelector<HTMLCanvasElement>('[data-gl]');
if (canvas && !startField(canvas)) root.classList.add('no-gl');

// Smooth scrolling, only where it helps: a mouse or trackpad, motion allowed.
let lenis: Lenis | null = null;
if (!reduce && fine) {
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), wheelMultiplier: 0.95 });
  const raf = (t: number) => {
    lenis!.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  lenis.on('scroll', ({ velocity }: { velocity: number }) => {
    root.style.setProperty('--velocity', String(Math.max(-1, Math.min(1, velocity / 40))));
  });
}

// In-page links go through Lenis so they glide instead of jump.
$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')!;
    const target = id.length > 1 ? document.querySelector(id) : document.body;
    if (!target) return;
    e.preventDefault();
    sfx.tap();
    if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -72 });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', id);
  }),
);

// Reveals.
const seen = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      seen.unobserve(entry.target);
      if ((entry.target as HTMLElement).dataset.count !== undefined) countUp(entry.target as HTMLElement);
    }),
  { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
);
$$('[data-reveal], [data-split], [data-count], [data-draw]').forEach((el) => seen.observe(el));

// The hero plays once the fonts are in, so lines never reflow mid-animation.
document.fonts.ready.then(() => requestAnimationFrame(() => root.classList.add('is-loaded')));

function countUp(el: HTMLElement) {
  const to = Number(el.dataset.count);
  const out = el.querySelector<HTMLElement>('[data-count-value]') ?? el;
  if (reduce || !to) return;
  const dur = 1400;
  const t0 = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, (t - t0) / dur);
    out.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 4))));
    if (k < 1) requestAnimationFrame(step);
  };
  out.textContent = '0';
  requestAnimationFrame(step);
}

// Cursor: a dot that follows exactly and a ring that trails, with a label.
if (fine && !reduce) {
  const cursor = document.querySelector<HTMLElement>('[data-cursor-el]');
  const label = cursor?.querySelector<HTMLElement>('[data-cursor-label]');
  if (cursor && label) {
    root.classList.add('has-cursor');
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    addEventListener('pointermove', (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      cursor.style.setProperty('--dx', `${pos.x}px`);
      cursor.style.setProperty('--dy', `${pos.y}px`);
    }, { passive: true });
    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      cursor.style.setProperty('--rx', `${ring.x}px`);
      cursor.style.setProperty('--ry', `${ring.y}px`);
      requestAnimationFrame(tick);
    };
    tick();
    document.addEventListener('pointerover', (e) => {
      const el = (e.target as Element).closest<HTMLElement>('a, button, [data-cursor]');
      cursor.dataset.state = el ? (el.dataset.cursor ? 'label' : 'hover') : '';
      label.textContent = el?.dataset.cursor ?? '';
    });
    document.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    document.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
    document.addEventListener('pointerleave', () => (cursor.dataset.state = 'gone'));
  }
}

// Magnetic elements.
if (fine && !reduce) {
  $$('[data-magnetic]').forEach((el) => {
    const pull = Number(el.dataset.magnetic) || 0.3;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * pull}px, ${(e.clientY - r.top - r.height / 2) * pull}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transition = 'transform 700ms var(--ease-out)';
      el.style.transform = '';
      setTimeout(() => (el.style.transition = ''), 700);
    });
  });
}

// Hover sounds. Rows step up the scale so a list plays a little melody.
$$('[data-sfx]').forEach((el, i) => el.addEventListener('pointerenter', () => sfx.hover(Number(el.dataset.sfx) || i)));

// Expanding rows.
$$<HTMLButtonElement>('[data-toggle]').forEach((btn) => {
  const panel = document.getElementById(btn.getAttribute('aria-controls')!);
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    panel?.toggleAttribute('data-open', open);
    open ? sfx.open() : sfx.close();
    // Lenis measures the page once; tell it the page grew.
    setTimeout(() => lenis?.resize(), 650);
  });
});

// Copy to clipboard, with a toast.
const toast = document.querySelector<HTMLElement>('[data-toast]');
let toastTimer = 0;
$$<HTMLButtonElement>('[data-copy]').forEach((btn) =>
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy!);
      sfx.success();
      if (toast) {
        toast.textContent = `${btn.dataset.copy} copied`;
        toast.classList.add('is-on');
        clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove('is-on'), 2200);
      }
    } catch {
      location.href = `mailto:${btn.dataset.copy}`;
    }
  }),
);

// Live local time.
const clocks = $$('[data-clock]');
const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata', hour12: false });
const tickClock = () => clocks.forEach((c) => (c.textContent = fmt.format(new Date())));
tickClock();
setInterval(tickClock, 15000);

// Theme.
$$('[data-theme-toggle]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f2efe8' : '#08080a');
    btn.setAttribute('aria-pressed', String(next === 'light'));
    sfx.tap();
  }),
);

// Sound.
sfx.init();
$$('[data-sound-toggle]').forEach((btn) => {
  btn.setAttribute('aria-pressed', String(sfx.on));
  btn.addEventListener('click', () => {
    sfx.set(!sfx.on);
    $$('[data-sound-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(sfx.on)));
  });
});

// Header: hide on the way down, show on the way up.
const header = document.querySelector<HTMLElement>('[data-header]');
let lastY = scrollY;
addEventListener('scroll', () => {
  const y = scrollY;
  header?.classList.toggle('is-scrolled', y > 24);
  header?.classList.toggle('is-hidden', y > 400 && y > lastY + 4);
  if (y < lastY - 4) header?.classList.remove('is-hidden');
  lastY = y;
  root.style.setProperty('--progress', String(y / Math.max(1, document.documentElement.scrollHeight - innerHeight)));
}, { passive: true });
