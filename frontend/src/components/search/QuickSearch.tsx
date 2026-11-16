"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Search } from "lucide-react";

const SearchDialog = dynamic(() => import("./SearchDialog"), { ssr: false });
const subscribePlatform = () => () => {};
const platformShortcut = () => /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K";
export function QuickSearch() {
  const [open, setOpen] = useState(false);
  const shortcut = useSyncExternalStore(subscribePlatform, platformShortcut, () => "Ctrl K");
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest('input,textarea,select,[contenteditable="true"],[role="textbox"]')) return;
      if (document.querySelector("dialog[open]")) return;
      if ((event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);
  return <><button className="search-trigger" type="button" aria-label="Search portfolio" aria-haspopup="dialog" onClick={() => setOpen(true)}><Search size={18} aria-hidden="true" /><span>Search</span><kbd>{shortcut}</kbd></button>{open && <SearchDialog onClose={() => setOpen(false)} />}</>;
}
