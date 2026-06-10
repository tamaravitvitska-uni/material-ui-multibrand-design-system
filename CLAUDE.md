# CLAUDE.md — AI assistant instructions

This is a **multi-brand Material UI design system**. Figma variables are the
single source of truth. Six brands ("modes") share one codebase; a theme makes
all visual decisions.

## Prime directive

**Never hardcode a visual value.** No hex colors, no px font sizes, no literal
radii, no arbitrary paddings. Everything comes from the active brand theme:

- MUI props: `color="primary|secondary|cta|error|…"`, `variant`, `size`
- `sx` theme paths: `bgcolor: 'primary.main'`, `color: 'text.secondary'`, `p: 6` (=24px)
- Brand extras: `theme.tokens.*` (radius scale, background tints, opacity
  ramps, material palette) — available on every theme via `useTheme()` or
  `useBrand()`

## When the user says "using <Brand> mode"

1. Read `docs/modes/<brand>.md` first — it encodes that product's real design
   language (layout patterns, color roles, dos/don'ts).
2. New standalone page/app → wrap in
   `<ThemeProvider theme={getBrandTheme('<brandId>')}>` + `<CssBaseline/>`.
   Inside `apps/demo` the provider already exists — just add the page/route.
3. Build with stock MUI components; the theme restyles them.

Brand ids: `resumeleader` `pdfguru` `thebestpdf` `pdfleader` `onlydoc` `pdffly`.

## Brand cheat sheet

| Mode | Font | Primary | Secondary | Buttons | Signature |
| --- | --- | --- | --- | --- | --- |
| `resumeleader` | Outfit | `#1f5de2` blue | `#651fff` violet | 500, radii 16/12/8, 1px | calm SaaS; violet = premium; builder = form+preview panes |
| `pdfguru` | Nunito Sans | `#5f30e2` violet | `#d2294b` crimson | **700**, radii 12/8/8, **2px** | violet=funnel / crimson=editor; 4-step funnel; ink illustrations |
| `thebestpdf` | Inter | `#3758f9` blue | `#13c296` emerald | 600, radii 4/4/2, 1px | sharp + dense; navy text `#212e45`; uppercase nav; navy footer |
| `pdfleader` | Montserrat | `#4988fc` blue | `#393939` charcoal | **700**, radii 24/16/16, **2px** | pills; 72px hero CTAs; airy 1-decision funnels; steps in header |
| `onlydoc` | Lato | `#ffdf41` yellow (**dark text**) | `#2d50ff` blue | 700, radii 16/12/8, 1px | black pill header/footer; yellow actives; no yellow outlined/text on white |
| `pdffly` | Zalando Sans | `#038f7b` teal | `#eb7425` orange | 500, radii 16/12/8, 1px | dark hero band + white upload card; teal ⚡ CTAs; dark/white rhythm |

## System vocabulary (all brands)

- Buttons: `contained / tonal / outlined / text` × `primary / secondary / cta
  / error`. `cta` = black power-CTA. `tonal` = Figma 16% tint. Labels are
  **sentence case** — never uppercase.
- Typography variants: `leading` (96px hero), `h1`–`h6` (= Figma Title 1–6,
  responsive at `md`), `subtitle1`, `body1`, `body2`, `caption`, `captionXs`.
- Spacing: `theme.spacing(1)`=4px; values must land on
  `2 4 8 10 12 16 20 24 32 36 40 48 56 64 72 80 88 96 104 112 120 140`.
- Radius: `theme.tokens.radius.none|r1…r9` (r9 = pill). Cards r5, dialogs r6
  are already wired into components.
- Section tints: `theme.tokens.palette.background.lightGrey|blueGrey|dark`.
- Opacity ramps: `theme.tokens.scales.<color>Opacity['4'…'70']`,
  `whiteOpacity` for text on dark.

## Repo map

- Tokens: `packages/design-system/src/tokens/generated/<brand>.ts`
  (AUTO-GENERATED — edit Figma + `npm run build:tokens`, never the files)
- Theme mapping: `packages/design-system/src/theme/` (palette, typography,
  components, componentSpecs = Figma-measured geometry)
- Provider/switcher: `src/provider/BrandProvider.tsx`, `src/components/BrandSwitcher.tsx`
- Demo app: `apps/demo/src/pages/*` — LandingPage/PricingPage are reference
  implementations of on-brand, token-only pages
- Docs: `docs/` (architecture, tokens, ai-vibe-coding, modes/<brand>.md)

## Commands

```bash
npm run dev          # demo on :5173
npm run build:tokens # regenerate tokens from Figma exports
npm run typecheck    # both workspaces
npm run build        # tokens + lib + demo
```

## Verification checklist before finishing any UI task

- `npm run typecheck` passes
- No literal colors/sizes/radii in the diff (`grep -nE '#[0-9a-fA-F]{3,8}\b'`)
- Page renders correctly under at least 2 brands (switcher in demo top bar) —
  unless the page is explicitly single-brand
- Brand conventions from `docs/modes/<brand>.md` respected
