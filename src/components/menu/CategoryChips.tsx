"use client";

import { Chip, Stack } from "@mui/material";
import { CATEGORIES } from "@/data/products";
import type { FoodCategory } from "@/types";

interface CategoryChipsProps {
  active?: FoodCategory | "all";
  onSelect: (category: FoodCategory | "all") => void;
  includeAll?: boolean;
}

export function CategoryChips({
  active = "all",
  onSelect,
  includeAll = true,
}: CategoryChipsProps) {
  const chips: { id: FoodCategory | "all"; label: string }[] = [
    ...(includeAll ? [{ id: "all" as const, label: "All" }] : []),
    ...CATEGORIES,
  ];

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        overflowX: "auto",
        pb: 0.5,
        mx: { xs: -2, md: 0 },
        px: { xs: 2, md: 0 },
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {chips.map((chip) => (
        <Chip
          key={chip.id}
          label={chip.label}
          clickable
          onClick={() => onSelect(chip.id)}
          color={active === chip.id ? "primary" : "default"}
          variant={active === chip.id ? "filled" : "outlined"}
          sx={{
            flexShrink: 0,
            fontWeight: 650,
            px: 0.5,
            bgcolor: active === chip.id ? undefined : "background.paper",
          }}
        />
      ))}
    </Stack>
  );
}
