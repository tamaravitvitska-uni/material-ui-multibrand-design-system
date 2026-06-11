# Material UI Multi-brand Design System

One Material UI design system, **six brands**, driven entirely by Figma variables.

**Live demo:** https://tamaravitvitska-uni.github.io/material-ui-multibrand-design-system/
(brand switcher in the top bar — deployed automatically from `main` via GitHub Pages)

| Brand | Product | Font | Primary | Character |
| --- | --- | --- | --- | --- |
| **ResumeLeader** | Resume builder | Outfit | `#1f5de2` blue | Modern, calm, professional |
| **PDF Guru** | PDF tools | Nunito Sans | `#5f30e2` violet | Bold, energetic, conversion-driven |
| **TheBestPDF** | PDF tools | Inter | `#3758f9` royal blue | Sharp, corporate, dense |
| **PDF Leader** | PDF tools | Montserrat | `#4988fc` sky blue | Chunky, friendly, pill-shaped |
| **OnlyDoc** | Document tools | Lato | `#ffdf41` yellow | Punchy black + yellow, playful |
| **PDFFly** | PDF tools | Zalando Sans | `#038f7b` teal | Sleek, high-contrast, techy |

Every color, font, size, radius and spacing value flows from the Figma
**Design System / Core** variable collections → normalized tokens → MUI themes.
Components never hardcode visual values.

## Quick start

```bash
npm install
npm run dev          # demo app at http://localhost:5173
```

The demo app has a brand switcher in the top bar — switch between all six
brands live on the landing, components, pricing and tokens pages.

## Using a brand in your app

```tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getBrandTheme } from '@multibrand/design-system';

// Single-brand app (typical production setup)
export function App() {
  return (
    <ThemeProvider theme={getBrandTheme('pdfguru')}>
      <CssBaseline />
      <YourApp />
    </ThemeProvider>
  );
}
```

```tsx
// Multi-brand app with runtime switching
import { BrandProvider, BrandSwitcher, useBrand } from '@multibrand/design-system';

<BrandProvider initialBrand="pdfguru">
  <App />            {/* anywhere inside: const { brand, setBrand, tokens } = useBrand() */}
</BrandProvider>
```

Then use plain MUI — the theme does the rest:

```tsx
<Button variant="contained" color="primary" size="large">Get started</Button>
<Button variant="tonal" color="secondary">Tonal (Figma 16% tint)</Button>
<Button variant="contained" color="cta">Black CTA</Button>
<Typography variant="leading">Hero headline</Typography>
```

Don't forget the brand font — in your HTML head:

```ts
import { googleFontsUrl } from '@multibrand/design-system';
googleFontsUrl(['pdfguru']); // → Google Fonts URL for Nunito Sans
```

## Repository layout

```
packages/design-system/        the library (@multibrand/design-system)
  tokens/figma-export/         raw Figma variable exports (source of truth)
  scripts/build-tokens.mjs     normalization layer (Figma JSON → typed tokens)
  src/tokens/generated/        per-brand token modules (committed, generated)
  src/theme/                   token → MUI theme mapping + component overrides
  src/provider/                BrandProvider (theme switching)
  src/components/              BrandSwitcher
apps/demo/                     Vite demo app with live brand switching
docs/                          documentation (architecture, tokens, per-brand guides)
```

## Documentation

- [Getting started](docs/getting-started.md)
- [Architecture](docs/architecture.md) — token flow, layers, decisions
- [Tokens](docs/tokens.md) — every token group and how it maps to MUI
- [Theme switching](docs/theme-switching.md)
- [AI vibe-coding guide](docs/ai-vibe-coding.md) — build UI by naming a brand mode
- [Adding a new brand](docs/adding-a-brand.md)
- Per-brand guides: [ResumeLeader](docs/modes/resumeleader.md) ·
  [PDF Guru](docs/modes/pdfguru.md) · [TheBestPDF](docs/modes/thebestpdf.md) ·
  [PDF Leader](docs/modes/pdfleader.md) · [OnlyDoc](docs/modes/onlydoc.md) ·
  [PDFFly](docs/modes/pdffly.md)
- [CLAUDE.md](CLAUDE.md) — instructions for AI assistants working in this repo
- [ASSUMPTIONS.md](ASSUMPTIONS.md) · [MIGRATION.md](MIGRATION.md) · [PUBLISHING.md](PUBLISHING.md)

## Updating tokens from Figma

1. In Figma, export the variable collections (same JSON format) and replace the
   files in `packages/design-system/tokens/figma-export/`.
2. Run `npm run build:tokens`.
3. Review the diff in `src/tokens/generated/` and commit.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Run the demo app (Vite, hot reload into library source) |
| `npm run build:tokens` | Regenerate typed tokens from the Figma exports |
| `npm run build` | Tokens → library (ESM+CJS+d.ts) → demo production build |
| `npm run typecheck` | Typecheck library + demo |
