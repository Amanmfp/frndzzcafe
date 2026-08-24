"use client";

import { Button, Zoom } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCart } from "@/context/CartContext";
import { QuantityControls } from "@/components/cart/QuantityControls";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { getQuantity, addItem, increment, decrement, justAddedId } = useCart();
  const quantity = getQuantity(product.id);
  const justAdded = justAddedId === product.id;

  if (quantity > 0) {
    return (
      <Zoom in>
        <div>
          <QuantityControls
            quantity={quantity}
            onIncrement={() => increment(product.id)}
            onDecrement={() => decrement(product.id)}
          />
        </div>
      </Zoom>
    );
  }

  return (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      startIcon={<AddIcon />}
      onClick={() => addItem(product)}
      aria-label={`Add ${product.name} to cart`}
      sx={{
        borderWidth: 1.5,
        fontWeight: 700,
        minWidth: 88,
        bgcolor: "background.paper",
        transform: justAdded ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.2s ease",
        "&:hover": {
          borderWidth: 1.5,
          bgcolor: "rgba(226, 55, 68, 0.06)",
        },
      }}
    >
      Add
    </Button>
  );
}
