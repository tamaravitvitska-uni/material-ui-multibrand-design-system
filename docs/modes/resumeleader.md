# ResumeLeader mode (`resumeleader`)

Resume builder. Cool blue-violet, softly rounded, medium-weight — modern,
calm, professional "career tech". Closer to a SaaS product feel than the
conversion-funnel PDF brands.

Figma sources: [component sheet](https://www.figma.com/design/c9RoPIgZopicvJqRwdopj9/?node-id=28785-33880) ·
[product file](https://www.figma.com/design/Vwz50pOgwwbqmy8niwjiQ8/?node-id=5-3516)

> **Source note.** The linked product file currently contains only a cover
> page (black cover, slate `#202530` panel, blue app-icon logo with white
> "R"). Sections 3–4 below therefore derive from the brand's tokens, its
> component sheet, the cover's identity cues, and the shared conventions of
> the product family — update them when real product screens land in Figma.

## 1. Visual identity

- **Colors** — `primary.main #1f5de2` royal blue; `secondary.main #651fff`
  vivid violet (the most colorful secondary in the family); cta black; error
  `#f44336`. White surfaces, `lightGrey #f5f5f7` / `blueGrey` section tints;
  dark identity surfaces: black + slate `#202530` (cover) — use
  `background.dark`/`darkBlueGrey` for dark sections.
- **Typography** — Outfit (geometric, friendly). Medium-weight buttons (500);
  headings per token scale (Leading 96 Black desktop / 32 mobile). Reads
  modern and calm rather than shouty.
- **Spacing** — universal scale, medium density.
- **Radius** — the "default rounded" scale 4/8/10/12/16/20/24/28/100. Buttons
  16/12/8, cards r5 (16), dialogs r6 (20).
- **Shadows** — soft drop shadows on elevated elements; rainbow-glow treatment
  exists for ultra-upsell CTAs (decorative, use sparingly).
- **Density** — medium; comfortable product UI.
- **Tone & personality** — serious, professional, confident; blue-led with
  violet used as the energetic counterpoint.

## 2. Component usage rules

- **Buttons**: Medium (500) weight, sentence case, 1px outlines, radii 16/12/8
  (L/M/S), heights 56/48/32. Blue `primary` for main actions; violet
  `secondary` for premium/secondary emphasis; `cta` black for high-contrast
  moments; `tonal` for soft fills (16% tints).
- **Forms** (core of a resume builder): outlined inputs radius r4 (12);
  labelled sections; generous field spacing (16–24).
- **Cards**: r5 surfaces for template previews and editor panels; outlined by
  default, soft shadow on hover.
- **Chips**: pill skill tags (`radius.r9`), tonal fills.
- **Steppers/progress**: linear progress + step labels for builder flow.

## 3. Layout principles

- **Desktop**: marketing = centered hero, feature cards, template gallery
  grid (3–4 columns). Builder app = two-pane: form editor left, live resume
  preview right (sticky). Dashboard = sidebar + card grid.
- **Mobile**: single column; preview collapses behind a toggle/tab; sticky
  bottom CTA for builder progression.
- **Responsive**: template grids 4→2→1; two-pane builder stacks with
  preview-on-demand.
- **Spacing logic**: marketing sections py 96–120; app panels padding 24–32;
  form groups gap 16–24.
- **Page structure**: landing = hero → template gallery → features → steps →
  testimonials → pricing teaser → FAQ.

## 4. Product-specific UI patterns

- **Landing**: hero with headline + "Build my resume" primary CTA + template
  mosaic; trust strip (hired-at logos), ATS-friendly messaging.
- **Template gallery**: preview cards with hover overlay ("Use this
  template"), category filter chips.
- **Builder flow**: stepper (Contact → Experience → Education → Skills →
  Summary); form left / preview right; autosave caption; violet accents for
  premium templates.
- **Pricing/paywall**: plan cards with highlighted recommended plan (2px blue
  border + chip); money-back caption; black `cta` for the upsell moment
  (rainbow-glow treatment exists for ultra-upsell).
- **Dashboard**: "My resumes" card grid with format/date meta + create-new
  tile (dashed border).
- **Upload/import**: dashed dropzone for importing an existing resume
  (PDF/DOCX), parsing progress, mapped-fields success state.
- **Success**: green check + download/share options (PDF, DOCX, link).
- **Error**: factual `Alert severity="error"` + retry; keep tone supportive.
- **Empty**: friendly prompt + primary CTA ("Create your first resume").

## 5. AI-assisted coding instructions

When building UI in ResumeLeader mode: wrap in `getBrandTheme('resumeleader')`;
Outfit medium-weight buttons (never bold them), sentence case, 1px outlines;
blue `primary` leads, violet `secondary` marks premium/secondary emphasis;
default rounded radii from tokens (buttons 16/12/8, cards r5); builder screens
use the two-pane form+preview pattern with a stepper; template galleries are
card grids with hover overlays; keep the tone calm and professional — no
shouty type, no dense funnels.

## 6. Prompt examples

- "Create a resume builder flow (stepper + form + live preview) using
  resumeleader mode."
- "Build a resume template gallery with filter chips using resumeleader mode."
- "Create a landing page with template mosaic hero using resumeleader mode."
- "Build a 'My resumes' dashboard grid with a create-new tile using
  resumeleader mode."

## 7. Consistency rules

- Blue primary / violet secondary roles never swap; violet signals premium.
- Medium button weight is the identity — bold buttons read as PDF Guru.
- Keep the builder two-pane pattern; preview is always one glance away.
- Professional tone: real-content previews, no playful illustration sets.
- Dark sections use black/slate from tokens, with white text via
  `scales.whiteOpacity`.
- When the product Figma file gains real screens, re-verify sections 3–4
  against them.
