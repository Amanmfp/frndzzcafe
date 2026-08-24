"use client";

import { Container, Stack, Typography } from "@mui/material";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={3}>
        <Stack spacing={0.75}>
          <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 36 } }}>
            Checkout
          </Typography>
          <Typography color="text.secondary">
            Confirm your delivery details and place the order on WhatsApp.
          </Typography>
        </Stack>
        <CheckoutForm />
      </Stack>
    </Container>
  );
}
