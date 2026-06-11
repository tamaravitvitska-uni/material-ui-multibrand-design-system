# PDF → Word tool page (PDFGuru mode)

A complete, production-shaped "Convert PDF to Word" page built **only** from
the design system — an end-to-end validation that the PDFGuru mode can drive
real AI-assisted product development.

- **Live:** <https://tamaravitvitska-uni.github.io/material-ui-multibrand-design-system/pdf-to-word>
- **Route:** `/pdf-to-word` in the demo app (standalone — own marketing
  chrome, outside the demo `AppLayout`)
- **Source:** `apps/demo/src/pages/pdf-to-word/`
- **Functional reference:** updf.com `pdf-to-word` (flow only — no visual
  copying)
- **Visual reference:** PDFGuru product file, node `50648-16354`
  (tool-page hero + upload pattern) + `docs/modes/pdfguru.md`

## Run it

```bash
npm install
npm run dev          # → http://localhost:5173/pdf-to-word
```

A floating **"Demo states"** inspector (bottom right) jumps the upload widget
into any flow state and can freeze transient states for review/screenshots.
The simulated backend is also reachable with real files via filename
triggers: `password.pdf` (locked, demo password `guru`), `corrupt.pdf`,
`fail.pdf` (server error), `huge.pdf` (too large), `slow.pdf`, or any
non-PDF file. Limits: PDF only, 10 MB.

## Flow model — persistent dropzone + file queue

Per the PDFGuru A/B layout (Figma node `49025-3914`), the dropzone stays
visible after files are added: queued files list below it (up to 5), each
row carrying its own status — analyzing → green "Your document is ready to
process", inline password unlock, or an inline error caption (unsupported /
too large / corrupted). A summary line ("N files analyzed successfully") and
the violet **Convert to Word** CTA sit under the list; locked or
still-analyzing rows block conversion, error rows don't (they simply don't
convert). Batch phases (upload progress with cancel → staged conversion →
transient mint success → download-ready with per-file Download + Download
all → retryable server error) swap the card content. The "empty" state is
the post-removal dropzone. All 14 required states are reachable via the
inspector or filename triggers.

State logic lives in a pure reducer (`upload/conversionMachine.ts` — row
statuses + batch phase) driven by timers in `upload/useConversionFlow.ts`;
`upload/UploadWidget.tsx` composes the gather screen and batch panels.
Downloads serve a real minimal `.docx` (`public/demo/pdf-guru-sample.docx`)
renamed per source file.

## Design system components used

All UI is stock MUI restyled by the brand theme — no custom-styled clones:

| Area | Components |
| --- | --- |
| Chrome | `AppBar` `Toolbar` `Container` `Drawer` `List` `ListItemButton` `Menu` `MenuItem` `Link` `Divider` |
| Actions | `Button` (`contained/outlined/text` × `primary/secondary/cta`), `IconButton`, `Chip` |
| Upload flow | `LinearProgress` `CircularProgress` `Alert`+`AlertTitle` `TextField` (password) `Tooltip` `Fade` `Grow` |
| Sections | `Card`+`CardContent` (outlined benefits), `Accordion` trio (FAQ), `Stack`/`Box` grids |
| Demo tooling | `Paper` `Switch` `FormControlLabel` `Collapse` `Chip` |
| Typography | `leading`-family scale: `h1`–`h6`, `subtitle1`, `body1/2`, `caption`, `captionXs` |

Theme-wired behaviors exercised: `tonal`-style tints via opacity scales,
black `cta` color (header Log in, text buttons), PDFGuru button geometry
(56/48/32, radii 12/8/8, weight 700, 2 px outlined), menu radius 16 with
radius-10 items + soft layered shadow, alert radius 12, outlined-input
radius 10, white `AppBar` with divider border.

## PDFGuru tokens applied (all via `theme.tokens.*` / theme paths)

