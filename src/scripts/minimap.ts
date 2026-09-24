/**
 * Code seen from far away, like an editor's minimap: columns of token bars
 * in indented blocks. Several cursors write, delete and review at once. Now
 * and then a cursor hands part of its work to two helpers that finish and
 * disappear. The visitor's pointer warms whatever it passes over.
 *
 * The page's section links are declarations inside this code: each one owns
 * a block. Hovering a link makes the cursors come and rewrite that block.
 *
 * No dependencies. Draws nothing but rectangles and a few thin lines.
 */

interface Bar {
  indent: number;
  len: number;
  target: number;
  heat: number;
  blank: boolean;
  text: boolean;
  hold: boolean;
  key: boolean;
  tokens: number[];
}

interface Column {
  x: number;
  width: number;
  bars: Bar[];
}

type Mode = 'write' | 'delete' | 'review' | 'think';

interface Cursor {
  col: number;
  row: number;
  mode: Mode;
  left: number;
  ttl: number;
  depth: number;
  parentRow: number;
  age: number;
  sinceSpawn: number;
}

interface Section {
  link: HTMLAnchorElement;
  col: number;
  row: number;
  end: number;
}

interface Slot {
  col: number;
  y: number;
  indent: number;
}

const SLOTS: Record<number, Slot[]> = {
  1: [
    { col: 0, y: 0.05, indent: 0 },
    { col: 0, y: 0.33, indent: 1 },
    { col: 0, y: 0.6, indent: 2 },
    { col: 0, y: 0.88, indent: 1 },
  ],
  2: [
    { col: 0, y: 0.4, indent: 0 },
    { col: 1, y: 0.12, indent: 1 },
    { col: 1, y: 0.62, indent: 2 },
    { col: 0, y: 0.95, indent: 1 },
  ],
  3: [
    { col: 0, y: 0.45, indent: 0 },
    { col: 2, y: 0.12, indent: 1 },
    { col: 1, y: 0.4, indent: 2 },
    { col: 2, y: 0.82, indent: 1 },
  ],
};

interface RGB {
  r: number;
  g: number;
  b: number;
}

