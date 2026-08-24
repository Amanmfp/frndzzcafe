"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Container, Stack, TextField, Typography, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { StickyCategoryNav } from "@/components/menu/StickyCategoryNav";
import { MenuSection } from "@/components/home/MenuSection";
import { CATEGORIES, products, searchProducts } from "@/data/products";

export function MenuPageClient() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);

  const filtered = useMemo(() => searchProducts(query), [query]);

  const isSearching = query.trim().length > 0;

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = window.setTimeout(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "rgba(26,26,26,0.06)",
          py: { xs: 3, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 36 } }}>
              Menu
            </Typography>
            <TextField
              fullWidth
              placeholder="Search pizza, burgers, snacks…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: {
                  maxWidth: 520,
                  borderRadius: 999,
                  bgcolor: "#F4F4F5",
                  "& fieldset": { border: "none" },
                },
              }}
              inputProps={{ "aria-label": "Search menu" }}
            />
          </Stack>
        </Container>
      </Box>

      {!isSearching && <StickyCategoryNav />}

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={6}>
          {isSearching ? (
            <MenuSection
              id="search"
              title={
                filtered.length
                  ? `Results for “${query.trim()}”`
                  : `No results for “${query.trim()}”`
              }
              subtitle={
                filtered.length
                  ? undefined
                  : "Try another keyword like pizza, fries or burger."
              }
              products={filtered}
            />
          ) : (
            CATEGORIES.map((cat) => (
              <MenuSection
                key={cat.id}
                id={cat.id}
                title={cat.label}
                products={products.filter((p) => p.category === cat.id)}
              />
            ))
          )}
        </Stack>
      </Container>
    </>
  );
}
