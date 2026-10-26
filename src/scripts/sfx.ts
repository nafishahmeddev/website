// Interface sound, synthesised with the Web Audio API: no audio files.
// Off until the visitor turns it on; the choice is remembered. Every sound is
// short, quiet and pitched in one key (A minor pentatonic) so they never
// clash. When on, a very low two-oscillator pad sits underneath and fades
// out whenever the tab is hidden.

const KEY = 'sfx';
const NOTES = [440, 523.25, 587.33, 659.25, 783.99, 880];

let ctx: AudioContext | null = null;
let master: GainNode;
let pad: { gain: GainNode; stop: () => void } | null = null;
let enabled = false;
let lastHover = 0;

const store = {
  get: () => {
    try { return localStorage.getItem(KEY) === 'on'; } catch { return false; }
  },
  set: (on: boolean) => {
    try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch {}
  },
};

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.55;
    // A short feedback delay gives the blips a sense of room.
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.13;
    const fb = ctx.createGain();
    fb.gain.value = 0.22;
    const wet = ctx.createGain();
    wet.gain.value = 0.25;
    master.connect(ctx.destination);
    master.connect(delay);
    delay.connect(fb).connect(delay);
    delay.connect(wet).connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function blip(freq: number, { type = 'sine' as OscillatorType, dur = 0.09, vol = 0.06, glide = 0, at = 0 } = {}) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime + at;
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (glide) osc.frequency.exponentialRampToValueAtTime(freq * glide, t + dur);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function startPad() {
  const a = audio();
  if (!a || pad) return;
  const gain = a.createGain();
  gain.gain.value = 0;
  const lp = a.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 420;
  const oscs = [110, 110.6, 164.8].map((f) => {
    const o = a.createOscillator();
    o.type = 'sine';
    o.frequency.value = f;
    o.connect(lp);
    o.start();
    return o;
  });
  lp.connect(gain).connect(master);
  gain.gain.linearRampToValueAtTime(0.035, a.currentTime + 2.5);
  pad = {
    gain,
    stop: () => {
      const t = a.currentTime;
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(gain.gain.value, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.6);
      oscs.forEach((o) => o.stop(t + 0.7));
      pad = null;
    },
  };
}

export const sfx = {
  get on() {
    return enabled;
  },
  hover(step = 0) {
    if (!enabled) return;
    const now = performance.now();
    if (now - lastHover < 45) return;
    lastHover = now;
    blip(NOTES[(step % NOTES.length + NOTES.length) % NOTES.length] * 2, { dur: 0.05, vol: 0.022 });
  },
  tap() {
    if (!enabled) return;
    blip(880, { type: 'triangle', dur: 0.07, vol: 0.05, glide: 0.5 });
  },
  open() {
    if (!enabled) return;
    blip(523.25, { dur: 0.16, vol: 0.045 });
    blip(783.99, { dur: 0.22, vol: 0.04, at: 0.06 });
  },
  close() {
    if (!enabled) return;
    blip(659.25, { dur: 0.14, vol: 0.04, glide: 0.75 });
  },
  success() {
    if (!enabled) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => blip(f, { dur: 0.3, vol: 0.035, at: i * 0.055 }));
  },
  set(on: boolean) {
    enabled = on;
    store.set(on);
    document.documentElement.dataset.sound = on ? 'on' : 'off';
    if (on) {
      audio();
      startPad();
      sfx.success();
    } else {
      pad?.stop();
    }
  },
  init() {
    enabled = store.get();
    document.documentElement.dataset.sound = enabled ? 'on' : 'off';
    // Browsers only allow audio after a gesture, so the pad waits for one.
    if (enabled) addEventListener('pointerdown', () => enabled && startPad(), { once: true });
    document.addEventListener('visibilitychange', () => {
      if (!enabled) return;
      if (document.hidden) pad?.stop();
      else if (ctx) startPad();
    });
  },
};
