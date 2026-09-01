// Core data types shared across the app.
// Storage is local-only for now (see lib/storage.ts) but every function there
// is async, so swapping in a real API/database later doesn't touch callers.

export type Sex = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export type Goal = "lose" | "maintain" | "gain";

export interface Profile {
  name?: string;
  sex: Sex;
  age: number; // years
  heightCm: number;
  currentWeightKg: number;
  goal: Goal;
  goalWeightKg?: number;
  activityLevel: ActivityLevel;
  /** Maintenance calories. If the user provides their own known number we use
   * it as-is; otherwise it's estimated from BMR x activity factor. */
  maintenanceCalories: number;
  maintenanceIsManual: boolean;
  proteinTargetG: number;
  photoDataUrl?: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  custom?: boolean;
}

export interface ExerciseItem {
  id: string;
  name: string;
  category: string;
  met: number; // metabolic equivalent
}

export interface FoodEntry {
  id: string;
  foodId: string;
  foodName: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: MealSlot;
  loggedAt: string; // ISO datetime
}

export type MealSlot = "breakfast" | "lunch" | "snack" | "dinner" | "other";

export interface ExerciseEntry {
  id: string;
  exerciseId: string;
  exerciseName: string;
  minutes: number;
  caloriesBurned: number;
  loggedAt: string; // ISO datetime
}

export interface DayLog {
  date: string; // YYYY-MM-DD
  weightKg?: number; // optional daily weigh-in
  foods: FoodEntry[];
  exercises: ExerciseEntry[];
}
