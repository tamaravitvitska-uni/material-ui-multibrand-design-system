# TheBestPDF mode (`thebestpdf`)

PDF tools suite. Pragmatic, corporate-utilitarian, trust-oriented — an
efficient conversion machine, the most "enterprise" brand of the family.

Figma sources: [component sheet](https://www.figma.com/design/c9RoPIgZopicvJqRwdopj9/?node-id=28785-33888) ·
[product file](https://www.figma.com/design/mHGmB1eJ1Y0FvdNIg122GM/?node-id=9889-9436)

## 1. Visual identity

- **Colors** — `primary.main #3758f9` royal blue (CTAs, links, selection);
  `secondary.main #13c296` emerald (positive accents); cta black. Deep navy
  (`materialPalette` indigo range / footer `#000e4f–#1a2970`) for footers and
  badges; pale lavender-blue tint `#eaeefb` for hovers/footer base (use
  `scales.primaryOpacity['8']`/`['4']`). **Text is navy `#212e45`, not black.**
  Neutral border `#cbd7e6` (`service.buttonOutlineActionBorder`).
- **Typography** — Inter, neutral and engineered. Quieter headings than
  siblings (buttons 16/14px, SemiBold below large). Nav/footer labels render
  UPPERCASE (the only brand that uppercases wayfinding — buttons stay sentence
  case).
- **Spacing** — universal scale used **compactly**: this is the densest brand.
  Long link lists, tight nav, information-rich footers.
- **Radius** — sharpest scale: 2/4/8/10/12/16/20/24/100. Buttons 4/4/2 —
  near-rectangular. Cards r5 (12), dialogs r6 (16).
- **Shadows** — minimal; prefer hairline borders and flat surfaces.
- **Density** — high. "Utility site" feel, not airy marketing.
- **Tone & personality** — sober, corporate, trustworthy; navy/blue palette,
  legal-heavy footers, photography over illustration.

## 2. Component usage rules

- **Buttons**: large = Bold, medium/small = SemiBold (theme weight 600);
  sentence case; heights 54/42/30; radii 4/4/2; outlined 1px; outlined-cta
  border is light blue-gray `#cbd7e6` (not black). Primary blue for "Continue
  →", "Done", "Log in".
- **Navigation**: slim white header; uppercase nav items with small line
  icons; wide multi-column mega-dropdowns with pale-blue row hover
  (`scales.primaryOpacity['8']`).
- **Pricing cards**: side-by-side white cards; selected = 2px `primary.main`
  border + navy "Most Popular" pill; blue check lists; big `$` price; radio
  circles.
- **FAQ**: icon + bold question + gray answer rows; hairline accordions, blue
  heading when expanded.
- **Inputs**: outlined, radius r3 (8); compact label style.
- **Rating widget**: dark charcoal card with red→teal star states (use
  `background.dark` + status colors).

## 3. Layout principles

- **Desktop**: white slim header (round blue logo + navy wordmark, uppercase
  nav, small solid-blue Log in right). Editor header: filename + icon actions
  + blue Done. Deep-navy mega-footer (4–5 uppercase link columns) over a
  pale-lavender lower band (team/legal/language columns).
- **Mobile**: hamburger + accordion menu sheets; navy accordion footer;
  account sheet (email, My Documents, Log out).
- **Responsive**: content stacks early; keep tables/link lists scrollable.
- **Spacing logic**: tighter than siblings — sections py 64–96; card padding
  16–24; list rows 8–12.
- **Page structure**: hero + upload → tool grid → before/after demo → pricing
  → FAQ → mega-footer.

## 4. Product-specific UI patterns

- **Landing/tool pages**: functional hero; **real photography** for demos
  (before/after image-enhance sliders with circular drag handle).
- **Upload**: large soft blue-gradient rounded panel with cloud icon.
- **Payment/pricing**: Solidgate-based payment buttons (black Apple/G Pay,
  yellow PayPal); legal copy near CTAs; Trustpilot green stars.
- **Dashboard/editor**: file-preview toggles; split interaction = dashed
  cut-lines + scissors buttons + dark tooltip ("Click to split here").
- **Success**: blue Done confirmation + document list row.
- **Error**: standard `Alert severity="error"` (`#f23030`), factual copy.
- **Empty**: plain text + primary CTA — no playful illustration.

## 5. AI-assisted coding instructions

When building UI in TheBestPDF mode: wrap in `getBrandTheme('thebestpdf')`;
keep corners sharp (button radii come from the theme — never round them up);
use royal blue `primary` for every main action, emerald `secondary` only for
positive accents; uppercase section/nav labels via `overline`-style text but
keep buttons sentence case; dense compact layouts (smaller paddings from the
small spacing group); navy text comes from `text.primary` automatically;
footers/badges use navy from `tokens.materialPalette.indigo` range; prefer
borders over shadows; photography over illustration.

## 6. Prompt examples

- "Create a landing page with a before/after image-enhance demo using
  thebestpdf mode."
- "Build a two-plan pricing section with a Most Popular navy pill using
  thebestpdf mode."
- "Create a mega-footer (4 uppercase link columns + legal band) using
  thebestpdf mode."
- "Build a dense PDF tools mega-menu dropdown using thebestpdf mode."

## 7. Consistency rules

- Never enlarge radii or buttons — sharp + compact is the identity.
- Blue is the only CTA color; green never carries primary actions.
- Body/headings use navy `text.primary`; don't substitute pure black.
- Keep density high: more content per viewport than other brands.
- Trust elements (Trustpilot, legal copy, money-back) belong near every
  payment CTA.
- No character illustrations; line icons + photos only.
