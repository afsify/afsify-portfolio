import assert from "node:assert/strict";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import sharp from "sharp";
const checks = [];
for (const [file, format, width, height] of [
  ["assets/brand/afsify-logo-original.png", "png", 500, 500],
  ["public/images/brand/afs-mark.webp", "webp", 200, 200],
  ["public/images/brand/social-preview.png", "png", 1200, 630],
  ["src/app/apple-icon.png", "png", 180, 180],
  ["src/app/icon.png", "png", 512, 512],
]) { const m = await sharp(file).metadata(); assert.deepEqual([m.format, m.width, m.height], [format, width, height]); checks.push({ file, format, width, height }); }
const ico = await fs.readFile("src/app/favicon.ico");
assert.equal(ico.readUInt16LE(0), 0); assert.equal(ico.readUInt16LE(2), 1);
const frames = [];
for (let i = 0; i < ico.readUInt16LE(4); i++) {
  const offset = 6 + i * 16, size = ico[offset] || 256, length = ico.readUInt32LE(offset + 8), start = ico.readUInt32LE(offset + 12);
  assert(start + length <= ico.length);
  const bytes = ico.subarray(start, start + length), m = await sharp(bytes).metadata();
  assert.equal(m.width, size); assert.equal(m.height, size); frames.push({ size, bytes });
}
for (const size of [16, 32, 48]) assert(frames.some(frame => frame.size === size));
const baseline = JSON.parse(await fs.readFile("scripts/approved-brand-assets.json", "utf8"));
for (const entry of baseline.assets) assert.equal(crypto.createHash("sha256").update(await fs.readFile(entry.file)).digest("hex"), entry.sha256, `Approved AFS asset: ${entry.file}`);
let initial = [];
try { initial = JSON.parse((await fs.readFile("artifacts/v2/initial-binary-hashes.json", "utf8")).replace(/^\uFEFF/, "")); }
catch (error) { if (error.code !== "ENOENT") throw error; }
for (const entry of initial) {
  const relative = entry.Path.replaceAll("\\", "/").split("/frontend/")[1];
  const final = relative.startsWith("public/documents/MUHAMMED") ? relative.replace("public/documents/", "assets/resume/") : relative;
  const hash = crypto.createHash("sha256").update(await fs.readFile(final)).digest("hex").toUpperCase();
  assert.equal(hash, entry.Hash, `User supplied binary preserved: ${relative}`);
}
// Review actual ICO pixels at native size on both theme backgrounds.
const composites = [];
for (const [row, background] of ["#111315", "#F4F4F1"].entries()) {
  composites.push({ input: await sharp({ create: { width: 400, height: 100, channels: 4, background } }).png().toBuffer(), left: 0, top: row * 100 });
  frames.forEach((frame, index) => composites.push({ input: frame.bytes, left: index * 100 + 16, top: row * 100 + 16 }));
}
await fs.mkdir("artifacts/v2", { recursive: true });
await sharp({ create: { width: 400, height: 200, channels: 4, background: "transparent" } }).composite(composites).png().toFile("artifacts/v2/icon-sizes.png");
await fs.writeFile("artifacts/v2/brand-results.json", JSON.stringify({ checks, icoSizes: frames.map(f => f.size), originalBinariesPreserved: initial.length }, null, 2));
console.log(`PASS: original AFS assets and selected resumes unchanged; image encodings/dimensions and ICO ${frames.map(f => f.size).join('/')}px frames verified.`);