const FPS = 30;
const INDENT = 14;
const GAP = 3;
const TEXT_ROWS = 3;
const INFO_ROWS = 9;

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const irand = (lo: number, hi: number) => Math.floor(rand(lo, hi + 1));
const hex = (s: string): RGB => {
  const v = s.trim().replace('#', '');
  const n = parseInt(v.length === 3 ? v.replace(/./g, (c) => c + c) : v, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};
const mix = (a: RGB, b: RGB, t: number) =>
  `rgb(${a.r + (b.r - a.r) * t | 0},${a.g + (b.g - a.g) * t | 0},${a.b + (b.b - a.b) * t | 0})`;

const tokens = () => {
  const n = irand(1, 4);
  const cuts = Array.from({ length: n }, () => rand(0.5, 2));
  const sum = cuts.reduce((a, b) => a + b, 0);
  return cuts.map((c) => c / sum);
};

const makeBar = (indent: number, room: number): Bar => ({
  indent,
  len: 0,
  target: room * rand(0.12, 0.85),
  heat: 0,
  blank: false,
  text: false,
  hold: false,
  key: Math.random() < 0.3,
  tokens: tokens(),
});

const blankBar = (): Bar => ({ ...makeBar(0, 0), target: 0, blank: true, key: false });

export function mount(canvas: HTMLCanvasElement) {
  const maybeCtx = canvas.getContext('2d', { alpha: false });
  if (!maybeCtx) return;
  const ctx = maybeCtx;

  const css = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => hex(css.getPropertyValue(name) || fallback);
  const bg = read('--bg', '#0b1526');
  const bar = read('--bar', '#1a2540');
  const key = read('--bar-key', '#283358');
  const hot = read('--bar-hot', '#3b5080');
  const cursorColor = css.getPropertyValue('--cursor').trim() || '#f2c94c';
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = matchMedia('(max-width: 720px)').matches;
  const nav = document.querySelector<HTMLElement>('[data-code-nav]');
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-code-link]'));

  const header = document.querySelector('.site-header');
  const PAD = header ? parseFloat(getComputedStyle(header).paddingLeft) || 28 : 28;

  let W = 0;
  let H = 0;
  const rowH = small ? 9 : 8;
  const barH = 3;
  let columns: Column[] = [];
  let cursors: Cursor[] = [];
  let sections: Section[] = [];
  let active: Section | null = null;
  let pointer = { x: -1, y: -1 };
  let born = 0;
  let measuredTop = 0;
  let raf = 0;
  let last = 0;

  function makeColumn(x: number, width: number, rows: number): Column {
    const bars: Bar[] = [];
    const maxLen = width - PAD * 2;
    while (bars.length < rows) {
      const size = irand(3, 14);
      const peak = Math.min(3, Math.floor(size / 3));
      let indent = 0;
      for (let i = 0; i < size && bars.length < rows; i++) {
        indent = i < size / 2 ? Math.min(peak, indent + (Math.random() < 0.6 ? 1 : 0)) : Math.max(1, indent - (Math.random() < 0.6 ? 1 : 0));
        bars.push(makeBar(indent, maxLen - indent * INDENT));
      }
      if (size > 3 && bars.length < rows) bars.push({ ...makeBar(0, maxLen), target: rand(6, 12), key: false, tokens: [1] });
      for (let i = 0; i < irand(1, 2) && bars.length < rows; i++) bars.push(blankBar());
    }
    return { x, width, bars };
  }

  function carveSection(col: Column, row: number, base: number): number {
    const maxLen = col.width - PAD * 2;
    const body = small ? irand(3, 4) : irand(6, 10);
    let r = row;
    col.bars[r - 1] = blankBar();
    for (let i = 0; i < TEXT_ROWS; i++) col.bars[r++] = { ...blankBar(), text: true };
    for (let i = 0; i < body; i++) {
      const indent = base + 1 + (i > 1 && i < body - 1 && Math.random() < 0.5 ? 1 : 0);
      col.bars[r++] = makeBar(indent, maxLen - indent * INDENT);
    }
    col.bars[r++] = { ...makeBar(base, maxLen - base * INDENT), target: rand(6, 12), key: false, tokens: [1] };
    col.bars[r++] = blankBar();
    return r;
  }

  function layout() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth;
    H = innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const n = Math.max(1, Math.floor(W / 480));
    const width = W / n;
    const rows = Math.ceil(H / rowH) + 1;
    columns = Array.from({ length: n }, (_, i) => makeColumn(i * width, width, rows));

    const slots = SLOTS[Math.min(n, 3)];
    const headline = document.querySelector('.poster h1')?.getBoundingClientRect();
    const aside = document.querySelector('.where')?.getBoundingClientRect();
    measuredTop = headline?.top ?? 0;
    const lo = (header?.getBoundingClientRect().bottom ?? 60) + 16;
    const margin = small ? 32 : 110;
    sections = links.map((link, i) => {
      const { col, y, indent } = slots[i % slots.length];
      const left = columns[col].x + PAD + indent * INDENT;
      const blocker = headline && left < headline.right ? headline : aside;
      const hi = Math.max(lo + 40, (blocker?.top ?? H * 0.6) - margin);
      const row = Math.round((lo + y * (hi - lo)) / rowH);
      const end = carveSection(columns[col], row, indent);
      link.style.left = `${columns[col].x + PAD + indent * INDENT}px`;
      link.style.top = `${row * rowH}px`;
      return { link, col, row, end };
    });
    nav?.classList.add('placed');

    cursors = [];
    const mains = small ? 1 : Math.min(3, n + 1);
    for (let i = 0; i < mains; i++) cursors.push(spawn(i % n, 0, 0));
    born = performance.now();
    if (still) for (const c of columns) for (const b of c.bars) b.len = b.target;
  }

  function spawn(col: number, depth: number, parentRow: number): Cursor {
    const rows = columns[col].bars.length;
    return {
      col,
      row: depth ? Math.min(rows - 1, parentRow + irand(4, 24)) : irand(2, rows - 12),
      mode: 'write',
      left: irand(3, 10),
      ttl: depth ? irand(90, 220) : Infinity,
      depth,
      parentRow,
      age: 0,
      sinceSpawn: irand(0, 200),
    };
  }

  function summon(s: Section) {
    const body = { lo: s.row + TEXT_ROWS, hi: s.end - 2 };
    for (const c of cursors) {
      if (c.depth) continue;
      c.col = s.col;
      c.row = irand(body.lo, body.hi);
      c.mode = Math.random() < 0.5 ? 'delete' : 'write';
      c.left = irand(2, 5);
    }
    if (cursors.length < 7) cursors.push(spawn(s.col, 1, body.lo), spawn(s.col, 1, body.lo + 2));
  }

  function setActive(s: Section | null) {
    const hold = (sec: Section, on: boolean) => {
      for (let r = sec.row + TEXT_ROWS; r < sec.row + TEXT_ROWS + INFO_ROWS; r++) {
        const b = columns[sec.col].bars[r];
        if (!b) continue;
        b.hold = on;
        if (still) b.len = on ? 0 : b.target;
      }
    };
    if (active) hold(active, false);
    active = s;
    if (s) hold(s, true);
    if (still) draw();
    else if (s) summon(s);
  }

  function retarget(b: Bar, col: Column) {
    const room = col.width - PAD * 2 - b.indent * INDENT;
    b.target = room * rand(0.12, 0.85);
    b.blank = false;
    b.tokens = tokens();
    b.key = Math.random() < 0.3;
  }

  function step(c: Cursor) {
    const col = columns[c.col];
    const bars = col.bars;
    c.age++;
    c.sinceSpawn++;
    if (c.row >= bars.length - 1 || c.row < 0) c.row = irand(2, bars.length - 12);
    const b = bars[c.row];
    if (b.text || b.hold) {
      c.row++;
      return;
    }

    switch (c.mode) {
      case 'write': {
        if (b.blank && Math.random() < 0.85) {
          c.row++;
          break;
        }
        if (b.blank) retarget(b, col);
        b.len = Math.min(b.target, b.len + rand(3, 9));
        b.heat = 1;
        if (b.len >= b.target) {
          c.row++;
          if (--c.left <= 0) next(c);
        }
        break;
      }
      case 'delete': {
        b.len = Math.max(0, b.len - 16);
        b.heat = 1;
        if (b.len === 0) {
          retarget(b, col);
          c.mode = 'write';
          c.left = irand(1, 4);
        }
        break;
      }
      case 'review': {
        b.heat = Math.max(b.heat, 0.55);
        if (c.age % 2 === 0) c.row++;
        if (--c.left <= 0) {
          if (!b.blank && Math.random() < 0.35) c.mode = 'delete';
          else next(c);
        }
        break;
      }
      case 'think': {
        if (--c.left <= 0) next(c);
        break;
      }
    }
  }

  function next(c: Cursor) {
    const r = Math.random();
    if (r < 0.35) {
      c.mode = 'think';
      c.left = irand(8, 40);
    } else if (r < 0.6) {
      c.mode = 'review';
      c.left = irand(8, 30);
    } else {
      c.mode = 'write';
      c.left = irand(2, 10);
      if (Math.random() < 0.4) c.row = irand(2, columns[c.col].bars.length - 12);
    }
  }

  function boot(now: number) {
    const progress = (now - born) / 1400;
    columns.forEach((col, ci) => {
      col.bars.forEach((b, ri) => {
        const at = (ri / col.bars.length) * 0.6 + ci * 0.12;
        b.len = b.target * Math.max(0, Math.min(1, (progress - at) / 0.25));
      });
    });
    return progress < 1.2;
  }

  function tick(now: number) {
    if (boot(now)) return;

    for (const c of cursors) step(c);

    for (const c of cursors) {
      if (c.depth === 0 && c.sinceSpawn > FPS * rand(9, 18) && cursors.length < 7) {
        c.sinceSpawn = 0;
        const other = columns.length > 1 ? (c.col + 1) % columns.length : c.col;
        cursors.push(spawn(c.col, 1, c.row), spawn(other, 1, c.row));
      }
    }
    cursors = cursors.filter((c) => c.age < c.ttl);

    for (const col of columns) {
      for (const b of col.bars) {
        if (b.heat > 0) b.heat *= 0.965;
        if (b.hold && b.len > 0) b.len = Math.max(0, b.len - 24);
        else if (!b.hold && !b.blank && b.len < b.target && b.heat < 0.2) {
          b.len = Math.min(b.target, b.len + 4);
          b.heat = 0.6;
        }
      }
    }

    if (pointer.x >= 0) {
      const ci = Math.min(columns.length - 1, Math.floor(pointer.x / columns[0].width));
      const col = columns[ci];
      const ri = Math.floor(pointer.y / rowH);
      for (let d = -3; d <= 3; d++) {
        const b = col.bars[ri + d];
        if (!b || b.blank || b.hold) continue;
        b.heat = Math.max(b.heat, 0.7 - Math.abs(d) * 0.18);
      }
    }
  }

  function drawBar(b: Bar, x: number, y: number) {
    let at = 0;
    for (const t of b.tokens) {
      const w = Math.min(b.len - at, t * b.target - GAP);
      if (w <= 0) break;
      ctx.fillStyle = b.heat > 0.01 ? mix(b.key && at === 0 ? key : bar, hot, Math.min(1, b.heat)) : mix(b.key && at === 0 ? key : bar, bar, 0);
      ctx.fillRect(x + at, y, w, barH);
      at += t * b.target;
    }
  }

  function draw() {
    ctx.fillStyle = mix(bg, bg, 0);
    ctx.fillRect(0, 0, W, H);

    for (const col of columns) {
      const x0 = col.x + PAD;
      col.bars.forEach((b, i) => {
        if (b.len <= 0) return;
        drawBar(b, x0 + b.indent * INDENT, i * rowH + (rowH - barH) / 2);
      });
    }

    if (still) return;
    ctx.fillStyle = cursorColor;
    ctx.strokeStyle = cursorColor;
    ctx.lineWidth = 1;
    for (const c of cursors) {
      const col = columns[c.col];
      const b = col.bars[c.row];
      if (!b || b.text) continue;
      const x = col.x + PAD + b.indent * INDENT + b.len + 2;
      const y = c.row * rowH;
      const blink = c.mode === 'think' && Math.floor(c.age / (FPS / 2)) % 2 === 1;
      if (!blink) {
        ctx.globalAlpha = c.depth ? 0.75 : 1;
        ctx.fillRect(x, y + 1, 2, rowH - 2);
      }
      if (c.depth && c.age < FPS) {
        ctx.globalAlpha = 0.3 * (1 - c.age / FPS);
        ctx.beginPath();
        ctx.moveTo(col.x + PAD - 10, c.parentRow * rowH + rowH / 2);
        ctx.lineTo(col.x + PAD - 10, y + rowH / 2);
        ctx.lineTo(x, y + rowH / 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
  }

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    if (now - last < 1000 / FPS) return;
    last = now;
    tick(now);
    draw();
  }

  function start() {
    if (still || raf) return;
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
    const top = document.querySelector('.poster h1')?.getBoundingClientRect().top ?? 0;
    if (Math.abs(top - measuredTop) > 8) {
      layout();
      draw();
    }
  });

  let resizeTimer: ReturnType<typeof setTimeout>;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      layout();
      draw();
    }, 120);
  });
  addEventListener('pointermove', (e) => {
    if (e.pointerType === 'mouse') pointer = { x: e.clientX, y: e.clientY };
  });
  addEventListener('pointerleave', () => (pointer = { x: -1, y: -1 }));
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  links.forEach((link, i) => {
    const on = () => setActive(sections[i]);
    const off = () => setActive(null);
    link.addEventListener('pointerenter', on);
    link.addEventListener('focus', on);
    link.addEventListener('pointerleave', off);
    link.addEventListener('blur', off);
  });
}
