# PDF Leader mode (`pdfleader`)

PDF tools suite. Light, clean, reassuring, checkout-first — soft gradients and
pill shapes make it the gentlest, most consumer brand, with the biggest touch
targets in the family.

Figma sources: [component sheet](https://www.figma.com/design/c9RoPIgZopicvJqRwdopj9/?node-id=28785-33892) ·
[product file](https://www.figma.com/design/5ETpNeUNy0Ja7SXlKfxUGh/?node-id=4344-35917)

## 1. Visual identity

- **Colors** — `primary.main #4988fc` soft bright blue; `secondary.main
  #393939` charcoal (renders as dark-gray buttons); cta black. **Text primary
  is charcoal `#393939`, divider is solid `#dfe4ea`** (not alpha-black).
  Selected/tint states are pale blue (`scales.primaryOpacity['8']` ≈
  `#f1f6ff` feel). Checkout accents: PayPal yellow `#ffc43a`, orange Premium
  badge (`materialPalette.orange`), green success checks. Soft peach/blue
  gradient halos behind hero objects.
- **Typography** — Montserrat **Bold**, display-like and loud. Buttons up to
  24px text. Headings geometric and chunky; body stays modest — funnels are
  not display-heavy.
- **Spacing** — universal scale used **airily**: one decision per screen, lots
  of whitespace.
- **Radius** — the pill brand. Scale 6/12/20/32/40/60/80/100/120. Buttons
  24/16/16 (sheet-measured); payment chips and CTAs render as full pills;
  cards r3 (20).
- **Shadows** — minimal; softness comes from radius and tints, not elevation.
- **Density** — lowest of all brands; hero buttons are ~72px tall.
- **Tone & personality** — big, friendly-but-shouty landing-page style;
  calm pastel backdrops with confident chunky type.

## 2. Component usage rules

- **Buttons**: Bold 700, sentence/title case, **2px** outlined stroke. Sizes:
  large 72px tall (24px text, paddingX 32), medium 52, small 30. Use `size=
  "large"` for hero/checkout CTAs only; medium elsewhere.
- **Payment method chips**: white pills with pale-blue selected state
  (`scales.primaryOpacity['8']` fill + `primary.main` border) — PayPal / G Pay
  / Apple Pay / Card / Mercado Pago. Big provider CTAs keep provider colors
  (PayPal yellow pill, black G Pay/Apple pills).
- **Plan cards**: selected = 2px `primary.main` border + blue title; title +
  one-line subtitle ("7-Day Access $0.95 / For one-time needs").
- **Checkout steps live in the header**: numbered 1 Choose a plan → 2 Add
  payment details → 3 Download, inline next to the logo.
- **Inputs**: rounded (r2 = 12), white; dense legal checkbox text below card
  forms.
- **File-type icons**: per-format color coding — Word blue, Excel green, PPT
  orange, image/audio purple (use `materialPalette`).

## 3. Layout principles

- **Desktop**: white **rounded header bar** floating over soft pastel gradient
  glows; logo left, "Tools ▾ Forms ▾ Contact Us" nav; right side is
  state-dependent (Log In link / checkout steps / orange Premium pill +
  avatar). Content: centered single-column funnel, max ~720px.
- **Mobile**: glyph + hamburger header, premium chip variants; narrow stacked
  payment forms.
- **Responsive**: single column survives everywhere; pills wrap gracefully.
- **Spacing logic**: generous — sections py 96–140; gaps 24–40; card padding
  32.
- **Page structure**: funnel-first — plan select → payment → download, each a
  focused centered screen.

## 4. Product-specific UI patterns

- **Landing/tool pages**: hero object with gradient-blob glow; realistic white
  document/invoice preview thumbnails (no character illustration, no photos).
- **Upload/processing**: document thumbnail + progress; "Your document is
  ready!" green-check banner above the preview (audio variant uses the purple
  gradient icon).
- **Payment/pricing**: payment-chip row + provider pill CTAs; two-column
  green-check feature lists (Perfect Formatting, Smart OCR, Full Editing
  Suite, Secure Cloud Storage…); LatAm/EU rails (Mercado Pago, Pix, MB Way)
  appear as additional chips.
- **Dashboard**: logged-in header with orange Premium pill + avatar; document
  list with per-format icons.
- **Success**: green check + document thumbnail + blue pill "Continue to send →".
- **Error**: soft — `Alert severity="error"` in a rounded card, reassuring copy.
- **Empty**: document outline illustration + single blue pill CTA.

## 5. AI-assisted coding instructions

When building UI in PDF Leader mode: wrap in `getBrandTheme('pdfleader')`;
everything rounds — buttons/chips render as pills from the theme, custom
surfaces use `tokens.radius.r3+`; Montserrat Bold headings; one decision per
screen with generous spacing (large group values); blue `primary` for actions,
charcoal `secondary` for neutral-dark buttons; pale-blue selected states from
`scales.primaryOpacity`; checkout steps belong in the header; keep dividers
solid `#dfe4ea` via `divider`; no character illustrations — realistic document
thumbnails and gradient glows only.

## 6. Prompt examples

- "Create a plan-selection screen (2 plans, blue selected border, feature
  checklist) using pdfleader mode."
- "Build a payment-method screen with pill chips (PayPal, G Pay, Card,
  Mercado Pago) using pdfleader mode."
- "Create a 'document ready' success screen with preview and send-by-email
  form using pdfleader mode."
- "Build a landing hero with gradient halo and a 72px pill CTA using
  pdfleader mode."

## 7. Consistency rules

- Pills everywhere; a sharp corner is off-brand. Don't shrink hero CTAs below
  the large size on marketing/checkout screens.
- 2px outlines; charcoal (not pure black) for text and neutral buttons.
- Keep funnels single-column and airy; never pack multiple decisions on one
  screen.
- Provider payment buttons keep their official colors; everything else is
  blue/charcoal.
- Soft pastel gradient backdrops only on marketing/funnel heroes — app screens
  stay white.
