"use client";

import Link from "next/link";
import { useId } from "react";
import { Box, Stack, Typography } from "@mui/material";

interface BrandLogoProps {
  size?: "sm" | "md";
  showWordmark?: boolean;
  inverted?: boolean;
  href?: string | null;
  onClick?: () => void;
}

export function BrandLogo({
  size = "md",
  showWordmark = true,
  inverted = false,
  href = "/",
  onClick,
}: BrandLogoProps) {
  const uid = useId().replace(/:/g, "");
  const bgId = `fz-bg-${uid}`;
  const shineId = `fz-shine-${uid}`;
  const mark = size === "sm" ? 32 : 40;
  const content = (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.25}
      onClick={onClick}
      sx={{
        textDecoration: "none",
        color: inverted ? "#F5F5F5" : "inherit",
        userSelect: "none",
      }}
    >
      <Box
        aria-hidden
        sx={{
          width: mark,
          height: mark,
          flexShrink: 0,
          filter: inverted
            ? "drop-shadow(0 2px 8px rgba(0,0,0,0.35))"
            : "drop-shadow(0 2px 6px rgba(226,55,68,0.28))",
        }}
      >
        <svg
          width={mark}
          height={mark}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={bgId}
              x1="8"
              y1="4"
              x2="56"
              y2="60"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E23744" />
              <stop offset="0.55" stopColor="#F97316" />
              <stop offset="1" stopColor="#FBBF24" />
            </linearGradient>
            <linearGradient
              id={shineId}
              x1="16"
              y1="8"
              x2="40"
              y2="36"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="60" height="60" rx="18" fill={`url(#${bgId})`} />
          <rect
            x="2"
            y="2"
            width="60"
            height="60"
            rx="18"
            fill={`url(#${shineId})`}
          />
          <rect
            x="6.5"
            y="6.5"
            width="51"
            height="51"
            rx="14.5"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.5"
          />
          <path
            d="M20 18.5h18.5c1.2 0 2.2.9 2.2 2.1v1.1c0 1.2-1 2.1-2.2 2.1H26.8v5.2H36c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2H26.8V43c0 1.3-1.1 2.4-2.4 2.4h-1.9c-1.3 0-2.4-1.1-2.4-2.4V20.9c0-1.3 1.1-2.4 2.4-2.4H20z"
            fill="#fff"
          />
          <path
            d="M41.2 28.2c3.9 0 6.6 2.1 6.6 5.5 0 2.4-1.4 4.2-3.6 5l3.8 5.2c.3.4.1 1-.4 1.2l-1.7.6c-.5.2-1.1 0-1.3-.5l-3.9-5.7h-2.1V44c0 1.2-.9 2.1-2.1 2.1h-1.1c-1.2 0-2.1-.9-2.1-2.1V30.3c0-1.2.9-2.1 2.1-2.1h5.8zm-2.6 3.9v4.3h2.3c1.5 0 2.4-.8 2.4-2.2s-.9-2.1-2.4-2.1h-2.3z"
            fill="#fff"
          />
          <circle cx="50" cy="16" r="2.2" fill="#FFF7D6" />
          <circle cx="14" cy="48" r="1.6" fill="#FFF7D6" fillOpacity="0.85" />
        </svg>
      </Box>

      {showWordmark && (
        <Box sx={{ lineHeight: 1.05, minWidth: 0 }}>
          <Typography
            component="span"
            sx={{
              display: "block",
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              fontSize: size === "sm" ? 17 : 20,
              color: inverted ? "#F5F5F5" : "text.primary",
            }}
          >
            Frndzz
          </Typography>
          <Typography
            component="span"
            sx={{
              display: "block",
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontSize: size === "sm" ? 9 : 10,
              color: inverted ? "rgba(255,255,255,0.55)" : "text.secondary",
              mt: 0.15,
            }}
          >
            Café
          </Typography>
        </Box>
      )}
    </Stack>
  );

  if (!href) return content;

  return (
    <Box
      component={Link}
      href={href}
      aria-label="Frndzz Café home"
      sx={{ textDecoration: "none", color: "inherit" }}
    >
      {content}
    </Box>
  );
}
