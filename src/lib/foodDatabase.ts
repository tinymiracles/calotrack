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
  { id: "medu-vada", name: "Medu vada", category: "Grains & Breads", caloriesPer100g: 180, proteinPer100g: 6, carbsPer100g: 18, fatPer100g: 10 },
  { id: "uttapam", name: "Uttapam", category: "Grains & Breads", caloriesPer100g: 150, proteinPer100g: 4, carbsPer100g: 24, fatPer100g: 4 },
  { id: "appam", name: "Appam", category: "Grains & Breads", caloriesPer100g: 120, proteinPer100g: 2, carbsPer100g: 22, fatPer100g: 2 },
  { id: "pongal", name: "Pongal (khara)", category: "Grains & Breads", caloriesPer100g: 150, proteinPer100g: 4, carbsPer100g: 22, fatPer100g: 5 },
  { id: "vada-pav", name: "Vada pav", category: "Grains & Breads", caloriesPer100g: 280, proteinPer100g: 6, carbsPer100g: 35, fatPer100g: 13 },
  { id: "misal-pav", name: "Misal pav", category: "Grains & Breads", caloriesPer100g: 180, proteinPer100g: 7, carbsPer100g: 20, fatPer100g: 8 },
  { id: "pav-bhaji", name: "Pav bhaji", category: "Grains & Breads", caloriesPer100g: 150, proteinPer100g: 4, carbsPer100g: 18, fatPer100g: 7 },
  { id: "dhokla", name: "Dhokla", category: "Grains & Breads", caloriesPer100g: 160, proteinPer100g: 6, carbsPer100g: 25, fatPer100g: 4 },
  { id: "khaman", name: "Khaman", category: "Grains & Breads", caloriesPer100g: 160, proteinPer100g: 6, carbsPer100g: 24, fatPer100g: 4.5 },
  { id: "thepla", name: "Thepla", category: "Grains & Breads", caloriesPer100g: 300, proteinPer100g: 7, carbsPer100g: 40, fatPer100g: 12 },
  { id: "kulcha", name: "Kulcha", category: "Grains & Breads", caloriesPer100g: 310, proteinPer100g: 8, carbsPer100g: 50, fatPer100g: 8 },
  { id: "bhatura", name: "Bhatura", category: "Grains & Breads", caloriesPer100g: 340, proteinPer100g: 7, carbsPer100g: 40, fatPer100g: 16 },
  { id: "puri", name: "Puri", category: "Grains & Breads", caloriesPer100g: 330, proteinPer100g: 6, carbsPer100g: 35, fatPer100g: 18 },
  { id: "roomali-roti", name: "Roomali roti", category: "Grains & Breads", caloriesPer100g: 280, proteinPer100g: 9, carbsPer100g: 55, fatPer100g: 2 },
  { id: "biryani-chicken", name: "Biryani, chicken", category: "Grains & Breads", caloriesPer100g: 200, proteinPer100g: 10, carbsPer100g: 25, fatPer100g: 7 },
  { id: "biryani-mutton", name: "Biryani, mutton", category: "Grains & Breads", caloriesPer100g: 230, proteinPer100g: 13, carbsPer100g: 24, fatPer100g: 9 },
  { id: "pulao", name: "Pulao (veg)", category: "Grains & Breads", caloriesPer100g: 160, proteinPer100g: 3, carbsPer100g: 28, fatPer100g: 4 },
  { id: "khichdi", name: "Khichdi", category: "Grains & Breads", caloriesPer100g: 120, proteinPer100g: 4, carbsPer100g: 20, fatPer100g: 2.5 },
  { id: "dalia", name: "Dalia (broken wheat porridge)", category: "Grains & Breads", caloriesPer100g: 90, proteinPer100g: 3, carbsPer100g: 18, fatPer100g: 0.5 },
  { id: "muesli", name: "Muesli", category: "Grains & Breads", caloriesPer100g: 360, proteinPer100g: 10, carbsPer100g: 65, fatPer100g: 6 },
  { id: "cornflakes", name: "Cornflakes", category: "Grains & Breads", caloriesPer100g: 380, proteinPer100g: 7, carbsPer100g: 84, fatPer100g: 1 },
  { id: "granola", name: "Granola", category: "Grains & Breads", caloriesPer100g: 470, proteinPer100g: 10, carbsPer100g: 64, fatPer100g: 20 },
  { id: "pancake", name: "Pancake", category: "Grains & Breads", caloriesPer100g: 227, proteinPer100g: 6, carbsPer100g: 28, fatPer100g: 10 },
  { id: "waffle", name: "Waffle", category: "Grains & Breads", caloriesPer100g: 291, proteinPer100g: 7, carbsPer100g: 33, fatPer100g: 14 },
  { id: "french-toast", name: "French toast", category: "Grains & Breads", caloriesPer100g: 230, proteinPer100g: 8, carbsPer100g: 28, fatPer100g: 9 },

  // Dal & legumes
  { id: "dal", name: "Dal, cooked (toor/moong)", category: "Dal & Legumes", caloriesPer100g: 116, proteinPer100g: 9, carbsPer100g: 20, fatPer100g: 0.4 },
  { id: "masoor-dal", name: "Masoor dal, cooked", category: "Dal & Legumes", caloriesPer100g: 105, proteinPer100g: 8, carbsPer100g: 18, fatPer100g: 0.4 },
  { id: "urad-dal", name: "Urad dal, cooked", category: "Dal & Legumes", caloriesPer100g: 120, proteinPer100g: 9, carbsPer100g: 20, fatPer100g: 0.5 },
  { id: "dal-makhani", name: "Dal makhani", category: "Dal & Legumes", caloriesPer100g: 190, proteinPer100g: 8, carbsPer100g: 15, fatPer100g: 12 },
  { id: "sambar", name: "Sambar", category: "Dal & Legumes", caloriesPer100g: 80, proteinPer100g: 4, carbsPer100g: 12, fatPer100g: 2 },
  { id: "rasam", name: "Rasam", category: "Dal & Legumes", caloriesPer100g: 35, proteinPer100g: 1.5, carbsPer100g: 6, fatPer100g: 0.8 },
  { id: "rajma", name: "Rajma, cooked", category: "Dal & Legumes", caloriesPer100g: 127, proteinPer100g: 8.7, carbsPer100g: 22, fatPer100g: 0.5 },
  { id: "chole", name: "Chole / Chickpeas, cooked", category: "Dal & Legumes", caloriesPer100g: 164, proteinPer100g: 8.9, carbsPer100g: 27, fatPer100g: 2.6 },
  { id: "black-chana", name: "Black chana curry", category: "Dal & Legumes", caloriesPer100g: 164, proteinPer100g: 9, carbsPer100g: 27, fatPer100g: 3 },
  { id: "lobia", name: "Lobia (black-eyed peas) curry", category: "Dal & Legumes", caloriesPer100g: 140, proteinPer100g: 8, carbsPer100g: 24, fatPer100g: 1 },
  { id: "sprouts", name: "Sprouts (moong, raw)", category: "Dal & Legumes", caloriesPer100g: 30, proteinPer100g: 3, carbsPer100g: 6, fatPer100g: 0.2 },

  // Vegetables
  { id: "mixed-sabzi", name: "Mixed vegetable sabzi", category: "Vegetables", caloriesPer100g: 90, proteinPer100g: 2.5, carbsPer100g: 10, fatPer100g: 4.5 },
  { id: "aloo-sabzi", name: "Aloo sabzi (potato curry)", category: "Vegetables", caloriesPer100g: 130, proteinPer100g: 2, carbsPer100g: 18, fatPer100g: 5.5 },
  { id: "palak", name: "Palak (spinach, cooked)", category: "Vegetables", caloriesPer100g: 45, proteinPer100g: 3, carbsPer100g: 4, fatPer100g: 2 },
  { id: "bhindi", name: "Bhindi (okra) fry", category: "Vegetables", caloriesPer100g: 95, proteinPer100g: 2, carbsPer100g: 8, fatPer100g: 6 },
  { id: "salad", name: "Salad, raw (cucumber/tomato/onion)", category: "Vegetables", caloriesPer100g: 20, proteinPer100g: 1, carbsPer100g: 4, fatPer100g: 0.2 },
  { id: "baingan-bharta", name: "Baingan bharta", category: "Vegetables", caloriesPer100g: 100, proteinPer100g: 2, carbsPer100g: 10, fatPer100g: 6 },
  { id: "gobi-sabzi", name: "Gobi (cauliflower) sabzi", category: "Vegetables", caloriesPer100g: 110, proteinPer100g: 2.5, carbsPer100g: 10, fatPer100g: 7 },
  { id: "matar-paneer", name: "Matar paneer", category: "Vegetables", caloriesPer100g: 180, proteinPer100g: 8, carbsPer100g: 10, fatPer100g: 12 },
  { id: "kadai-paneer", name: "Kadai paneer", category: "Vegetables", caloriesPer100g: 220, proteinPer100g: 10, carbsPer100g: 8, fatPer100g: 16 },
  { id: "malai-kofta", name: "Malai kofta", category: "Vegetables", caloriesPer100g: 250, proteinPer100g: 6, carbsPer100g: 15, fatPer100g: 18 },
  { id: "cabbage-sabzi", name: "Cabbage sabzi", category: "Vegetables", caloriesPer100g: 70, proteinPer100g: 2, carbsPer100g: 8, fatPer100g: 3.5 },
  { id: "carrot-raw", name: "Carrot, raw", category: "Vegetables", caloriesPer100g: 41, proteinPer100g: 0.9, carbsPer100g: 10, fatPer100g: 0.2 },
  { id: "cucumber-raw", name: "Cucumber, raw", category: "Vegetables", caloriesPer100g: 15, proteinPer100g: 0.7, carbsPer100g: 3.6, fatPer100g: 0.1 },
  { id: "tomato-raw", name: "Tomato, raw", category: "Vegetables", caloriesPer100g: 18, proteinPer100g: 0.9, carbsPer100g: 3.9, fatPer100g: 0.2 },
  { id: "spinach-raw", name: "Spinach, raw", category: "Vegetables", caloriesPer100g: 23, proteinPer100g: 2.9, carbsPer100g: 3.6, fatPer100g: 0.4 },
  { id: "broccoli", name: "Broccoli, cooked", category: "Vegetables", caloriesPer100g: 35, proteinPer100g: 2.4, carbsPer100g: 7, fatPer100g: 0.4 },
  { id: "cauliflower-raw", name: "Cauliflower, raw", category: "Vegetables", caloriesPer100g: 25, proteinPer100g: 1.9, carbsPer100g: 5, fatPer100g: 0.3 },
  { id: "capsicum", name: "Capsicum", category: "Vegetables", caloriesPer100g: 20, proteinPer100g: 0.9, carbsPer100g: 4.6, fatPer100g: 0.2 },
  { id: "mushroom", name: "Mushroom, cooked", category: "Vegetables", caloriesPer100g: 28, proteinPer100g: 3.3, carbsPer100g: 3.3, fatPer100g: 0.5 },

  // Dairy
  { id: "milk-whole", name: "Milk, whole", category: "Dairy", caloriesPer100g: 61, proteinPer100g: 3.2, carbsPer100g: 4.8, fatPer100g: 3.3 },
  { id: "milk-toned", name: "Milk, toned / low-fat", category: "Dairy", caloriesPer100g: 44, proteinPer100g: 3, carbsPer100g: 4.9, fatPer100g: 1.5 },
  { id: "curd", name: "Curd / yogurt, plain", category: "Dairy", caloriesPer100g: 60, proteinPer100g: 3.5, carbsPer100g: 4.7, fatPer100g: 3.3 },
  { id: "flavored-yogurt", name: "Yogurt, flavored", category: "Dairy", caloriesPer100g: 95, proteinPer100g: 3.5, carbsPer100g: 15, fatPer100g: 2 },
  { id: "paneer", name: "Paneer", category: "Dairy", caloriesPer100g: 265, proteinPer100g: 18, carbsPer100g: 3.6, fatPer100g: 20 },
  { id: "cottage-cheese", name: "Cottage cheese", category: "Dairy", caloriesPer100g: 98, proteinPer100g: 11, carbsPer100g: 3.4, fatPer100g: 4.3 },
  { id: "cheese", name: "Cheese (cheddar)", category: "Dairy", caloriesPer100g: 402, proteinPer100g: 25, carbsPer100g: 1.3, fatPer100g: 33 },
  { id: "butter", name: "Butter", category: "Dairy", caloriesPer100g: 717, proteinPer100g: 0.9, carbsPer100g: 0.1, fatPer100g: 81 },
  { id: "ghee", name: "Ghee", category: "Dairy", caloriesPer100g: 900, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100 },
  { id: "cream", name: "Cream, fresh", category: "Dairy", caloriesPer100g: 340, proteinPer100g: 2.1, carbsPer100g: 3, fatPer100g: 36 },
  { id: "condensed-milk", name: "Condensed milk, sweetened", category: "Dairy", caloriesPer100g: 321, proteinPer100g: 7.9, carbsPer100g: 55, fatPer100g: 8.7 },

  // Meat, fish & eggs
  { id: "egg-boiled", name: "Egg, whole (boiled)", category: "Meat, Fish & Eggs", caloriesPer100g: 155, proteinPer100g: 13, carbsPer100g: 1.1, fatPer100g: 11 },
  { id: "egg-white", name: "Egg white", category: "Meat, Fish & Eggs", caloriesPer100g: 52, proteinPer100g: 11, carbsPer100g: 0.7, fatPer100g: 0.2 },
  { id: "egg-curry", name: "Egg curry", category: "Meat, Fish & Eggs", caloriesPer100g: 160, proteinPer100g: 9, carbsPer100g: 6, fatPer100g: 11 },
  { id: "chicken-breast", name: "Chicken breast, cooked", category: "Meat, Fish & Eggs", caloriesPer100g: 165, proteinPer100g: 31, carbsPer100g: 0, fatPer100g: 3.6 },
  { id: "chicken-curry", name: "Chicken curry (with gravy)", category: "Meat, Fish & Eggs", caloriesPer100g: 190, proteinPer100g: 18, carbsPer100g: 6, fatPer100g: 11 },
  { id: "tandoori-chicken", name: "Tandoori chicken", category: "Meat, Fish & Eggs", caloriesPer100g: 180, proteinPer100g: 25, carbsPer100g: 2, fatPer100g: 8 },
  { id: "kebab", name: "Kebab (seekh)", category: "Meat, Fish & Eggs", caloriesPer100g: 250, proteinPer100g: 20, carbsPer100g: 5, fatPer100g: 17 },
  { id: "keema", name: "Keema (minced meat curry)", category: "Meat, Fish & Eggs", caloriesPer100g: 220, proteinPer100g: 18, carbsPer100g: 5, fatPer100g: 15 },
  { id: "fish-cooked", name: "Fish, cooked (generic)", category: "Meat, Fish & Eggs", caloriesPer100g: 105, proteinPer100g: 20, carbsPer100g: 0, fatPer100g: 2.5 },
  { id: "fish-curry", name: "Fish curry", category: "Meat, Fish & Eggs", caloriesPer100g: 140, proteinPer100g: 16, carbsPer100g: 4, fatPer100g: 7 },
  { id: "fish-fry", name: "Fish fry", category: "Meat, Fish & Eggs", caloriesPer100g: 210, proteinPer100g: 18, carbsPer100g: 8, fatPer100g: 12 },
  { id: "mutton-curry", name: "Mutton curry", category: "Meat, Fish & Eggs", caloriesPer100g: 250, proteinPer100g: 20, carbsPer100g: 5, fatPer100g: 17 },
  { id: "prawns", name: "Prawns, cooked", category: "Meat, Fish & Eggs", caloriesPer100g: 99, proteinPer100g: 24, carbsPer100g: 0.2, fatPer100g: 0.3 },
  { id: "sausage", name: "Sausage", category: "Meat, Fish & Eggs", caloriesPer100g: 300, proteinPer100g: 13, carbsPer100g: 3, fatPer100g: 27 },
  { id: "bacon", name: "Bacon", category: "Meat, Fish & Eggs", caloriesPer100g: 541, proteinPer100g: 37, carbsPer100g: 1.4, fatPer100g: 42 },
  { id: "ham", name: "Ham", category: "Meat, Fish & Eggs", caloriesPer100g: 145, proteinPer100g: 21, carbsPer100g: 1.5, fatPer100g: 5.5 },

  // Fruits
  { id: "banana", name: "Banana", category: "Fruits", caloriesPer100g: 89, proteinPer100g: 1.1, carbsPer100g: 23, fatPer100g: 0.3 },
  { id: "apple", name: "Apple", category: "Fruits", caloriesPer100g: 52, proteinPer100g: 0.3, carbsPer100g: 14, fatPer100g: 0.2 },
  { id: "mango", name: "Mango", category: "Fruits", caloriesPer100g: 60, proteinPer100g: 0.8, carbsPer100g: 15, fatPer100g: 0.4 },
  { id: "orange", name: "Orange", category: "Fruits", caloriesPer100g: 47, proteinPer100g: 0.9, carbsPer100g: 12, fatPer100g: 0.1 },
  { id: "papaya", name: "Papaya", category: "Fruits", caloriesPer100g: 43, proteinPer100g: 0.5, carbsPer100g: 11, fatPer100g: 0.3 },
  { id: "watermelon", name: "Watermelon", category: "Fruits", caloriesPer100g: 30, proteinPer100g: 0.6, carbsPer100g: 8, fatPer100g: 0.2 },
  { id: "grapes", name: "Grapes", category: "Fruits", caloriesPer100g: 69, proteinPer100g: 0.7, carbsPer100g: 18, fatPer100g: 0.2 },
  { id: "pomegranate", name: "Pomegranate", category: "Fruits", caloriesPer100g: 83, proteinPer100g: 1.7, carbsPer100g: 19, fatPer100g: 1.2 },
  { id: "kiwi", name: "Kiwi", category: "Fruits", caloriesPer100g: 61, proteinPer100g: 1.1, carbsPer100g: 15, fatPer100g: 0.5 },
  { id: "pineapple", name: "Pineapple", category: "Fruits", caloriesPer100g: 50, proteinPer100g: 0.5, carbsPer100g: 13, fatPer100g: 0.1 },
  { id: "guava", name: "Guava", category: "Fruits", caloriesPer100g: 68, proteinPer100g: 2.6, carbsPer100g: 14, fatPer100g: 1 },
  { id: "chikoo", name: "Chikoo (sapota)", category: "Fruits", caloriesPer100g: 83, proteinPer100g: 0.4, carbsPer100g: 20, fatPer100g: 1.1 },
  { id: "custard-apple", name: "Custard apple", category: "Fruits", caloriesPer100g: 94, proteinPer100g: 2.1, carbsPer100g: 24, fatPer100g: 0.3 },
  { id: "dates", name: "Dates, dried", category: "Fruits", caloriesPer100g: 282, proteinPer100g: 2.5, carbsPer100g: 75, fatPer100g: 0.4 },
  { id: "raisins", name: "Raisins", category: "Fruits", caloriesPer100g: 299, proteinPer100g: 3.1, carbsPer100g: 79, fatPer100g: 0.5 },
  { id: "dried-figs", name: "Figs, dried", category: "Fruits", caloriesPer100g: 249, proteinPer100g: 3.3, carbsPer100g: 64, fatPer100g: 0.9 },
  { id: "dried-apricot", name: "Apricot, dried", category: "Fruits", caloriesPer100g: 241, proteinPer100g: 3.4, carbsPer100g: 63, fatPer100g: 0.5 },
  { id: "strawberry", name: "Strawberry", category: "Fruits", caloriesPer100g: 32, proteinPer100g: 0.7, carbsPer100g: 8, fatPer100g: 0.3 },
  { id: "blueberry", name: "Blueberry", category: "Fruits", caloriesPer100g: 57, proteinPer100g: 0.7, carbsPer100g: 14, fatPer100g: 0.3 },
  { id: "litchi", name: "Litchi", category: "Fruits", caloriesPer100g: 66, proteinPer100g: 0.8, carbsPer100g: 17, fatPer100g: 0.4 },

  // Nuts & seeds
  { id: "almonds", name: "Almonds", category: "Nuts & Seeds", caloriesPer100g: 579, proteinPer100g: 21, carbsPer100g: 22, fatPer100g: 50 },
  { id: "peanuts", name: "Peanuts", category: "Nuts & Seeds", caloriesPer100g: 567, proteinPer100g: 26, carbsPer100g: 16, fatPer100g: 49 },
  { id: "cashews", name: "Cashews", category: "Nuts & Seeds", caloriesPer100g: 553, proteinPer100g: 18, carbsPer100g: 30, fatPer100g: 44 },
  { id: "walnuts", name: "Walnuts", category: "Nuts & Seeds", caloriesPer100g: 654, proteinPer100g: 15, carbsPer100g: 14, fatPer100g: 65 },
  { id: "pistachios", name: "Pistachios", category: "Nuts & Seeds", caloriesPer100g: 560, proteinPer100g: 20, carbsPer100g: 28, fatPer100g: 45 },
  { id: "sunflower-seeds", name: "Sunflower seeds", category: "Nuts & Seeds", caloriesPer100g: 584, proteinPer100g: 21, carbsPer100g: 20, fatPer100g: 51 },
  { id: "chia-seeds", name: "Chia seeds", category: "Nuts & Seeds", caloriesPer100g: 486, proteinPer100g: 17, carbsPer100g: 42, fatPer100g: 31 },
  { id: "flax-seeds", name: "Flax seeds", category: "Nuts & Seeds", caloriesPer100g: 534, proteinPer100g: 18, carbsPer100g: 29, fatPer100g: 42 },
  { id: "dried-coconut", name: "Coconut, dried", category: "Nuts & Seeds", caloriesPer100g: 660, proteinPer100g: 6.9, carbsPer100g: 24, fatPer100g: 65 },

  // Snacks & fried
  { id: "samosa", name: "Samosa", category: "Snacks & Fried", caloriesPer100g: 262, proteinPer100g: 4, carbsPer100g: 32, fatPer100g: 13 },
  { id: "pakora", name: "Pakora / bhajiya", category: "Snacks & Fried", caloriesPer100g: 280, proteinPer100g: 6, carbsPer100g: 28, fatPer100g: 17 },
  { id: "fries", name: "French fries", category: "Snacks & Fried", caloriesPer100g: 312, proteinPer100g: 3.4, carbsPer100g: 41, fatPer100g: 15 },
  { id: "chips", name: "Chips (potato)", category: "Snacks & Fried", caloriesPer100g: 536, proteinPer100g: 7, carbsPer100g: 53, fatPer100g: 35 },
  { id: "biscuit", name: "Biscuit (glucose/marie)", category: "Snacks & Fried", caloriesPer100g: 435, proteinPer100g: 7, carbsPer100g: 75, fatPer100g: 12 },
  { id: "namkeen", name: "Namkeen / mixture", category: "Snacks & Fried", caloriesPer100g: 480, proteinPer100g: 12, carbsPer100g: 45, fatPer100g: 28 },
  { id: "popcorn", name: "Popcorn, salted", category: "Snacks & Fried", caloriesPer100g: 387, proteinPer100g: 12, carbsPer100g: 78, fatPer100g: 4.5 },
  { id: "crackers", name: "Crackers", category: "Snacks & Fried", caloriesPer100g: 480, proteinPer100g: 8, carbsPer100g: 62, fatPer100g: 20 },
  { id: "granola-bar", name: "Granola bar", category: "Snacks & Fried", caloriesPer100g: 470, proteinPer100g: 8, carbsPer100g: 64, fatPer100g: 20 },
  { id: "protein-bar", name: "Protein bar", category: "Snacks & Fried", caloriesPer100g: 380, proteinPer100g: 25, carbsPer100g: 40, fatPer100g: 12 },
  { id: "kachori", name: "Kachori", category: "Snacks & Fried", caloriesPer100g: 320, proteinPer100g: 6, carbsPer100g: 35, fatPer100g: 17 },
  { id: "dabeli", name: "Dabeli", category: "Snacks & Fried", caloriesPer100g: 250, proteinPer100g: 5, carbsPer100g: 35, fatPer100g: 10 },
  { id: "pani-puri", name: "Pani puri", category: "Snacks & Fried", caloriesPer100g: 220, proteinPer100g: 4, carbsPer100g: 30, fatPer100g: 9 },
  { id: "bhel-puri", name: "Bhel puri", category: "Snacks & Fried", caloriesPer100g: 190, proteinPer100g: 4, carbsPer100g: 30, fatPer100g: 6 },
  { id: "sev-puri", name: "Sev puri", category: "Snacks & Fried", caloriesPer100g: 250, proteinPer100g: 5, carbsPer100g: 32, fatPer100g: 11 },
  { id: "dahi-puri", name: "Dahi puri", category: "Snacks & Fried", caloriesPer100g: 180, proteinPer100g: 5, carbsPer100g: 24, fatPer100g: 7 },
  { id: "frankie-roll", name: "Frankie / roll (veg)", category: "Snacks & Fried", caloriesPer100g: 240, proteinPer100g: 6, carbsPer100g: 32, fatPer100g: 9 },
  { id: "momos-steamed", name: "Momos, steamed (veg)", category: "Snacks & Fried", caloriesPer100g: 160, proteinPer100g: 5, carbsPer100g: 25, fatPer100g: 4 },
  { id: "momos-fried", name: "Momos, fried", category: "Snacks & Fried", caloriesPer100g: 250, proteinPer100g: 6, carbsPer100g: 28, fatPer100g: 13 },
  { id: "spring-roll", name: "Spring roll", category: "Snacks & Fried", caloriesPer100g: 230, proteinPer100g: 4, carbsPer100g: 26, fatPer100g: 12 },
  { id: "cutlet", name: "Cutlet (veg)", category: "Snacks & Fried", caloriesPer100g: 220, proteinPer100g: 4, carbsPer100g: 26, fatPer100g: 11 },

  // Sweets
  { id: "gulab-jamun", name: "Gulab jamun", category: "Sweets", caloriesPer100g: 315, proteinPer100g: 4, carbsPer100g: 51, fatPer100g: 11 },
  { id: "jalebi", name: "Jalebi", category: "Sweets", caloriesPer100g: 350, proteinPer100g: 3, carbsPer100g: 60, fatPer100g: 10 },
  { id: "ladoo", name: "Ladoo (besan)", category: "Sweets", caloriesPer100g: 400, proteinPer100g: 8, carbsPer100g: 45, fatPer100g: 20 },
  { id: "rasgulla", name: "Rasgulla", category: "Sweets", caloriesPer100g: 186, proteinPer100g: 4, carbsPer100g: 33, fatPer100g: 4 },
  { id: "rasmalai", name: "Rasmalai", category: "Sweets", caloriesPer100g: 220, proteinPer100g: 6, carbsPer100g: 28, fatPer100g: 9 },
  { id: "kaju-katli", name: "Kaju katli", category: "Sweets", caloriesPer100g: 460, proteinPer100g: 8, carbsPer100g: 55, fatPer100g: 22 },
  { id: "barfi", name: "Barfi", category: "Sweets", caloriesPer100g: 400, proteinPer100g: 6, carbsPer100g: 50, fatPer100g: 19 },
  { id: "gajar-halwa", name: "Gajar halwa (carrot halwa)", category: "Sweets", caloriesPer100g: 280, proteinPer100g: 4, carbsPer100g: 30, fatPer100g: 16 },
  { id: "sooji-halwa", name: "Sooji halwa", category: "Sweets", caloriesPer100g: 300, proteinPer100g: 3, carbsPer100g: 40, fatPer100g: 14 },
  { id: "kheer", name: "Kheer / payasam", category: "Sweets", caloriesPer100g: 150, proteinPer100g: 4, carbsPer100g: 22, fatPer100g: 5 },
  { id: "mysore-pak", name: "Mysore pak", category: "Sweets", caloriesPer100g: 500, proteinPer100g: 5, carbsPer100g: 50, fatPer100g: 32 },
  { id: "ice-cream", name: "Ice cream", category: "Sweets", caloriesPer100g: 207, proteinPer100g: 3.5, carbsPer100g: 24, fatPer100g: 11 },
  { id: "chocolate", name: "Chocolate (milk)", category: "Sweets", caloriesPer100g: 535, proteinPer100g: 7.6, carbsPer100g: 59, fatPer100g: 30 },
  { id: "donut", name: "Donut", category: "Sweets", caloriesPer100g: 452, proteinPer100g: 5, carbsPer100g: 51, fatPer100g: 25 },
  { id: "cake", name: "Cake, slice", category: "Sweets", caloriesPer100g: 350, proteinPer100g: 5, carbsPer100g: 50, fatPer100g: 15 },
  { id: "pastry", name: "Pastry", category: "Sweets", caloriesPer100g: 400, proteinPer100g: 5, carbsPer100g: 45, fatPer100g: 22 },
  { id: "cookies", name: "Cookies", category: "Sweets", caloriesPer100g: 480, proteinPer100g: 6, carbsPer100g: 65, fatPer100g: 22 },
  { id: "muffin", name: "Muffin", category: "Sweets", caloriesPer100g: 375, proteinPer100g: 6, carbsPer100g: 55, fatPer100g: 15 },

  // Candy
  { id: "hard-candy", name: "Hard candy", category: "Candy", caloriesPer100g: 390, proteinPer100g: 0, carbsPer100g: 98, fatPer100g: 0 },
  { id: "toffee", name: "Toffee / caramel", category: "Candy", caloriesPer100g: 430, proteinPer100g: 2, carbsPer100g: 76, fatPer100g: 15 },
  { id: "chewing-gum", name: "Chewing gum, sugared", category: "Candy", caloriesPer100g: 300, proteinPer100g: 0, carbsPer100g: 75, fatPer100g: 0 },
  { id: "mint-candy", name: "Mint candy", category: "Candy", caloriesPer100g: 390, proteinPer100g: 0, carbsPer100g: 98, fatPer100g: 0 },
  { id: "marshmallow", name: "Marshmallow", category: "Candy", caloriesPer100g: 318, proteinPer100g: 1.8, carbsPer100g: 81, fatPer100g: 0.2 },
  { id: "jelly-beans", name: "Jelly beans", category: "Candy", caloriesPer100g: 375, proteinPer100g: 0, carbsPer100g: 93, fatPer100g: 0.1 },
  { id: "lollipop", name: "Lollipop", category: "Candy", caloriesPer100g: 390, proteinPer100g: 0, carbsPer100g: 97, fatPer100g: 0.2 },

  // Beverages
  { id: "tea", name: "Tea, with milk & sugar", category: "Beverages", caloriesPer100g: 40, proteinPer100g: 1, carbsPer100g: 6, fatPer100g: 1.2 },
  { id: "coffee", name: "Coffee, with milk & sugar", category: "Beverages", caloriesPer100g: 45, proteinPer100g: 1.2, carbsPer100g: 6.5, fatPer100g: 1.5 },
  { id: "lime-soda", name: "Fresh lime soda (sweet)", category: "Beverages", caloriesPer100g: 35, proteinPer100g: 0, carbsPer100g: 9, fatPer100g: 0 },
  { id: "cola", name: "Soft drink / cola", category: "Beverages", caloriesPer100g: 41, proteinPer100g: 0, carbsPer100g: 10.6, fatPer100g: 0 },
  { id: "juice", name: "Fruit juice (packaged)", category: "Beverages", caloriesPer100g: 45, proteinPer100g: 0.3, carbsPer100g: 11, fatPer100g: 0.1 },
  { id: "chaas", name: "Buttermilk / chaas", category: "Beverages", caloriesPer100g: 30, proteinPer100g: 1.5, carbsPer100g: 3, fatPer100g: 1 },
  { id: "coconut-water", name: "Coconut water", category: "Beverages", caloriesPer100g: 19, proteinPer100g: 0.7, carbsPer100g: 3.7, fatPer100g: 0.2 },
  { id: "lassi-sweet", name: "Lassi, sweet", category: "Beverages", caloriesPer100g: 90, proteinPer100g: 3, carbsPer100g: 12, fatPer100g: 3 },
  { id: "lassi-salted", name: "Lassi, salted", category: "Beverages", caloriesPer100g: 55, proteinPer100g: 3, carbsPer100g: 5, fatPer100g: 2.5 },
  { id: "milkshake", name: "Milkshake", category: "Beverages", caloriesPer100g: 110, proteinPer100g: 3.5, carbsPer100g: 17, fatPer100g: 3 },
  { id: "energy-drink", name: "Energy drink", category: "Beverages", caloriesPer100g: 45, proteinPer100g: 0, carbsPer100g: 11, fatPer100g: 0 },
  { id: "protein-shake", name: "Protein shake", category: "Beverages", caloriesPer100g: 100, proteinPer100g: 15, carbsPer100g: 5, fatPer100g: 2 },
  { id: "malted-drink", name: "Malted drink (Bournvita/Horlicks, with milk)", category: "Beverages", caloriesPer100g: 75, proteinPer100g: 3, carbsPer100g: 11, fatPer100g: 2 },
  { id: "beer", name: "Beer", category: "Beverages", caloriesPer100g: 43, proteinPer100g: 0.5, carbsPer100g: 3.6, fatPer100g: 0 },
  { id: "wine", name: "Wine (red/white)", category: "Beverages", caloriesPer100g: 83, proteinPer100g: 0.1, carbsPer100g: 2.6, fatPer100g: 0 },
  { id: "spirits", name: "Whisky / vodka / rum", category: "Beverages", caloriesPer100g: 250, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 0 },
  { id: "sports-drink", name: "Sports drink", category: "Beverages", caloriesPer100g: 25, proteinPer100g: 0, carbsPer100g: 6, fatPer100g: 0 },
  { id: "iced-tea", name: "Iced tea, sweetened", category: "Beverages", caloriesPer100g: 30, proteinPer100g: 0, carbsPer100g: 7, fatPer100g: 0 },
  { id: "hot-chocolate", name: "Hot chocolate", category: "Beverages", caloriesPer100g: 85, proteinPer100g: 3, carbsPer100g: 12, fatPer100g: 3 },

  // Fast food & other
  { id: "pizza", name: "Pizza (cheese)", category: "Fast Food & Other", caloriesPer100g: 266, proteinPer100g: 11, carbsPer100g: 33, fatPer100g: 10 },
  { id: "burger", name: "Burger (veg)", category: "Fast Food & Other", caloriesPer100g: 250, proteinPer100g: 6, carbsPer100g: 33, fatPer100g: 10 },
  { id: "pasta", name: "Pasta, with sauce", category: "Fast Food & Other", caloriesPer100g: 150, proteinPer100g: 5, carbsPer100g: 25, fatPer100g: 4 },
  { id: "noodles", name: "Noodles (veg hakka)", category: "Fast Food & Other", caloriesPer100g: 138, proteinPer100g: 4, carbsPer100g: 22, fatPer100g: 4 },
  { id: "sandwich", name: "Sandwich (veg)", category: "Fast Food & Other", caloriesPer100g: 220, proteinPer100g: 6, carbsPer100g: 30, fatPer100g: 8 },
  { id: "fried-rice-veg", name: "Fried rice (veg)", category: "Fast Food & Other", caloriesPer100g: 163, proteinPer100g: 3.5, carbsPer100g: 25, fatPer100g: 5 },
  { id: "fried-rice-chicken", name: "Fried rice (chicken)", category: "Fast Food & Other", caloriesPer100g: 185, proteinPer100g: 8, carbsPer100g: 24, fatPer100g: 6 },
  { id: "sushi", name: "Sushi (California roll)", category: "Fast Food & Other", caloriesPer100g: 145, proteinPer100g: 5, carbsPer100g: 28, fatPer100g: 1.5 },
  { id: "taco", name: "Taco (beef)", category: "Fast Food & Other", caloriesPer100g: 220, proteinPer100g: 10, carbsPer100g: 20, fatPer100g: 12 },
  { id: "burrito", name: "Burrito", category: "Fast Food & Other", caloriesPer100g: 210, proteinPer100g: 8, carbsPer100g: 28, fatPer100g: 7 },
  { id: "ramen", name: "Ramen", category: "Fast Food & Other", caloriesPer100g: 190, proteinPer100g: 6, carbsPer100g: 27, fatPer100g: 6 },
  { id: "hot-dog", name: "Hot dog", category: "Fast Food & Other", caloriesPer100g: 290, proteinPer100g: 11, carbsPer100g: 22, fatPer100g: 18 },
  { id: "chicken-nuggets", name: "Chicken nuggets", category: "Fast Food & Other", caloriesPer100g: 296, proteinPer100g: 15, carbsPer100g: 18, fatPer100g: 19 },
  { id: "shawarma", name: "Shawarma", category: "Fast Food & Other", caloriesPer100g: 250, proteinPer100g: 15, carbsPer100g: 22, fatPer100g: 12 },
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
