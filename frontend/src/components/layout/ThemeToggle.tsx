"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, syncThemeColor, themeKey, type Theme } from "@/lib/theme";

/** Mounted once; themes never turn the page tree into client-rendered content. */
export function ThemeObserver() {
  useEffect(() => {
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystem = () => {
      if (document.documentElement.dataset.themePreference === "system") {
        applyTheme(system.matches ? "dark" : "light", "system");
      }
    };
    const syncStorage = (event: StorageEvent) => {
      if (event.key !== themeKey && event.key !== null) return;
      const explicit = event.newValue === "dark" || event.newValue === "light";
      const theme = explicit ? event.newValue as Theme : system.matches ? "dark" : "light";
      applyTheme(theme, explicit ? theme : "system");
    };
    followSystem();
    const syncBrowserColor = () => syncThemeColor(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    syncBrowserColor();
    // Next may insert route metadata ahead of the explicit browser-color meta.
    // Reordering only when needed settles before paint and avoids observer loops.
    const headObserver = new MutationObserver(syncBrowserColor);
    headObserver.observe(document.head, { childList: true });
    system.addEventListener("change", followSystem);
    window.addEventListener("storage", syncStorage);
    return () => {
      system.removeEventListener("change", followSystem);
      window.removeEventListener("storage", syncStorage);
      headObserver.disconnect();
    };
  }, []);
  return null;
}

export function ThemeToggle({ expanded = false }: { expanded?: boolean }) {
  function toggle() {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(theme, theme);
    try { localStorage.setItem(themeKey, theme); } catch { /* Keep the choice for this page when storage is unavailable. */ }
  }
  // CSS selects the icon AND accessible text from the pre-paint theme attribute.
  // Server and client markup stay identical, without a hydration placeholder.
  return <button type="button" className={expanded ? "theme-toggle theme-toggle-expanded" : "icon-button theme-toggle"} onClick={toggle}>
    <span className="theme-for-dark"><Sun size={19} aria-hidden="true" /><span className={expanded ? "" : "sr-only"}>Switch to light theme</span></span>
    <span className="theme-for-light"><Moon size={19} aria-hidden="true" /><span className={expanded ? "" : "sr-only"}>Switch to dark theme</span></span>
  </button>;
}
