"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActivityLevel, ColorTheme, DietPreference, Goal, Profile, Sex } from "@/lib/types";
import { clearAllData, saveProfile } from "@/lib/storage";
import {
  ACTIVITY_LABELS,
  calcBMI,
  defaultProteinTarget,
  estimateMaintenanceCalories,
} from "@/lib/calculations";
import { applyColorTheme, DEFAULT_THEME, THEMES } from "@/lib/themes";
import { Card, inputClass, labelClass, primaryButtonClass, secondaryButtonClass } from "./ui";

function resizeImage(file: File, maxDim = 480, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("no canvas context"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProfileForm({ existing }: { existing?: Profile }) {
  const router = useRouter();
  const [name, setName] = useState(existing?.name ?? "");
  const [sex, setSex] = useState<Sex>(existing?.sex ?? "female");
  const [age, setAge] = useState(existing?.age?.toString() ?? "");
  const [heightCm, setHeightCm] = useState(existing?.heightCm?.toString() ?? "");
  const [weightKg, setWeightKg] = useState(existing?.currentWeightKg?.toString() ?? "");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(existing?.activityLevel ?? "light");
  const [goal, setGoal] = useState<Goal>(existing?.goal ?? "maintain");
  const [goalWeightKg, setGoalWeightKg] = useState(existing?.goalWeightKg?.toString() ?? "");
  const [maintenanceIsManual, setMaintenanceIsManual] = useState(existing?.maintenanceIsManual ?? false);
  const [maintenanceCalories, setMaintenanceCalories] = useState(existing?.maintenanceCalories?.toString() ?? "");
  const [proteinTargetG, setProteinTargetG] = useState(existing?.proteinTargetG?.toString() ?? "");
  const [dietPreference, setDietPreference] = useState<DietPreference>(existing?.dietPreference ?? "all");
  const [colorTheme, setColorTheme] = useState<ColorTheme>(existing?.colorTheme ?? DEFAULT_THEME);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>(existing?.photoDataUrl);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heightNum = Number(heightCm);
  const weightNum = Number(weightKg);
  const ageNum = Number(age);
  const bmi = heightNum > 0 && weightNum > 0 ? calcBMI(heightNum, weightNum) : null;

  const estimatedMaintenance =
    heightNum > 0 && weightNum > 0 && ageNum > 0
      ? estimateMaintenanceCalories(sex, ageNum, heightNum, weightNum, activityLevel)
      : null;

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await resizeImage(file);
      setPhotoDataUrl(dataUrl);
    } catch {
      setError("Couldn't read that photo — try a different one.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!heightNum || !weightNum || !ageNum) {
      setError("Height, weight and age are required.");
      return;
    }

    const finalMaintenance = maintenanceIsManual
      ? Number(maintenanceCalories)
      : estimatedMaintenance ?? Number(maintenanceCalories);

    if (!finalMaintenance) {
      setError("Enter a maintenance calorie number, or fill in height/weight/age so I can estimate one.");
      return;
    }

    const finalProtein = proteinTargetG ? Number(proteinTargetG) : defaultProteinTarget(weightNum);

    const now = new Date().toISOString();
    const profile: Profile = {
      name: name || undefined,
      sex,
      age: ageNum,
      heightCm: heightNum,
      currentWeightKg: weightNum,
      goal,
      goalWeightKg: goalWeightKg ? Number(goalWeightKg) : undefined,
      activityLevel,
      maintenanceCalories: Math.round(finalMaintenance),
      maintenanceIsManual,
      proteinTargetG: Math.round(finalProtein),
      dietPreference,
      colorTheme,
      photoDataUrl,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    setSaving(true);
    try {
      await saveProfile(profile);
      applyColorTheme(colorTheme);
      router.push("/");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "This deletes your profile and every day you've logged on this device — there's no undo. Continue?"
    );
    if (!confirmed) return;
    setDeleting(true);
    try {
      await clearAllData();
      // Full reload so every page's client-side state re-reads the now-empty data.
      window.location.href = "/";
    } finally {
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Card className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-black/5">
          {photoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoDataUrl} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-[var(--muted)]">
              Photo
            </div>
          )}
        </div>
        <div className="flex-1">
          <label className={labelClass}>Your photo (optional)</label>
          <input type="file" accept="image/*" onChange={handlePhoto} className="text-sm" />
        </div>
      </Card>

      <Card className="flex flex-col gap-3">
        <div>
          <label className={labelClass}>Name (optional)</label>
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Megz" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Sex</label>
            <select className={inputClass} value={sex} onChange={(e) => setSex(e.target.value as Sex)}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Age (years)</label>
            <input
              type="number"
              className={inputClass}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min={10}
              max={100}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Height (cm)</label>
            <input
              type="number"
              className={inputClass}
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              min={100}
              max={250}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Current weight (kg)</label>
            <input
              type="number"
              step="0.1"
              className={inputClass}
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              min={30}
              max={250}
              required
            />
          </div>
        </div>

        {bmi && <p className="text-xs text-[var(--muted)]">BMI: {bmi}</p>}
      </Card>

      <Card className="flex flex-col gap-3">
        <div>
          <label className={labelClass}>Daily activity (not counting logged workouts)</label>
          <select
            className={inputClass}
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
          >
            {Object.entries(ACTIVITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Goal</label>
            <select className={inputClass} value={goal} onChange={(e) => setGoal(e.target.value as Goal)}>
              <option value="lose">Lose weight</option>
              <option value="maintain">Maintain weight</option>
              <option value="gain">Gain weight</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Goal weight (kg, optional)</label>
            <input
              type="number"
              step="0.1"
              className={inputClass}
              value={goalWeightKg}
              onChange={(e) => setGoalWeightKg(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Meal preference</label>
          <div className="flex gap-2">
            {(
              [
                { value: "all", label: "All" },
                { value: "veg", label: "Veg" },
                { value: "non_veg", label: "Non-veg" },
              ] as { value: DietPreference; label: string }[]
            ).map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => setDietPreference(d.value)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  dietPreference === d.value
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "border border-[var(--border)] text-[var(--muted)] hover:bg-black/5"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-[var(--muted)]">Defaults your meal search — you can still switch it per meal.</p>
        </div>
      </Card>

      <Card className="flex flex-col gap-3">
        <div>
          <label className={labelClass}>Color theme</label>
          <p className="mb-2 text-xs text-[var(--muted)]">Pick a look — the whole app repaints right away, just for you.</p>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setColorTheme(t.id);
                  applyColorTheme(t.id);
                }}
                className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all active:scale-[0.97] ${
                  colorTheme === t.id
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--border)] hover:bg-black/5"
                }`}
              >
                <span
                  className="h-7 w-7 shrink-0 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${t.swatch[0]}, ${t.swatch[1]})` }}
                />
                <span>
                  <span className="block text-sm font-medium">{t.label}</span>
                  <span className="block text-xs text-[var(--muted)]">{t.tagline}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className={labelClass}>Maintenance calories</label>
          <button
            type="button"
            onClick={() => setMaintenanceIsManual((v) => !v)}
            className="text-xs font-medium text-[var(--accent)]"
          >
            {maintenanceIsManual ? "Use estimate instead" : "I know my own number"}
          </button>
        </div>

        {maintenanceIsManual ? (
          <input
            type="number"
            className={inputClass}
            value={maintenanceCalories}
            onChange={(e) => setMaintenanceCalories(e.target.value)}
            placeholder="e.g. 1800"
          />
        ) : (
          <div className="rounded-lg bg-black/5 px-3 py-2 text-sm">
            {estimatedMaintenance ? (
              <>
                Estimated at <strong>{estimatedMaintenance} kcal/day</strong> from your height, weight, age and
                activity level.
              </>
            ) : (
              "Fill in height, weight and age above to see an estimate."
            )}
          </div>
        )}

        <div>
          <label className={labelClass}>Daily protein target (g)</label>
          <input
            type="number"
            className={inputClass}
            value={proteinTargetG}
            onChange={(e) => setProteinTargetG(e.target.value)}
            placeholder={weightNum ? `${defaultProteinTarget(weightNum)} (suggested)` : "e.g. 90"}
          />
        </div>
      </Card>

      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" className={primaryButtonClass} disabled={saving}>
          {saving ? "Saving…" : existing ? "Save changes" : "Start tracking"}
        </button>
        {existing && (
          <button
            type="button"
            className={secondaryButtonClass}
            onClick={() => {
              // Undo any live theme preview that wasn't saved.
              applyColorTheme(existing?.colorTheme);
              router.push("/");
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {existing && (
        <Card className="flex items-center justify-between gap-3 border-[var(--danger-soft)]">
          <div>
            <p className="text-sm font-medium">Delete profile / log out</p>
            <p className="text-xs text-[var(--muted)]">Erases your profile and every logged day from this device.</p>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="shrink-0 rounded-lg border border-[var(--danger)] px-4 py-2 text-sm font-medium text-[var(--danger)] hover:bg-[var(--danger-soft)] disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete & log out"}
          </button>
        </Card>
      )}
    </form>
  );
}
