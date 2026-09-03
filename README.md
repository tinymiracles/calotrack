# CaloTrack

A minimal daily calorie & fitness tracker: log your meals, workouts and walks, and see your calories in vs. burned, protein progress, and simple suggestions for the rest of the day. Set up your height, weight, age and maintenance calories once — then just log every day.

## Features

- **One-time profile setup** — height, weight, age, sex, activity level, goal + goal weight, maintenance calories (your own number, or auto-estimated), protein target, a veg/non-veg meal preference, and an optional photo.
- **Meal logging** — pick from a built-in database of 200+ foods, drinks and candy (Indian staples, regional dishes, general food + drinks). Countable foods (a roti, an egg, a piece of candy) can be logged by **how many** instead of guessing grams; everything else is logged in grams. A veg/non-veg filter narrows the search.
- **Workout & walk logging** — pick an activity (walking, running, gym, sports, yoga, etc.) and duration; calories burned are calculated from your body weight.
- **Daily summary** — calories eaten, calories burned (maintenance + exercise), remaining budget, protein/carbs/fat, and plain-language suggestions (what's good to eat next, what to go easy on).
- **Goal analysis** — if you've set a goal weight, a running estimate of how many months you're on pace to reach it, based on your actual logged calorie balance.
- **History & projection** — a log of past days and a 30-day weight projection based on your recent average calorie balance.
- **Delete profile / log out** — available on the Profile page and from the nav bar; wipes your profile and every logged day from this device.

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
