// Interface sound, synthesised with the Web Audio API: no audio files.
// Off until the visitor turns it on; the choice is remembered. Every sound is
// short, quiet and pitched in one key (D major pentatonic) so they never
// clash. When on, soft generative music plays underneath and fades out
// whenever the tab is hidden.

const KEY = 'sfx';
const NOTES = [440, 493.88, 587.33, 659.25, 739.99, 880];

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

// A small reverb made from decaying noise, so notes bloom instead of click.
function makeReverb(a: AudioContext, seconds = 3.2) {
  const rate = a.sampleRate;
  const len = Math.floor(rate * seconds);
  const buf = a.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
  }
  const conv = a.createConvolver();
  conv.buffer = buf;
  return conv;
}

// Background music: generative, never a loop. Soft bell-like notes from one
// calm scale (D major pentatonic, upper octaves) fall at uneven intervals into
// a long reverb, over a faint breath of filtered noise. Nothing sits below
// 290 Hz, so there is no drone or hum.
const SCALE = [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25, 739.99, 880];

function startPad() {
  const a = audio();
  if (!a || pad) return;
  const bus = a.createGain();
  bus.gain.value = 0;
  const verb = makeReverb(a);
  const wet = a.createGain();
  wet.gain.value = 0.9;
  const dry = a.createGain();
  dry.gain.value = 0.35;
  bus.connect(dry).connect(master);
  bus.connect(verb).connect(wet).connect(master);
  bus.gain.linearRampToValueAtTime(1, a.currentTime + 3);

  // Air: pink-ish noise through a narrow, slowly moving band.
  const noiseLen = a.sampleRate * 4;
  const nb = a.createBuffer(1, noiseLen, a.sampleRate);
  const nd = nb.getChannelData(0);
  let last = 0;
  for (let i = 0; i < noiseLen; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
    nd[i] = last * 3.5;
  }
  const noise = a.createBufferSource();
  noise.buffer = nb;
  noise.loop = true;
  const band = a.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.value = 900;
  band.Q.value = 0.7;
  const air = a.createGain();
  air.gain.value = 0.012;
  const lfo = a.createOscillator();
  lfo.frequency.value = 0.05;
  const lfoDepth = a.createGain();
  lfoDepth.gain.value = 400;
  lfo.connect(lfoDepth).connect(band.frequency);
  noise.connect(band).connect(air).connect(bus);
  noise.start();
  lfo.start();

  let timer = 0;
  let prev = 4;
  const note = () => {
    // Step to a nearby note more often than a far one, like a slow melody.
    const step = [-2, -1, -1, 1, 1, 2, 3][Math.floor(Math.random() * 7)];
    prev = Math.max(0, Math.min(SCALE.length - 1, prev + step));
    const f = SCALE[prev];
    const t = a.currentTime + 0.05;
    const vol = 0.018 + Math.random() * 0.012;
    // Two partials, slightly detuned, for a soft glass bell.
    [
      [f, 'sine', vol],
      [f * 2.001, 'sine', vol * 0.22],
      [f * 0.5, 'triangle', vol * 0.35],
    ].forEach(([freq, type, v]) => {
      const o = a.createOscillator();
      const g = a.createGain();
      o.type = type as OscillatorType;
      o.frequency.value = freq as number;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(v as number, t + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 4.5);
      o.connect(g).connect(bus);
      o.start(t);
      o.stop(t + 4.6);
    });
    timer = window.setTimeout(note, 1800 + Math.random() * 3200);
  };
  timer = window.setTimeout(note, 600);

  pad = {
    gain: bus,
    stop: () => {
      clearTimeout(timer);
      const t = a.currentTime;
      bus.gain.cancelScheduledValues(t);
      bus.gain.setValueAtTime(bus.gain.value, t);
      bus.gain.linearRampToValueAtTime(0, t + 1.2);
      noise.stop(t + 1.3);
      lfo.stop(t + 1.3);
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
    blip(587.33, { dur: 0.16, vol: 0.045 });
    blip(880, { dur: 0.22, vol: 0.04, at: 0.06 });
  },
  close() {
    if (!enabled) return;
    blip(739.99, { dur: 0.14, vol: 0.04, glide: 0.75 });
  },
  success() {
    if (!enabled) return;
    [587.33, 739.99, 880, 1174.66].forEach((f, i) => blip(f, { dur: 0.3, vol: 0.035, at: i * 0.055 }));
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
