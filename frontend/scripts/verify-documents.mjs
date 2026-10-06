import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { inflateRawSync } from "node:zlib";

// Read the known approved DOCX package without a new runtime dependency.
function zipEntry(bytes, name) {
  const end = bytes.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  assert(end >= 0, "DOCX ZIP directory missing");
  let cursor = bytes.readUInt32LE(end + 16);
  for (let i = 0; i < bytes.readUInt16LE(end + 10); i++) {
    assert.equal(bytes.readUInt32LE(cursor), 0x02014b50);
    const method = bytes.readUInt16LE(cursor + 10), size = bytes.readUInt32LE(cursor + 20);
    const length = bytes.readUInt16LE(cursor + 28), extra = bytes.readUInt16LE(cursor + 30), comment = bytes.readUInt16LE(cursor + 32);
    if (bytes.subarray(cursor + 46, cursor + 46 + length).toString() === name) {
      const offset = bytes.readUInt32LE(cursor + 42);
      const start = offset + 30 + bytes.readUInt16LE(offset + 26) + bytes.readUInt16LE(offset + 28);
      const data = bytes.subarray(start, start + size);
      assert([0, 8].includes(method));
      return (method === 8 ? inflateRawSync(data) : data).toString("utf8");
    }
    cursor += 46 + length + extra + comment;
  }
  throw new Error(`Missing DOCX entry: ${name}`);
}

export async function verifyDocuments(profile, projects) {
  const pdf = await fs.readFile(`public${profile.resume.pdf}`);
  const docx = await fs.readFile(`public${profile.resume.docx}`);
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  const relations = zipEntry(docx, "word/_rels/document.xml.rels");
  const content = zipEntry(docx, "word/document.xml");
  const documentText = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  for (const text of ["MUHAMMED AFSAL", "Bizforz", "PostgreSQL", "sole normal runtime data authority", "1.5+ years"]) assert(documentText.includes(text), `Approved resume content: ${text}`);
  const requiredLinks = [profile.phone.href, `mailto:${profile.email}`, ...profile.socials.slice(0, 2).map((social) => social.href), "https://www.afsify.com/", ...projects.filter((p) => ["ekavio", "afssian"].includes(p.slug)).flatMap((p) => [p.live.url, p.github])];
  for (const url of requiredLinks) {
    assert(relations.includes(`Target="${url}"`), `DOCX link missing: ${url}`);
    assert(pdf.toString("latin1").includes(`/URI(${url})`), `PDF link missing: ${url}`);
  }
  return { formats: ["PDF", "DOCX"], requiredLinks, preservedLinks: true };
}
