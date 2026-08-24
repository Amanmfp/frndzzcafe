"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export function OrderSuccessClient() {
  const params = useSearchParams();
  const orderId = params.get("id");
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("frndzz-last-order");
      if (!raw) return;
      const parsed = JSON.parse(raw) as { whatsappUrl?: string };
      if (parsed.whatsappUrl) setWhatsappUrl(parsed.whatsappUrl);
    } catch {
      // ignore
    }
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 } }}>
      <Stack alignItems="center" spacing={2.5} textAlign="center">
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(135deg, #E23744, #F97316)",
            color: "white",
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 34 } }}>
          Order confirmed
        </Typography>
        <Typography color="text.secondary" maxWidth={420} fontSize={17}>
          Frndzz Café will contact you soon.
          {orderId ? (
            <>
              <br />
              Reference: <strong>#{orderId}</strong>
            </>
          ) : null}
        </Typography>
        <Typography variant="body2" color="text.secondary" maxWidth={400}>
          Your delivery details and order were sent to the café on WhatsApp.
          Please tap <strong>Send</strong> in WhatsApp if it opened.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} pt={1}>
          {whatsappUrl && (
            <Button
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="large"
              startIcon={<WhatsAppIcon />}
              sx={{
                bgcolor: "#25D366",
                backgroundImage: "none",
                "&:hover": { bgcolor: "#1ebe57", backgroundImage: "none" },
              }}
            >
              Open WhatsApp again
            </Button>
          )}
          <Button component={Link} href="/menu" variant="outlined" size="large">
            Order again
          </Button>
          <Button component={Link} href="/" variant="text" size="large">
            Back home
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
