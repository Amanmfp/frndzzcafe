"use client";

import Image from "next/image";
import { Box, Chip, Stack, Typography, keyframes } from "@mui/material";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatCurrency } from "@/lib/currency";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

const pop = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { justAddedId } = useCart();
  const highlight = justAddedId === product.id;

  return (
    <Box
      component="article"
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: highlight ? "primary.light" : "rgba(26,26,26,0.06)",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: highlight ? 3 : 1,
        animation: highlight ? `${pop} 0.45s ease` : "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          boxShadow: 3,
          borderColor: "rgba(226,55,68,0.25)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          aspectRatio: compact ? "4/3" : "16/11",
          bgcolor: "#F0F0F0",
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
        />
        <Stack
          direction="row"
          spacing={0.75}
          sx={{ position: "absolute", top: 10, left: 10 }}
        >
          {product.isBestseller && (
            <Chip
              label="Bestseller"
              size="small"
              sx={{
                bgcolor: "secondary.main",
                color: "white",
                fontWeight: 700,
                height: 24,
              }}
            />
          )}
        </Stack>
        <Box
          aria-label={product.isVeg ? "Vegetarian" : "Non-vegetarian"}
          title={product.isVeg ? "Veg" : "Non-veg"}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 18,
            height: 18,
            border: "1.5px solid",
            borderColor: product.isVeg ? "success.main" : "error.main",
            borderRadius: 0.5,
            bgcolor: "background.paper",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: product.isVeg ? "success.main" : "error.main",
            }}
          />
        </Box>
      </Box>

      <Stack spacing={1} sx={{ p: 1.75, flex: 1 }}>
        <Typography
          variant={compact ? "subtitle1" : "h6"}
          component="h3"
          sx={{ fontSize: compact ? 15 : 17, lineHeight: 1.3 }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {product.description}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pt: 0.5 }}
        >
          <Typography fontWeight={750} fontSize={16}>
            {formatCurrency(product.price)}
          </Typography>
          <AddToCartButton product={product} />
        </Stack>
      </Stack>
    </Box>
  );
}
