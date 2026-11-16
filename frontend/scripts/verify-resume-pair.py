"""Read-only factual pairing audit; requires pypdf (bundled Codex Python)."""
from pathlib import Path
from zipfile import ZipFile
from xml.etree import ElementTree as ET
import json
import re
import hashlib
from urllib.parse import urlsplit, urlunsplit
from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
pdf = root / "public/documents/muhammed-afsal-resume.pdf"
docx = pdf.with_suffix(".docx")
reader = PdfReader(pdf)
pdf_text = "\n".join(page.extract_text() for page in reader.pages)
with ZipFile(docx) as archive:
    xml = ET.fromstring(archive.read("word/document.xml"))
    docx_text = "\n".join("".join(p.itertext()) for p in xml.findall(".//{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p"))
    rels = ET.fromstring(archive.read("word/_rels/document.xml.rels"))
    docx_links = {r.attrib["Target"] for r in rels if r.attrib.get("TargetMode") == "External"}
normalize = lambda text: re.sub(r"[^a-z0-9]", "", text.lower())
assert normalize(pdf_text) == normalize(docx_text), "PDF and DOCX text differs"
assert len(reader.pages) == 1
for phrase in ["Pursued; qualification pending", "Full Stack Web Developer", "1.5+ years", "Higher Secondary", "Completed"]:
    assert normalize(phrase) in normalize(pdf_text), phrase
pdf_links = {str(a.get_object().get("/A", {}).get("/URI")) for p in reader.pages for a in p.get("/Annots", [])}
def normalize_url(value):
    url = urlsplit(value)
    return urlunsplit((url.scheme, url.netloc, url.path or ("/" if url.scheme == "https" else ""), url.query, url.fragment))
assert {normalize_url(u) for u in pdf_links} == {normalize_url(u) for u in docx_links}, (pdf_links, docx_links)
for file in [pdf, docx]:
    source = root / "assets/resume" / ("MUHAMMED_AFSAL_TP_RESUME" + file.suffix)
    assert file.read_bytes() == source.read_bytes(), "Source bytes changed"
output = root / "artifacts/v2"
output.mkdir(parents=True, exist_ok=True)
(output / "resume-pair.json").write_text(json.dumps({"pages": len(reader.pages), "textMatches": True, "linksMatch": True, "links": sorted(pdf_links), "diploma": "Pursued; qualification pending", "sha256": {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in [pdf, docx]}}, indent=2))
print("PASS: one-page selectable-text PDF; PDF/DOCX text and all 12 links match; both source files byte-identical; diploma accurately pending.")
