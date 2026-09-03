import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-12px_rgba(0,0,0,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">{children}</h2>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  unit,
  tone = "default",
}: {
  label: string;
  value: string | number;
  unit?: string;
  tone?: "default" | "accent" | "success" | "warn" | "danger";
}) {
  const toneClasses = {
    default: "text-[var(--foreground)]",
    accent: "text-[var(--accent)]",
    success: "text-[var(--success)]",
    warn: "text-[var(--warn)]",
    danger: "text-[var(--danger)]",
  }[tone];

  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-[var(--muted)]">{label}</span>
      <span className={`text-2xl font-semibold tabular-nums ${toneClasses}`}>
        {value}
        {unit && <span className="ml-1 text-sm font-normal text-[var(--muted)]">{unit}</span>}
      </span>
    </div>
  );
}

export function ProgressBar({
  value,
  max,
  tone = "accent",
}: {
  value: number;
  max: number;
  tone?: "accent" | "success" | "warn" | "danger";
}) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const barColor = {
    accent: "bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)]",
    success: "bg-[var(--success)]",
    warn: "bg-[var(--warn)]",
    danger: "bg-[var(--danger)]",
  }[tone];

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
      <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]";

export const labelClass = "mb-1 block text-xs font-medium text-[var(--muted)]";

export const primaryButtonClass =
  "rounded-lg bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)] px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-50 disabled:active:scale-100";

export const secondaryButtonClass =
  "rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-transform hover:bg-black/5 active:scale-[0.97]";

export const chipButtonClass =
  "rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)] transition-transform hover:bg-black/5 active:scale-95";
