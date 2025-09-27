# Visiontech Web

React + TypeScript + Vite single‑page site for Visiontech with clean routing, a hero carousel, and a services accordion.

## Tech Stack

- React 19 + TypeScript
- Vite 7 (HMR dev server and bundler)
- React Router 6
- ESLint (TypeScript + React hooks/refresh plugins)

## Quick Start

Prerequisites: Node.js 18+ and npm.

```bash
npm install
npm run dev         # starts dev server (default: http://localhost:5173)
npm run build       # type-check + production build to dist/
npm run preview     # serves the dist/ build locally
npm run lint        # runs ESLint
```

## Project Structure

```
visiontech/
├─ index.html
├─ public/                 # static assets copied as-is
├─ src/
│  ├─ App.tsx              # route layout and switch
│  ├─ main.tsx             # React entry, BrowserRouter
│  ├─ index.css            # global styles (header, footer, carousel, accordion)
│  ├─ components/
│  │  ├─ Header.tsx        # top nav with Services dropdown
│  │  ├─ Footer.tsx        # footer with social icons
│  │  └─ Carousel.tsx      # reusable carousel component
│  ├─ pages/
│  │  ├─ Home.tsx          # hero slider with overlay CTA
│  │  ├─ Services.tsx      # multi-section accordion (service areas)
│  │  ├─ About.tsx
│  │  ├─ Careers.tsx
│  │  └─ Contact.tsx
│  └─ images/              # optional: brand logo and slides
├─ vite.config.ts
└─ eslint.config.js
```

## Routing

Defined in `src/App.tsx` using React Router:

- `/` → `Home`
- `/services` → `Services`
- `/about` → `About`
- `/careers` → `Careers`
- `/contact` → `Contact`

## Assets and Customization

- Logo: place one of `src/images/logo.png|jpg|svg` and the header will render it automatically; otherwise it shows the text "Visiontech".
- Home carousel: `Home.tsx` loads `src/images/image1.jpg…image5.jpg` (fallbacks to `slide1.svg…slide5.svg` if not present). Add or replace files to update slides.
- Services sections: edit the `sections` array in `src/pages/Services.tsx` to change headings, taglines, and items.
- Styling: global styles live in `src/index.css` (header, dropdown, carousel, accordion, footer). Adjust tokens, spacing, and colors there.

## Development Notes

- Type checking runs as part of `npm run build` via project `tsconfig.*` files.
- The production build is static and deploys by serving the `dist/` folder on any static host (e.g., Netlify, Vercel, S3 + CloudFront, Nginx).
- If deploying under a subpath, configure your host to serve SPA routes (fallback to `/index.html`).

## Scripts

- `dev`: Start Vite dev server.
- `build`: Type-check and build for production.
- `preview`: Preview the production build locally.
- `lint`: Run ESLint over the project.

## Credits

Bootstrapped with Vite’s React + TypeScript template and extended for the Visiontech site structure.
