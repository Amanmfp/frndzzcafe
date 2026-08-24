import type { Metadata } from "next";
import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { OrderSuccessClient } from "@/components/checkout/OrderSuccessClient";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Your Frndzz Café order has been sent to the café.",
};

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "grid", placeItems: "center", py: 12 }}>
          <CircularProgress color="primary" />
        </Box>
      }
    >
      <OrderSuccessClient />
    </Suspense>
  );
}
