"use client";

import { Container, Stack, Typography } from "@mui/material";
import { MenuSection } from "@/components/home/MenuSection";
import { getProductsByCategory } from "@/data/products";

export default function OffersPage() {
  const offers = getProductsByCategory("offers");

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 36 } }}>
            Offers
          </Typography>
          <Typography color="text.secondary" maxWidth={520}>
            Value combos built for sharing — add any offer to your cart like a
            regular menu item.
          </Typography>
        </Stack>
        <MenuSection id="offers" title="Today’s deals" products={offers} />
      </Stack>
    </Container>
  );
}
