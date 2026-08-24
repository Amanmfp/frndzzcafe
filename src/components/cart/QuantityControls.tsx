"use client";

import { IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface QuantityControlsProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: "small" | "medium";
}

export function QuantityControls({
  quantity,
  onIncrement,
  onDecrement,
  size = "small",
}: QuantityControlsProps) {
  const btnSize = size === "small" ? 28 : 34;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        borderRadius: 999,
        px: 0.5,
        py: 0.25,
        minWidth: size === "small" ? 88 : 108,
        justifyContent: "space-between",
      }}
    >
      <IconButton
        aria-label="Decrease quantity"
        onClick={onDecrement}
        size="small"
        sx={{ color: "inherit", width: btnSize, height: btnSize }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography
        component="span"
        fontWeight={700}
        fontSize={size === "small" ? 13 : 15}
        aria-live="polite"
      >
        {quantity}
      </Typography>
      <IconButton
        aria-label="Increase quantity"
        onClick={onIncrement}
        size="small"
        sx={{ color: "inherit", width: btnSize, height: btnSize }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
