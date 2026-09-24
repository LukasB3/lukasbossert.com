// Renders public/og.png (1200x630) from an SVG. Needs Archivo visible to
// fontconfig (see CLAUDE.md); falls back to a system sans otherwise.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const W = 1200;
const H = 630;
const bg = '#eef0f3';
const ink = '#14171c';
const ink2 = '#5b6270';
const line = '#b8bec9';
const accent = '#0f7a5c';
const font = 'Archivo, Helvetica Neue, Arial, sans-serif';

const nodes = [
  [120, 400], [120, 520],
  [400, 380], [400, 460], [400, 540],
  [700, 400], [700, 520],
  [980, 460],
];
const links = [[0, 2], [0, 3], [1, 3], [1, 4], [2, 5], [3, 5], [3, 6], [4, 6], [5, 7], [6, 7]];
const route = ([ax, ay], [bx, by]) => {
  const xm = (ax + bx) / 2;
  return `M${ax} ${ay}H${xm}V${by}H${bx}`;
};
const wires = links.map(([a, b], i) => `<path d="${route(nodes[a], nodes[b])}" fill="none" stroke="${i === 3 || i === 7 ? accent : line}" stroke-width="${i === 3 || i === 7 ? 2 : 1.5}"/>`).join('');
const boxes = nodes.map(([x, y], i) => `<rect x="${x - 8}" y="${y - 8}" width="16" height="16" fill="${i < 2 ? ink : bg}" stroke="${ink}" stroke-width="1.5"/>`).join('');
const packets = [[250, 400], [560, 460], [840, 400]].map(([x, y], i) => `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" fill="${i === 1 ? accent : ink}"/>`).join('');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${bg}"/>
  ${wires}${boxes}${packets}
  <text x="64" y="150" font-family="${font}" font-weight="700" font-stretch="expanded" font-size="58" letter-spacing="-1.5" fill="${ink}">Software engineer focused on</text>
  <text x="64" y="214" font-family="${font}" font-weight="700" font-stretch="expanded" font-size="58" letter-spacing="-1.5" fill="${ink}">reliable data pipelines and</text>
  <text x="64" y="278" font-family="${font}" font-weight="700" font-stretch="expanded" font-size="58" letter-spacing="-1.5" fill="${ink}">practical AI integration.</text>
  <text x="${W - 64}" y="${H - 56}" text-anchor="end" font-family="${font}" font-size="24" fill="${ink2}">Lukas Bossert, Ulm</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(new URL('../public/og.png', import.meta.url), png);
console.log(`og.png written (${(png.length / 1024).toFixed(1)} kB)`);
