"use client";

import { Box, Stack, Typography } from "@mui/material";
import { ProductCard } from "@/components/menu/ProductCard";
import type { Product } from "@/types";

interface BestsellerCarouselProps {
  products: Product[];
}

export function BestsellerCarousel({ products }: BestsellerCarouselProps) {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        mb={2.5}
      >
        <Typography variant="h4" sx={{ fontSize: { xs: 22, md: 28 } }}>
          Bestsellers
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Crowd favourites
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: { xs: "72%", sm: "42%", md: "28%" },
          gap: 2,
          overflowX: "auto",
          pb: 1,
          mx: { xs: -2, md: 0 },
          px: { xs: 2, md: 0 },
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { height: 6 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(26,26,26,0.15)",
            borderRadius: 999,
          },
          "& > *": { scrollSnapAlign: "start" },
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </Box>
    </Box>
  );
}
