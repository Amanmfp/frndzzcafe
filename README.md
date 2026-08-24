# Frndzz Café

Production-style pizza & fast-food ordering site built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Material UI**.

Orders are sent to your café via **WhatsApp** — no backend or payments required.

## Features

- Mobile-first food-delivery style UI (search, category chips, bestsellers)
- Sticky category navigation with scroll-to-section on the menu
- Add to cart with quantity controls and confirmation animation
- Cart drawer (MUI Drawer) with subtotal, delivery fee, and total
- Checkout form with validation
- WhatsApp order message generation via `NEXT_PUBLIC_WHATSAPP_NUMBER`
- Cart persistence in `localStorage`
- Order success screen with unique order ID

## Setup

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local`:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

Use the full international number **digits only** (country code + number, no `+` or spaces).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## WhatsApp configuration

The checkout flow calls `createWhatsAppOrderUrl()` in `src/lib/whatsapp.ts`, which:

1. Builds a readable order message
2. URL-encodes it
3. Opens `https://wa.me/{NUMBER}?text={MESSAGE}`

Never hardcode the restaurant number in components — keep it in env.

## Project structure

```
src/
  app/           # Routes (home, menu, offers, about, checkout, order-success)
  components/    # UI (header, cart drawer, product cards, checkout)
  context/       # CartProvider
  data/          # Sample menu
  lib/           # Cart math, currency, order ID, WhatsApp helpers
  theme/         # MUI theme
  types/         # Shared TypeScript types
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Serve production build   |
| `npm run lint`  | Run ESLint               |
