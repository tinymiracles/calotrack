"use client";

import { useEffect } from "react";
import { getProfile } from "@/lib/storage";
import { applyColorTheme } from "@/lib/themes";

/** Keeps the color theme (and the browser/PWA status-bar tint) in sync with
 * the saved profile. The blocking <script> in layout.tsx already applies it
 * before paint to avoid a flash of the default theme — this just re-applies
 * once mounted, as a fallback for anything that script couldn't read yet. */
export default function ThemeApplier() {
  useEffect(() => {
    getProfile().then((p) => applyColorTheme(p?.colorTheme));
  }, []);

  return null;
}
