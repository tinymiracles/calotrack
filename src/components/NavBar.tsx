"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearAllData } from "@/lib/storage";

const LINKS = [
  { href: "/", label: "Today" },
  { href: "/history", label: "History" },
  { href: "/profile", label: "Profile" },
];

export default function NavBar() {
  const pathname = usePathname();

  async function handleLogout() {
    const confirmed = window.confirm(
      "Log out and erase everything stored on this device (profile + every logged day)?"
    );
    if (!confirmed) return;
    await clearAllData();
    // Full reload (not router.push) so every page's client-side state,
    // loaded once from localStorage on mount, re-reads the now-empty data.
    window.location.href = "/";
  }

  return (
    <nav className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          CaloTrack
        </Link>
        <div className="flex items-center gap-1">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-[var(--accent-soft)] text-[var(--accent)] font-medium"
                    : "text-[var(--muted)] hover:bg-black/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
            className="ml-1 rounded-full px-2.5 py-1.5 text-sm text-[var(--muted)] hover:bg-black/5 hover:text-[var(--danger)]"
          >
            ⏻
          </button>
        </div>
      </div>
    </nav>
  );
}
