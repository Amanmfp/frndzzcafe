"use client";

import Link from "next/link";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Hero } from "@/components/home/Hero";
import { CravingChips } from "@/components/home/CravingChips";
import { BestsellerCarousel } from "@/components/home/BestsellerCarousel";
import { MenuSection } from "@/components/home/MenuSection";
import {
  getBestsellers,
  getProductsByCategory,
} from "@/data/products";

export default function HomePage() {
  const bestsellers = getBestsellers();
  const pizzas = getProductsByCategory("pizza").slice(0, 4);
  const burgers = getProductsByCategory("burgers").slice(0, 4);
  const snacks = getProductsByCategory("snacks").slice(0, 4);
  const drinks = getProductsByCategory("drinks");
  const offers = getProductsByCategory("offers");

  return (
    <>
      <Hero />
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Stack spacing={{ xs: 5, md: 7 }}>
          <CravingChips />
          <BestsellerCarousel products={bestsellers} />
          <MenuSection
            id="pizza"
            title="Pizza"
            subtitle="Hand-tossed favourites, baked hot."
            products={pizzas}
          />
          <MenuSection
            id="burgers"
            title="Burgers"
            subtitle="Stacked, toasted and ready to go."
            products={burgers}
          />
          <MenuSection
            id="snacks"
            title="Snacks"
            subtitle="Crispy sides for every order."
            products={snacks}
          />
          <MenuSection
            id="drinks"
            title="Drinks"
            subtitle="Cold sips to finish the meal."
            products={drinks}
          />
          <MenuSection
            id="offers"
            title="Offers"
            subtitle="Combos that save you a little more."
            products={offers}
          />
          <Box textAlign={{ sm: "right" }} mt={-4}>
            <Button component={Link} href="/offers" color="primary">
              See all offers
            </Button>
          </Box>

          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              background:
                "linear-gradient(135deg, #E23744 0%, #F97316 55%, #FBBF24 120%)",
              color: "white",
              px: { xs: 3, md: 5 },
              py: { xs: 4, md: 5 },
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ md: "center" }}
              spacing={3}
            >
              <Box maxWidth={480}>
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: 26, md: 34 }, mb: 1 }}
                >
                  Hungry? Order in under a minute.
                </Typography>
                <Typography sx={{ opacity: 0.9 }}>
                  Build your cart, drop your address, and send the order to
                  Frndzz Café on WhatsApp.
                </Typography>
              </Box>
              <Button
                component={Link}
                href="/menu"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.92)" },
                  px: 3.5,
                  flexShrink: 0,
                }}
              >
                Start Ordering
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
