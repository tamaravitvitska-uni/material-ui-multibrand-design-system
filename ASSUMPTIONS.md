# Assumptions & decisions log

Decisions made without explicit specification, documented per the project
brief ("make the most reasonable assumption, document it, continue").

## Architecture

1. **New repository consuming `@mui/material@^9.1`** instead of modifying the
   existing `tamaravitvitska-uni/material-ui` fork. The fork contains no
   custom code (verified: unmodified upstream master); maintaining a library
   fork would create permanent upgrade debt. All brand control is achieved
   through public theming APIs. See MIGRATION.md.
2. **npm workspaces monorepo** (`packages/design-system` + `apps/demo`) —
   smallest structure that separates the publishable library from the demo.
3. **Runtime theming** (JS theme objects, no MUI `cssVariables` mode) for the
   simplest multi-brand mental model. Can be enabled later without API breaks.
4. **Generated token files are committed** for reviewable diffs and zero-step
   consumption.

## Tokens

5. **Mode → brand mapping** by Figma mode names (ResumeLeader, PDFGuru,
   TheBestPDF, PDFLeader, OnlyDoc, PDFFly) → lowercase ids.
6. **Spacing unit = 4px** (`theme.spacing(1)`). The Figma scale is 4-based
   with listed exceptions (2, 10); the full scale is exposed as a whitelist in
   `tokens.spacing.scale`.
7. **`shape.borderRadius` = radius.r2** as the generic MUI default; specific
   components get explicit radii from the component sheets.
8. **Figma naming quirks absorbed in the normalizer**: e.g.
   `state/action/secondary-50%` is stored as the action color's 50% state;
   "Title 6" uses different key names (`height`, `font weight Usual/Emph`).
9. **`main color variables/action` → `palette.cta`** (black CTA color), named
   to avoid colliding with MUI's `palette.action` interaction states.

## Typography

10. **Figma → MUI variant mapping**: Leading → custom `leading`; Title 1–6 →
    `h1–h6`; subtitle → `subtitle1`; body/body 2 → `body1/body2`; caption/
    caption xs → `caption`/custom `captionXs`. `subtitle2` is derived (body2
    size + subtitle weight) since Figma defines no second subtitle.
11. **Desktop styles apply from `md` (900px)**; below that, Figma "Mobile"
    values apply. Figma defines only two breakpoints.
12. **`overline`** is derived (captionXs size, +letter-spacing, uppercase) —
    not in Figma.
13. **Fonts load via Google Fonts** (all six families verified available,
    including Zalando Sans). Lato ships 400/700/900 only — 500/600 fall back
    to the nearest weight. Fonts are not bundled with the package.

## Components

14. **Component geometry** (button heights/paddings/radii per size, border
    widths, card/dialog/menu radii) measured from the per-brand component
    sheets in the Core Figma file and maintained in
    `theme/componentSpecs.ts` — Figma's variable export contains no
    component-level styling. PDF Leader's button radii (24/16/16) are sheet
    literals that intentionally sit between its radius tokens.
15. **Figma's 4 button sizes** (Large/Medium/Medium-Small/Small) map to MUI's
    3 (`large/medium/small`); Medium-Small is dropped (closest to medium).
16. **Buttons default to flat** (`disableElevation`); the sheets show both
    flat and shadowed variants. The decorative "Ultra-upsale" rainbow-glow
    treatment is documented but not implemented as a variant.
17. **Shadows**: no shadow collection exists in the export. The elevation
    scale generalizes the layered soft shadow observed in the sheets
    (`0 8px 40px rgba(0,0,0,0.08), 0 6px 12px -2px rgba(0,0,0,0.08)`), same
    for all brands.
18. **`background.paper` = `background.default`** (white) — Figma defines a
    single white surface color.

## Product documentation

19. **ResumeLeader product file contains only a cover page** (verified) — its
    mode doc's layout/pattern sections derive from tokens, the component
    sheet, cover identity cues, and family conventions, and are flagged for
    re-verification when real screens land.
20. **Product-pattern docs** for the other five brands derive from
    screenshot analysis of the linked A/B-testing Figma files (June 2026
    state); they describe observed conventions, not exhaustive specs.
21. **OnlyDoc tonal-tint source**: the sheet's yellow tints reference
    `#ffdd2d` while `primary.main` is `#ffdf41` — flagged as a possible token
    inconsistency in Figma; tokens win in this system.

## Tooling

22. **MUI v9 system-prop removal** honored throughout (layout props like
    `alignItems`/`textAlign` go through `sx`).
23. **Demo aliases the library to its TS source** for instant HMR; the
    publishable build (`tsup`, ESM+CJS+d.ts) is independent.
