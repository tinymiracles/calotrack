import { ColorTheme } from "./types";

export interface ThemeDef {
  id: ColorTheme;
  label: string;
  tagline: string;
  /** Gradient stops for the little preview swatch in the picker. */
  swatch: [string, string];
  /** Solid accent color — used to tint the browser/PWA status bar. */
  accentHex: string;
}

// Keep in sync with the `[data-theme="…"]` blocks in globals.css.
export const THEMES: ThemeDef[] = [
  {
    id: "teal",
    label: "Teal → Blue",
    tagline: "Cool and tech-forward",
    swatch: ["#0d9488", "#2563eb"],
    accentHex: "#2563eb",
  },
  {
    id: "forest",
    label: "Forest Green",
    tagline: "One solid green, simple and classic",
    swatch: ["#15803d", "#15803d"],
    accentHex: "#15803d",
  },
  {
    id: "sunset",
    label: "Sunset",
    tagline: "Coral into amber, warm and energetic",
    swatch: ["#ea580c", "#f59e0b"],
    accentHex: "#ea580c",
  },
  {
    id: "berry",
    label: "Berry",
    tagline: "Rose into violet, bold and distinctive",
    swatch: ["#db2777", "#7c3aed"],
    accentHex: "#7c3aed",
  },
];

export const DEFAULT_THEME: ColorTheme = "teal";

/** Applies a color theme to the live document: sets the attribute every
 * themed CSS rule keys off, and re-tints the browser/PWA status bar to
 * match. Safe to call before the profile is saved, for a live preview. */
export function applyColorTheme(theme: ColorTheme | undefined) {
  if (typeof document === "undefined") return;
  const id = theme ?? DEFAULT_THEME;
  document.documentElement.setAttribute("data-theme", id);
  const def = THEMES.find((t) => t.id === id);
  if (def) {
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", def.accentHex);
  }
}
