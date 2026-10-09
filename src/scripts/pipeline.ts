/**
 * A data pipeline drawn as a schematic: sources on one side, sinks on the
 * other, transforms in between, joined by right-angled lines. Packets travel
 * along the lines, pause at each node, and pick a way onward. The page's
 * section links are stations in the middle of the flow. Hovering one lights
 * up its lines and routes the packets through it.
 *
 * No dependencies. Lines, squares and nothing else.
 */

interface Pt {
  x: number;
  y: number;
}

interface Node {
  x: number;
  y: number;
  stage: number;
  link: HTMLAnchorElement | null;
  half: number;
  ins: Edge[];
  outs: Edge[];
  pulse: number;
  ahead: boolean;
}

interface Edge {
  a: Node;
  b: Node;
  pts: Pt[];
  len: number;
  cum: number[];
  hot: boolean;
}

interface Packet {
  edge: Edge;
  at: number;
  wait: number;
  hot: boolean;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

const FPS = 30;
const SPEED = 110;

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const irand = (lo: number, hi: number) => Math.floor(rand(lo, hi + 1));
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const hex = (s: string): RGB => {
  const v = s.trim().replace('#', '');
  const n = parseInt(v.length === 3 ? v.replace(/./g, (c) => c + c) : v, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};
const rgba = (c: RGB, a: number) => `rgba(${c.r},${c.g},${c.b},${a})`;

export function mount(canvas: HTMLCanvasElement) {
  const maybeCtx = canvas.getContext('2d', { alpha: false });
  if (!maybeCtx) return;
  const ctx = maybeCtx;

  const css = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => hex(css.getPropertyValue(name) || fallback);
  const bg = read('--bg', '#eef0f3');
  const ink = read('--ink', '#14171c');
  const line = read('--line', '#b8bec9');
  const accent = read('--accent', '#0f7a5c');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector<HTMLElement>('[data-station-nav]');
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-station]'));

  let W = 0;
  let H = 0;
  let vertical = false;
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let packets: Packet[] = [];
  let sources: Node[] = [];
  let active: Node | null = null;
  let raf = 0;
  let last = 0;
  let spawnIn = 0;

  const makeNode = (x: number, y: number, stage: number): Node => ({
    x, y, stage, link: null, half: 6, ins: [], outs: [], pulse: 0, ahead: false,
  });

  function route(a: Node, b: Node, jitter: number): Pt[] {
    if (vertical) {
      const ay = a.y + a.half;
      const by = b.y - b.half;
      const ym = ay + (by - ay) * 0.5 + jitter;
      return [{ x: a.x, y: ay }, { x: a.x, y: ym }, { x: b.x, y: ym }, { x: b.x, y: by }];
    }
    const ax = a.x + a.half;
    const bx = b.x - b.half;
    const xm = ax + (bx - ax) * 0.5 + jitter;
    return [{ x: ax, y: a.y }, { x: xm, y: a.y }, { x: xm, y: b.y }, { x: bx, y: b.y }];
  }

  function connect(a: Node, b: Node, jitter: number) {
    if (a.outs.some((e) => e.b === b)) return;
    const pts = route(a, b, jitter);
    const cum = [0];
    for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
    const edge: Edge = { a, b, pts, len: cum[cum.length - 1], cum, hot: false };
    a.outs.push(edge);
    b.ins.push(edge);
    edges.push(edge);
  }

  function layout() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth;
    H = innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    vertical = W < 720;

    const gutter = parseFloat(getComputedStyle(document.querySelector('.poster') ?? document.body).paddingLeft) || 28;
    const headline = document.querySelector('.poster h1')?.getBoundingClientRect();
    const footer = document.querySelector('.site-footer')?.getBoundingClientRect();
    const top = (headline?.bottom ?? H * 0.3) + (vertical ? 28 : 48);
    const bottom = (footer?.top ?? H) - (vertical ? 16 : 36);
    const left = gutter + (vertical ? 24 : 0);
    const right = W - gutter - (vertical ? 24 : 0);

    nodes = [];
    edges = [];
    packets = [];
    const sizes = vertical ? [1, 2, 2, 2, 2, 1] : [2, 4, 4, 4, 2];
    const navAt: [number, number][] = vertical ? [[1, 0], [2, 1], [3, 0], [4, 1]] : [[2, 0], [2, 1], [2, 2], [2, 3]];
    const stages: Node[][] = sizes.map((count, k) => {
      const along = k / (sizes.length - 1);
      return Array.from({ length: count }, (_, i) => {
        const across = count === 1 ? 0.5 : 0.12 + (i / (count - 1)) * 0.76;
        // Stations stay evenly spaced so an opened box never reaches its neighbour.
        const station = navAt.some(([s, j]) => s === k && j === i);
        const wobble = count === 1 || station ? 0 : rand(-0.05, 0.05);
        const v = across + wobble;
        const n = vertical
          ? makeNode(left + v * (right - left), top + along * (bottom - top), k)
          : makeNode(left + along * (right - left), top + v * (bottom - top), k);
        nodes.push(n);
        return n;
      });
    });

    navAt.forEach(([k, i], li) => {
      const n = stages[k][i];
      const link = links[li];
      if (!n || !link) return;
      n.link = link;
      link.style.left = `${n.x}px`;
      link.style.top = `${n.y}px`;
    });
    nav?.classList.add('placed');
    for (const n of nodes) {
      if (!n.link) continue;
      const r = n.link.getBoundingClientRect();
      n.half = (vertical ? r.height : r.width) / 2 + 2;
    }

    for (let k = 0; k < stages.length - 1; k++) {
      const from = stages[k];
      const to = stages[k + 1];
      let j = 0;
      for (const a of from) {
        const count = Math.min(to.length, irand(1, 2));
        const targets = [...to].sort(() => Math.random() - 0.5).slice(0, count);
        for (const b of targets) connect(a, b, ((j++ % 5) - 2) * 7);
      }
      for (const b of to) if (b.ins.length === 0) connect(pick(from), b, ((j++ % 5) - 2) * 7);
    }
    sources = stages[0];
    spawnIn = 0;
  }

