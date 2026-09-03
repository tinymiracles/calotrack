import { GoalAnalysis } from "@/lib/calculations";
import { Card } from "./ui";

const TONE = {
  onPace: { text: "text-[var(--accent)]", bg: "bg-[var(--accent-soft)]" },
  offPace: { text: "text-[var(--warn)]", bg: "bg-[var(--warn-soft)]" },
};

/** The "crucial analysis" card: how far from goal weight, and at the
 * current logged pace, roughly how many months to get there. */
export default function GoalAnalysisCard({ analysis }: { analysis: GoalAnalysis | null }) {
  if (!analysis) return null;
  const tone = analysis.onPace ? TONE.onPace : TONE.offPace;

  return (
    <Card className={tone.bg}>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Goal analysis</p>
      <p className={`font-semibold ${tone.text}`}>{analysis.headline}</p>
      <p className="mt-1 text-sm text-[var(--foreground)]/80">{analysis.detail}</p>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
        <span>
          Current: <strong className="text-[var(--foreground)]">{analysis.currentWeightKg}kg</strong>
        </span>
        <span>
          Goal: <strong className="text-[var(--foreground)]">{analysis.goalWeightKg}kg</strong>
        </span>
        {analysis.monthsToGoal !== null && analysis.monthsToGoal > 0 && (
          <span>
            Est. time: <strong className="text-[var(--foreground)]">{analysis.monthsToGoal} mo</strong>
          </span>
        )}
      </div>
    </Card>
  );
}
