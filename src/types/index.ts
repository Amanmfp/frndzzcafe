export type FoodCategory =
  | "pizza"
  | "burgers"
  | "snacks"
  | "drinks"
  | "offers";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: FoodCategory;
  isVeg: boolean;
  isBestseller?: boolean;
  rating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryDetails {
  name: string;
  phone: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  landmark: string;
  instructions: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  delivery: DeliveryDetails;
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}
