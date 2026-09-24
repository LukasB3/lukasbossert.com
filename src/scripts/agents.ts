/**
 * A field of agents. Each agent has a kind and a goal site; it travels there,
 * works for a while, then picks a new site. Agents of the same kind link up
 * when they meet and pass short pulses along the link. The visitor's pointer
 * is treated as one more agent that everyone finds interesting.
 *
 * No dependencies. Monochrome ink with one accent.
 */

interface Agent {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: number;
  site: number;
  patience: number;
  r: number;
}

interface Site {
  x: number;
  y: number;
  tx: number;
  ty: number;
  kind: number;
}

interface Link {
  a: Agent;
  b: Agent;
  s: number;
}

interface Pulse {
  from: Agent;
  to: Agent;
  t: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

const CFG = {
  fps: 30,
  maxSpeed: 1.5,
  maxForce: 0.07,
  slowRadius: 70,
  siteRadius: 34,
  separation: 13,
  linkRadius: 74,
  pointerRadius: 180,
  pointerRing: 46,
  pointerLink: 120,
  kinds: 4,
  fade: 0.3,
  grid: 32,
  edge: 28,
};

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const hex = (s: string): RGB => {
  const v = s.trim().replace('#', '');
  const n = parseInt(v.length === 3 ? v.replace(/./g, (c) => c + c) : v, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};
const rgba = (c: RGB, a: number) => `rgba(${c.r},${c.g},${c.b},${a})`;

export function mount(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  const toggle = root.querySelector<HTMLButtonElement>('.field-toggle');
  const ctx = canvas?.getContext('2d', { alpha: false });
  if (!canvas || !ctx) return;

  const css = getComputedStyle(document.documentElement);
  const bg = hex(css.getPropertyValue('--bg') || '#151412');
  const ink = hex(css.getPropertyValue('--ink') || '#e8e4dc');
  const ink3 = hex(css.getPropertyValue('--ink-3') || '#6e685f');
  const accent = hex(css.getPropertyValue('--accent') || '#c4794a');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0;
  let H = 0;
  let dpr = 1;
  let agents: Agent[] = [];
  let sites: Site[] = [];
  let links: Link[] = [];
  let pulses: Pulse[] = [];
  let pointer: { x: number; y: number } | null = null;
  let pointerFade = 0;
  let tick = 0;
  let paused = false;
  let visible = true;
  let last = 0;
  let gridPattern: CanvasPattern | null = null;

  // ---------- setup ----------

  const targetCount = () => Math.max(30, Math.min(110, Math.round((W * H) / 7000)));

  const makeSite = (kind: number): Site => {
    const x = rand(W * 0.12, W * 0.88);
    const y = rand(H * 0.16, H * 0.84);
    return { x, y, tx: x, ty: y, kind };
  };

  const makeAgent = (): Agent => {
    const kind = Math.floor(Math.random() * CFG.kinds);
    return {
      x: rand(CFG.edge, W - CFG.edge),
      y: rand(CFG.edge, H - CFG.edge),
      vx: rand(-0.5, 0.5),
      vy: rand(-0.5, 0.5),
      kind,
      site: pickSite(kind, -1),
      patience: rand(200, 700),
      r: 1.5 + kind * 0.2,
    };
  };

  function pickSite(kind: number, current: number) {
    const options = sites.map((_, i) => i).filter((i) => sites[i].kind === kind && i !== current);
    return options.length ? pick(options) : Math.floor(Math.random() * sites.length);
  }

  function buildGrid() {
    const g = document.createElement('canvas');
    g.width = CFG.grid * dpr;
    g.height = CFG.grid * dpr;
    const gc = g.getContext('2d');
    if (!gc) return;
    gc.scale(dpr, dpr);
    gc.fillStyle = rgba(ink, 0.07);
    gc.fillRect(CFG.grid / 2 - 0.5, CFG.grid / 2 - 0.5, 1, 1);
    gridPattern = ctx!.createPattern(g, 'repeat');
    if (gridPattern && 'setTransform' in gridPattern) {
      gridPattern.setTransform(new DOMMatrix().scale(1 / dpr));
    }
  }

  function resize() {
    const rect = canvas!.getBoundingClientRect();
    const nw = Math.max(1, Math.round(rect.width));
    const nh = Math.max(1, Math.round(rect.height));
    dpr = Math.min(2, window.devicePixelRatio || 1);
    const sx = W ? nw / W : 1;
    const sy = H ? nh / H : 1;
    W = nw;
    H = nh;
    canvas!.width = Math.round(W * dpr);
    canvas!.height = Math.round(H * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGrid();

    for (const s of sites) {
      s.x *= sx;
      s.y *= sy;
      s.tx *= sx;
      s.ty *= sy;
    }
    for (const a of agents) {
      a.x *= sx;
      a.y *= sy;
    }

    const siteCount = Math.max(4, Math.min(10, Math.round(targetCount() / 11)));
    while (sites.length < siteCount) sites.push(makeSite(sites.length % CFG.kinds));
    sites.length = siteCount;

    const n = targetCount();
    while (agents.length < n) agents.push(makeAgent());
    agents.length = n;
    for (const a of agents) if (a.site >= sites.length) a.site = pickSite(a.kind, -1);
    draw(true);
  }

  // ---------- simulation ----------

  function retargetSite() {
    const s = pick(sites);
    s.tx = rand(W * 0.1, W * 0.9);
    s.ty = rand(H * 0.14, H * 0.86);
  }

  function step() {
    tick++;
    if (tick % 240 === 0) retargetSite();
    for (const s of sites) {
      s.x += (s.tx - s.x) * 0.008;
      s.y += (s.ty - s.y) * 0.008;
    }

    if (pointer) pointerFade = Math.min(1, pointerFade + 0.08);
    else pointerFade = Math.max(0, pointerFade - 0.03);

    const n = agents.length;
    const fx = new Float32Array(n);
    const fy = new Float32Array(n);
    links = [];

    // goal seeking
    for (let i = 0; i < n; i++) {
      const a = agents[i];
      const s = sites[a.site];
      const dx = s.x - a.x;
      const dy = s.y - a.y;
      const d = Math.hypot(dx, dy) || 0.001;
      const ux = dx / d;
      const uy = dy / d;
      const speed = d < CFG.slowRadius ? Math.max(0.2, CFG.maxSpeed * (d / CFG.slowRadius)) : CFG.maxSpeed;
      fx[i] += (ux * speed - a.vx) * 0.06;
      fy[i] += (uy * speed - a.vy) * 0.06;

      if (d < CFG.siteRadius) {
        // orbit the site while working
        fx[i] += -uy * 0.06;
        fy[i] += ux * 0.06;
        a.patience -= 1;
      } else {
        a.patience -= 0.12;
      }

      if (a.patience < 0) {
        if (Math.random() < 0.2) a.kind = Math.floor(Math.random() * CFG.kinds);
        a.site = pickSite(a.kind, a.site);
        a.patience = rand(250, 800);
      }

      // wander
      fx[i] += (Math.random() - 0.5) * 0.04;
      fy[i] += (Math.random() - 0.5) * 0.04;

      // soft walls
      if (a.x < CFG.edge) fx[i] += (CFG.edge - a.x) * 0.01;
      if (a.x > W - CFG.edge) fx[i] -= (a.x - (W - CFG.edge)) * 0.01;
      if (a.y < CFG.edge) fy[i] += (CFG.edge - a.y) * 0.01;
      if (a.y > H - CFG.edge) fy[i] -= (a.y - (H - CFG.edge)) * 0.01;
    }

    // pairwise: separation, alignment, links
    const sep2 = CFG.separation * CFG.separation;
    const link2 = CFG.linkRadius * CFG.linkRadius;
    for (let i = 0; i < n; i++) {
      const a = agents[i];
      for (let j = i + 1; j < n; j++) {
        const b = agents[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > link2) continue;
        const d = Math.sqrt(d2) || 0.001;
        if (d2 < sep2) {
          const push = ((CFG.separation - d) / CFG.separation) * 0.18;
          fx[i] -= (dx / d) * push;
          fy[i] -= (dy / d) * push;
          fx[j] += (dx / d) * push;
          fy[j] += (dy / d) * push;
        }
        if (a.kind === b.kind) {
          const s = 1 - d / CFG.linkRadius;
          links.push({ a, b, s });
          fx[i] += (b.vx - a.vx) * 0.012;
          fy[i] += (b.vy - a.vy) * 0.012;
          fx[j] += (a.vx - b.vx) * 0.012;
          fy[j] += (a.vy - b.vy) * 0.012;
        }
      }
    }

    // pointer as an agent of interest
    if (pointer && pointerFade > 0) {
      for (let i = 0; i < n; i++) {
        const a = agents[i];
        const dx = pointer.x - a.x;
        const dy = pointer.y - a.y;
        const d = Math.hypot(dx, dy) || 0.001;
        if (d > CFG.pointerRadius) continue;
        const ux = dx / d;
        const uy = dy / d;
        const w = (1 - d / CFG.pointerRadius) * pointerFade;
        fx[i] += ux * w * 0.14;
        fy[i] += uy * w * 0.14;
        if (d < CFG.pointerRing) {
          const k = (CFG.pointerRing - d) / CFG.pointerRing;
          fx[i] += (-ux * k * 0.3 - uy * 0.08) * pointerFade;
          fy[i] += (-uy * k * 0.3 + ux * 0.08) * pointerFade;
        }
        if (d < CFG.pointerLink) {
          links.push({ a, b: { ...a, x: pointer.x, y: pointer.y }, s: (1 - d / CFG.pointerLink) * pointerFade * 1.2 });
        }
      }
    }

    // integrate
    const vmax = CFG.maxSpeed * 1.4;
    for (let i = 0; i < n; i++) {
      const a = agents[i];
      const fm = Math.hypot(fx[i], fy[i]);
      const k = fm > CFG.maxForce * 3 ? (CFG.maxForce * 3) / fm : 1;
      a.vx += fx[i] * k;
      a.vy += fy[i] * k;
      const vm = Math.hypot(a.vx, a.vy);
      if (vm > vmax) {
        a.vx = (a.vx / vm) * vmax;
        a.vy = (a.vy / vm) * vmax;
      }
      a.x += a.vx;
      a.y += a.vy;
    }

    // pulses travel along links
    if (links.length && pulses.length < 14 && Math.random() < 0.12) {
      const l = pick(links);
      pulses.push(Math.random() < 0.5 ? { from: l.a, to: l.b, t: 0 } : { from: l.b, to: l.a, t: 0 });
    }
    for (const p of pulses) p.t += 0.055;
    pulses = pulses.filter((p) => p.t < 1);
  }

  // ---------- drawing ----------

  function draw(full: boolean) {
    ctx!.fillStyle = rgba(bg, full ? 1 : CFG.fade);
    ctx!.fillRect(0, 0, W, H);

    if (gridPattern) {
      ctx!.fillStyle = gridPattern;
      ctx!.fillRect(0, 0, W, H);
    }

    // sites as small crosses
    ctx!.strokeStyle = rgba(ink3, 0.6);
    ctx!.lineWidth = 1;
    for (const s of sites) {
      const x = Math.round(s.x) + 0.5;
      const y = Math.round(s.y) + 0.5;
      ctx!.beginPath();
      ctx!.moveTo(x - 4, y);
      ctx!.lineTo(x + 4, y);
      ctx!.moveTo(x, y - 4);
      ctx!.lineTo(x, y + 4);
      ctx!.stroke();
    }

    // links
    ctx!.lineWidth = 1;
    for (const l of links) {
      ctx!.strokeStyle = rgba(accent, Math.min(0.75, l.s * 0.55));
      ctx!.beginPath();
      ctx!.moveTo(l.a.x, l.a.y);
      ctx!.lineTo(l.b.x, l.b.y);
      ctx!.stroke();
    }

    // pointer ring
    if (pointer && pointerFade > 0) {
      ctx!.strokeStyle = rgba(accent, 0.28 * pointerFade);
      ctx!.beginPath();
      ctx!.arc(pointer.x, pointer.y, CFG.pointerRing, 0, Math.PI * 2);
      ctx!.stroke();
    }

    // agents
    ctx!.fillStyle = rgba(ink, 0.9);
    for (const a of agents) {
      ctx!.beginPath();
      ctx!.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx!.fill();
    }

    // pulses
    ctx!.fillStyle = rgba(accent, 0.95);
    for (const p of pulses) {
      const e = p.t < 0.5 ? 2 * p.t * p.t : 1 - Math.pow(-2 * p.t + 2, 2) / 2;
      const x = p.from.x + (p.to.x - p.from.x) * e;
      const y = p.from.y + (p.to.y - p.from.y) * e;
      ctx!.beginPath();
      ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx!.fill();
    }
  }

  // ---------- loop & events ----------

  const interval = 1000 / CFG.fps;

  function frame(now: number) {
    requestAnimationFrame(frame);
    if (paused || !visible || document.hidden) return;
    if (now - last < interval) return;
    last = now;
    step();
    draw(false);
  }

  function setPointer(e: PointerEvent) {
    const rect = canvas!.getBoundingClientRect();
    pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  canvas.addEventListener('pointermove', setPointer);
  canvas.addEventListener('pointerdown', setPointer);
  canvas.addEventListener('pointerleave', () => (pointer = null));
  canvas.addEventListener('pointerup', (e) => {
    if (e.pointerType !== 'mouse') setTimeout(() => (pointer = null), 900);
  });
  canvas.addEventListener('pointercancel', () => (pointer = null));

  new ResizeObserver(() => {
    resize();
    if (reduced) {
      settle();
      draw(true);
    }
  }).observe(canvas);

  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.05 }).observe(canvas);

  function settle() {
    for (let i = 0; i < 360; i++) step();
    links = links.filter((l) => l.s > 0.15);
    pulses = [];
  }

  resize();

  if (reduced) {
    settle();
    draw(true);
    return;
  }

  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      paused = !paused;
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.textContent = paused ? toggle.dataset.resume ?? 'Resume' : toggle.dataset.pause ?? 'Pause';
    });
  }

  for (let i = 0; i < 90; i++) step();
  draw(true);
  requestAnimationFrame(frame);
}
