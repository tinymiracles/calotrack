"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActivityLevel, Goal, Profile, Sex } from "@/lib/types";
import { saveProfile } from "@/lib/storage";
import {
  ACTIVITY_LABELS,
  calcBMI,
  defaultProteinTarget,
  estimateMaintenanceCalories,
} from "@/lib/calculations";
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
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>(existing?.photoDataUrl);
  const [saving, setSaving] = useState(false);
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
      photoDataUrl,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    setSaving(true);
    try {
      await saveProfile(profile);
      router.push("/");
      router.refresh();
    } finally {
      setSaving(false);
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
          <button type="button" className={secondaryButtonClass} onClick={() => router.push("/")}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
