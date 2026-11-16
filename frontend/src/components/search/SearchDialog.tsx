"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, ArrowUpRight } from "lucide-react";
import { searchIndex } from "@/data/search";
import { searchEntries, safeSearchHref, type SearchEntry } from "@/lib/search";

export default function SearchDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const results = searchEntries(searchIndex, query);
  const groups = ["Navigate", "Projects", "Services", "Actions"] as const;
  // Keep keyboard order identical to the visually grouped list.
  const ordered = groups.flatMap((group) => results.filter((entry) => entry.group === group));
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    input.current?.focus();
    return () => { node.close(); document.body.style.overflow = overflow; previous?.focus({ preventScroll: true }); };
  }, []);
  useEffect(() => { document.getElementById(`search-option-${selected}`)?.scrollIntoView({ block: "nearest" }); }, [selected]);
  function activate(entry: SearchEntry) {
    if (!safeSearchHref(entry.href)) return;
    onClose();
    if (entry.href.startsWith("/")) {
      if (entry.href.startsWith("/projects#")) window.dispatchEvent(new Event("afsify:show-all-projects"));
      router.push(entry.href);
    }
    else if (entry.href.startsWith("https:")) window.open(entry.href, "_blank", "noopener,noreferrer");
    else window.location.assign(entry.href);
  }
  return <dialog ref={dialog} className="search-dialog" aria-labelledby="search-title" aria-describedby="search-help" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => {
    if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose(); }
  }} onKeyDown={(event) => {
    if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
    if (event.key === "Tab") {
      const close = event.currentTarget.querySelector<HTMLButtonElement>("button");
      event.preventDefault();
      if (document.activeElement === input.current) close?.focus();
      else input.current?.focus();
    }
  }}>
    <div className="search-heading"><h2 id="search-title">Search portfolio</h2><button type="button" className="icon-button" aria-label="Close search" onClick={onClose}><X size={20} /></button></div>
    <p id="search-help">Find work, skills, services or a way to get in touch. Use ↑ ↓ and Enter.</p>
    <label htmlFor="portfolio-search" className="sr-only">Search pages and quick actions</label>
    <input ref={input} id="portfolio-search" type="search" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="search-results" aria-activedescendant={ordered.length ? `search-option-${selected}` : undefined} placeholder="Try React, EkaVio or resume…" maxLength={100} autoComplete="off" value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0); }} onKeyDown={(event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); if (ordered.length) setSelected((value) => (value + (event.key === "ArrowDown" ? 1 : -1) + ordered.length) % ordered.length); }
      if (event.key === "Enter") { event.preventDefault(); if (ordered[selected]) activate(ordered[selected]); }
    }} />
    <p className="search-count" role="status" aria-live="polite">{ordered.length ? `${ordered.length} results` : "No results. Try a project name, skill or service."}</p>
    <div id="search-results" role="listbox" aria-label="Search results" className="search-results">{groups.map((group) => {
      const items = ordered.filter((entry) => entry.group === group);
      return items.length ? <div key={group} role="group" aria-labelledby={`search-group-${group}`}><div id={`search-group-${group}`} className="eyebrow">{group}</div>{items.map((entry) => {
        const index = ordered.indexOf(entry);
        return <div id={`search-option-${index}`} key={entry.href} role="option" aria-selected={index === selected} onMouseDown={(event) => event.preventDefault()} onClick={() => activate(entry)} className="search-option"><span>{entry.title}{entry.href.startsWith("https:") && <span className="sr-only"> (opens in new tab)</span>}</span><ArrowUpRight size={17} aria-hidden="true" /></div>;
      })}</div> : null;
    })}</div>
  </dialog>;
}
