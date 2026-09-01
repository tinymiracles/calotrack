import { ExerciseItem } from "./types";

// MET (metabolic equivalent) values — standard, widely published estimates.
// Calories burned = MET x 3.5 x weight(kg) / 200 x minutes.
export const EXERCISE_DATABASE: ExerciseItem[] = [
  { id: "walk-slow", name: "Walking, slow (~3 km/h)", category: "Walking", met: 2.8 },
  { id: "walk-moderate", name: "Walking, moderate (~5 km/h)", category: "Walking", met: 3.5 },
  { id: "walk-brisk", name: "Walking, brisk (~6.5 km/h)", category: "Walking", met: 4.3 },
  { id: "walk-uphill", name: "Walking, brisk uphill", category: "Walking", met: 6.0 },
  { id: "jog", name: "Jogging", category: "Running", met: 7.0 },
  { id: "run-8", name: "Running (~8 km/h)", category: "Running", met: 8.3 },
  { id: "run-10", name: "Running (~10 km/h)", category: "Running", met: 9.8 },
  { id: "cycle-leisure", name: "Cycling, leisure", category: "Cycling", met: 4.0 },
  { id: "cycle-moderate", name: "Cycling, moderate", category: "Cycling", met: 6.8 },
  { id: "cycle-vigorous", name: "Cycling, vigorous", category: "Cycling", met: 10.0 },
  { id: "swim-moderate", name: "Swimming, moderate", category: "Swimming", met: 6.0 },
  { id: "swim-vigorous", name: "Swimming, vigorous", category: "Swimming", met: 9.8 },
  { id: "yoga", name: "Yoga", category: "Mind & Body", met: 2.5 },
  { id: "stretching", name: "Stretching", category: "Mind & Body", met: 2.3 },
  { id: "weights-moderate", name: "Weight training, moderate", category: "Gym", met: 3.5 },
  { id: "weights-vigorous", name: "Weight training, vigorous", category: "Gym", met: 6.0 },
  { id: "gym-general", name: "Gym, general workout", category: "Gym", met: 5.0 },
  { id: "cardio-hiit", name: "Cardio / HIIT", category: "Gym", met: 8.0 },
  { id: "dancing", name: "Dancing", category: "Sports & Games", met: 4.5 },
  { id: "football", name: "Football / soccer", category: "Sports & Games", met: 7.0 },
  { id: "cricket", name: "Cricket", category: "Sports & Games", met: 5.0 },
  { id: "badminton", name: "Badminton", category: "Sports & Games", met: 5.5 },
  { id: "basketball", name: "Basketball", category: "Sports & Games", met: 6.5 },
  { id: "tennis", name: "Tennis", category: "Sports & Games", met: 7.0 },
  { id: "table-tennis", name: "Table tennis", category: "Sports & Games", met: 4.0 },
  { id: "skipping", name: "Skipping rope", category: "Sports & Games", met: 10.0 },
  { id: "stairs", name: "Stair climbing", category: "Sports & Games", met: 8.0 },
  { id: "chores", name: "Household chores (moderate)", category: "Everyday", met: 3.0 },
];

export function getExerciseById(id: string): ExerciseItem | undefined {
  return EXERCISE_DATABASE.find((e) => e.id === id);
}

export const EXERCISE_CATEGORIES = Array.from(new Set(EXERCISE_DATABASE.map((e) => e.category)));
