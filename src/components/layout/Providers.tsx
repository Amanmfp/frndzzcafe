"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/theme/theme";
import { CartProvider } from "@/context/CartContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
