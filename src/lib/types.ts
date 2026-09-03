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

export type DietPreference = "all" | "veg" | "non_veg";

/** One of the four brand looks a user can personalize the app with. */
export type ColorTheme = "teal" | "forest" | "sunset" | "berry";

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
  /** Preferred filter for the meal search — doesn't hide anything, just
   * defaults the search results to this diet type. */
  dietPreference?: DietPreference;
  /** Chosen app color theme. Defaults to "teal" when unset. */
  colorTheme?: ColorTheme;
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
  /** For countable foods (a roti, an egg, a candy) — lets people log "how many"
   * instead of guessing grams. When present, the UI defaults to piece entry. */
  unitLabel?: string;
  unitGrams?: number;
  /** Best-effort veg / non-veg classification, used by the diet filter. */
  dietTag?: "veg" | "non_veg";
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
  /** Present when this entry was logged by piece count rather than grams. */
  quantity?: number;
  unitLabel?: string;
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
