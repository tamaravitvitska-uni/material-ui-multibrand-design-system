# PDFFly mode (`pdffly`)

PDF tools suite. Sleek, high-contrast, "fast utility" energy — dark hero
bands with electric teal CTAs; the most aggressive landing-page DNA in the
family, softened by paper illustrations and ⚡ accents.

Figma sources: [component sheet](https://www.figma.com/design/c9RoPIgZopicvJqRwdopj9/?node-id=30457-70857) ·
[product file](https://www.figma.com/design/1pUTWZ97SWOvM2ZOsGRWra/?node-id=119-8607)

## 1. Visual identity

- **Colors** — the only green-led brand: `primary.main #038f7b` deep teal
  (product file shows the lighter `#21a18b–#2fa392` range in gradients/hover —
  stick to tokens: main/light/dark). `secondary.main #eb7425` warm orange as
  the complementary accent. **Near-black hero/footer bands**
  (`background.dark #323232`, product uses `#1c1c1c–#000` — use
  `background.dark` and `common.black`). White content sections. Support:
  lavender `#d9d1ff` blog-card covers and purple scan effects
  (`materialPalette.deepPurple/purple`), per-format icon colors.
- **Typography** — Zalando Sans, crisp contemporary grotesque, weight 500
  buttons (lighter than the bold brands). Heavy white hero headlines on dark.
- **Spacing** — universal scale; medium density with strong **block rhythm**:
  dark band / white band alternation.
- **Radius** — 4/8/10/12/16/20/24/32/100. Buttons 16/12/8 (sheet); product
  CTAs render pill-shaped — use `radius.r9` for marketing CTAs, sheet radii
  in-app. Cards r5.
- **Shadows** — soft; dark bands carry the contrast. Hover = teal-glow border
  on tool rows.
- **Density** — tool pages tight and conversion-focused (hero + upload above
  the fold).
- **Tone & personality** — modern, slightly techy, dev-tool vibe; playfulness
  lives in semi-3D paper illustrations and ⚡ button icons.

## 2. Component usage rules

- **Buttons**: weight 500, sentence/title case, 1px outlines. Teal contained
  primary with white label ("Convert PDF ⚡", "Choose File ↥", "Download");
  outlined gray "Log in"; black square-ish icon-buttons for FAQ chevrons; teal
  "NEW" mini-pills on tool lists.
- **Header**: white slim bar — logo (teal bird/plane mark, "pdf" black +
  "fly" teal), nav "All Tools ▾ [grid] / PDF Viewer / Convert PDF ▾", right:
  globe language (flag dropdown), Contact Us, outlined Log in (or "My Files"
  logged in). Active nav = pale-teal pill highlight
  (`scales.primaryOpacity['8']`).
- **Footer**: black with faint checkered pixel-grid texture; uppercase
  TOOLS/COMPANY/LEGAL columns; social icons row.
- **FAQ**: soft gray rounded rows, black square chevron buttons; expanded row
  turns pale mint (`scales.primaryOpacity['8']`).
- **Blog cards**: white, lavender cover, teal uppercase "HOW TO" tag, date +
  view-count meta.
- **Format pickers**: radio lists with colored format badges.

## 3. Layout principles

- **Desktop**: every tool page uses the same two-column hero — full-width
  **dark charcoal band** with left-aligned white H1 + short body, white
  rounded **upload card on the right**. White content sections below; black
  footer.
- **Mobile**: stacked hero (headline above upload card); hamburger menu with
  accordion tool sections; black footer stacks centered.
- **Responsive**: dark band persists at all sizes; upload card goes
  full-width.
- **Spacing logic**: hero band py 64–96; sections py 80–112; cards padding
  24–32.
- **Page structure**: dark hero+upload → how-it-works → features → FAQ → blog
  cards → black footer.

## 4. Product-specific UI patterns

- **Upload**: dashed-border white card, semi-3D paper illustration, "Drop your
  file here to start", formats + size caption, teal pill CTA. Compact variant:
  black "PDF to Word" widget card with inner dashed zone.
- **Processing**: dialog with paper illustration + teal progress bar +
  teal-outlined "Productivity Tip" card.
- **Email gate**: envelope illustration + teal Download button.
- **Tool catalog**: rows with hover teal-glow border; teal NEW pills.
- **AI enhancer demos**: vivid orange photo cards (the only photo usage);
  purple gradient scan effects for OCR.
- **Pricing/payment**: teal contained CTA; trust/legal near payment.
- **Success**: teal check + download CTA on white card.
- **Error**: red X paper illustration + `Alert severity="error"` + retry.
- **Empty**: paper illustration + teal CTA.

## 5. AI-assisted coding instructions

When building UI in PDFFly mode: wrap in `getBrandTheme('pdffly')`; tool pages
start with the dark hero band (`bgcolor: tokens.palette.background.dark`,
white `leading`/`h1`, body in `scales.whiteOpacity['75']`) with a white upload
card beside it; teal `primary` for every action (⚡ icon welcome on power
CTAs), orange `secondary` for highlights only; alternate dark/white section
bands; pale-teal tints for active/hover states; uppercase footer/nav labels
with `overline` styling; lavender/purple accents only for blog/OCR contexts;
weight stays medium — don't bold everything.

## 6. Prompt examples

- "Create a 'PDF to Word' tool landing page (dark hero + upload card) using
  pdffly mode."
- "Build a processing dialog with progress bar and productivity tip using
  pdffly mode."
- "Create a tools catalog page with hover-glow rows and NEW badges using
  pdffly mode."
- "Build a blog index with lavender-cover cards using pdffly mode."

## 7. Consistency rules

- The dark hero band is the signature — every tool page starts with it.
- Teal owns actions; orange never carries a CTA, it accents.
- Keep the dark/white band rhythm; never stack two dark bands.
- Paper illustrations (semi-3D, with paperclips/checks) — photos only in AI
  image contexts.
- Button weight 500; reserve heavier weights for headlines.
- Black footer with checkered texture and uppercase columns closes every page.