- **Palette roles:** `primary` violet for every funnel action (Choose file,
  Convert, Unlock, Try again, loaders, dropzone active tint, step circles);
  `secondary` crimson for the wordmark and the **Download** action (mode doc:
  funnel = violet, editor/download = crimson); `cta` black for Log in and
  tertiary text buttons; `error` / `success` for alerts and the mint pill.
- **Background tints:** `background.blueGrey` (benefits section, file rows),
  `background.lightGrey` (how-it-works), `background.dark` (footer),
  `background.darkBlueGrey` (neutral FILE badge).
- **Opacity scales:** `primaryOpacity[4/8]` (dropzone hover/active, icon
  tiles), `successOpacity[16]` (mint pill), `actionOpacity[8]` (progress
  track), `whiteOpacity[12/75]` (footer divider/muted text).
- **basePalette accents** (via the `tokenAccents.ts` typed accessor): the
  multicolor dashed dropzone border gradient; per-format colors — PDF red,
  DOC/Word blue, XLS green, PPT orange — for file badges, tool-menu dots and
  illustration props.
- **Radius:** `r1` dots, `r3` (10) badges/inputs/icon tiles, `r4` (12) file
  rows, `r5` (16) dropzone frame, `r6` (20) drag-overlay frame, `r7` (24)
  upload card, `r9` pill (progress bars, mint pill, step circles).
- **Spacing:** every `sx` value lands on the Figma scale (×4 px); section
  rhythm `py` 64–96 px desktop, card padding 16–24, control gaps 8–16.
- **Typography tokens:** Title 1 (50/Black) hero H1, Title 2 section H2s,
  heavy H5/H6 card titles, `subtitle1` hero body, `caption`/`captionXs` fine
  print; prices/uppercase never used — sentence-case buttons throughout.
- **Shadows:** theme elevation 6 (upload card), 8 (menus/inspector) — the
  brand's layered soft style.

## Patterns taken from existing PDFGuru designs

From Figma node `50648-16354` and `docs/modes/pdfguru.md`:

1. **Header:** wordmark (crimson first word, black rest, lowercase, weight
   900) + slim "Tools ▾ / Contact us" nav + outlined black Log in; mobile =
   logo + hamburger drawer.
2. **Hero:** centered heavy H1 + short body, content column ~1100 px.
3. **Upload card:** white rounded sheet with the **multicolor dashed
   dropzone border** (implemented as an SVG gradient stroke fed by
   `basePalette` tokens), violet bold drop-label, violet formats caption,
   violet contained Choose file. The dropzone illustration is the official
   PDF→W artwork from Figma "Graphical Design Forma" node `3663-4724`
   (exported SVG, background stripped, viewBox tightened —
   `public/demo/pdf-to-word-illustration.svg`).
3a. **Files-added layout** (node `49025-3914`): compact dropzone strip stays
   on top ("Drop more files here"), file rows with green status captions
   below, "N files analyzed successfully" + Convert row at the bottom.
4. **Drag & drop:** violet tint + violet dashes on the dropzone; full-screen
   gray overlay with white dashed frame + illustration (mode doc §4).
