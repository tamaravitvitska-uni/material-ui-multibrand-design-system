# OnlyDoc mode (`onlydoc`)

Document tools suite. The boldest, most graphic brand: taxi-cab yellow on
black, floating pill chrome — modern, punchy, slightly playful but efficient.

Figma sources: [component sheet](https://www.figma.com/design/c9RoPIgZopicvJqRwdopj9/?node-id=30457-70168) ·
[product file](https://www.figma.com/design/blPMDiXqx4m9iIOlm3a3zY/?node-id=104-15355)

## 1. Visual identity

- **Colors** — signal triad: vivid yellow `primary.main #ffdf41` with
  **near-black contrast text `#201c11`** (the only brand with dark-on-light
  primary buttons); black/charcoal chrome (`background.dark #323232` range,
  header/footer `#1a1a1a–#2d2d2d`); white content. `secondary.main #2d50ff`
  electric blue for links/chips; green for Trustpilot only. Pale-yellow active
  tints (`scales.primaryOpacity['8']/['16']` — toolbar highlight `#fffbeb`
  feel). Rich multicolor file-format icons and rainbow template-category chips
  (use `materialPalette`).
- **Typography** — Lato **Bold** (weights 400/700/900 only — the theme maps
  500/600 requests to the nearest available). Sturdy, confident titles;
  compact UI text.
- **Spacing** — balanced: airy marketing cards, compact menus/lists.
- **Radius** — 4/8/10/12/16/20/24/32/100. Component sheet buttons 16/12/8; in
  the product, **marketing CTAs render as pills** ("Done ✓", "Choose File ↥",
  "Sign in") — use `radius.r9` for those; in-app controls keep sheet radii.
- **Shadows** — minimal; black surfaces create depth instead.
- **Density** — medium; mega-menus and search are list-dense.
- **Tone & personality** — young productivity brand; graphic, high-contrast,
  a little playful (doodle paper-plane paths, paperclip illustrations).

## 2. Component usage rules

- **Buttons**: Bold, sentence/title case, 1px outlines. Yellow `primary` =
  main actions with dark text (contrast handled by tokens); white pill on
  black surfaces; `cta` black on white. **Caution:** yellow
  outlined/text/tonal variants are low-contrast on white (flagged in the
  component sheet) — prefer contained yellow or black instead.
- **Header/footer**: floating **black pill header** (fully rounded, charcoal):
  yellow logo tile + white wordmark + white nav + white pill auth button.
  Matching floating black rounded footer card (TOOLS/COMPANY/LEGAL columns).
- **Mega-menus**: dark charcoal panels (`#2e2e2e–#525252`) with colorful file
  icons and yellow "New" tags; yellow active row.
- **Editor toolbar**: white bar, pale-yellow active-tool highlight, yellow
  Done pill.
- **Tool cards**: white rounded, red PDF icon, bold name + gray blurb; hover =
  dark border + yellow "GO →" chip.
- **Template gallery**: preview cards + blue chips + yellow "Use template"
  CTA; sidebar accordion of categories with counts; rainbow category chips.
- **Reviews**: Trustpilot green star bars + bold quote title + author/date.

## 3. Layout principles

- **Desktop**: floating black pill header over white/very-light-gray content;
  generous rounded cards for marketing; compact list UIs for menus, search,
  sidebars.
- **Mobile**: black pill header (logo + hamburger); black footer card stacks;
  template/tool cards full-width.
- **Responsive**: pill chrome keeps its float; grids collapse to single
  column.
- **Spacing logic**: marketing sections py 80–120; cards padding 24–32; menu
  rows 8–12.
- **Page structure**: hero + dropzone → tool cards → reviews → templates →
  black footer.

## 4. Product-specific UI patterns

- **Upload**: white rounded card with dashed border, grayscale paper-stack +
  paperclip illustration, "Drop file here to start", formats caption + yellow
  "Choose File" pill. Drag state = pale-yellow fill + yellow dashed border.
  Slim strip variant exists for in-page placement.
- **Sign-in**: modal with doodle paper-plane path + yellow primary button.
- **Search**: result rows with yellow-highlighted matched terms.
- **Pricing/payment**: yellow contained CTA + black secondary; Trustpilot
  trust row.
- **Dashboard**: white toolbar editor with yellow accents; document lists with
  format icons.
- **Success**: yellow "Done ✓" pill + document card.
- **Error**: `Alert severity="error"`; keep yellow out of error states.
- **Empty**: grayscale paper illustration + yellow CTA.

## 5. AI-assisted coding instructions

When building UI in OnlyDoc mode: wrap in `getBrandTheme('onlydoc')`; yellow
contained buttons get dark text automatically — never force white text on
yellow; avoid yellow outlined/text variants on white (contrast); use the black
pill header/footer pattern for marketing chrome (`background.dark` +
`radius.r9` container, white text via `common.white` / `scales.whiteOpacity`);
blue `secondary` for links/chips; pale-yellow tints for active/selected
states; Lato Bold headings; rainbow category chips from `materialPalette`;
file-format icon colors follow the family convention (Word blue, Excel green,
PPT orange, PDF red).

## 6. Prompt examples

- "Create a file upload tool page (dropzone idle/drag/success states) using
  onlydoc mode."
- "Build a landing page with a black pill header and yellow CTAs using
  onlydoc mode."
- "Create a form-template gallery with category sidebar and rainbow chips
  using onlydoc mode."
- "Build a PDF editor toolbar with yellow active states using onlydoc mode."

## 7. Consistency rules

- The triad is sacred: yellow + black + white; blue only for links/chips,
  green only for Trustpilot.
- Yellow always carries dark `#201c11` text; outlined/text yellow on white is
  forbidden.
- Marketing chrome (header/footer) is black, floating, pill-rounded —
  in-app surfaces stay white and lighter-rounded.
- Active/selected = pale-yellow tint, not blue.
- Illustrations stay grayscale paper + doodles; format icons stay multicolor.
