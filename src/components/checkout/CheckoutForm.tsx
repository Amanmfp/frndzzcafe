"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { generateOrderId } from "@/lib/orderId";
import { createWhatsAppOrderUrl, openWhatsApp } from "@/lib/whatsapp";
import type { DeliveryDetails, Order } from "@/types";

const emptyForm: DeliveryDetails = {
  name: "",
  phone: "",
  address: "",
  area: "",
  city: "",
  pincode: "",
  landmark: "",
  instructions: "",
};

type FormErrors = Partial<Record<keyof DeliveryDetails, string>>;

function validate(form: DeliveryDetails): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid 10-digit mobile number";
  }
  if (!form.address.trim()) errors.address = "Address is required";
  if (!form.area.trim()) errors.area = "Area is required";
  if (!form.city.trim()) errors.city = "City is required";
  if (!/^\d{6}$/.test(form.pincode.trim())) {
    errors.pincode = "Enter a valid 6-digit pincode";
  }
  return errors;
}

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const [form, setForm] = useState<DeliveryDetails>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => items.length > 0 && !loading, [items, loading]);

  const update =
    (field: keyof DeliveryDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (items.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);

    try {
      const order: Order = {
        id: generateOrderId(),
        items,
        delivery: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          area: form.area.trim(),
          city: form.city.trim(),
          pincode: form.pincode.trim(),
          landmark: form.landmark.trim(),
          instructions: form.instructions.trim(),
        },
        subtotal,
        deliveryFee,
        total,
        createdAt: new Date().toISOString(),
      };

      const url = createWhatsAppOrderUrl(order);

      sessionStorage.setItem(
        "frndzz-last-order",
        JSON.stringify({
          id: order.id,
          total: order.total,
          whatsappUrl: url,
        }),
      );

      // Open WhatsApp with all form + order details pre-filled to café number
      openWhatsApp(url);
      clearCart();
      router.push(`/order-success?id=${encodeURIComponent(order.id)}`);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Could not open WhatsApp. Please try again.",
      );
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Alert severity="info" sx={{ borderRadius: 2 }}>
        Your cart is empty. Add items from the menu before checking out.
      </Alert>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
        gap: { xs: 3, md: 4 },
        alignItems: "start",
      }}
    >
      <Stack spacing={2.5}>
        <Typography variant="h5">Delivery details</Typography>
        <Typography variant="body2" color="text.secondary">
          These details are sent directly to Frndzz Café on WhatsApp when you
          place the order.
        </Typography>
        {submitError && (
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {submitError}
          </Alert>
        )}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <TextField
            label="Full name"
            required
            value={form.name}
            onChange={update("name")}
            error={Boolean(errors.name)}
            helperText={errors.name}
            autoComplete="name"
          />
          <TextField
            label="Phone"
            required
            value={form.phone}
            onChange={update("phone")}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            autoComplete="tel"
            inputProps={{ inputMode: "numeric", maxLength: 10 }}
          />
          <TextField
            label="Address (House / Flat / Street)"
            required
            value={form.address}
            onChange={update("address")}
            error={Boolean(errors.address)}
            helperText={errors.address}
            autoComplete="street-address"
            sx={{ gridColumn: { sm: "1 / -1" } }}
          />
          <TextField
            label="Area"
            required
            value={form.area}
            onChange={update("area")}
            error={Boolean(errors.area)}
            helperText={errors.area}
          />
          <TextField
            label="City"
            required
            value={form.city}
            onChange={update("city")}
            error={Boolean(errors.city)}
            helperText={errors.city}
            autoComplete="address-level2"
          />
          <TextField
            label="Pincode"
            required
            value={form.pincode}
            onChange={update("pincode")}
            error={Boolean(errors.pincode)}
            helperText={errors.pincode}
            autoComplete="postal-code"
            inputProps={{ inputMode: "numeric", maxLength: 6 }}
          />
          <TextField
            label="Landmark (optional)"
            value={form.landmark}
            onChange={update("landmark")}
          />
          <TextField
            label="Delivery instructions (optional)"
            value={form.instructions}
            onChange={update("instructions")}
            multiline
            minRows={3}
            sx={{ gridColumn: { sm: "1 / -1" } }}
          />
        </Box>
      </Stack>

      <Box
        sx={{
          position: { md: "sticky" },
          top: 96,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "rgba(26,26,26,0.08)",
          borderRadius: 3,
          p: 2.5,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Order summary
        </Typography>
        <Stack spacing={1.5} mb={2}>
          {items.map((item) => (
            <Stack
              key={item.product.id}
              direction="row"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography variant="body2">
                {item.product.name} × {item.quantity}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatCurrency(item.product.price * item.quantity)}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Stack spacing={1} mb={2.5}>
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
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6" color="primary.main">
              {formatCurrency(total)}
            </Typography>
          </Stack>
        </Stack>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={!canSubmit}
          startIcon={
            loading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <WhatsAppIcon />
            )
          }
          sx={{
            bgcolor: "#25D366",
            backgroundImage: "none",
            "&:hover": { bgcolor: "#1ebe57", backgroundImage: "none" },
          }}
        >
          {loading ? "Opening WhatsApp…" : "Confirm & Send on WhatsApp"}
        </Button>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={1.5}
          textAlign="center"
        >
          Your name, phone, address and order are sent to Frndzz Café on
          WhatsApp. No payment is taken on this site.
        </Typography>
      </Box>
    </Box>
  );
}
