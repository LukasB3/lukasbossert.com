// Renders public/og.png (1200x630) from an SVG. Needs the site fonts visible to
// fontconfig (see CLAUDE.md); falls back to system serif/mono otherwise.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const W = 1200;
const H = 630;
const bg = '#151412';
const ink = '#e8e4dc';
const ink3 = '#6e685f';
const accent = '#c4794a';

const grid = [];
for (let x = 40; x < W; x += 32) for (let y = 40; y < H; y += 32) grid.push(`<rect x="${x}" y="${y}" width="1.5" height="1.5" fill="${ink}" fill-opacity="0.08"/>`);

// a small cluster of agents, bottom right
const pts = [
  [880, 420], [930, 372], [990, 400], [1040, 350], [1080, 430], [960, 470], [1020, 500], [900, 500], [1110, 500],
];
const links = [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [0, 7], [4, 8], [6, 8]];
const agents = [
  ...links.map(([a, b]) => `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>`),
  ...pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="${ink}"/>`),
  `<circle cx="1000" cy="440" r="42" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="1.5"/>`,
].join('');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${bg}"/>
  ${grid.join('')}
  <line x1="80" y1="120" x2="80" y2="${H - 120}" stroke="#2a2723" stroke-width="2"/>
  <text x="112" y="150" font-family="IBM Plex Mono, DejaVu Sans Mono, monospace" font-size="20" letter-spacing="2" fill="${ink3}">SOFTWARE ENGINEER · ULM</text>
  <text x="112" y="250" font-family="Newsreader, DejaVu Serif, serif" font-size="92" fill="${ink}">Lukas Bossert</text>
  <text x="112" y="330" font-family="Newsreader, DejaVu Serif, serif" font-size="36" fill="${ink}" fill-opacity="0.85">Software with agents, and the question</text>
  <text x="112" y="378" font-family="Newsreader, DejaVu Serif, serif" font-size="36" fill="${ink}" fill-opacity="0.85">of what they are.</text>
  <text x="112" y="${H - 96}" font-family="IBM Plex Mono, DejaVu Sans Mono, monospace" font-size="20" letter-spacing="1" fill="${ink3}">lukasbossert.com</text>
  ${agents}
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(new URL('../public/og.png', import.meta.url), png);
console.log(`og.png written (${(png.length / 1024).toFixed(1)} kB)`);
