"use client";

import { useRef, useState } from "react";
import { MealSlot } from "@/lib/types";
import { inputClass, labelClass, primaryButtonClass } from "./ui";

interface Estimate {
  name: string;
  estimatedGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  items: string[];
  confidence: "low" | "medium" | "high";
  note: string;
}

const MEAL_OPTIONS: { value: MealSlot; label: string }[] = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "snack", label: "Snack" },
  { value: "dinner", label: "Dinner" },
  { value: "other", label: "Other" },
];

/** Downscales + compresses a photo client-side before it's ever sent
 * anywhere — a phone camera photo can be several MB, and the model reads
 * plenty of detail at a much smaller size. Keeps uploads fast and cheap. */
function resizeImage(file: File, maxDim = 1024, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Couldn't read that file."));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Couldn't read that image."));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const scale = maxDim / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Photo resizing isn't supported in this browser."));
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function AddFoodPhoto({
  defaultMeal = "other",
  onAdd,
}: {
  defaultMeal?: MealSlot;
  onAdd: (data: {
    name: string;
    grams: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meal: MealSlot;
  }) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "analyzing" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<Estimate | null>(null);
  const [meal, setMeal] = useState<MealSlot>(defaultMeal);

  const [name, setName] = useState("");
  const [grams, setGrams] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  async function handleFile(file: File) {
    setStatus("analyzing");
    setErrorMsg("");
    setResult(null);
    try {
      const dataUrl = await resizeImage(file);
      setPreview(dataUrl);
      const res = await fetch("/api/analyze-meal", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ imageBase64: dataUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Couldn't analyze that photo.");
      setResult(data);
      setName(data.name ?? "");
      setGrams(data.estimatedGrams ? String(data.estimatedGrams) : "");
      setCalories(data.calories ? String(data.calories) : "");
      setProtein(data.protein ? String(data.protein) : "");
      setCarbs(data.carbs ? String(data.carbs) : "");
      setFat(data.fat ? String(data.fat) : "");
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Couldn't analyze that photo.");
    }
  }

  function reset() {
    setPreview(null);
    setResult(null);
    setStatus("idle");
    setErrorMsg("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const cal = Number(calories);
    if (!name.trim() || !cal) return;
    onAdd({
      name: name.trim(),
      grams: Number(grams) || 0,
      calories: cal,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      meal,
    });
    reset();
  }

  return (
    <div className="flex flex-col gap-3">
      {!preview && (
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--accent-soft)]/40 py-8 text-center text-sm transition-colors hover:border-[var(--accent)]">
          <span className="text-2xl" aria-hidden>📷</span>
          <span className="font-medium text-[var(--foreground)]">Snap or upload a photo of your meal</span>
          <span className="text-xs text-[var(--muted)]">We&apos;ll estimate the calories — you can adjust before saving</span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      )}

      {preview && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="h-24 w-24 flex-shrink-0 rounded-lg border border-[var(--border)] object-cover" />
            <div className="flex flex-1 flex-col justify-center gap-1">
              {status === "analyzing" && <p className="text-sm text-[var(--muted)]">Analyzing photo…</p>}
              {status === "error" && <p className="text-sm text-[var(--danger)]">{errorMsg}</p>}
              {result && (
                <p className="text-xs text-[var(--muted)]">
                  Detected: {result.items.length ? result.items.join(", ") : "—"}
                  {result.confidence === "low" ? " · low confidence, please check the numbers" : ""}
                </p>
              )}
              <button type="button" onClick={reset} className="self-start text-xs font-medium text-[var(--accent)]">
                Use a different photo
              </button>
            </div>
          </div>

          {status === "error" && (
            <button type="button" onClick={() => fileRef.current?.click()} className={primaryButtonClass}>
              Try another photo
            </button>
          )}

          {result && (
            <form onSubmit={handleAdd} className="flex flex-col gap-3">
              <div>
                <label className={labelClass}>What it is</label>
                <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Estimated grams</label>
                  <input type="number" className={inputClass} value={grams} onChange={(e) => setGrams(e.target.value)} min={0} />
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
                  <input type="number" className={inputClass} value={calories} onChange={(e) => setCalories(e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Protein (g)</label>
                  <input type="number" className={inputClass} value={protein} onChange={(e) => setProtein(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Carbs (g)</label>
                  <input type="number" className={inputClass} value={carbs} onChange={(e) => setCarbs(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Fat (g)</label>
                  <input type="number" className={inputClass} value={fat} onChange={(e) => setFat(e.target.value)} />
                </div>
              </div>
              {result.note && <p className="text-xs text-[var(--muted)]">Note: {result.note}</p>}
              <p className="text-xs text-[var(--muted)]">
                AI estimate — check the numbers above before adding, especially oil/ghee and portion size.
              </p>
              <button type="submit" className={primaryButtonClass}>
                Add to {MEAL_OPTIONS.find((m) => m.value === meal)?.label.toLowerCase()}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
