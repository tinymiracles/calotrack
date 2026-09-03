import { ExerciseEntry, FoodEntry, MealSlot } from "@/lib/types";

const MEAL_ORDER: MealSlot[] = ["breakfast", "lunch", "snack", "dinner", "other"];
const MEAL_LABELS: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  snack: "Snack",
  dinner: "Dinner",
  other: "Other",
};

export function FoodEntryList({ entries, onRemove }: { entries: FoodEntry[]; onRemove: (id: string) => void }) {
  if (entries.length === 0) {
    return <p className="text-sm text-[var(--muted)]">Nothing logged yet today.</p>;
  }

  const byMeal = MEAL_ORDER.map((meal) => ({
    meal,
    items: entries.filter((e) => e.meal === meal),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-4">
      {byMeal.map(({ meal, items }) => (
        <div key={meal}>
          <p className="mb-1 text-xs font-medium text-[var(--muted)]">{MEAL_LABELS[meal]}</p>
          <ul className="flex flex-col gap-1">
            {items.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between rounded-lg bg-black/5 px-3 py-2 text-sm">
                <div>
                  <span className="font-medium">{entry.foodName}</span>
                  <span className="text-[var(--muted)]">
                    {" "}
                    · {entry.quantity && entry.unitLabel ? `${entry.quantity} ${entry.unitLabel}${entry.quantity === 1 ? "" : "s"} (${entry.grams}g)` : `${entry.grams}g`}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="tabular-nums text-[var(--muted)]">{entry.calories} kcal</span>
                  <button
                    onClick={() => onRemove(entry.id)}
                    aria-label="Remove"
                    className="text-[var(--muted)] hover:text-[var(--danger)]"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function ExerciseEntryList({ entries, onRemove }: { entries: ExerciseEntry[]; onRemove: (id: string) => void }) {
  if (entries.length === 0) {
    return <p className="text-sm text-[var(--muted)]">No workouts or walks logged yet today.</p>;
  }

  return (
    <ul className="flex flex-col gap-1">
      {entries.map((entry) => (
        <li key={entry.id} className="flex items-center justify-between rounded-lg bg-black/5 px-3 py-2 text-sm">
          <div>
            <span className="font-medium">{entry.exerciseName}</span>
            <span className="text-[var(--muted)]"> · {entry.minutes} min</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="tabular-nums text-[var(--muted)]">{entry.caloriesBurned} kcal</span>
            <button
              onClick={() => onRemove(entry.id)}
              aria-label="Remove"
              className="text-[var(--muted)] hover:text-[var(--danger)]"
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
