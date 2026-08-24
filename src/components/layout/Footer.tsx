"use client";

import Link from "next/link";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: "#141414",
        color: "#F5F5F5",
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="space-between"
        >
          <Stack spacing={1.5} maxWidth={320}>
            <BrandLogo size="sm" inverted />
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.65)" }}>
              Fresh pizza, loaded burgers and snacks — ordered in minutes,
              delivered hot to your door.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={{ xs: 4, md: 8 }}>
            <Stack spacing={1}>
              <Typography fontWeight={700} mb={0.5}>
                Explore
              </Typography>
              {[
                { href: "/menu", label: "Menu" },
                { href: "/offers", label: "Offers" },
                { href: "/about", label: "About" },
                { href: "/checkout", label: "Checkout" },
              ].map((l) => (
                <Typography
                  key={l.href}
                  component={Link}
                  href={l.href}
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {l.label}
                </Typography>
              ))}
            </Stack>
            <Stack spacing={1}>
              <Typography fontWeight={700} mb={0.5}>
                Contact
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.65)" }}>
                Orders via WhatsApp
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.65)" }}>
                Open 11:00 AM – 11:00 PM
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.65)" }}>
                Citywide delivery
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />
        <Typography
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.45)" }}
        >
          © {new Date().getFullYear()} Frndzz Café. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
