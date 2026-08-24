"use client";

import { Box, Container, Stack, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 7 } }}>
      <Stack spacing={4}>
        <Stack spacing={1.5}>
          <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 36 } }}>
            About Frndzz Café
          </Typography>
          <Typography color="text.secondary" fontSize={17} lineHeight={1.7}>
            Frndzz Café is a neighbourhood pizza and fast-food spot built for
            quick, reliable ordering. Browse the menu, customise your cart, and
            send your order to us on WhatsApp — no app download required.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          {[
            {
              title: "Fresh & hot",
              body: "Pizzas and burgers prepared to order and packed for delivery.",
            },
            {
              title: "WhatsApp checkout",
              body: "Your order lands directly in our café chat for fast confirmation.",
            },
            {
              title: "Local favourites",
              body: "From Margherita to peri peri fries — classics with a bold kick.",
            },
            {
              title: "Open late",
              body: "Ordering window: 11:00 AM – 11:00 PM, citywide delivery.",
            },
          ].map((item) => (
            <Box
              key={item.title}
              sx={{
                p: 2.5,
                borderRadius: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "rgba(26,26,26,0.06)",
              }}
            >
              <Typography fontWeight={700} mb={0.75}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.body}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
