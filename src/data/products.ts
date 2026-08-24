import type { FoodCategory, Product } from "@/types";

export const DELIVERY_FEE = 40;

export const CATEGORIES: { id: FoodCategory; label: string }[] = [
  { id: "pizza", label: "Pizza" },
  { id: "burgers", label: "Burgers" },
  { id: "snacks", label: "Snacks" },
  { id: "drinks", label: "Drinks" },
  { id: "offers", label: "Offers" },
];

export const products: Product[] = [
  {
    id: "pz-margherita",
    name: "Margherita",
    description: "Classic tomato, mozzarella and fresh basil.",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&q=80",
    category: "pizza",
    isVeg: true,
    isBestseller: true,
    rating: 4.6,
  },
  {
    id: "pz-farmhouse",
    name: "Farmhouse",
    description: "Onion, capsicum, mushroom, tomato and olives.",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    category: "pizza",
    isVeg: true,
    isBestseller: true,
    rating: 4.7,
  },
  {
    id: "pz-paneer-tikka",
    name: "Paneer Tikka",
    description: "Spiced paneer, onions and tikka sauce.",
    price: 379,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    category: "pizza",
    isVeg: true,
    rating: 4.5,
  },
  {
    id: "pz-bbq-chicken",
    name: "BBQ Chicken",
    description: "Smoky BBQ chicken with onions and cheese.",
    price: 429,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
    category: "pizza",
    isVeg: false,
    isBestseller: true,
    rating: 4.8,
  },
  {
    id: "pz-mexican",
    name: "Mexican Heat",
    description: "Jalapeños, corn, salsa and melted cheese.",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800&q=80",
    category: "pizza",
    isVeg: true,
    rating: 4.4,
  },
  {
    id: "bg-classic-veg",
    name: "Classic Veg Burger",
    description: "Crispy veg patty, lettuce, tomato and house sauce.",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
    category: "burgers",
    isVeg: true,
    isBestseller: true,
    rating: 4.3,
  },
  {
    id: "bg-paneer",
    name: "Paneer Burger",
    description: "Grilled paneer patty with spicy mayo.",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    category: "burgers",
    isVeg: true,
    rating: 4.4,
  },
  {
    id: "bg-chicken",
    name: "Chicken Burger",
    description: "Juicy chicken patty with cheese and pickles.",
    price: 219,
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80",
    category: "burgers",
    isVeg: false,
    isBestseller: true,
    rating: 4.6,
  },
  {
    id: "bg-cheese",
    name: "Double Cheese Burger",
    description: "Double cheese, soft bun and caramelised onions.",
    price: 239,
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80",
    category: "burgers",
    isVeg: true,
    rating: 4.5,
  },
  {
    id: "sn-garlic-bread",
    name: "Garlic Bread",
    description: "Buttery garlic bread sticks with herbs.",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800&q=80",
    category: "snacks",
    isVeg: true,
    isBestseller: true,
    rating: 4.5,
  },
  {
    id: "sn-fries",
    name: "French Fries",
    description: "Crispy golden fries with seasoning.",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80",
    category: "snacks",
    isVeg: true,
    rating: 4.2,
  },
  {
    id: "sn-peri-fries",
    name: "Peri Peri Fries",
    description: "Fries tossed in fiery peri peri masala.",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&q=80",
    category: "snacks",
    isVeg: true,
    rating: 4.4,
  },
  {
    id: "sn-wedges",
    name: "Potato Wedges",
    description: "Thick wedges with dipping sauce.",
    price: 139,
    image:
      "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800&q=80",
    category: "snacks",
    isVeg: true,
    rating: 4.3,
  },
  {
    id: "dr-coke",
    name: "Coca-Cola",
    description: "Chilled 330ml can.",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&q=80",
    category: "drinks",
    isVeg: true,
    rating: 4.1,
  },
  {
    id: "dr-cold-coffee",
    name: "Cold Coffee",
    description: "Creamy blended coffee over ice.",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80",
    category: "drinks",
    isVeg: true,
    isBestseller: true,
    rating: 4.6,
  },
  {
    id: "dr-lemon-soda",
    name: "Lemon Soda",
    description: "Fresh lemon with soda and mint.",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
    category: "drinks",
    isVeg: true,
    rating: 4.2,
  },
  {
    id: "of-family",
    name: "Family Pizza Combo",
    description: "2 medium pizzas + garlic bread + 2 drinks.",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80",
    category: "offers",
    isVeg: true,
    isBestseller: true,
    rating: 4.7,
  },
  {
    id: "of-burger",
    name: "Burger Combo",
    description: "Burger + fries + soft drink.",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80",
    category: "offers",
    isVeg: true,
    rating: 4.5,
  },
  {
    id: "of-student",
    name: "Student Combo",
    description: "Personal pizza + fries + drink.",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80",
    category: "offers",
    isVeg: true,
    rating: 4.4,
  },
];

export function getProductsByCategory(category: FoodCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  );
}
