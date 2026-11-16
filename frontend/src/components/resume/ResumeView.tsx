"use client";

import { useEffect, useState, type ReactNode } from "react";
import { profile } from "@/data/profile";

export function ResumeView({ children }: { children: ReactNode }) {
  const [preview, setPreview] = useState(false);
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return <><div className="resume-tabs" role="tablist" aria-label="Resume view">{[false, true].map((value) => <button key={String(value)} id={value ? "preview-tab" : "overview-tab"} role="tab" type="button" aria-selected={preview === value} aria-controls={value ? "pdf-panel" : "overview-panel"} tabIndex={preview === value ? 0 : -1} onClick={() => setPreview(value)} onKeyDown={(event) => {
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      event.preventDefault(); const next = event.key === "Home" ? false : event.key === "End" ? true : !preview;
      setPreview(next); document.getElementById(next ? "preview-tab" : "overview-tab")?.focus();
    }
  }}>{value ? "PDF Preview" : "Resume Overview"}</button>)}</div>
    <div id="overview-panel" role="tabpanel" aria-labelledby="overview-tab" className={`resume-overview${preview ? " resume-overview-hidden" : ""}`} tabIndex={0}>{children}</div>
    {preview && <div id="pdf-panel" role="tabpanel" aria-labelledby="preview-tab" tabIndex={0} className="pdf-panel"><h2>Selected resume · PDF</h2><p>One page, selectable text. If the viewer is unavailable, open or download the file directly.</p><div className="button-row"><a href={profile.resume.pdf} target="_blank" rel="noopener noreferrer" className="button button-dark">Open PDF in new tab<span className="sr-only"> (opens in new tab)</span></a><a href={profile.resume.pdf} download className="text-link">Download PDF</a></div>{desktop ? <iframe title="Muhammed Afsal TP resume PDF preview" src={profile.resume.pdf} className="pdf-viewer" /> : <p>On smaller screens, use Open PDF for a readable full-screen view.</p>}</div>}
  </>;
}
