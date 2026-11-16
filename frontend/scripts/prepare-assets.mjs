import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Default refresh is brand-only. Existing approved artwork is never overwritten.
// Use --preview to generate a complete review set under ignored artifacts/.
const preview = process.argv.includes('--preview');
const photosOnly = process.argv.includes('--photos-only');
if (photosOnly) {
  const approved = JSON.parse(await fs.readFile(path.join(root, 'scripts/approved-assets.json'), 'utf8'));
  const crypto = await import('node:crypto');
  for (const asset of approved.assets.filter((item) => item.file.includes('/images/'))) {
    const bytes = await fs.readFile(path.join(root, asset.file));
    if (crypto.createHash('sha256').update(bytes).digest('hex') !== asset.sha256) throw Error(`Photo changed: ${asset.file}`);
  }
  console.log('Approved photographs verified. Photo regeneration requires an explicitly reviewed source update; no files changed.');
} else {
  const original = path.join(root, 'assets/brand/afsify-logo-original.png');
  const source = await fs.readFile(original);
  const meta = await sharp(source).metadata();
  if (meta.format !== 'png' || meta.width !== meta.height) throw Error('Expected approved square AFS original PNG');
  const output = preview ? path.join(root, 'artifacts/v2/brand-preview') : root;
  async function save(relative, bytes) {
    const target = path.join(output, relative);
    await fs.mkdir(path.dirname(target), { recursive: true });
    try { await fs.writeFile(target, bytes, { flag: 'wx' }); console.log(`Created ${relative}`); }
    catch (error) { if (error.code !== 'EEXIST') throw error; console.log(`Preserved ${relative}`); }
  }
  const icon = async (size) => sharp(source).resize(size, size).png().toBuffer();
  await save('public/images/brand/afs-mark.webp', await sharp(source).resize(200, 200).webp({ quality: 92 }).toBuffer());
  await save('src/app/icon.png', await icon(512));
  await save('src/app/apple-icon.png', await sharp(source).resize(180, 180).flatten({ background: '#111315' }).png().toBuffer());
  const sizes = [16, 32, 48, 64];
  const frames = await Promise.all(sizes.map(icon));
  const header = Buffer.alloc(6 + sizes.length * 16); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  frames.forEach((frame, i) => { const entry = 6 + i * 16; header[entry] = sizes[i]; header[entry + 1] = sizes[i]; header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6); header.writeUInt32LE(frame.length, entry + 8); header.writeUInt32LE(offset, entry + 12); offset += frame.length; });
  await save('src/app/favicon.ico', Buffer.concat([header, ...frames]));
  const mark = (await icon(140)).toString('base64');
  const social = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#111315"/><text x="72" y="88" font-family="Arial,sans-serif" font-size="25" fill="#D2D6DA">AFSIFY / DEVELOPER PORTFOLIO</text><image x="990" y="55" width="140" height="140" href="data:image/png;base64,${mark}"/><text x="68" y="278" font-family="Arial,sans-serif" font-size="100" fill="#F4F4F1">Muhammed</text><text x="68" y="388" font-family="Arial,sans-serif" font-size="100" fill="#D2D6DA">Afsal TP.</text><path d="M72 454H1128" stroke="#33383D"/><text x="72" y="518" font-family="Arial,sans-serif" font-size="27" fill="#F4F4F1">FULL STACK DEVELOPER / REACT, NEXT.JS &amp; NODE.JS</text><text x="72" y="566" font-family="Arial,sans-serif" font-size="23" fill="#A7ACB0">Professional frontend experience at Bizforz · Kerala, India</text></svg>`;
  await save('public/images/brand/social-preview.png', await sharp(Buffer.from(social)).png().toBuffer());
  console.log('AFS-origin refresh complete. Existing artwork, photos and resumes preserved.');
}
