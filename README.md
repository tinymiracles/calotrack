# CaloTrack

A minimal daily calorie & fitness tracker: log your meals (by grams), workouts and walks, and see your calories in vs. burned, protein progress, and simple suggestions for the rest of the day. Set up your height, weight, age and maintenance calories once — then just log every day.

## Features

- **One-time profile setup** — height, weight, age, sex, activity level, goal, maintenance calories (your own number, or auto-estimated), protein target, and an optional photo.
- **Meal logging** — pick from a built-in database of ~70 common foods (Indian staples + general) and enter grams, or add your own custom food.
- **Workout & walk logging** — pick an activity (walking, running, gym, sports, yoga, etc.) and duration; calories burned are calculated from your body weight.
- **Daily summary** — calories eaten, calories burned (maintenance + exercise), remaining budget, protein/carbs/fat, and plain-language suggestions (what's good to eat next, what to go easy on).
- **History & projection** — a log of past days and a 30-day weight projection based on your recent average calorie balance.

## Data storage

All data currently lives in your browser's local storage — nothing leaves your device, no login required. The data layer (`src/lib/storage.ts`) is written so it's easy to swap in a real backend/database later without touching any of the screens.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech

Next.js (App Router) + TypeScript + Tailwind CSS. Deployed on Vercel.

Calorie and nutrition values are approximate, meant for everyday tracking — not medical advice.
