"use client";

import { Fab, Zoom } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function getWhatsAppChatUrl(): string {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(
    /\D/g,
    "",
  );
  if (!number) return "https://wa.me/";
  const text = encodeURIComponent(
    "Hi Frndzz Café! I’d like to place an order / ask something.",
  );
  return `https://wa.me/${number}?text=${text}`;
}

export function WhatsAppFloat() {
  const href = getWhatsAppChatUrl();

  return (
    <Zoom in>
      <Fab
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        sx={{
          position: "fixed",
          right: { xs: 16, md: 24 },
          bottom: { xs: 20, md: 28 },
          zIndex: 1300,
          bgcolor: "#25D366",
          color: "#fff",
          width: 58,
          height: 58,
          boxShadow: "0 8px 24px rgba(37, 211, 102, 0.45)",
          "&:hover": {
            bgcolor: "#1ebe57",
          },
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 30 }} />
      </Fab>
    </Zoom>
  );
}
