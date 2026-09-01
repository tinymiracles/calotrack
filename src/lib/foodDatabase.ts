import { FoodItem } from "./types";

// Approximate values per 100g, drawn from commonly published Indian +
// general food composition data. Meant for everyday tracking, not clinical
// precision — users can also log a custom food with their own numbers
// (e.g. from a packet label).
export const FOOD_DATABASE: FoodItem[] = [
  // Grains & breads
  { id: "roti", name: "Roti / Chapati (whole wheat)", category: "Grains & Breads", caloriesPer100g: 297, proteinPer100g: 11, carbsPer100g: 58, fatPer100g: 3.7 },
  { id: "rice-white", name: "Rice, cooked (white)", category: "Grains & Breads", caloriesPer100g: 130, proteinPer100g: 2.7, carbsPer100g: 28, fatPer100g: 0.3 },
  { id: "rice-brown", name: "Rice, cooked (brown)", category: "Grains & Breads", caloriesPer100g: 123, proteinPer100g: 2.6, carbsPer100g: 26, fatPer100g: 1 },
  { id: "naan", name: "Naan", category: "Grains & Breads", caloriesPer100g: 310, proteinPer100g: 9, carbsPer100g: 50, fatPer100g: 8 },
  { id: "paratha", name: "Paratha (plain, with oil)", category: "Grains & Breads", caloriesPer100g: 260, proteinPer100g: 6, carbsPer100g: 36, fatPer100g: 10 },
  { id: "bread-white", name: "Bread, white (slice)", category: "Grains & Breads", caloriesPer100g: 265, proteinPer100g: 9, carbsPer100g: 49, fatPer100g: 3.2 },
  { id: "bread-brown", name: "Bread, brown / whole wheat", category: "Grains & Breads", caloriesPer100g: 247, proteinPer100g: 13, carbsPer100g: 41, fatPer100g: 3.4 },
  { id: "idli", name: "Idli", category: "Grains & Breads", caloriesPer100g: 132, proteinPer100g: 3.5, carbsPer100g: 26, fatPer100g: 0.7 },
  { id: "dosa", name: "Dosa (plain)", category: "Grains & Breads", caloriesPer100g: 168, proteinPer100g: 3.9, carbsPer100g: 26, fatPer100g: 5 },
  { id: "poha", name: "Poha", category: "Grains & Breads", caloriesPer100g: 130, proteinPer100g: 2.5, carbsPer100g: 24, fatPer100g: 3 },
  { id: "upma", name: "Upma", category: "Grains & Breads", caloriesPer100g: 145, proteinPer100g: 3.5, carbsPer100g: 22, fatPer100g: 5 },
  { id: "oats", name: "Oats, cooked", category: "Grains & Breads", caloriesPer100g: 71, proteinPer100g: 2.5, carbsPer100g: 12, fatPer100g: 1.5 },

  // Dal & legumes
  { id: "dal", name: "Dal, cooked (toor/moong)", category: "Dal & Legumes", caloriesPer100g: 116, proteinPer100g: 9, carbsPer100g: 20, fatPer100g: 0.4 },
  { id: "rajma", name: "Rajma, cooked", category: "Dal & Legumes", caloriesPer100g: 127, proteinPer100g: 8.7, carbsPer100g: 22, fatPer100g: 0.5 },
  { id: "chole", name: "Chole / Chickpeas, cooked", category: "Dal & Legumes", caloriesPer100g: 164, proteinPer100g: 8.9, carbsPer100g: 27, fatPer100g: 2.6 },
  { id: "sprouts", name: "Sprouts (moong, raw)", category: "Dal & Legumes", caloriesPer100g: 30, proteinPer100g: 3, carbsPer100g: 6, fatPer100g: 0.2 },

  // Vegetables
  { id: "mixed-sabzi", name: "Mixed vegetable sabzi", category: "Vegetables", caloriesPer100g: 90, proteinPer100g: 2.5, carbsPer100g: 10, fatPer100g: 4.5 },
  { id: "aloo-sabzi", name: "Aloo sabzi (potato curry)", category: "Vegetables", caloriesPer100g: 130, proteinPer100g: 2, carbsPer100g: 18, fatPer100g: 5.5 },
  { id: "palak", name: "Palak (spinach, cooked)", category: "Vegetables", caloriesPer100g: 45, proteinPer100g: 3, carbsPer100g: 4, fatPer100g: 2 },
  { id: "bhindi", name: "Bhindi (okra) fry", category: "Vegetables", caloriesPer100g: 95, proteinPer100g: 2, carbsPer100g: 8, fatPer100g: 6 },
  { id: "salad", name: "Salad, raw (cucumber/tomato/onion)", category: "Vegetables", caloriesPer100g: 20, proteinPer100g: 1, carbsPer100g: 4, fatPer100g: 0.2 },

  // Dairy
  { id: "milk-whole", name: "Milk, whole", category: "Dairy", caloriesPer100g: 61, proteinPer100g: 3.2, carbsPer100g: 4.8, fatPer100g: 3.3 },
  { id: "milk-toned", name: "Milk, toned / low-fat", category: "Dairy", caloriesPer100g: 44, proteinPer100g: 3, carbsPer100g: 4.9, fatPer100g: 1.5 },
  { id: "curd", name: "Curd / yogurt, plain", category: "Dairy", caloriesPer100g: 60, proteinPer100g: 3.5, carbsPer100g: 4.7, fatPer100g: 3.3 },
  { id: "paneer", name: "Paneer", category: "Dairy", caloriesPer100g: 265, proteinPer100g: 18, carbsPer100g: 3.6, fatPer100g: 20 },
  { id: "cheese", name: "Cheese (cheddar)", category: "Dairy", caloriesPer100g: 402, proteinPer100g: 25, carbsPer100g: 1.3, fatPer100g: 33 },
  { id: "butter", name: "Butter", category: "Dairy", caloriesPer100g: 717, proteinPer100g: 0.9, carbsPer100g: 0.1, fatPer100g: 81 },
  { id: "ghee", name: "Ghee", category: "Dairy", caloriesPer100g: 900, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100 },

  // Meat, fish & eggs
  { id: "egg-boiled", name: "Egg, whole (boiled)", category: "Meat, Fish & Eggs", caloriesPer100g: 155, proteinPer100g: 13, carbsPer100g: 1.1, fatPer100g: 11 },
  { id: "egg-white", name: "Egg white", category: "Meat, Fish & Eggs", caloriesPer100g: 52, proteinPer100g: 11, carbsPer100g: 0.7, fatPer100g: 0.2 },
  { id: "chicken-breast", name: "Chicken breast, cooked", category: "Meat, Fish & Eggs", caloriesPer100g: 165, proteinPer100g: 31, carbsPer100g: 0, fatPer100g: 3.6 },
  { id: "chicken-curry", name: "Chicken curry (with gravy)", category: "Meat, Fish & Eggs", caloriesPer100g: 190, proteinPer100g: 18, carbsPer100g: 6, fatPer100g: 11 },
  { id: "fish-cooked", name: "Fish, cooked (generic)", category: "Meat, Fish & Eggs", caloriesPer100g: 105, proteinPer100g: 20, carbsPer100g: 0, fatPer100g: 2.5 },
  { id: "mutton-curry", name: "Mutton curry", category: "Meat, Fish & Eggs", caloriesPer100g: 250, proteinPer100g: 20, carbsPer100g: 5, fatPer100g: 17 },
  { id: "prawns", name: "Prawns, cooked", category: "Meat, Fish & Eggs", caloriesPer100g: 99, proteinPer100g: 24, carbsPer100g: 0.2, fatPer100g: 0.3 },

  // Fruits
  { id: "banana", name: "Banana", category: "Fruits", caloriesPer100g: 89, proteinPer100g: 1.1, carbsPer100g: 23, fatPer100g: 0.3 },
  { id: "apple", name: "Apple", category: "Fruits", caloriesPer100g: 52, proteinPer100g: 0.3, carbsPer100g: 14, fatPer100g: 0.2 },
  { id: "mango", name: "Mango", category: "Fruits", caloriesPer100g: 60, proteinPer100g: 0.8, carbsPer100g: 15, fatPer100g: 0.4 },
  { id: "orange", name: "Orange", category: "Fruits", caloriesPer100g: 47, proteinPer100g: 0.9, carbsPer100g: 12, fatPer100g: 0.1 },
  { id: "papaya", name: "Papaya", category: "Fruits", caloriesPer100g: 43, proteinPer100g: 0.5, carbsPer100g: 11, fatPer100g: 0.3 },
  { id: "watermelon", name: "Watermelon", category: "Fruits", caloriesPer100g: 30, proteinPer100g: 0.6, carbsPer100g: 8, fatPer100g: 0.2 },
  { id: "grapes", name: "Grapes", category: "Fruits", caloriesPer100g: 69, proteinPer100g: 0.7, carbsPer100g: 18, fatPer100g: 0.2 },
  { id: "pomegranate", name: "Pomegranate", category: "Fruits", caloriesPer100g: 83, proteinPer100g: 1.7, carbsPer100g: 19, fatPer100g: 1.2 },

  // Nuts & seeds
  { id: "almonds", name: "Almonds", category: "Nuts & Seeds", caloriesPer100g: 579, proteinPer100g: 21, carbsPer100g: 22, fatPer100g: 50 },
  { id: "peanuts", name: "Peanuts", category: "Nuts & Seeds", caloriesPer100g: 567, proteinPer100g: 26, carbsPer100g: 16, fatPer100g: 49 },
  { id: "cashews", name: "Cashews", category: "Nuts & Seeds", caloriesPer100g: 553, proteinPer100g: 18, carbsPer100g: 30, fatPer100g: 44 },
  { id: "walnuts", name: "Walnuts", category: "Nuts & Seeds", caloriesPer100g: 654, proteinPer100g: 15, carbsPer100g: 14, fatPer100g: 65 },

  // Snacks & fried
  { id: "samosa", name: "Samosa", category: "Snacks & Fried", caloriesPer100g: 262, proteinPer100g: 4, carbsPer100g: 32, fatPer100g: 13 },
  { id: "pakora", name: "Pakora / bhajiya", category: "Snacks & Fried", caloriesPer100g: 280, proteinPer100g: 6, carbsPer100g: 28, fatPer100g: 17 },
  { id: "fries", name: "French fries", category: "Snacks & Fried", caloriesPer100g: 312, proteinPer100g: 3.4, carbsPer100g: 41, fatPer100g: 15 },
  { id: "chips", name: "Chips (potato)", category: "Snacks & Fried", caloriesPer100g: 536, proteinPer100g: 7, carbsPer100g: 53, fatPer100g: 35 },
  { id: "biscuit", name: "Biscuit (glucose/marie)", category: "Snacks & Fried", caloriesPer100g: 435, proteinPer100g: 7, carbsPer100g: 75, fatPer100g: 12 },
  { id: "namkeen", name: "Namkeen / mixture", category: "Snacks & Fried", caloriesPer100g: 480, proteinPer100g: 12, carbsPer100g: 45, fatPer100g: 28 },

  // Sweets
  { id: "gulab-jamun", name: "Gulab jamun", category: "Sweets", caloriesPer100g: 315, proteinPer100g: 4, carbsPer100g: 51, fatPer100g: 11 },
  { id: "jalebi", name: "Jalebi", category: "Sweets", caloriesPer100g: 350, proteinPer100g: 3, carbsPer100g: 60, fatPer100g: 10 },
  { id: "ladoo", name: "Ladoo (besan)", category: "Sweets", caloriesPer100g: 400, proteinPer100g: 8, carbsPer100g: 45, fatPer100g: 20 },
  { id: "ice-cream", name: "Ice cream", category: "Sweets", caloriesPer100g: 207, proteinPer100g: 3.5, carbsPer100g: 24, fatPer100g: 11 },
  { id: "chocolate", name: "Chocolate (milk)", category: "Sweets", caloriesPer100g: 535, proteinPer100g: 7.6, carbsPer100g: 59, fatPer100g: 30 },

  // Beverages
  { id: "tea", name: "Tea, with milk & sugar", category: "Beverages", caloriesPer100g: 40, proteinPer100g: 1, carbsPer100g: 6, fatPer100g: 1.2 },
  { id: "coffee", name: "Coffee, with milk & sugar", category: "Beverages", caloriesPer100g: 45, proteinPer100g: 1.2, carbsPer100g: 6.5, fatPer100g: 1.5 },
  { id: "lime-soda", name: "Fresh lime soda (sweet)", category: "Beverages", caloriesPer100g: 35, proteinPer100g: 0, carbsPer100g: 9, fatPer100g: 0 },
  { id: "cola", name: "Soft drink / cola", category: "Beverages", caloriesPer100g: 41, proteinPer100g: 0, carbsPer100g: 10.6, fatPer100g: 0 },
  { id: "juice", name: "Fruit juice (packaged)", category: "Beverages", caloriesPer100g: 45, proteinPer100g: 0.3, carbsPer100g: 11, fatPer100g: 0.1 },
  { id: "chaas", name: "Buttermilk / chaas", category: "Beverages", caloriesPer100g: 30, proteinPer100g: 1.5, carbsPer100g: 3, fatPer100g: 1 },
  { id: "coconut-water", name: "Coconut water", category: "Beverages", caloriesPer100g: 19, proteinPer100g: 0.7, carbsPer100g: 3.7, fatPer100g: 0.2 },

  // Fast food & other
  { id: "pizza", name: "Pizza (cheese)", category: "Fast Food & Other", caloriesPer100g: 266, proteinPer100g: 11, carbsPer100g: 33, fatPer100g: 10 },
  { id: "burger", name: "Burger (veg)", category: "Fast Food & Other", caloriesPer100g: 250, proteinPer100g: 6, carbsPer100g: 33, fatPer100g: 10 },
  { id: "pasta", name: "Pasta, with sauce", category: "Fast Food & Other", caloriesPer100g: 150, proteinPer100g: 5, carbsPer100g: 25, fatPer100g: 4 },
  { id: "noodles", name: "Noodles (veg hakka)", category: "Fast Food & Other", caloriesPer100g: 138, proteinPer100g: 4, carbsPer100g: 22, fatPer100g: 4 },
  { id: "sandwich", name: "Sandwich (veg)", category: "Fast Food & Other", caloriesPer100g: 220, proteinPer100g: 6, carbsPer100g: 30, fatPer100g: 8 },
  { id: "cooking-oil", name: "Cooking oil", category: "Fast Food & Other", caloriesPer100g: 884, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100 },
];

export function getFoodById(id: string, customFoods: FoodItem[] = []): FoodItem | undefined {
  return FOOD_DATABASE.find((f) => f.id === id) ?? customFoods.find((f) => f.id === id);
}

export const FOOD_CATEGORIES = Array.from(new Set(FOOD_DATABASE.map((f) => f.category)));

/** High-protein, lower-calorie foods — used to power "good for you" suggestions. */
export function highProteinFoods(customFoods: FoodItem[] = []): FoodItem[] {
  return [...FOOD_DATABASE, ...customFoods]
    .filter((f) => f.proteinPer100g >= 8 && f.caloriesPer100g <= 250)
    .sort((a, b) => b.proteinPer100g / b.caloriesPer100g - a.proteinPer100g / a.caloriesPer100g);
}

/** Calorie-dense, low-protein foods — used to power "go easy on this" suggestions. */
export function lowValueFoods(customFoods: FoodItem[] = []): FoodItem[] {
  return [...FOOD_DATABASE, ...customFoods].filter(
    (f) => f.caloriesPer100g >= 250 && f.proteinPer100g < 8
  );
}
