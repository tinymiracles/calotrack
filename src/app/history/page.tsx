"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DayLog, Profile } from "@/lib/types";
import { getAllDays, getProfile } from "@/lib/storage";
import { analyzeGoal, formatDateLabel, projectWeight, summarizeDay } from "@/lib/calculations";
import { Card, SectionTitle, StatCard, primaryButtonClass } from "@/components/ui";
import GoalAnalysisCard from "@/components/GoalAnalysisCard";

export default function HistoryPage() {
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [days, setDays] = useState<DayLog[]>([]);

  useEffect(() => {
    Promise.all([getProfile(), getAllDays()]).then(([p, d]) => {
      setProfile(p);
      setDays(d);
    });
  }, []);

  if (profile === undefined) return null;

  if (!profile) {
    return (
      <Card className="flex flex-col items-start gap-3">
        <h1 className="text-lg font-semibold">No profile yet</h1>
        <p className="text-sm text-[var(--muted)]">Set up your profile first, then your history will build up here.</p>
        <Link href="/profile" className={primaryButtonClass}>
          Set up profile
        </Link>
      </Card>
    );
  }

  const projection = projectWeight(days, profile);
  const goalAnalysis = analyzeGoal(profile, projection);
  const loggedDays = days.filter((d) => d.foods.length > 0 || d.exercises.length > 0);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-semibold">History</h1>
        <p className="text-sm text-[var(--muted)]">Your logged days and where you&apos;re trending.</p>
      </div>

      <Card>
        <SectionTitle>Weight projection</SectionTitle>
        {projection ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Current weight" value={profile.currentWeightKg} unit="kg" />
              <StatCard
                label="Projected in 30 days"
                value={projection.projectedWeightIn30DaysKg}
                unit="kg"
                tone={projection.projectedChangeKg < 0 ? "accent" : projection.projectedChangeKg > 0 ? "warn" : "default"}
              />
            </div>
            <p className="mt-3 text-xs text-[var(--muted)]">
              Based on your average net balance of {projection.avgNetCaloriesPerDay > 0 ? "+" : ""}
              {projection.avgNetCaloriesPerDay} kcal/day over the last {projection.daysUsed}{" "}
              {projection.daysUsed === 1 ? "day" : "days"} you logged. Keep logging daily for a more reliable number.
            </p>
          </>
        ) : (
          <p className="text-sm text-[var(--muted)]">Log at least one day of meals or workouts to see a projection.</p>
        )}
      </Card>

      <GoalAnalysisCard analysis={goalAnalysis} />

      <Card>
        <SectionTitle>Daily log</SectionTitle>
        {loggedDays.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No days logged yet — head to Today to get started.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-[var(--border)]">
            {loggedDays.map((day) => {
              const s = summarizeDay(day, profile);
              return (
                <li key={day.date} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-medium">{formatDateLabel(day.date)}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {s.caloriesIn} in · {s.totalBurn} out · {s.proteinIn}g protein
                      {day.weightKg ? ` · ${day.weightKg}kg` : ""}
                    </p>
                  </div>
                  <span
                    className={`tabular-nums font-medium ${
                      s.net > 0 ? "text-[var(--warn)]" : s.net < 0 ? "text-[var(--accent)]" : "text-[var(--muted)]"
                    }`}
                  >
                    {s.net > 0 ? "+" : ""}
                    {s.net} kcal
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
