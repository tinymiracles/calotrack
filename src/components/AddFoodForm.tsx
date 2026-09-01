"use client";

import { useMemo, useState } from "react";
import { FOOD_DATABASE } from "@/lib/foodDatabase";
import { calcFoodMacros } from "@/lib/calculations";
import { FoodItem, MealSlot } from "@/lib/types";
import { inputClass, labelClass, primaryButtonClass } from "./ui";

const MEAL_OPTIONS: { value: MealSlot; label: string }[] = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "snack", label: "Snack" },
  { value: "dinner", label: "Dinner" },
  { value: "other", label: "Other" },
];

export default function AddFoodForm({
  customFoods,
  defaultMeal = "other",
  onAdd,
  onAddCustom,
}: {
  customFoods: FoodItem[];
  defaultMeal?: MealSlot;
  onAdd: (food: FoodItem, grams: number, meal: MealSlot) => void;
  onAddCustom: (food: FoodItem, grams: number, meal: MealSlot) => void;
}) {
  const [mode, setMode] = useState<"search" | "custom">("search");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [grams, setGrams] = useState("100");
  const [meal, setMeal] = useState<MealSlot>(defaultMeal);

  const [customName, setCustomName] = useState("");
  const [customGrams, setCustomGrams] = useState("100");
  const [customCalories, setCustomCalories] = useState("");
  const [customProtein, setCustomProtein] = useState("");
  const [customCarbs, setCustomCarbs] = useState("");
  const [customFat, setCustomFat] = useState("");

  const allFoods = useMemo(() => [...FOOD_DATABASE, ...customFoods], [customFoods]);

  const matches = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allFoods.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 8);
  }, [query, allFoods]);

  const gramsNum = Number(grams) || 0;
  const preview = selected && gramsNum > 0 ? calcFoodMacros(selected, gramsNum) : null;

  function handleAddSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || gramsNum <= 0) return;
    onAdd(selected, gramsNum, meal);
    setSelected(null);
    setQuery("");
    setGrams("100");
  }

  function handleAddCustom(e: React.FormEvent) {
    e.preventDefault();
    const servingGrams = Number(customGrams) || 100;
    const cal = Number(customCalories);
    if (!customName.trim() || !cal) return;
    const factor = 100 / servingGrams;
    const food: FoodItem = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      category: "Custom",
      caloriesPer100g: Math.round(cal * factor),
      proteinPer100g: Math.round((Number(customProtein) || 0) * factor * 10) / 10,
      carbsPer100g: Math.round((Number(customCarbs) || 0) * factor * 10) / 10,
      fatPer100g: Math.round((Number(customFat) || 0) * factor * 10) / 10,
      custom: true,
    };
    onAddCustom(food, servingGrams, meal);
    setCustomName("");
    setCustomGrams("100");
    setCustomCalories("");
    setCustomProtein("");
    setCustomCarbs("");
    setCustomFat("");
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 text-xs">
        <button
          type="button"
          onClick={() => setMode("search")}
          className={`rounded-full px-3 py-1 ${mode === "search" ? "bg-[var(--accent-soft)] text-[var(--accent)] font-medium" : "text-[var(--muted)]"}`}
        >
          From database
        </button>
        <button
          type="button"
          onClick={() => setMode("custom")}
          className={`rounded-full px-3 py-1 ${mode === "custom" ? "bg-[var(--accent-soft)] text-[var(--accent)] font-medium" : "text-[var(--muted)]"}`}
        >
          Custom food
        </button>
      </div>

      {mode === "search" ? (
        <form onSubmit={handleAddSearch} className="flex flex-col gap-3">
          <div>
            <label className={labelClass}>Food</label>
            <input
              className={inputClass}
              placeholder="Search e.g. roti, dal, banana…"
              value={selected ? selected.name : query}
              onChange={(e) => {
                setSelected(null);
                setQuery(e.target.value);
              }}
            />
            {matches.length > 0 && !selected && (
              <div className="mt-1 max-h-48 overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                {matches.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setSelected(f);
                      setQuery(f.name);
                    }}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-black/5"
                  >
                    <span>{f.name}</span>
                    <span className="text-xs text-[var(--muted)]">{f.caloriesPer100g} kcal/100g</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Amount (grams)</label>
              <input
                type="number"
                className={inputClass}
                value={grams}
                onChange={(e) => setGrams(e.target.value)}
                min={1}
              />
            </div>
            <div>
              <label className={labelClass}>Meal</label>
              <select className={inputClass} value={meal} onChange={(e) => setMeal(e.target.value as MealSlot)}>
                {MEAL_OPTIONS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {preview && (
            <p className="text-xs text-[var(--muted)]">
              {preview.calories} kcal · {preview.protein}g protein · {preview.carbs}g carbs · {preview.fat}g fat
            </p>
          )}

          <button type="submit" className={primaryButtonClass} disabled={!selected || gramsNum <= 0}>
            Add to {MEAL_OPTIONS.find((m) => m.value === meal)?.label.toLowerCase()}
          </button>
        </form>
      ) : (
        <form onSubmit={handleAddCustom} className="flex flex-col gap-3">
          <div>
            <label className={labelClass}>Food name</label>
            <input className={inputClass} value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="e.g. Protein bar" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Serving size (g)</label>
              <input type="number" className={inputClass} value={customGrams} onChange={(e) => setCustomGrams(e.target.value)} min={1} />
            </div>
            <div>
              <label className={labelClass}>Meal</label>
              <select className={inputClass} value={meal} onChange={(e) => setMeal(e.target.value as MealSlot)}>
                {MEAL_OPTIONS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className={labelClass}>Calories</label>
              <input type="number" className={inputClass} value={customCalories} onChange={(e) => setCustomCalories(e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Protein (g)</label>
              <input type="number" className={inputClass} value={customProtein} onChange={(e) => setCustomProtein(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Carbs (g)</label>
              <input type="number" className={inputClass} value={customCarbs} onChange={(e) => setCustomCarbs(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Fat (g)</label>
              <input type="number" className={inputClass} value={customFat} onChange={(e) => setCustomFat(e.target.value)} />
            </div>
          </div>
          <p className="text-xs text-[var(--muted)]">Values are for the whole serving above — saved for reuse later.</p>
          <button type="submit" className={primaryButtonClass}>
            Add to {MEAL_OPTIONS.find((m) => m.value === meal)?.label.toLowerCase()}
          </button>
        </form>
      )}
    </div>
  );
}
