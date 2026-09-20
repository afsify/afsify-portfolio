import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sources = path.resolve(root, "../ref-files");
const brandOnly = process.argv.includes("--brand-only");
const photosOnly = process.argv.includes("--photos-only");
if (!brandOnly) {
  const photographs = [
    ["profile-pic.png", "profile/muhammed-afsal.webp", 1254],
    ["levalor-pms-software-completion-momento-from-cp-ali-bava-haji.jpg", "experience/levalor-delivery.webp", 1906],
    ["one-year-at-bizforz-momento-from-manager.jpg", "experience/bizforz-anniversary.webp", 2304],
    ["graduting-from-brocamp.jpg", "experience/brototype-graduation.webp", 2048],
  ];
  const imageAudit = [];
  for (const [source, destination, width] of photographs) {
    const input = path.join(sources, source);
    const output = path.join(root, "public/images", destination);
    const original = await sharp(input).metadata();
    await fs.mkdir(path.dirname(output), { recursive: true });
    // Work only from originals. Retain native detail, auto-orient, strip metadata;
    // never enlarge, sharpen, denoise or otherwise change the photographs.
    const result = await sharp(input).rotate().resize({ width, withoutEnlargement: true })
      .webp({ quality: 92, effort: 6, smartSubsample: true }).toFile(output);
    imageAudit.push({ source, destination, sourceWidth: original.width, sourceHeight: original.height,
      outputWidth: result.width, outputHeight: result.height, quality: 92, bytes: result.size });
    console.log(`${destination}: ${result.width}x${result.height}, WebP quality 92, ${result.size} bytes`);
  }
  await fs.mkdir(path.join(root, "artifacts/image-theme-fix"), { recursive: true });
  await fs.writeFile(path.join(root, "artifacts/image-theme-fix/image-generation.json"),
    JSON.stringify({ checkedAt: new Date().toISOString(), images: imageAudit }, null, 2));
  if (!photosOnly) {
    await fs.mkdir(path.join(root, "public/documents"), { recursive: true });
    await fs.copyFile(path.join(sources, "Muhammed_Afsal_Resume.docx"), path.join(root, "public/documents/muhammed-afsal-resume.docx"));
    await fs.mkdir(path.join(root, "public/images/brand"), { recursive: true });
    await sharp(path.join(sources, "afsify-logo.png")).rotate().resize({ width: 100, withoutEnlargement: true })
      .webp({ quality: 84 }).toFile(path.join(root, "public/images/brand/afs-mark.webp"));
    await fs.mkdir(path.join(root, "src/app/fonts"), { recursive: true });
    await fs.copyFile(path.join(root, "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2"), path.join(root, "src/app/fonts/manrope-latin.woff2"));
    await fs.copyFile(path.join(root, "node_modules/@fontsource-variable/manrope/LICENSE"), path.join(root, "src/app/fonts/OFL.txt"));
  }
}
if (!photosOnly) {
// Fixed brand artwork deliberately uses the flagship graphite/platinum palette.
const brand = { graphite: "#111315", platinum: "#D2D6DA", text: "#F4F4F1", muted: "#A7ACB0", border: "#33383D" };
const mark = (await sharp(path.join(root, "public/images/brand/afs-mark.webp")).png().toBuffer()).toString("base64");
const preview = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="${brand.graphite}"/><rect x="72" y="70" width="12" height="12" rx="6" fill="${brand.platinum}"/><text x="104" y="85" font-family="Arial,sans-serif" font-size="25" fill="${brand.platinum}">AFSIFY / DEVELOPER PORTFOLIO</text><image x="1032" y="50" width="96" height="96" href="data:image/png;base64,${mark}"/><text x="68" y="270" font-family="Arial,sans-serif" font-size="106" letter-spacing="-5" fill="${brand.text}">Muhammed</text><text x="68" y="387" font-family="Arial,sans-serif" font-size="106" letter-spacing="-5" fill="${brand.platinum}">Afsal.</text><path d="M1000 230h95v95m-3-92-164 164" fill="none" stroke="${brand.platinum}" stroke-width="10"/><path d="M72 465H1128" stroke="${brand.border}"/><text x="72" y="526" font-family="Arial,sans-serif" font-size="27" fill="${brand.text}">Frontend Developer @ Bizforz</text><text x="72" y="565" font-family="Arial,sans-serif" font-size="23" fill="${brand.muted}">Full Stack Web Developer · Calicut, Kerala</text></svg>`;
await sharp(Buffer.from(preview)).png().toFile(path.join(root, "public/images/brand/social-preview.png"));
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" rx="38" fill="${brand.graphite}"/><g fill="none" stroke="${brand.platinum}" stroke-width="12" stroke-linecap="square" stroke-linejoin="miter"><path d="M30 131 58 49 86 131M41 104H75"/><path d="M109 131V49H150M111 88H144"/></g></svg>`;
await fs.writeFile(path.join(root, "src/app/icon.svg"), icon);
await sharp(Buffer.from(icon)).png().toFile(path.join(root, "src/app/apple-icon.png"));
}
