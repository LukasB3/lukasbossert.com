// Renders public/og.png (1200x630) from an SVG. Needs Bricolage Grotesque visible
// to fontconfig (see CLAUDE.md); falls back to a system sans otherwise.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const W = 1200;
const H = 630;
const bg = '#0b1526';
const ink = '#ede7da';
const ink2 = '#97a0b3';
const bar = '#1a2540';
const hot = '#3b5080';
const cursor = '#f2c94c';
const font = 'Bricolage Grotesque, Helvetica Neue, Arial, sans-serif';

let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const rowH = 12;
const bars = [];
for (const x0 of [40, 640]) {
  let indent = 0;
  let inBlock = 0;
  for (let y = 24; y < H; y += rowH) {
    if (inBlock <= 0) {
      if (rnd() < 0.5) { inBlock = 0; continue; }
      inBlock = 3 + Math.floor(rnd() * 9);
      indent = 0;
    }
    indent = Math.max(0, Math.min(3, indent + (rnd() < 0.5 ? 1 : -1)));
    const len = (420 - indent * 20) * (0.15 + rnd() * 0.7);
    const warm = rnd() < 0.08;
    bars.push(`<rect x="${x0 + indent * 20}" y="${y}" width="${len.toFixed(0)}" height="4" fill="${warm ? hot : bar}"/>`);
    if (warm && rnd() < 0.5) bars.push(`<rect x="${(x0 + indent * 20 + len + 3).toFixed(0)}" y="${y - 2}" width="3" height="8" fill="${cursor}"/>`);
    inBlock--;
  }
}

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${bg}"/>
  ${bars.join('')}
  <text x="64" y="92" font-family="${font}" font-weight="600" font-size="30" fill="${ink}">Lukas Bossert</text>
  <text x="64" y="414" font-family="${font}" font-weight="500" font-size="62" letter-spacing="-1.5" fill="${ink}">Software engineer focused on reliable</text>
  <text x="64" y="482" font-family="${font}" font-weight="500" font-size="62" letter-spacing="-1.5" fill="${ink}">data pipelines and practical AI integration.</text>
  <text x="${W - 64}" y="92" text-anchor="end" font-family="${font}" font-size="26" fill="${ink2}">lukasbossert.com</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(new URL('../public/og.png', import.meta.url), png);
console.log(`og.png written (${(png.length / 1024).toFixed(1)} kB)`);
