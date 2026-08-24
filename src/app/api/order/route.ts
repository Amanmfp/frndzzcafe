import { NextResponse } from "next/server";
import { ORDER_NOTIFY_EMAIL, sendOrderEmail } from "@/lib/orderEmail";
import type { Order } from "@/types";

export const runtime = "nodejs";

function isValidOrder(body: unknown): body is Order {
  if (!body || typeof body !== "object") return false;
  const o = body as Partial<Order>;
  return (
    typeof o.id === "string" &&
    Array.isArray(o.items) &&
    o.items.length > 0 &&
    typeof o.delivery === "object" &&
    o.delivery !== null &&
    typeof (o.delivery as Order["delivery"]).name === "string" &&
    typeof (o.delivery as Order["delivery"]).phone === "string" &&
    typeof o.subtotal === "number" &&
    typeof o.total === "number"
  );
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isValidOrder(body)) {
      return NextResponse.json({ error: "Invalid order payload" }, { status: 400 });
    }

    const result = await sendOrderEmail(body);

    return NextResponse.json({
      ok: true,
      emailedTo: ORDER_NOTIFY_EMAIL,
      method: result.method,
    });
  } catch (error) {
    console.error("[order email]", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Failed to send order email",
      },
      { status: 500 },
    );
  }
}
