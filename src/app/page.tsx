"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { DayLog, FoodEntry, ExerciseEntry, FoodItem, MealSlot, Profile } from "@/lib/types";
import {
  addCustomFood,
  addExerciseEntry,
  addFoodEntry,
  getCustomFoods,
  getDay,
  getProfile,
  newId,
  removeExerciseEntry,
  removeFoodEntry,
  setDayWeight,
} from "@/lib/storage";
import { buildSuggestions, calcFoodMacros, summarizeDay, todayKey } from "@/lib/calculations";
import { Card, ProgressBar, SectionTitle, StatCard, inputClass, primaryButtonClass } from "@/components/ui";
import AddFoodForm from "@/components/AddFoodForm";
import AddExerciseForm from "@/components/AddExerciseForm";
import { ExerciseEntryList, FoodEntryList } from "@/components/DayEntries";
import SuggestionsCard from "@/components/SuggestionsCard";

export default function TodayPage() {
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [day, setDay] = useState<DayLog | null>(null);
  const [customFoods, setCustomFoods] = useState<FoodItem[]>([]);
  const [weightInput, setWeightInput] = useState("");
  const date = todayKey();

  const refresh = useCallback(async () => {
    const [p, d, c] = await Promise.all([getProfile(), getDay(date), getCustomFoods()]);
    setProfile(p);
    setDay(d);
    setCustomFoods(c);
    if (d.weightKg) setWeightInput(String(d.weightKg));
  }, [date]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (profile === undefined) return null;

  if (!profile) {
    return (
      <Card className="flex flex-col items-start gap-3">
        <h1 className="text-lg font-semibold">Set up your profile to start</h1>
        <p className="text-sm text-[var(--muted)]">
          Height, weight, age and your maintenance calories — takes a minute, then you just log your day.
        </p>
        <Link href="/profile" className={primaryButtonClass}>
          Set up profile
        </Link>
      </Card>
    );
  }

  async function handleAddFood(food: FoodItem, grams: number, meal: MealSlot) {
    const macros = calcFoodMacros(food, grams);
    const entry: FoodEntry = {
      id: newId(),
      foodId: food.id,
      foodName: food.name,
      grams,
      meal,
      loggedAt: new Date().toISOString(),
      ...macros,
    };
    await addFoodEntry(date, entry);
    refresh();
  }

  async function handleAddCustomFood(food: FoodItem, grams: number, meal: MealSlot) {
    await addCustomFood(food);
    await handleAddFood(food, grams, meal);
  }

  async function handleRemoveFood(id: string) {
    await removeFoodEntry(date, id);
    refresh();
  }

  async function handleAddExercise(exerciseId: string, exerciseName: string, minutes: number, caloriesBurned: number) {
    const entry: ExerciseEntry = {
      id: newId(),
      exerciseId,
      exerciseName,
      minutes,
      caloriesBurned,
      loggedAt: new Date().toISOString(),
    };
    await addExerciseEntry(date, entry);
    refresh();
  }

  async function handleRemoveExercise(id: string) {
    await removeExerciseEntry(date, id);
    refresh();
  }

  async function handleSaveWeight(e: React.FormEvent) {
    e.preventDefault();
    const w = Number(weightInput);
    if (!w) return;
    await setDayWeight(date, w);
    refresh();
  }

  const summary = summarizeDay(day ?? undefined, profile);
  const suggestions = buildSuggestions(summary, customFoods);
  const caloriesBudget = summary.calorieTarget + summary.exerciseCalories;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">
            {profile.name ? `Hey ${profile.name}` : "Today"}
          </h1>
          <p className="text-sm text-[var(--muted)]">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
        {profile.photoDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.photoDataUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
        )}
      </div>

      <Card>
        <SectionTitle>Calories</SectionTitle>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Eaten" value={summary.caloriesIn} unit="kcal" />
          <StatCard label="Burned" value={summary.totalBurn} unit="kcal" tone="accent" />
          <StatCard
            label="Remaining"
            value={Math.round(summary.remainingCalories)}
            unit="kcal"
            tone={summary.remainingCalories < 0 ? "danger" : "default"}
          />
        </div>
        <div className="mt-3">
          <ProgressBar value={summary.caloriesIn} max={caloriesBudget} tone={summary.caloriesIn > caloriesBudget ? "danger" : "accent"} />
          <p className="mt-1 text-xs text-[var(--muted)]">
            Budget today: {Math.round(caloriesBudget)} kcal ({summary.maintenanceCalories} maintenance
            {summary.exerciseCalories > 0 ? ` + ${summary.exerciseCalories} exercise` : ""})
          </p>
        </div>
      </Card>

      <Card>
        <SectionTitle>Protein &amp; macros</SectionTitle>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Protein" value={summary.proteinIn} unit={`/ ${profile.proteinTargetG}g`} />
          <StatCard label="Carbs" value={summary.carbsIn} unit="g" />
          <StatCard label="Fat" value={summary.fatIn} unit="g" />
        </div>
        <div className="mt-3">
          <ProgressBar value={summary.proteinIn} max={profile.proteinTargetG} />
        </div>
      </Card>

      <SuggestionsCard suggestions={suggestions} />

      <Card>
        <SectionTitle>Log a meal</SectionTitle>
        <AddFoodForm customFoods={customFoods} onAdd={handleAddFood} onAddCustom={handleAddCustomFood} />
        <div className="mt-4 border-t border-[var(--border)] pt-4">
          <FoodEntryList entries={day?.foods ?? []} onRemove={handleRemoveFood} />
        </div>
      </Card>

      <Card>
        <SectionTitle>Log a workout or walk</SectionTitle>
        <AddExerciseForm weightKg={profile.currentWeightKg} onAdd={handleAddExercise} />
        <div className="mt-4 border-t border-[var(--border)] pt-4">
          <ExerciseEntryList entries={day?.exercises ?? []} onRemove={handleRemoveExercise} />
        </div>
      </Card>

      <Card>
        <SectionTitle>Today&apos;s weigh-in (optional)</SectionTitle>
        <form onSubmit={handleSaveWeight} className="flex items-end gap-3">
          <div className="flex-1">
            <input
              type="number"
              step="0.1"
              className={inputClass}
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              placeholder={`e.g. ${profile.currentWeightKg}`}
            />
          </div>
          <button type="submit" className={primaryButtonClass}>
            Save
          </button>
        </form>
      </Card>
    </div>
  );
}
