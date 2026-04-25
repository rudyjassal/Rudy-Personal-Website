# rudyjassal.com

Personal site for Rudrashish "Rudy" Jassal. Editorial-minimal single page — Next.js 14 App Router, TypeScript, Tailwind CSS.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit Content

All copy lives in [`src/content/site.ts`](src/content/site.ts). Change text there without touching components.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Connect to Vercel.

## Hidden Features
### 🦖 Interactive Charizard Flamethrower Engine
The right-hand sidebar contains a hidden interactive "Pokemon Engine". 
- Click the Pokeball to release a giant Charizard.
- **Grab & Drag:** Click and hold Charizard to physically move him anywhere on the screen.
- **Flamethrower:** While dragging, Charizard breathes a high-octane, photorealistic fire stream (built on a custom optimized HTML5 Canvas particle system) that you can sweep across the entire website.
- **Optimized Performance:** Uses an offscreen bitmap cache for the fire particles to ensure 60FPS even on lower-end devices.
- **Mobile Support:** Fully supports touch interactions for dragging and firing.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Vercel auto-detects Next.js — no config needed.
## Project Assets
- **TigerClip (Logo):** `public/tigerclip.png`
- **The Residency (Logo):** `public/residency.svg` (Custom SVG)
- **Forum VC (Logo):** `public/forumvc.svg` (Custom SVG)
- **Phiner (Logo):** `public/phiner.svg`
- **Nvidia (Logo):** `public/nvidia.svg` (Custom SVG)

Or via CLI:

```bash
npx -y vercel --prod
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Design system
│   ├── layout.tsx        # Root layout, fonts, meta
│   └── page.tsx          # Single page
├── components/
│   ├── Bio.tsx           # Bio paragraph + footnote panel/accordion
│   ├── DashList.tsx      # Em-dash bullet list
│   ├── Elsewhere.tsx     # External links
│   └── Section.tsx       # Section with label + hairline
└── content/
    └── site.ts           # All editable copy
```

## Stack

- **Next.js 14** — App Router
- **TypeScript**
- **Tailwind CSS**
- **Google Fonts** — Fraunces (serif body), Inter Tight (UI labels)
