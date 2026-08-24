"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Stack, Typography, keyframes } from "@mui/material";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`;

export function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "78vh", md: "88vh" },
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        color: "white",
      }}
    >
      <Image
        src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&q=80"
        alt="Fresh pizza from Frndzz Café"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(20,20,20,0.25) 0%, rgba(20,20,20,0.55) 45%, rgba(20,20,20,0.88) 100%)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          pb: { xs: 6, md: 10 },
          pt: { xs: 16, md: 20 },
        }}
      >
        <Stack
          spacing={2.5}
          maxWidth={640}
          sx={{
            animation: `${fadeUp} 0.7s ease both`,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "0.18em",
              fontWeight: 700,
              color: "#FBBF24",
              fontSize: 12,
            }}
          >
            Frndzz Café
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.6rem", sm: "3.5rem", md: "4.25rem" },
              lineHeight: 1.05,
              fontWeight: 750,
            }}
          >
            What are you craving?
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: "rgba(255,255,255,0.82)",
              maxWidth: 460,
              lineHeight: 1.55,
            }}
          >
            Pizza, burgers and snacks — ordered in a few taps and sent straight
            to the café on WhatsApp.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} pt={1}>
            <Button
              component={Link}
              href="/menu"
              variant="contained"
              size="large"
              sx={{ px: 3.5, py: 1.4, fontSize: 16 }}
            >
              Order Now
            </Button>
            <Button
              component={Link}
              href="/offers"
              variant="outlined"
              size="large"
              sx={{
                px: 3.5,
                py: 1.4,
                fontSize: 16,
                color: "white",
                borderColor: "rgba(255,255,255,0.45)",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              View Offers
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
