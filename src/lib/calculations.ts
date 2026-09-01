import { ActivityLevel, DayLog, ExerciseEntry, FoodEntry, FoodItem, Goal, Profile } from "./types";
import { highProteinFoods, lowValueFoods } from "./foodDatabase";

const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (little daily movement, desk job)",
  light: "Lightly active (some walking day to day)",
  moderate: "Moderately active (on your feet a lot)",
  active: "Active (physical job / regularly active)",
  very_active: "Very active (very physical day to day)",
};

/** Mifflin-St Jeor basal metabolic rate. */
export function calcBMR(sex: Profile["sex"], age: number, heightCm: number, weightKg: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(sex === "male" ? base + 5 : base - 161);
}

/** Estimated maintenance calories from BMR x daily-activity factor.
 * This is a baseline that does NOT include workouts logged in the app —
 * those are added on top for the day's actual burn. */
export function estimateMaintenanceCalories(
  sex: Profile["sex"],
  age: number,
  heightCm: number,
  weightKg: number,
  activityLevel: ActivityLevel
): number {
  const bmr = calcBMR(sex, age, heightCm, weightKg);
  return Math.round(bmr * ACTIVITY_FACTORS[activityLevel]);
}

export function defaultProteinTarget(weightKg: number): number {
  return Math.round(weightKg * 1.6);
}

export function calcBMI(heightCm: number, weightKg: number): number {
  const m = heightCm / 100;
  return Math.round((weightKg / (m * m)) * 10) / 10;
}

/** Calories the day's *goal* should sit at, before adding back exercise. */
const GOAL_ADJUSTMENT: Record<Goal, number> = {
  lose: -500,
  maintain: 0,
  gain: 300,
};

export function calcCalorieTarget(profile: Profile): number {
  return profile.maintenanceCalories + GOAL_ADJUSTMENT[profile.goal];
}

export function calcFoodMacros(food: FoodItem, grams: number) {
  const factor = grams / 100;
  return {
    calories: Math.round(food.caloriesPer100g * factor),
    protein: Math.round(food.proteinPer100g * factor * 10) / 10,
    carbs: Math.round(food.carbsPer100g * factor * 10) / 10,
    fat: Math.round(food.fatPer100g * factor * 10) / 10,
  };
}

export function calcExerciseCalories(met: number, weightKg: number, minutes: number): number {
  return Math.round(((met * 3.5 * weightKg) / 200) * minutes);
}

export interface DaySummary {
  caloriesIn: number;
  proteinIn: number;
  carbsIn: number;
  fatIn: number;
  exerciseCalories: number;
  exerciseMinutes: number;
  maintenanceCalories: number;
  calorieTarget: number;
  totalBurn: number;
  net: number; // caloriesIn - totalBurn
  remainingCalories: number; // calorieTarget + exerciseCalories - caloriesIn
  remainingProtein: number;
}

export function summarizeDay(day: DayLog | undefined, profile: Profile): DaySummary {
  const foods: FoodEntry[] = day?.foods ?? [];
  const exercises: ExerciseEntry[] = day?.exercises ?? [];

  const caloriesIn = foods.reduce((s, f) => s + f.calories, 0);
  const proteinIn = round1(foods.reduce((s, f) => s + f.protein, 0));
  const carbsIn = round1(foods.reduce((s, f) => s + f.carbs, 0));
  const fatIn = round1(foods.reduce((s, f) => s + f.fat, 0));
  const exerciseCalories = exercises.reduce((s, e) => s + e.caloriesBurned, 0);
  const exerciseMinutes = exercises.reduce((s, e) => s + e.minutes, 0);

  const maintenanceCalories = profile.maintenanceCalories;
  const calorieTarget = calcCalorieTarget(profile);
  const totalBurn = maintenanceCalories + exerciseCalories;
  const net = caloriesIn - totalBurn;
  const remainingCalories = calorieTarget + exerciseCalories - caloriesIn;
  const remainingProtein = round1(profile.proteinTargetG - proteinIn);

  return {
    caloriesIn,
    proteinIn,
    carbsIn,
    fatIn,
    exerciseCalories,
    exerciseMinutes,
    maintenanceCalories,
    calorieTarget,
    totalBurn,
    net,
    remainingCalories,
    remainingProtein,
  };
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export interface Suggestions {
  status: "under" | "on_track" | "over";
  headline: string;
  detail: string;
  goodFoods: FoodItem[];
  avoidFoods: FoodItem[];
}

export function buildSuggestions(summary: DaySummary, customFoods: FoodItem[] = []): Suggestions {
  const { remainingCalories, remainingProtein } = summary;

  let status: Suggestions["status"] = "on_track";
  let headline = "You're on track.";
  let detail = `About ${Math.max(remainingCalories, 0)} kcal left for the day.`;

  if (remainingCalories < -50) {
    status = "over";
    headline = `You're over budget by ${Math.abs(Math.round(remainingCalories))} kcal.`;
    detail = "Go light for the rest of the day — skip fried snacks and sweets, favour vegetables, dal and a short walk if you can.";
  } else if (remainingCalories > 400) {
    status = "under";
    headline = `You still have ${Math.round(remainingCalories)} kcal and ${Math.max(remainingProtein, 0)}g protein to go.`;
    detail = "Good room for a proper meal — prioritise protein so you hit your target.";
  } else {
    headline = `${Math.round(remainingCalories)} kcal left for the day.`;
    detail =
      remainingProtein > 0
        ? `Aim for another ${remainingProtein}g of protein.`
        : "Protein target already met for today.";
  }

  const goodFoods = highProteinFoods(customFoods)
    .filter((f) => f.caloriesPer100g <= Math.max(remainingCalories, 120))
    .slice(0, 6);

  const avoidFoods = status === "over" ? lowValueFoods(customFoods).slice(0, 6) : [];

  return { status, headline, detail, goodFoods, avoidFoods };
}

export interface WeightProjection {
  avgNetCaloriesPerDay: number;
  daysUsed: number;
  projectedChangeKg: number; // over 30 days, negative = loss
  projectedWeightIn30DaysKg: number;
}

const KCAL_PER_KG_FAT = 7700;

/** Uses up to the last 14 logged days to project weight 30 days out
 * if the current average calorie balance continues. */
export function projectWeight(days: DayLog[], profile: Profile): WeightProjection | null {
  const withFood = days
    .filter((d) => d.foods.length > 0 || d.exercises.length > 0)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 14);

  if (withFood.length === 0) return null;

  const nets = withFood.map((d) => summarizeDay(d, profile).net);
  const avgNetCaloriesPerDay = Math.round(nets.reduce((s, n) => s + n, 0) / nets.length);
  const projectedChangeKg = Math.round(((avgNetCaloriesPerDay * 30) / KCAL_PER_KG_FAT) * 10) / 10;

  return {
    avgNetCaloriesPerDay,
    daysUsed: withFood.length,
    projectedChangeKg,
    projectedWeightIn30DaysKg: Math.round((profile.currentWeightKg + projectedChangeKg) * 10) / 10,
  };
}

export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatDateLabel(dateKey: string): string {
  const d = new Date(dateKey + "T00:00:00");
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}
