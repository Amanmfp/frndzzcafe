"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { itemCount, openDrawer } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const activeHref = useMemo(() => pathname, [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/menu?q=${encodeURIComponent(q)}` : "/menu");
    setSearchOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: "rgba(26,26,26,0.06)",
          color: "text.primary",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            width: "100%",
            mx: "auto",
            px: { xs: 2, md: 3 },
            gap: 1.5,
            minHeight: { xs: 64, md: 72 },
          }}
        >
          {isMobile && (
            <IconButton
              edge="start"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box
            sx={{
              mr: { md: 2 },
              display: { xs: searchOpen ? "none" : "block", sm: "block" },
            }}
          >
            <BrandLogo size="md" />
          </Box>

          {!isMobile && (
            <Box
              component="form"
              onSubmit={submitSearch}
              sx={{ flex: 1, maxWidth: 420, mx: 2 }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Search pizza, burgers, snacks…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 999,
                    bgcolor: "#F4F4F5",
                    "& fieldset": { border: "none" },
                  },
                }}
                inputProps={{ "aria-label": "Search menu" }}
              />
            </Box>
          )}

          <Box sx={{ flex: 1 }} />

          {!isMobile && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  color={activeHref === link.href ? "primary" : "inherit"}
                  sx={{
                    fontWeight: activeHref === link.href ? 700 : 550,
                    px: 1.5,
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          )}

          {isMobile && (
            <IconButton
              aria-label="Search"
              onClick={() => setSearchOpen((o) => !o)}
            >
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </IconButton>
          )}

          <IconButton
            aria-label={`Open cart, ${itemCount} items`}
            onClick={openDrawer}
            sx={{ ml: 0.5 }}
          >
            <Badge
              badgeContent={itemCount}
              color="primary"
              max={99}
              overlap="circular"
            >
              <ShoppingBagOutlinedIcon />
            </Badge>
          </IconButton>

          {!isMobile && (
            <Button
              component={Link}
              href="/menu"
              variant="contained"
              sx={{ ml: 1 }}
            >
              Order
            </Button>
          )}
        </Toolbar>

        {isMobile && searchOpen && (
          <Box
            component="form"
            onSubmit={submitSearch}
            sx={{ px: 2, pb: 1.5 }}
          >
            <TextField
              fullWidth
              autoFocus
              size="small"
              placeholder="Search menu…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 999,
                  bgcolor: "#F4F4F5",
                  "& fieldset": { border: "none" },
                },
              }}
            />
          </Box>
        )}
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 2 }}
        >
          <BrandLogo size="sm" href={null} />
          <IconButton
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <List>
          {NAV_LINKS.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              selected={activeHref === link.href}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ px: 2, mt: 1 }}>
          <Button
            component={Link}
            href="/menu"
            variant="contained"
            fullWidth
            onClick={() => setMobileOpen(false)}
          >
            Order Now
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
