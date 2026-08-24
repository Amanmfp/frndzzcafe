"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E23744",
      dark: "#C41E2A",
      light: "#FF5A65",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F97316",
      dark: "#EA580C",
      light: "#FB923C",
      contrastText: "#FFFFFF",
    },
    accent: {
      main: "#FBBF24",
      dark: "#F59E0B",
      light: "#FCD34D",
      contrastText: "#1A1A1A",
    },
    background: {
      default: "#FAFAFA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#5C5C5C",
    },
    success: {
      main: "#0F8A3C",
    },
    error: {
      main: "#C41E2A",
    },
  },
  typography: {
    fontFamily: "var(--font-body), system-ui, sans-serif",
    h1: {
      fontFamily: "var(--font-display), system-ui, sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontFamily: "var(--font-display), system-ui, sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: "var(--font-display), system-ui, sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "var(--font-display), system-ui, sans-serif",
      fontWeight: 650,
    },
    h5: {
      fontFamily: "var(--font-display), system-ui, sans-serif",
      fontWeight: 650,
    },
    h6: {
      fontFamily: "var(--font-display), system-ui, sans-serif",
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 14,
  },
  shadows: [
    "none",
    "0 1px 2px rgba(26,26,26,0.04)",
    "0 2px 8px rgba(26,26,26,0.06)",
    "0 4px 16px rgba(26,26,26,0.08)",
    "0 8px 24px rgba(26,26,26,0.1)",
    "0 12px 32px rgba(26,26,26,0.12)",
    "0 16px 40px rgba(26,26,26,0.14)",
    "0 20px 48px rgba(26,26,26,0.16)",
    "0 24px 56px rgba(26,26,26,0.18)",
    "0 28px 64px rgba(26,26,26,0.2)",
    "0 32px 72px rgba(26,26,26,0.22)",
    "0 36px 80px rgba(26,26,26,0.24)",
    "0 40px 88px rgba(26,26,26,0.26)",
    "0 44px 96px rgba(26,26,26,0.28)",
    "0 48px 104px rgba(26,26,26,0.3)",
    "0 52px 112px rgba(26,26,26,0.32)",
    "0 56px 120px rgba(26,26,26,0.34)",
    "0 60px 128px rgba(26,26,26,0.36)",
    "0 64px 136px rgba(26,26,26,0.38)",
    "0 68px 144px rgba(26,26,26,0.4)",
    "0 72px 152px rgba(26,26,26,0.42)",
    "0 76px 160px rgba(26,26,26,0.44)",
    "0 80px 168px rgba(26,26,26,0.46)",
    "0 84px 176px rgba(26,26,26,0.48)",
    "0 88px 184px rgba(26,26,26,0.5)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
          paddingBlock: 10,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #E23744 0%, #F97316 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #C41E2A 0%, #EA580C 100%)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        },
      },
    },
  },
});
