import type { Order } from "@/types";
import { formatCurrency } from "@/lib/currency";

export const ORDER_NOTIFY_EMAIL =
  process.env.ORDER_NOTIFY_EMAIL?.trim() ||
  "vimleshkumar.gkp.ac@gmail.com";

export function generateOrderEmailText(order: Order): string {
  const d = order.delivery;

  const lines: string[] = [
    "FRNDZZ CAFÉ — NEW ORDER",
    "",
    `Order ID: #${order.id}`,
    `Placed at: ${new Date(order.createdAt).toLocaleString("en-IN")}`,
    "",
    "CUSTOMER DETAILS",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    "",
    "DELIVERY ADDRESS",
    `House/Flat/Street: ${d.address}`,
    `Area: ${d.area}`,
    `City: ${d.city}`,
    `Pincode: ${d.pincode}`,
    `Landmark: ${d.landmark.trim() || "—"}`,
    "",
    "ORDER ITEMS",
  ];

  order.items.forEach((item, index) => {
    const lineTotal = item.product.price * item.quantity;
    lines.push(
      `${index + 1}. ${item.product.name} × ${item.quantity} = ${formatCurrency(lineTotal)}`,
    );
  });

  lines.push(
    "",
    "BILL",
    `Subtotal: ${formatCurrency(order.subtotal)}`,
    `Delivery: ${formatCurrency(order.deliveryFee)}`,
    `TOTAL: ${formatCurrency(order.total)}`,
    "",
    "DELIVERY INSTRUCTIONS",
    d.instructions.trim() || "—",
  );

  return lines.join("\n");
}

export function generateOrderEmailHtml(order: Order): string {
  const d = order.delivery;
  const items = order.items
    .map((item, index) => {
      const lineTotal = item.product.price * item.quantity;
      return `<tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${index + 1}. ${item.product.name}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(lineTotal)}</td>
      </tr>`;
    })
    .join("");

  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
    <h2 style="color:#E23744;margin-bottom:4px;">Frndzz Café — New Order</h2>
    <p style="margin-top:0;color:#666;">Order ID: <strong>#${order.id}</strong></p>
    <p style="color:#666;">Placed at: ${new Date(order.createdAt).toLocaleString("en-IN")}</p>

    <h3 style="margin-bottom:8px;">Customer</h3>
    <p style="margin:0;"><strong>Name:</strong> ${d.name}</p>
    <p style="margin:0 0 16px;"><strong>Phone:</strong> ${d.phone}</p>

    <h3 style="margin-bottom:8px;">Delivery address</h3>
    <p style="margin:0;">${d.address}</p>
    <p style="margin:0;">${d.area}, ${d.city} — ${d.pincode}</p>
    <p style="margin:0 0 16px;"><strong>Landmark:</strong> ${d.landmark.trim() || "—"}</p>

    <h3 style="margin-bottom:8px;">Items</h3>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:2px solid #ddd;">Item</th>
          <th style="text-align:center;padding:8px;border-bottom:2px solid #ddd;">Qty</th>
          <th style="text-align:right;padding:8px;border-bottom:2px solid #ddd;">Price</th>
        </tr>
      </thead>
      <tbody>${items}</tbody>
    </table>

    <p style="margin:0;"><strong>Subtotal:</strong> ${formatCurrency(order.subtotal)}</p>
    <p style="margin:0;"><strong>Delivery:</strong> ${formatCurrency(order.deliveryFee)}</p>
    <p style="margin:0 0 16px;font-size:18px;color:#E23744;"><strong>Total: ${formatCurrency(order.total)}</strong></p>

    <h3 style="margin-bottom:8px;">Instructions</h3>
    <p style="margin:0;">${d.instructions.trim() || "—"}</p>
  </div>`;
}

async function sendViaSmtp(order: Order, to: string): Promise<void> {
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  if (!smtpUser || !smtpPass) {
    throw new Error("SMTP is not configured");
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM?.trim() || `Frndzz Café <${smtpUser}>`,
    to,
    subject: `Frndzz Café — New Order #${order.id}`,
    text: generateOrderEmailText(order),
    html: generateOrderEmailHtml(order),
  });
}

async function sendViaFormSubmit(order: Order, to: string): Promise<void> {
  const text = generateOrderEmailText(order);
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "FrndzzCafe/1.0",
    },
    body: JSON.stringify({
      _subject: `Frndzz Café — New Order #${order.id}`,
      _template: "table",
      _captcha: false,
      _honey: "",
      name: order.delivery.name,
      email: "orders@frndzz.cafe",
      phone: order.delivery.phone,
      address: `${order.delivery.address}, ${order.delivery.area}, ${order.delivery.city} - ${order.delivery.pincode}`,
      landmark: order.delivery.landmark || "—",
      instructions: order.delivery.instructions || "—",
      order_id: `#${order.id}`,
      items: order.items
        .map(
          (i) =>
            `${i.product.name} × ${i.quantity} = ${formatCurrency(i.product.price * i.quantity)}`,
        )
        .join("\n"),
      subtotal: formatCurrency(order.subtotal),
      delivery_fee: formatCurrency(order.deliveryFee),
      total: formatCurrency(order.total),
      message: text,
    }),
  });

  const raw = await response.text();
  let parsed: { success?: string | boolean; message?: string; error?: string } =
    {};
  try {
    parsed = JSON.parse(raw) as typeof parsed;
  } catch {
    // non-JSON response
  }

  if (!response.ok) {
    throw new Error(
      parsed.message || parsed.error || `Email failed (${response.status}): ${raw}`,
    );
  }

  // FormSubmit returns success even for "activation email sent"
  if (parsed.success === false) {
    throw new Error(parsed.message || "Email provider rejected the order");
  }
}

/**
 * Sends full order details to the café email.
 * Uses Gmail SMTP when SMTP_USER + SMTP_PASS are set; otherwise FormSubmit.
 */
export async function sendOrderEmail(order: Order): Promise<{ method: string }> {
  const to = ORDER_NOTIFY_EMAIL;
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  if (smtpUser && smtpPass) {
    await sendViaSmtp(order, to);
    return { method: "smtp" };
  }

  await sendViaFormSubmit(order, to);
  return { method: "formsubmit" };
}
