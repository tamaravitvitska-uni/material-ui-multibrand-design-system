# AI vibe-coding guide

This repository is built so an AI assistant (Claude Code, Copilot, Cursor…)
can generate correct, on-brand UI from prompts like:

> "Create a landing page using PDFGuru mode."
> "Build a dashboard screen using PDFLeader mode."
> "Create a file upload tool page using OnlyDoc mode."

"Mode" = brand id: `resumeleader · pdfguru · thebestpdf · pdfleader · onlydoc · pdffly`.

## The contract (what "using <Brand> mode" means)

1. **Wrap or assume the brand theme.** New standalone pages/apps:
   `<ThemeProvider theme={getBrandTheme('<brand>')}>` (or `<BrandProvider>`
   for switchable demos). Inside the demo app the provider already exists —
   just build the page.
2. **Zero hardcoded visual values.** No hex colors, no px font sizes, no
   arbitrary radii. Everything comes from:
   - MUI props: `color="primary|secondary|cta|error…"`, `variant`, `size`
   - `sx` with theme paths: `bgcolor: 'primary.main'`, `p: 6` (= 24px)
   - `theme.tokens.*` for brand extras: `theme.tokens.radius.r6`,
     `theme.tokens.palette.background.blueGrey`,
     `theme.tokens.scales.primaryOpacity['8']`
3. **Use the system's variants.** Buttons: `contained / tonal / outlined /
   text` × `primary / secondary / cta / error`. Typography: `leading, h1–h6,
   subtitle1, body1, body2, caption, captionXs`. Never uppercase button labels
   — all brands use sentence case.
4. **Spacing lands on the scale** `2 4 8 10 12 16 20 24 32 36 40 48 56 64 72
   80 88 96 104 112 120 140` px → `sx` numbers ×4 (e.g. `py: 6` = 24,
   `py: 30` = 120).
5. **Respect the brand's design language** — read the brand's mode doc in
   [`docs/modes/`](modes/) before building. That doc encodes the product's
   real layout patterns (hero structure, funnel patterns, header style,
   illustration style, density).

## Component vocabulary (all brands)

| Intent | Use |
| --- | --- |
| Primary action / funnel CTA | `<Button variant="contained" color="primary" size="large">` |
| Black "power" CTA (upsells, contrast sections) | `color="cta"` |
| Soft/secondary emphasis | `variant="tonal"` (Figma 16% tint) |
| Tertiary / cancel | `variant="text"` |
| Hero headline | `<Typography variant="leading" component="h1">` |
| Section title | `h2`/`h3` |
| Card title | `h5`/`h6` |
| Fine print / legal | `caption` / `captionXs` |
| Alternate section background | `theme.tokens.palette.background.lightGrey` or `.blueGrey` |
| Dark section / footer | `theme.tokens.palette.background.dark` + `scales.whiteOpacity` for muted text |
| Pills / step number circles | `borderRadius: theme.tokens.radius.r9` |

## Page recipes

**Marketing landing** (see `apps/demo/src/pages/LandingPage.tsx` for a working
reference): hero on `background.blueGrey` (PDFFly: dark hero — see its mode
doc) → feature cards (outlined, r5) → steps with `r9` number circles on
`lightGrey` → CTA banner on `primary.main` with a `cta` button → FAQ
accordions → footer.

**Pricing/paywall** (see `PricingPage.tsx`): centered single column, billing
toggle, 3 plan cards — highlighted plan gets `borderColor: 'primary.main'`,
borderWidth 2, "Most popular" chip; feature lists with success-color checks;
trust caption under the grid.

**Tool page** (PDF products): focused hero with H1 + short body + upload card
(dashed `divider` border, paper illustration slot, formats caption, large
contained CTA). Success state: `success.main` check + document preview card +
download CTA. Error state: `Alert severity="error"` + retry.

**Dashboard/app screens**: denser spacing (small group), `body2` text,
outlined cards, tabs styled by theme, tables on `background.paper`.

## Prompt templates

```
Create a <page type> using <brand> mode.
Stack: React + MUI + @multibrand/design-system.
Requirements: <content/sections>.
Rules: follow docs/modes/<brand>.md; no hardcoded colors/sizes/radii —
theme tokens only; reuse the button/typography variants of the system.
```

Example prompts that should "just work" in this repo:

- "Create a landing page for a PDF-merge tool using **pdffly** mode."
- "Build a pricing page with 3 plans using **thebestpdf** mode."
- "Create a resume-template gallery page using **resumeleader** mode."
- "Build a file upload flow (idle/uploading/success/error) using **onlydoc** mode."
- "Create a checkout screen with payment method chips using **pdfleader** mode."
- "Build a feedback modal with emoji rating using **pdfguru** mode."

## Review checklist for generated code

- [ ] No hex/rgb literals, no `borderRadius: <number>` literals, no px font sizes
- [ ] Buttons use system variants/colors; labels sentence case
- [ ] Headings use `leading/h1–h6`; body uses `body1/body2`
- [ ] Spacing values land on the token scale
- [ ] Section backgrounds come from `tokens.palette.background.*`
- [ ] Brand-specific conventions from `docs/modes/<brand>.md` respected
- [ ] Works under brand switching (nothing assumes a specific brand's colors)
