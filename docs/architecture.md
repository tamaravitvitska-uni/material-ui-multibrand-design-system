# Architecture

## Goal

One codebase, six visual brands. Figma variables are the single source of
truth; product code never hardcodes a visual value. Any MUI component dropped
into any of the six apps automatically looks like that brand.

## Token flow

```
Figma "Design System / Core" variable collections
        │  (export as JSON, one file per collection)
        ▼
packages/design-system/tokens/figma-export/*.json     ← raw, committed
        │  npm run build:tokens
        │  scripts/build-tokens.mjs  — the NORMALIZATION LAYER
        │    • rgba floats → hex / rgba() strings
        │    • "Black"/"SemiBold" → 900/600
        │    • Figma paths → stable semantic paths
        │    • per-mode values → one file per brand
        ▼
src/tokens/generated/<brand>.ts                       ← typed BrandTokens, committed
        │  createBrandTheme(brandId)
        │    • buildPalette()     tokens → MUI palette (+ cta color)
        │    • buildTypography()  responsive variants (mobile-first, md+ desktop)
        │    • buildComponents()  MUI component overrides
        │    • buildShadows()     soft elevation scale
        │    • componentSpecs.ts  geometry measured from Figma component sheets
        ▼
MUI Theme (theme.tokens = full BrandTokens, theme.brand = metadata)
        │  BrandProvider / ThemeProvider
        ▼
Application components (stock MUI + sx/styled reading theme.tokens)
```

## Layers

### 1. Raw exports (`tokens/figma-export/`)

Five Figma variable collections, exported verbatim:

| File | Collection | Modes |
| --- | --- | --- |
| `1-spacings.json` | Spacing scale | 1 (UNIVERSAL — same for all brands) |
| `2-corner-radiuses.json` | Radius scale r1–r9 | 6 (per brand) |
| `3-base-changeable-variables.json` | Semantic colors + typography | 6 |
| `4-additional-colors.json` | Tonal ramps + opacity ramps | 6 |
| `5-material-palette.json` | Full Material palette | 6 |

### 2. Normalization (`scripts/build-tokens.mjs`)

Figma naming is inconsistent in places ("body 2 size" vs "Title 6
Desktop/height", "state/action/secondary-50%" actually belonging to the action
color). The normalizer absorbs all of those quirks **in one place** and emits a
stable, typed shape (`BrandTokens` in `src/tokens/types.ts`). Downstream code
never parses Figma names.

Generated files are committed so consumers don't need the build step and diffs
of token changes are reviewable.

### 3. Theme factory (`src/theme/`)

`createBrandTheme(brandId)` is the **only** theme builder — the shared base
theme is the mapping logic itself; brands differ only in data. This is the
"theme inheritance" model: instead of `deepmerge(baseTheme, brandOverrides)`
(which drifts), every brand inherits 100% of the mapping and contributes 0% of
the code.

Two data sources feed it:

- **`tokens/generated/<brand>.ts`** — values from Figma variables.
- **`theme/componentSpecs.ts`** — component geometry (button heights, paddings,
  per-size radii, outlined border widths) measured from the per-brand component
  sheets in the Core Figma file. Figma's variable export does not contain
  component-level styling, so these are maintained here, with token references
  where the sheets bind to tokens.

### 4. MUI integration

- `palette.primary/secondary/error/warning/info/success/text/background/action/divider`
  map 1:1 from tokens.
- **`palette.cta`** — the black high-emphasis CTA color (Figma group
  "main color variables/action"). Named `cta` to avoid clashing with MUI's
  `palette.action` state colors. Enabled on Button/Chip/IconButton via module
  augmentation.
- **`variant="tonal"`** — Figma's fourth button variant (16% tint fill +
  colored label), implemented as a custom Button variant for
  primary/secondary/error/cta.
- **Typography**: Figma `Title 1..6 → h1..h6`, `Leading → variant="leading"`,
  `subtitle → subtitle1`, `body/body 2 → body1/body2`,
  `caption/caption xs → caption/variant="captionXs"`. All headings are
  responsive: Figma Mobile values by default, Desktop values from `md` (900px).
- **`theme.tokens`** — the complete BrandTokens object on the theme, so any
  component can reach non-MUI tokens (`theme.tokens.radius.r6`,
  `theme.tokens.palette.background.blueGrey`,
  `theme.tokens.scales.primaryOpacity['8']`) without imports.
- **`theme.brand`** — brand metadata (label, product, Figma links).

### 5. Theme switching (`src/provider/`)

`BrandProvider` holds the active brand in React state (persisted to
localStorage), memoizes themes per brand, and re-renders the MUI
`ThemeProvider`. `useBrand()` exposes `{ brand, meta, tokens, theme, setBrand }`.
`BrandSwitcher` is a drop-in select. Single-brand apps skip all of this and use
`getBrandTheme(id)` directly.

## Key decisions (and why)

| Decision | Rationale |
| --- | --- |
| New repo consuming `@mui/material@9` as a dependency | The existing `tamaravitvitska-uni/material-ui` repo is an unmodified fork of upstream MUI. Forking the library would mean maintaining a fork forever; themes + overrides achieve the same visual control on public API. See [MIGRATION.md](../MIGRATION.md). |
| Generated tokens are committed | Reviewable diffs when design changes; consumers need no build step. |
| Runtime theming (no CSS variables mode) | Simplest mental model for 6 fully independent brands; nothing prevents enabling MUI's `cssVariables` later. |
| `spacing = 4px` unit | The Figma spacing scale is 4-based (with 2 and 10 as listed exceptions); `theme.spacing(n)` stays idiomatic while `tokens.spacing.scale` whitelists allowed values. |
| Component geometry in `componentSpecs.ts`, not guessed from radius tokens | The Figma component sheets are explicit about per-size geometry; some values (PDF Leader's button radii) intentionally sit between radius tokens. |
| Shadows defined in code | No shadow collection exists in the Figma export; scale generalizes the soft layered shadows observed in the component sheets. |

## Package layout

```
packages/design-system/
  tokens/figma-export/      raw Figma JSON (replace on re-export)
  scripts/build-tokens.mjs  normalizer
  src/
    tokens/types.ts         BrandTokens model
    tokens/generated/       per-brand data (AUTO-GENERATED)
    brands.ts               registry: labels, products, fonts, Figma links
    fonts.ts                Google Fonts URL helper
    theme/
      componentSpecs.ts     per-brand component geometry (from Figma sheets)
      palette.ts            tokens → MUI palette
      typography.ts         tokens → MUI typography variants
      components.ts         tokens → MUI component overrides
      shadows.ts            elevation scale
      augmentation.ts       TS module augmentation (tokens, cta, tonal, leading…)
      createBrandTheme.ts   the factory
    provider/BrandProvider.tsx
    components/BrandSwitcher.tsx
    index.ts                public API
apps/demo/                  Vite app — switcher + 4 demo pages
```
