# Tokens

Every brand resolves to one `BrandTokens` object (see
`packages/design-system/src/tokens/types.ts`). Access them three ways:

```tsx
import { brandTokens, pdfguru } from '@multibrand/design-system'; // direct import
const theme = useTheme();   theme.tokens                          // inside components
const { tokens } = useBrand();                                    // via provider
```

## Color

### `tokens.palette` (Figma: "⭐️ 3. Base changable variables")

| Token path | Figma group | MUI mapping |
| --- | --- | --- |
| `palette.primary.{main,light,dark,contrastText}` | main color variables/primary | `palette.primary` |
| `palette.primary.hover` / `.main50` | state/primary | hover tint / 50% alpha |
| `palette.secondary.*` | main color variables/secondary | `palette.secondary` |
| `palette.cta.*` | main color variables/**action** (black CTA) | `palette.cta` (custom slot) |
| `palette.error/warning/info/success.*` | status colors + state opacities | matching MUI slots |
| `palette.text.{primary,secondary,disabled}` | text colors | `palette.text` |
| `palette.background.{default,paper,lightGrey,blueGrey,darkBlueGrey,dark}` | background colors | default/paper → MUI; rest via `theme.tokens` |
| `palette.action.{active,hover,selected,disabled,disabledBackground,stroke}` | action colors | `palette.action` (stroke via tokens) |
| `palette.service.*` | other service colors | wired into component overrides (divider, tooltip, snackbar, backdrop, input backgrounds, outline borders) |

Primary colors per brand:

| Brand | primary.main | secondary.main | Notes |
| --- | --- | --- | --- |
| resumeleader | `#1f5de2` | `#651fff` | white contrast text |
| pdfguru | `#5f30e2` | `#d2294b` | violet = funnel, crimson = editor CTAs |
| thebestpdf | `#3758f9` | `#13c296` | text.primary is navy `#212e45` |
| pdfleader | `#4988fc` | `#393939` | divider is solid `#dfe4ea` |
| onlydoc | `#ffdf41` | `#2d50ff` | **dark contrastText `#201c11`** on primary |
| pdffly | `#038f7b` | `#eb7425` | the only green-led brand |

### `tokens.scales` (Figma: "⭐️ 4. Additional colors")

- `scales.primary` / `scales.secondary` — solid tonal ramps `50…900`.
- `scales.primaryOpacity` / `secondaryOpacity` / `actionOpacity` — alpha ramps
  `4…70` (percent). `['16']` is the **tonal button fill**.
- `scales.errorOpacity/warningOpacity/infoOpacity/successOpacity` — `4…50`.
- `scales.whiteOpacity` — white alphas `4…95` for dark surfaces.

### `tokens.materialPalette` (Figma: "5. Material Palette")

The full Material color system (`red/50…A700`, …) plus `basePalette` accent
groups, as configured per brand. Use for data-viz, avatars, illustration
accents — not for core UI roles.

## Typography (`tokens.typography` + `tokens.fontFamily`)

Per-brand font: Outfit · Nunito Sans · Inter · Montserrat · Lato · Zalando Sans.

| Figma style | Token | MUI variant | Desktop / Mobile (all brands)* |
| --- | --- | --- | --- |
| Leading | `typography.leading` | `leading` (custom) | 96/110 Black · 32/38 |
| Title 1 | `typography.title1` | `h1` | 48/64 (PDF Guru 50) · 32/40 |
| Title 2–6 | `title2…title6` | `h2…h6` | per tokens (weights differ per brand) |
| subtitle | `typography.subtitle` | `subtitle1` | 18px-range, per brand |
| body / body 2 | `body` / `body2` | `body1` / `body2` | 16 / 14 |
| caption / caption xs | `caption` / `captionXs` | `caption` / `captionXs` (custom) | 12 / 10-range |

\* Sizes are tokens — always read them, never restate them. Headings are
responsive automatically: mobile values by default, desktop from the `md`
breakpoint (900px). `emphWeight` carries the emphasized weight where Figma
defines one.

```tsx
<Typography variant="leading" component="h1">Hero</Typography>
<Typography variant="h3">Section title</Typography>
<Typography variant="captionXs">Legal fine print</Typography>
```

## Spacing (`tokens.spacing` — universal across brands)

- `unit: 4` → `theme.spacing(1) === 4px` (MUI idiom: `sx={{ p: 6 }}` = 24px).
- `scale`: `0 2 4 8 10 12 16 20 24 32 36 40 48 56 64 72 80 88 96 104 112 120 140`
  — the whitelist of allowed pixel values. Pick spacings that land on it.
- `groups`: micro `[2]`, small `[4…32]`, medium `[36…64]`, large `[72…120]`,
  huge `[140]`. Rule of thumb: small = inside components, medium = between
  components, large = between page sections, huge = hero padding.

## Radius (`tokens.radius` — per brand)

`none, r1…r9`. The scale is the biggest brand differentiator:

| Brand | r1 | r2 | r3 | r4 | r5 | r6 | r7 | r8 | r9 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| resumeleader / pdfguru / onlydoc* / pdffly | 4 | 8 | 10 | 12 | 16 | 20 | 24 | 28/32 | 100 |
| thebestpdf | 2 | 4 | 8 | 10 | 12 | 16 | 20 | 24 | 100 |
| pdfleader | 6 | 12 | 20 | 32 | 40 | 60 | 80 | 100 | 120 |

\* onlydoc/pdffly r8 = 32. Defaults wired into components: buttons per size
(see `componentSpecs.ts`), cards r5, dialogs r6, menus r5/items r3,
`shape.borderRadius` = r2. Use `r9` for pills/circles.

## Elevation

`theme.shadows[n]` — a soft, low-opacity layered scale derived from the shadow
style observed in the Figma component sheets (no shadow variables exist in the
export). Cards default to outlined/flat; use elevation 2–8 for hover/popovers.

## Component geometry (`getComponentSpecs(tokens)`)

Measured from the per-brand component sheets (button heights, paddings,
per-size radii, outlined border widths 1px vs 2px, font sizes/weights). Wired
into the theme; read it when you need raw numbers (e.g. matching a custom
element to button height).

## Updating tokens

1. Re-export the five collections from Figma into
   `packages/design-system/tokens/figma-export/` (same file names).
2. `npm run build:tokens`
3. Review the generated diff; commit. If Figma *names* changed (not just
   values), update the mapping in `scripts/build-tokens.mjs` — it fails loudly
   on missing variables.
