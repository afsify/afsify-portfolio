export type Theme = "dark" | "light";
export const themeKey = "afsify-theme";
export const themeColors: Record<Theme, string> = { dark: "#111315", light: "#F4F4F1" };

// React matches hoisted metadata by name/content. Equivalent RGB notation keeps
// this explicit override distinct from the framework's hexadecimal fallbacks.
function browserThemeColor(theme: Theme) {
  const hex = themeColors[theme].slice(1);
  return `rgb(${[0, 2, 4].map((index) => parseInt(hex.slice(index, index + 2), 16)).join(", ")})`;
}

// Runs synchronously in the document head before any page content is painted.
// Only theme preference is read; unavailable storage falls back to the system.
export const themeInitScript = `(()=>{const d=document.documentElement;let p=null;try{p=localStorage.getItem('${themeKey}')}catch{}const explicit=p==='dark'||p==='light';const t=explicit?p:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.dataset.theme=t;d.dataset.themePreference=explicit?t:'system';const m=document.createElement('meta');m.name='theme-color';m.id='afsify-theme-color';m.content=t==='dark'?'${browserThemeColor("dark")}':'${browserThemeColor("light")}';document.head.prepend(m)})();`;

export function applyTheme(theme: Theme, preference: Theme | "system") {
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePreference = preference;
  syncThemeColor(theme);
}

export function syncThemeColor(theme: Theme) {
  // The first matching meta controls browser chrome. Keep the explicit override
  // separate from Next's conditional metadata, including after route changes.
  const meta = document.querySelector<HTMLMetaElement>("#afsify-theme-color") ?? document.createElement("meta");
  meta.id = "afsify-theme-color";
  meta.name = "theme-color";
  if (meta.content !== browserThemeColor(theme)) meta.content = browserThemeColor(theme);
  const first = document.head.querySelector('meta[name="theme-color"]');
  if (first !== meta) document.head.insertBefore(meta, first);
}
