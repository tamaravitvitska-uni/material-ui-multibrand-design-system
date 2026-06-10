# PDF Guru mode (`pdfguru`)

PDF tools suite. Friendly, energetic, conversion-driven — playful flat
illustrations and emoji feedback wrapped around a very deliberate plan/checkout
funnel.

Figma sources: [component sheet](https://www.figma.com/design/c9RoPIgZopicvJqRwdopj9/?node-id=28785-33884) ·
[product file](https://www.figma.com/design/8vLbJpmEU3IJCw6QpZFMtb/?node-id=18177-48552)

## 1. Visual identity

- **Colors** — dual-accent system, the most distinctive trait of this brand:
  - `primary.main #5f30e2` (electric violet): **funnel CTAs** ("Continue",
    "Submit"), selected states, dropzone active tint, loaders.
  - `secondary.main #d2294b` (crimson): **brand/editor actions** — logo, tool
    icons, editor "Done"/"Download" buttons.
  - `cta #000000` black for high-emphasis utility CTAs; error `#d90a0a`.
  - Surfaces: white; page tint `background.lightGrey #f6f6f6`; section tint
    `background.blueGrey #f8f8fb`. Support: mint success pills, peach plan
    ribbon, pastel category swatches (use `materialPalette`/`basePalette`).
- **Typography** — Nunito Sans (rounded humanist). Heaviest headline brand:
  Leading 96/Black, **Title 1 = 50px** (others 48), Title 2 Black-on-mobile.
  Body 16 regular. Prices render cents superscript ($1.⁹⁹).
- **Spacing** — universal scale; comfortable mid-density. Funnel screens are
  focused single-card layouts with generous whitespace; mega-menu is dense.
- **Radius** — scale 4/8/10/12/16/20/24/28/100. Buttons are the tightest of
  the rounded brands: large 12, medium/small 8. Menus 16, menu items 10.
- **Shadows** — layered soft style (`0 8px 40px` + `0 6px 12px -2px` at 8%
  black) on menus/hover cards; buttons flat by default.
- **Density** — medium; tighter corners than ResumeLeader.
- **Tone & personality** — punchy, confident, consumer-grade, slightly quirky
  (ink-line characters, coffee-mug drop overlay, emoji rating scales).

## 2. Component usage rules

- **Buttons**: weight **700**, sentence case. Sizes 56/48/32px tall (L
  paddingX 32, M 20, S 10). Outlined uses a **2px** stroke; outlined `cta`
  border is **solid black**. Funnel primary = `contained primary`; editor/
  download = `contained secondary`; tonal = 16% tints
  (`scales.primaryOpacity['16']` — wired into `variant="tonal"`).
- **Split buttons**: this brand uses ButtonGroup with caret dropdown for
  multi-action CTAs (deep violet fill).
- **Menus/popovers**: radius 16 surface, 10 items, soft layered shadow, no
  border.
- **Inputs**: outlined, radius r3 (10); filled inputs use
  `service.filledInputBackground`.
- **Steppers**: 4-step funnel indicator across the top (Document is ready →
  Select plan → Payment details → Download).
- **Plan cards**: white radio rows; selected gets peach "Best for start"
  ribbon + green-check feature list.
- **Feedback**: emoji scale modals (😡→😍) with chip reasons + violet Submit;
  Trustpilot stars inside checkout.

## 3. Layout principles

- **Desktop**: white header (logo left, slim "Tools ▾ / Contact us" nav, auth
  button right); content max-width ~1100px in 1440 frames. Funnel = centered
  content card on `lightGrey` page, H1 left + primary CTA right on one row.
- **Mobile**: logo + hamburger header; stacked payment forms; modals go
  near-fullwidth.
- **Responsive**: typography switches at `md` automatically; funnel cards
  stack to single column.
- **Spacing logic**: sections py 80–120; card padding 24–32; control gaps
  8–16.
- **Page structure**: marketing = hero → tool grid → steps → reviews → FAQ →
  footer. Funnel = step indicator → single decision card → CTA.

## 4. Product-specific UI patterns

- **Landing/tool pages**: H1 + short body + upload strip; colored per-format
  tool icons (Word blue, Excel green, PPT orange, PDF red).
- **Upload**: slim full-width dashed strip ("↥ Upload New or just drop here" +
  size/format caption); active = violet tint `#efeafe` fill with violet dashed
  border; full-screen gray drag overlay with white dashed frame + doc/coffee
  illustration.
- **Pricing/paywall**: step indicator; plan radio rows (selected = peach
  ribbon, green checks); payment methods as segmented chips (PayPal / G Pay /
  Card) with violet selected outline; Trustpilot block; mint "Your document is
  ready!" preview card with red PDF badge.
- **Success**: mint pill header + document preview + violet/crimson download.
- **Error**: `Alert severity="error"` (`#d90a0a`), retry CTA, supportive copy.
- **Empty**: ink-line illustration + one-line prompt + violet CTA.
- **Editor screens**: toolbar with crimson Done ✓; page-grid management views
  for split/merge.

## 5. AI-assisted coding instructions

When building UI in PDF Guru mode: wrap in `getBrandTheme('pdfguru')`; use the
PDFGuru typography scale (`leading`, `h1`–`h6` — heavy by default); **violet
`primary` for funnel/continue actions and crimson `secondary` for
editor/download actions**; bold sentence-case buttons with 2px outlines when
outlined; tonal variant for soft emphasis; menus radius 16/items 10 with soft
shadows; funnel layouts = centered single-decision cards on `lightGrey` with a
top step indicator; never hardcode values — all from theme tokens.

## 6. Prompt examples

- "Create a landing page for a PDF-compress tool using pdfguru mode."
- "Build the select-plan funnel step (4-step indicator, 3 plan rows, peach
  highlight) using pdfguru mode."
- "Create a feedback modal with an emoji rating scale using pdfguru mode."
- "Build a split-button download menu (PDF/DOCX/TXT) using pdfguru mode."

## 7. Consistency rules

- Violet vs crimson roles are not interchangeable — funnel = violet, editor/
  brand = crimson.
- Buttons: bold 700, sentence case, radii 12/8/8 — never pills, never
  uppercase.
- Outlined = 2px; outlined-black border is solid `#000`.
- Headings stay heavy (Black/ExtraBold); don't lighten them.
- Illustrations: flat black ink line-art with red/yellow props — no 3D, no
  photos.
- Keep funnels one-decision-per-screen with the 4-step indicator.
