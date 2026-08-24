import type { Metadata } from "next";
import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { MenuPageClient } from "@/components/menu/MenuPageClient";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse pizza, burgers, snacks, drinks and offers at Frndzz Café.",
};

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "grid", placeItems: "center", py: 12 }}>
          <CircularProgress color="primary" />
        </Box>
      }
    >
      <MenuPageClient />
    </Suspense>
  );
}
