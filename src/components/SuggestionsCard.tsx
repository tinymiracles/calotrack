import { Suggestions } from "@/lib/calculations";
import { Card } from "./ui";

const TONE = {
  under: { text: "text-[var(--accent)]", bg: "bg-[var(--accent-soft)]" },
  on_track: { text: "text-[var(--accent)]", bg: "bg-[var(--accent-soft)]" },
  over: { text: "text-[var(--danger)]", bg: "bg-[var(--danger-soft)]" },
};

export default function SuggestionsCard({ suggestions }: { suggestions: Suggestions }) {
  const tone = TONE[suggestions.status];

  return (
    <Card className={tone.bg}>
      <p className={`font-semibold ${tone.text}`}>{suggestions.headline}</p>
      <p className="mt-1 text-sm text-[var(--foreground)]/80">{suggestions.detail}</p>

      {suggestions.goodFoods.length > 0 && (
        <div className="mt-3">
          <p className="mb-1 text-xs font-medium text-[var(--muted)]">Good options right now</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.goodFoods.map((f) => (
              <span key={f.id} className="rounded-full bg-white/70 px-2.5 py-1 text-xs">
                {f.name} · {f.proteinPer100g}g protein/100g
              </span>
            ))}
          </div>
        </div>
      )}

      {suggestions.avoidFoods.length > 0 && (
        <div className="mt-3">
          <p className="mb-1 text-xs font-medium text-[var(--muted)]">Best to avoid for now</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.avoidFoods.map((f) => (
              <span key={f.id} className="rounded-full bg-white/70 px-2.5 py-1 text-xs">
                {f.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
