import { DayLog, ExerciseEntry, FoodEntry, FoodItem, Profile } from "./types";

// ---------------------------------------------------------------------------
// Local-storage data layer.
//
// Every function here is async on purpose: today they read/write
// window.localStorage, but the *shape* of this module (getProfile,
// saveProfile, getDay, saveDay, ...) is exactly what a future API-backed
// version would expose too. When a real backend/database is ready, this
// file is the only one that needs to change — swap the bodies below for
// `fetch("/api/...")` calls and every screen keeps working unchanged.
// ---------------------------------------------------------------------------

const KEYS = {
  profile: "calotrack:profile",
  days: "calotrack:days", // Record<string, DayLog>
  customFoods: "calotrack:customFoods",
};

function isBrowser() {
  return typeof window !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

// --- Profile -----------------------------------------------------------

export async function getProfile(): Promise<Profile | null> {
  return read<Profile | null>(KEYS.profile, null);
}

export async function saveProfile(profile: Profile): Promise<Profile> {
  write(KEYS.profile, profile);
  return profile;
}

// --- Custom foods --------------------------------------------------------

export async function getCustomFoods(): Promise<FoodItem[]> {
  return read<FoodItem[]>(KEYS.customFoods, []);
}

export async function addCustomFood(food: FoodItem): Promise<FoodItem[]> {
  const all = await getCustomFoods();
  const next = [...all.filter((f) => f.id !== food.id), food];
  write(KEYS.customFoods, next);
  return next;
}

// --- Day logs --------------------------------------------------------------

function readAllDays(): Record<string, DayLog> {
  return read<Record<string, DayLog>>(KEYS.days, {});
}

function writeAllDays(days: Record<string, DayLog>) {
  write(KEYS.days, days);
}

function emptyDay(date: string): DayLog {
  return { date, foods: [], exercises: [] };
}

export async function getDay(date: string): Promise<DayLog> {
  const all = readAllDays();
  return all[date] ?? emptyDay(date);
}

export async function getAllDays(): Promise<DayLog[]> {
  const all = readAllDays();
  return Object.values(all).sort((a, b) => (a.date < b.date ? 1 : -1));
}

async function saveDay(day: DayLog): Promise<DayLog> {
  const all = readAllDays();
  all[day.date] = day;
  writeAllDays(all);
  return day;
}

export async function addFoodEntry(date: string, entry: FoodEntry): Promise<DayLog> {
  const day = await getDay(date);
  day.foods = [...day.foods, entry];
  return saveDay(day);
}

export async function removeFoodEntry(date: string, entryId: string): Promise<DayLog> {
  const day = await getDay(date);
  day.foods = day.foods.filter((f) => f.id !== entryId);
  return saveDay(day);
}

export async function addExerciseEntry(date: string, entry: ExerciseEntry): Promise<DayLog> {
  const day = await getDay(date);
  day.exercises = [...day.exercises, entry];
  return saveDay(day);
}

export async function removeExerciseEntry(date: string, entryId: string): Promise<DayLog> {
  const day = await getDay(date);
  day.exercises = day.exercises.filter((e) => e.id !== entryId);
  return saveDay(day);
}

export async function setDayWeight(date: string, weightKg: number | undefined): Promise<DayLog> {
  const day = await getDay(date);
  day.weightKg = weightKg;
  return saveDay(day);
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// --- Reset / log out -----------------------------------------------------

/** Wipes everything stored locally — profile, every day's log, and custom
 * foods. Used by "Delete profile / log out" — there's no server-side
 * account yet, so this is what "logging out" means for now. */
export async function clearAllData(): Promise<void> {
  if (!isBrowser()) return;
  window.localStorage.removeItem(KEYS.profile);
  window.localStorage.removeItem(KEYS.days);
  window.localStorage.removeItem(KEYS.customFoods);
}
