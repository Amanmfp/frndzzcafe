"use client";

import { Box, Stack, Typography } from "@mui/material";
import { ProductCard } from "@/components/menu/ProductCard";
import type { Product } from "@/types";

interface MenuSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  products: Product[];
}

export function MenuSection({
  id,
  title,
  subtitle,
  products,
}: MenuSectionProps) {
  if (products.length === 0) return null;

  return (
    <Box component="section" id={id} sx={{ scrollMarginTop: 130 }}>
      <Stack spacing={0.5} mb={2.5}>
        <Typography variant="h4" sx={{ fontSize: { xs: 22, md: 28 } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography color="text.secondary" variant="body2">
            {subtitle}
          </Typography>
        )}
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
}
