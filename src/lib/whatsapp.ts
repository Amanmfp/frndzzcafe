import type { Order } from "@/types";
import { formatCurrency } from "@/lib/currency";

export function generateWhatsAppOrderMessage(order: Order): string {
  const d = order.delivery;

  const lines: string[] = [
    "🍕 *FRNDZZ CAFÉ — NEW ORDER*",
    "",
    `*Order ID:* #${order.id}`,
    "",
    "*CUSTOMER DETAILS*",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    "",
    "*DELIVERY ADDRESS*",
    `House/Flat/Street: ${d.address}`,
    `Area: ${d.area}`,
    `City: ${d.city}`,
    `Pincode: ${d.pincode}`,
    `Landmark: ${d.landmark.trim() || "—"}`,
    "",
    "*ORDER ITEMS*",
  ];

  order.items.forEach((item, index) => {
    const lineTotal = item.product.price * item.quantity;
    lines.push(
      `${index + 1}. ${item.product.name} × ${item.quantity} = ${formatCurrency(lineTotal)}`,
    );
  });

  lines.push(
    "",
    "*BILL*",
    `Subtotal: ${formatCurrency(order.subtotal)}`,
    `Delivery: ${formatCurrency(order.deliveryFee)}`,
    `*TOTAL: ${formatCurrency(order.total)}*`,
    "",
    "*DELIVERY INSTRUCTIONS*",
    d.instructions.trim() || "—",
  );

  return lines.join("\n");
}

export function getWhatsAppNumber(): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!number?.trim()) {
    throw new Error(
      "WhatsApp number is not configured. Add NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local",
    );
  }

  const digits = number.replace(/\D/g, "");
  if (digits.length < 10) {
    throw new Error(
      "NEXT_PUBLIC_WHATSAPP_NUMBER looks invalid. Use country code + number, digits only.",
    );
  }

  return digits;
}

export function createWhatsAppOrderUrl(order: Order): string {
  const digits = getWhatsAppNumber();
  const text = encodeURIComponent(generateWhatsAppOrderMessage(order));
  return `https://wa.me/${digits}?text=${text}`;
}

/** Opens WhatsApp reliably (avoids popup blockers better than window.open). */
export function openWhatsApp(url: string): void {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
