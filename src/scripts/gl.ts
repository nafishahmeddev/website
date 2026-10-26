// The background: a topographic field drawn in a single fragment shader.
// Domain-warped noise is cut into contour lines; the pointer raises a hill
// that the lines bend around and light up in the accent colour, and scrolling
// moves the map. Plain WebGL 1, no library, about 4 KB.
//
// It renders at a capped pixel ratio, stops when the tab is hidden, draws a
// single still frame when the visitor prefers reduced motion, and leaves the
// CSS fallback in place when WebGL is unavailable.

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_hover;
uniform float u_scroll;
uniform vec3 u_bg;
uniform vec3 u_ink;
uniform vec3 u_accent;
uniform float u_ink_amt;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = r * p * 2.02 + 3.1;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = (frag - 0.5 * u_res) / u_res.y;
  vec2 m = (u_mouse - 0.5) * vec2(u_res.x / u_res.y, 1.0);

  float t = u_time * 0.045;
  vec2 p = uv * 1.35 + vec2(0.0, u_scroll * 0.9);

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  float h = fbm(p + 1.8 * q + vec2(t * 0.6, -t * 0.4));

  // The pointer raises a soft hill.
  float d = length(uv - m);
  float hill = exp(-d * d * 7.0) * u_hover;
  h += hill * 0.22;

  // Contour lines, one pixel wide at any resolution.
  float f = h * 18.0;
  float w = fwidth(f);
  // Distance to the nearest contour, in pixels; every fifth line is heavier.
  float line = 1.0 - clamp(abs(fract(f - 0.5) - 0.5) / w, 0.0, 1.0);
  float major = 1.0 - clamp(abs(fract(f / 5.0 - 0.5) - 0.5) * 5.0 / (w * 1.6), 0.0, 1.0);

  // Fade the map towards the edges so the type sits on calm ground.
  float vign = smoothstep(1.35, 0.15, length(uv * vec2(0.85, 1.1)));

  vec3 col = u_bg;
  col = mix(col, u_ink, (line * 0.55 + major * 0.45) * u_ink_amt * vign);

  // Accent: lines near the pointer, and one slow bloom drifting at the right.
  float glow = exp(-d * d * 11.0) * u_hover;
  col = mix(col, u_accent, clamp(line * glow * 1.15 + major * glow * 0.6, 0.0, 1.0));
  vec2 c = vec2(0.55 + 0.08 * sin(t * 3.0), -0.15 + 0.06 * cos(t * 2.3));
  float bloom = smoothstep(0.95, 0.0, length(uv - c));
  col = mix(col, u_accent, bloom * bloom * 0.16);

  // Film grain keeps the gradients from banding.
  col += (hash(frag + fract(u_time) * 91.7) - 0.5) * 0.035;

  gl_FragColor = vec4(col, 1.0);
}
`;

const parseColor = (value: string): [number, number, number] => {
  const hex = value.trim().replace('#', '');
  const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
  const n = parseInt(full, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

export function startField(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: 'low-power' });
  if (!gl || !gl.getExtension('OES_standard_derivatives')) return false;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
    return s;
  };

  let program: WebGLProgram;
  try {
    program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
  } catch {
    return false;
  }
  gl.useProgram(program);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, 'a_pos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uRes = u('u_res');
  const uTime = u('u_time');
  const uMouse = u('u_mouse');
  const uHover = u('u_hover');
  const uScroll = u('u_scroll');
  const uBg = u('u_bg');
  const uInk = u('u_ink');
  const uAccent = u('u_accent');
  const uInkAmt = u('u_ink_amt');

  const readTheme = () => {
    const css = getComputedStyle(document.documentElement);
    const light = document.documentElement.dataset.theme === 'light';
    gl.uniform3fv(uBg, parseColor(css.getPropertyValue('--c-bg')));
    gl.uniform3fv(uInk, parseColor(light ? '#0f0f11' : '#ece8df'));
    gl.uniform3fv(uAccent, parseColor(css.getPropertyValue('--c-accent')));
    gl.uniform1f(uInkAmt, light ? 0.13 : 0.12);
  };
  readTheme();
  new MutationObserver(readTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    if (still) draw(0);
  };

  // Pointer and scroll are eased so the field moves like a surface, not a cursor.
  const target = { x: 0.62, y: 0.55, hover: 0 };
  const now = { x: 0.62, y: 0.55, hover: 0, scroll: 0 };
  addEventListener('pointermove', (e) => {
    target.x = e.clientX / innerWidth;
    target.y = 1 - e.clientY / innerHeight;
    target.hover = 1;
  }, { passive: true });
  document.addEventListener('pointerleave', () => (target.hover = 0));

  let raf = 0;
  let start = performance.now();
  function draw(time: number) {
    const k = 0.06;
    now.x += (target.x - now.x) * k;
    now.y += (target.y - now.y) * k;
    now.hover += (target.hover - now.hover) * 0.04;
    now.scroll += (scrollY / innerHeight - now.scroll) * 0.08;
    gl!.uniform1f(uTime, time / 1000);
    gl!.uniform2f(uMouse, now.x, now.y);
    gl!.uniform1f(uHover, now.hover);
    gl!.uniform1f(uScroll, now.scroll * 0.35);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
  }

  const loop = (t: number) => {
    draw(t - start);
    raf = requestAnimationFrame(loop);
  };

  addEventListener('resize', resize);
  resize();
  if (still) {
    draw(12000);
  } else {
    raf = requestAnimationFrame(loop);
    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(loop);
    });
  }

  canvas.classList.add('is-on');
  return true;
}
