"use client";

import { useMemo, useState } from "react";
import { FOOD_DATABASE } from "@/lib/foodDatabase";
import { calcFoodMacros } from "@/lib/calculations";
import { DietPreference, FoodItem, MealSlot } from "@/lib/types";
import { inputClass, labelClass, primaryButtonClass } from "./ui";
import AddFoodPhoto from "./AddFoodPhoto";

const MEAL_OPTIONS: { value: MealSlot; label: string }[] = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "snack", label: "Snack" },
  { value: "dinner", label: "Dinner" },
  { value: "other", label: "Other" },
];

const DIET_OPTIONS: { value: DietPreference; label: string }[] = [
  { value: "all", label: "All" },
  { value: "veg", label: "Veg" },
  { value: "non_veg", label: "Non-veg" },
];

export default function AddFoodForm({
  customFoods,
  defaultMeal = "other",
  defaultDiet = "all",
  onAdd,
  onAddCustom,
  onAddPhoto,
}: {
  customFoods: FoodItem[];
  defaultMeal?: MealSlot;
  defaultDiet?: DietPreference;
  onAdd: (food: FoodItem, grams: number, meal: MealSlot, extra?: { quantity?: number; unitLabel?: string }) => void;
  onAddCustom: (food: FoodItem, grams: number, meal: MealSlot) => void;
  onAddPhoto: (data: {
    name: string;
    grams: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meal: MealSlot;
  }) => void;
}) {
  const [mode, setMode] = useState<"search" | "custom" | "photo">("search");
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState<DietPreference>(defaultDiet);
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [entryMode, setEntryMode] = useState<"grams" | "pieces">("grams");
  const [grams, setGrams] = useState("100");
  const [pieces, setPieces] = useState("1");
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
    return allFoods
      .filter((f) => f.name.toLowerCase().includes(q))
      .filter((f) => diet === "all" || !f.dietTag || f.dietTag === diet)
      .slice(0, 8);
  }, [query, allFoods, diet]);

  const canPieceEntry = !!(selected?.unitLabel && selected?.unitGrams);
  const piecesNum = Number(pieces) || 0;
  const gramsNum =
    entryMode === "pieces" && canPieceEntry ? Math.round(piecesNum * (selected!.unitGrams ?? 0)) : Number(grams) || 0;
  const preview = selected && gramsNum > 0 ? calcFoodMacros(selected, gramsNum) : null;

  function selectFood(f: FoodItem) {
    setSelected(f);
    setQuery(f.name);
    if (f.unitLabel && f.unitGrams) {
      setEntryMode("pieces");
      setPieces("1");
    } else {
      setEntryMode("grams");
      setGrams("100");
    }
  }

  function handleAddSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || gramsNum <= 0) return;
    if (entryMode === "pieces" && canPieceEntry) {
      onAdd(selected, gramsNum, meal, { quantity: piecesNum, unitLabel: selected.unitLabel });
    } else {
      onAdd(selected, gramsNum, meal);
    }
    setSelected(null);
    setQuery("");
    setGrams("100");
    setPieces("1");
    setEntryMode("grams");
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
        <button
          type="button"
          onClick={() => setMode("photo")}
          className={`rounded-full px-3 py-1 ${mode === "photo" ? "bg-[var(--accent-soft)] text-[var(--accent)] font-medium" : "text-[var(--muted)]"}`}
        >
          📷 Photo
        </button>
      </div>

      {mode === "photo" ? (
        <AddFoodPhoto defaultMeal={meal} onAdd={onAddPhoto} />
      ) : mode === "search" ? (
        <form onSubmit={handleAddSearch} className="flex flex-col gap-3">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className={labelClass}>Food</label>
              <div className="flex gap-1">
                {DIET_OPTIONS.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setDiet(d.value)}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                      diet === d.value ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[var(--muted)] hover:bg-black/5"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
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
                    onClick={() => selectFood(f)}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-black/5"
                  >
                    <span>{f.name}</span>
                    <span className="text-xs text-[var(--muted)]">{f.caloriesPer100g} kcal/100g</span>
                  </button>
                ))}
              </div>
            )}
            {query.trim() && matches.length === 0 && !selected && (
              <p className="mt-1 text-xs text-[var(--muted)]">
                No match — try the &quot;Custom food&quot; tab above to add it with your own numbers.
              </p>
            )}
          </div>

          {canPieceEntry && (
            <div className="flex gap-1 text-xs">
              <button
                type="button"
                onClick={() => setEntryMode("pieces")}
                className={`rounded-full px-3 py-1 ${entryMode === "pieces" ? "bg-[var(--accent-soft)] text-[var(--accent)] font-medium" : "text-[var(--muted)]"}`}
              >
                By {selected!.unitLabel}
              </button>
              <button
                type="button"
                onClick={() => setEntryMode("grams")}
                className={`rounded-full px-3 py-1 ${entryMode === "grams" ? "bg-[var(--accent-soft)] text-[var(--accent)] font-medium" : "text-[var(--muted)]"}`}
              >
                By grams
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {entryMode === "pieces" && canPieceEntry ? (
              <div>
                <label className={labelClass}>How many {selected!.unitLabel}(s)</label>
                <input
                  type="number"
                  className={inputClass}
                  value={pieces}
                  onChange={(e) => setPieces(e.target.value)}
                  min={0.5}
                  step={0.5}
                />
              </div>
            ) : (
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
            )}
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
              {entryMode === "pieces" && canPieceEntry ? `≈ ${gramsNum}g · ` : ""}
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
