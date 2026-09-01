"use client";

import { useMemo, useState } from "react";
import { EXERCISE_DATABASE, getExerciseById } from "@/lib/exerciseDatabase";
import { calcExerciseCalories } from "@/lib/calculations";
import { inputClass, labelClass, primaryButtonClass, chipButtonClass } from "./ui";

const PRESETS = [15, 30, 45, 60];

export default function AddExerciseForm({
  weightKg,
  onAdd,
}: {
  weightKg: number;
  onAdd: (exerciseId: string, exerciseName: string, minutes: number, caloriesBurned: number) => void;
}) {
  const [exerciseId, setExerciseId] = useState(EXERCISE_DATABASE[0].id);
  const [minutes, setMinutes] = useState("30");

  const grouped = useMemo(() => {
    const map = new Map<string, typeof EXERCISE_DATABASE>();
    for (const ex of EXERCISE_DATABASE) {
      const list = map.get(ex.category) ?? [];
      list.push(ex);
      map.set(ex.category, list);
    }
    return Array.from(map.entries());
  }, []);

  const exercise = getExerciseById(exerciseId);
  const minutesNum = Number(minutes) || 0;
  const preview = exercise && minutesNum > 0 ? calcExerciseCalories(exercise.met, weightKg, minutesNum) : 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!exercise || minutesNum <= 0) return;
    onAdd(exercise.id, exercise.name, minutesNum, preview);
    setMinutes("30");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className={labelClass}>Activity</label>
        <select className={inputClass} value={exerciseId} onChange={(e) => setExerciseId(e.target.value)}>
          {grouped.map(([category, items]) => (
            <optgroup key={category} label={category}>
              {items.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Duration (minutes)</label>
        <input type="number" className={inputClass} value={minutes} onChange={(e) => setMinutes(e.target.value)} min={1} />
        <div className="mt-2 flex gap-2">
          {PRESETS.map((p) => (
            <button key={p} type="button" className={chipButtonClass} onClick={() => setMinutes(String(p))}>
              {p} min
            </button>
          ))}
        </div>
      </div>

      {exercise && minutesNum > 0 && (
        <p className="text-xs text-[var(--muted)]">≈ {preview} kcal burned</p>
      )}

      <button type="submit" className={primaryButtonClass} disabled={!exercise || minutesNum <= 0}>
        Add workout
      </button>
    </form>
  );
}
