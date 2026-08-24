"use client";

import { useRouter } from "next/navigation";
import { Stack, Typography } from "@mui/material";
import { CategoryChips } from "@/components/menu/CategoryChips";
import type { FoodCategory } from "@/types";

export function CravingChips() {
  const router = useRouter();

  const onSelect = (category: FoodCategory | "all") => {
    if (category === "all") {
      router.push("/menu");
      return;
    }
    router.push(`/menu#${category}`);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontSize: { xs: 22, md: 28 } }}>
        What are you craving?
      </Typography>
      <CategoryChips active="all" onSelect={onSelect} includeAll={false} />
    </Stack>
  );
}
