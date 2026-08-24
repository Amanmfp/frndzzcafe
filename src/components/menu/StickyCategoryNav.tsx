"use client";

import { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { CATEGORIES } from "@/data/products";
import type { FoodCategory } from "@/types";

interface StickyCategoryNavProps {
  sectionIds?: FoodCategory[];
}

export function StickyCategoryNav({
  sectionIds = CATEGORIES.map((c) => c.id),
}: StickyCategoryNavProps) {
  const [active, setActive] = useState<FoodCategory>(sectionIds[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  const scrollTo = (id: FoodCategory) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActive(id);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: { xs: 64, md: 72 },
        zIndex: 10,
        bgcolor: "rgba(250,250,250,0.92)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderColor: "rgba(26,26,26,0.06)",
        py: 1.25,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          overflowX: "auto",
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 3 },
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {CATEGORIES.filter((c) => sectionIds.includes(c.id)).map((cat) => (
          <Button
            key={cat.id}
            size="small"
            variant={active === cat.id ? "contained" : "outlined"}
            color="primary"
            onClick={() => scrollTo(cat.id)}
            sx={{
              flexShrink: 0,
              borderRadius: 999,
              px: 2,
              borderWidth: active === cat.id ? 0 : 1.5,
              bgcolor: active === cat.id ? undefined : "background.paper",
            }}
          >
            {cat.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
