import type { CartItem } from "@/types";
import { DELIVERY_FEE } from "@/data/products";

export function calcSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calcTotal(items: CartItem[], deliveryFee = DELIVERY_FEE): number {
  if (items.length === 0) return 0;
  return calcSubtotal(items) + deliveryFee;
}

export function calcItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
