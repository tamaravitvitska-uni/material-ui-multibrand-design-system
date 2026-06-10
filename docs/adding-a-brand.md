# Adding a new brand

A brand = a new **mode** in the Figma variable collections + ~30 lines of
registry code. No theme code changes.

## 1. Figma

Add the new mode to the four per-brand collections (Corner radiuses, Base
changeable variables, Additional colors, Material Palette) and fill in its
values. Export all five collections as JSON into
`packages/design-system/tokens/figma-export/` (overwrite the files).

## 2. Register the brand id

`scripts/build-tokens.mjs`:

```js
const BRAND_IDS = {
  // ...existing
  NewBrand: 'newbrand',   // Figma mode name → stable id
};
```

`src/tokens/types.ts`:

```ts
export const BRAND_IDS = [/* ...existing */, 'newbrand'] as const;
```

## 3. Generate tokens

```bash
npm run build:tokens
```

This creates `src/tokens/generated/newbrand.ts` and adds it to the registry
index. The script fails loudly if the new mode is missing any expected
variable.

## 4. Brand metadata

`src/brands.ts` — add label, product description, font fallback stack and the
Figma source links:

```ts
newbrand: {
  id: 'newbrand',
  label: 'New Brand',
  product: 'What it is',
  fontStack: '"Some Font", Arial, sans-serif',
  figma: { componentSheet: '…', productFile: '…' },
},
```

If the font is a Google Fonts static family with limited weights, register the
available weights in `src/fonts.ts` (`STATIC_FAMILY_WEIGHTS`).

## 5. Component geometry

`src/theme/componentSpecs.ts` — add the brand's entry by measuring its
component sheet in the Core Figma file (button heights/paddings/radii per
size, font weight, outlined border width, card/dialog/menu radii). Start by
copying the closest existing brand (the "default rounded" trio resumeleader /
onlydoc / pdffly is the usual baseline) and adjust.

## 6. Document it

- Add `docs/modes/newbrand.md` following the existing template (visual
  identity → component rules → layout → patterns → AI instructions → prompts →
  consistency rules).
- Add the brand to the table in `README.md` and the cheat sheet in `CLAUDE.md`.

## 7. Verify

```bash
npm run typecheck && npm run dev
```

The new brand appears in the demo switcher automatically (it iterates
`BRAND_LIST`). Check the Tokens page first — it renders every token group and
makes wrong values obvious.
