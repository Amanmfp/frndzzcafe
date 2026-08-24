"use client";

import Image from "next/image";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
  Divider,
  Button,
  Drawer,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { QuantityControls } from "@/components/cart/QuantityControls";
import { formatCurrency } from "@/lib/currency";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    increment,
    decrement,
    subtotal,
    deliveryFee,
    total,
    itemCount,
  } = useCart();

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={closeDrawer}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2.5, py: 2, borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <ShoppingBagOutlinedIcon color="primary" />
          <Typography variant="h6">Your Cart</Typography>
          {itemCount > 0 && (
            <Chip
              size="small"
              label={`${itemCount} item${itemCount === 1 ? "" : "s"}`}
              color="primary"
            />
          )}
        </Stack>
        <IconButton aria-label="Close cart" onClick={closeDrawer}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, py: 2 }}>
        {items.length === 0 ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ py: 8, textAlign: "center" }}
          >
            <ShoppingBagOutlinedIcon sx={{ fontSize: 56, color: "text.disabled" }} />
            <Typography variant="h6">Your cart is empty</Typography>
            <Typography color="text.secondary" maxWidth={240}>
              Add something delicious from the menu to get started.
            </Typography>
            <Button
              component={Link}
              href="/menu"
              variant="contained"
              onClick={closeDrawer}
            >
              Browse Menu
            </Button>
          </Stack>
        ) : (
          <Stack spacing={2.5} divider={<Divider />}>
            {items.map((item) => (
              <Stack key={item.product.id} direction="row" spacing={1.5}>
                <Box
                  sx={{
                    position: "relative",
                    width: 72,
                    height: 72,
                    borderRadius: 2,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                </Box>
                <Stack spacing={0.75} sx={{ flex: 1, minWidth: 0 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Typography fontWeight={650} noWrap>
                      {item.product.name}
                    </Typography>
                    <IconButton
                      size="small"
                      aria-label={`Remove ${item.product.name}`}
                      onClick={() => removeItem(item.product.id)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(item.product.price)}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <QuantityControls
                      quantity={item.quantity}
                      onIncrement={() => increment(item.product.id)}
                      onDecrement={() => decrement(item.product.id)}
                    />
                    <Typography fontWeight={700}>
                      {formatCurrency(item.product.price * item.quantity)}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>

      {items.length > 0 && (
        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            px: 2.5,
            py: 2.5,
            bgcolor: "background.paper",
          }}
        >
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography fontWeight={600}>{formatCurrency(subtotal)}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary">Delivery</Typography>
              <Typography fontWeight={600}>
                {formatCurrency(deliveryFee)}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary.main">
                {formatCurrency(total)}
              </Typography>
            </Stack>
          </Stack>
          <Button
            component={Link}
            href="/checkout"
            variant="contained"
            fullWidth
            size="large"
            onClick={closeDrawer}
          >
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Drawer>
  );
}