  function setActive(n: Node | null) {
    active = n;
    for (const e of edges) e.hot = false;
    for (const x of nodes) x.ahead = false;
    if (!n) return;
    for (const e of n.ins) e.hot = true;
    for (const e of n.outs) e.hot = true;
    const queue = [n];
    n.ahead = true;
    while (queue.length) {
      const x = queue.pop()!;
      for (const e of x.ins) {
        if (e.a.ahead) continue;
        e.a.ahead = true;
        queue.push(e.a);
      }
    }
  }

  function chooseOut(n: Node): Edge | null {
    if (n.outs.length === 0) return null;
    if (active) {
      const toward = n.outs.filter((e) => e.b.ahead);
      if (toward.length) return pick(toward);
    }
    return pick(n.outs);
  }

  function spawn(from: Node) {
    const e = chooseOut(from);
    if (!e) return;
    from.pulse = 1;
    packets.push({ edge: e, at: 0, wait: 0, hot: e.hot });
  }

  function tick(dt: number) {
    spawnIn -= dt;
    if (spawnIn <= 0) {
      spawn(pick(sources));
      spawnIn = rand(0.35, 0.9) / (active ? 1.8 : 1);
    }
    if (packets.length > 60) packets.splice(0, packets.length - 60);

    for (const p of packets) {
      if (p.wait > 0) {
        p.wait -= dt;
        if (p.wait <= 0) {
          const next = chooseOut(p.edge.b);
          if (next) {
            p.edge = next;
            p.at = 0;
            p.hot = next.hot;
          } else p.at = Infinity;
        }
        continue;
      }
      p.at += SPEED * dt * (p.hot ? 1.5 : 1);
      if (p.at >= p.edge.len) {
        p.at = p.edge.len;
        p.edge.b.pulse = 1;
        p.wait = p.edge.b.link ? 0.35 : 0.18;
        p.hot = p.edge.hot;
      }
    }
    packets = packets.filter((p) => p.at !== Infinity);
    for (const n of nodes) if (n.pulse > 0) n.pulse = Math.max(0, n.pulse - dt * 2.5);
  }

  function pointAt(e: Edge, at: number): Pt {
    let i = 1;
    while (i < e.cum.length - 1 && e.cum[i] < at) i++;
    const seg = e.cum[i] - e.cum[i - 1] || 1;
    const t = (at - e.cum[i - 1]) / seg;
    const a = e.pts[i - 1];
    const b = e.pts[i];
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  }

  function draw() {
    ctx.fillStyle = rgba(bg, 1);
    ctx.fillRect(0, 0, W, H);

    for (const pass of [false, true]) {
      ctx.strokeStyle = pass ? rgba(accent, 1) : rgba(line, 1);
      ctx.lineWidth = pass ? 1.5 : 1;
      ctx.beginPath();
      for (const e of edges) {
        if (e.hot !== pass) continue;
        ctx.moveTo(e.pts[0].x, e.pts[0].y);
        for (let i = 1; i < e.pts.length; i++) ctx.lineTo(e.pts[i].x, e.pts[i].y);
      }
      ctx.stroke();
    }

    for (const n of nodes) {
      if (n.link) continue;
      const s = n.stage === 0 ? 7 : 6;
      const filled = n.stage === 0 || n.pulse > 0.4;
      ctx.fillStyle = filled ? rgba(ink, 1) : rgba(bg, 1);
      ctx.strokeStyle = rgba(ink, 0.8);
      ctx.lineWidth = 1;
      ctx.fillRect(n.x - s, n.y - s, s * 2, s * 2);
      ctx.strokeRect(n.x - s + 0.5, n.y - s + 0.5, s * 2 - 1, s * 2 - 1);
    }

    if (still) return;
    for (const p of packets) {
      if (p.wait > 0) continue;
      const q = pointAt(p.edge, p.at);
      ctx.fillStyle = p.hot ? rgba(accent, 1) : rgba(ink, 1);
      ctx.fillRect(q.x - 2.5, q.y - 2.5, 5, 5);
    }
  }

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    if (now - last < 1000 / FPS) return;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    tick(dt);
    draw();
  }

  function start() {
    if (still || raf) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  layout();
  draw();
  start();
  document.fonts?.ready.then(() => {
    layout();
    draw();
  });

  let resizeTimer: ReturnType<typeof setTimeout>;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      layout();
      draw();
    }, 120);
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  links.forEach((link) => {
    const on = () => setActive(nodes.find((n) => n.link === link) ?? null);
    const off = () => setActive(null);
    link.addEventListener('pointerenter', on);
    link.addEventListener('focus', on);
    link.addEventListener('pointerleave', off);
    link.addEventListener('blur', off);
  });
}