5. **Trust trio:** dashed-square icon tiles ("Privacy-focused / Easy to use /
   Lightning-fast") under the upload card.
6. **File rows:** red PDF / blue DOC square badges; mint "Your document is
   ready!" pill on success; supportive error alerts with retry CTA.
7. **Steps:** r9 violet number circles on `lightGrey`; FAQ accordions; dark
   footer with `whiteOpacity` muted links.
8. **Illustrations:** flat ink line-art with red/yellow/blue props
   (`InkIllustration.tsx`) — no 3D, no photos.

## Assumptions made (and why)

1. **Multi-file queue, up to 5 files** (matching the functional reference
   and Figma node 49025-3914): per-file validation/password/error states
   live on the rows; upload/conversion run as one batch.
2. **PDF-only, 10 MB limit** — functional parity with the reference,
   framed as the free plan.
3. **Simulated backend** (timers + filename triggers) — the task validates
   UI generation, not conversion infra. The download is a real, valid
   minimal `.docx` so the flow completes honestly.
4. **"Empty" ≠ "default":** empty is the post-removal state (mode doc has a
   distinct Empty pattern: illustration + one-line prompt + violet CTA).
5. **"Loading" = the analyzing step** after file pick (spinner + file row);
   there is no separate page-skeleton since the page is static.
6. **Success vs download-ready:** success is a ~1.4 s celebratory moment
   that auto-advances to the persistent download-ready screen.
7. **Multicolor dashed border:** the Figma node shows a rainbow dashed
   dropzone border; reproduced with token-fed SVG gradient dashes (CSS can't
   combine `dashed` with gradients). Drag-active switches to solid-violet
   dashes per the mode doc.
8. **Pinned to `pdfguru`** via `getBrandTheme('pdfguru')` at the route — the
   task is explicitly single-brand. The page code itself stays
   brand-agnostic (tokens only), so it restyles under any brand id.
9. **Literal dimensions** appear only as artwork geometry (SVG
   illustration), fixed emblem sizes (44 px badges, 56 px step circles —
   same precedent as the demo LandingPage) and the ~1100 px content width
   documented in the mode doc. No literal colors, radii or font sizes
   anywhere (`grep` enforced).
10. **Demo password is `guru`** and is hinted in the UI — discoverability
    over realism, since this is a validation build.
11. **Trust stats are demo copy** (reviews/files-converted counts).

## Validation status

- `npm run typecheck` — design-system ✓, demo ✓
- `npm run build -w demo` (tsc + vite) ✓
- No color/radius/size literals in the new code ✓
- All 14 states exercised in-browser (real click-through of the full funnel,
  wrong/right password, retry, cancel) at 1440 px and 375 px ✓
- Console clean (no errors/warnings) ✓

## File map

```
apps/demo/src/pages/pdf-to-word/
├── PdfToWordPage.tsx            # route component: theme pin + section composition
├── demoData.ts                  # copy, limits, triggers, menus, FAQ, footer data
├── tokenAccents.ts              # typed accessor for basePalette accents
├── components/
│   ├── BrandWordmark.tsx        # crimson+black lowercase wordmark
│   ├── DashedFrame.tsx          # SVG dashed border (gradient or single color)
│   ├── InkIllustration.tsx      # PDF→DOC ink line-art
│   ├── SiteHeader.tsx           # AppBar + Tools menu + mobile drawer
│   ├── SiteFooter.tsx           # dark footer
│   ├── TrustBar.tsx             # dashed-tile trio + stats
│   ├── BenefitsSection.tsx      # outlined feature cards on blueGrey
│   ├── HowItWorksSection.tsx    # r9 step circles on lightGrey
│   ├── FaqSection.tsx           # accordions
│   └── StateInspector.tsx       # demo-only state jumper (freeze toggle)
└── upload/
    ├── conversionMachine.ts     # pure reducer: row statuses + batch phases
    ├── useConversionFlow.ts     # timer-driven simulation hook
    ├── UploadWidget.tsx         # gather screen + batch panels, input, drag & drop
    └── panels/
        ├── DropzonePanel.tsx    # default/empty/compact + drag-active surface
        ├── DragOverlay.tsx      # full-screen drop overlay
        ├── FileCard.tsx         # file row + format badges (batch panels)
        ├── FilesList.tsx        # queued rows: status captions + inline unlock
        ├── ProgressPanel.tsx    # batch uploading/converting
        ├── ResultPanel.tsx      # success + download-ready (per-file downloads)
        └── ErrorPanel.tsx       # batch server error

apps/demo/public/demo/pdf-guru-sample.docx          # valid demo conversion output
apps/demo/public/demo/pdf-to-word-illustration.svg  # hero illustration (Figma 3663-4724)
```
