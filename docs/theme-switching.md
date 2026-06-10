# Theme switching

## The mechanism

`BrandProvider` owns the active brand id, persists it, and feeds the memoized
brand theme into MUI's `ThemeProvider`. Switching brands is a single state
update — every MUI component below re-renders with the new theme.

```tsx
import { BrandProvider, BrandSwitcher, useBrand } from '@multibrand/design-system';

<BrandProvider initialBrand="pdffly" storageKey="mbds-brand">
  <App />
</BrandProvider>
```

| Prop | Default | Purpose |
| --- | --- | --- |
| `initialBrand` | `'resumeleader'` | Brand on first load (stored selection wins) |
| `storageKey` | `'mbds-brand'` | localStorage persistence; pass `null` to disable |
| `disableCssBaseline` | `false` | Skip the built-in `CssBaseline` |

## Reading / setting the brand

```tsx
function Toolbar() {
  const { brand, meta, tokens, setBrand } = useBrand();
  return (
    <>
      <span>{meta.label}</span>
      <button onClick={() => setBrand('onlydoc')}>Try OnlyDoc</button>
      {/* or drop in the ready-made select: */}
      <BrandSwitcher />
    </>
  );
}
```

## Single-brand production apps

Most real deployments are one brand per app. Skip the provider:

```tsx
<ThemeProvider theme={getBrandTheme('thebestpdf')}>
  <CssBaseline />
  <App />
</ThemeProvider>
```

`getBrandTheme` memoizes per brand; `createBrandTheme` builds a fresh theme if
you need to extend one:

```tsx
const theme = createTheme(createBrandTheme('pdfguru'), {
  components: { MuiButton: { defaultProps: { disableRipple: true } } },
});
```

## Fonts when switching at runtime

A switching app must load every brand's font up front (see the demo's
`index.html`), otherwise the first switch flashes fallback type. Single-brand
apps load only their own family via `googleFontsUrl(['<brand>'])`.

## SSR notes

- `BrandProvider` reads localStorage lazily and guards `typeof window` — safe
  to render on the server (server output uses `initialBrand`).
- To avoid a hydration flash when the stored brand differs from
  `initialBrand`, either disable persistence (`storageKey={null}`) and derive
  the brand from the request (domain → brand), or accept the one-frame swap.
  Per-domain brand resolution is the recommended production pattern:

```tsx
const brand = BRAND_BY_HOST[location.hostname] ?? 'pdfguru';
<ThemeProvider theme={getBrandTheme(brand)} />
```
