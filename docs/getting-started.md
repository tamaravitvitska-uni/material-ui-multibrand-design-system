# Getting started

## Prerequisites

- Node.js ≥ 20
- npm ≥ 10 (workspaces are used)

## Install & run

```bash
git clone https://github.com/tamaravitvitska-uni/material-ui-multibrand-design-system.git
cd material-ui-multibrand-design-system
npm install
npm run dev
```

Open http://localhost:5173 — the demo app starts on the **Landing demo** page.
Use the select in the top-right corner to switch between the six brands; every
page restyles instantly.

Demo pages:

| Page | Purpose |
| --- | --- |
| Landing demo | A complete marketing landing built only from theme tokens |
| Components | Stock MUI components under the active brand theme |
| Pricing demo | Plan cards, billing toggle, highlight pattern |
| Tokens | Live token explorer — palette, radii, spacing, type scale of the active brand |

## Install the library in another app

The package is a standard npm workspace package. Until it is published to a
registry, consume it via a git dependency or copy `packages/design-system`.

```bash
npm install @mui/material @emotion/react @emotion/styled
# then add @multibrand/design-system (git URL, file path, or npm once published)
```

Peer dependencies: `@mui/material ^9`, `react ^18 || ^19`.

## Minimal app

```tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { getBrandTheme } from '@multibrand/design-system';

export default function App() {
  return (
    <ThemeProvider theme={getBrandTheme('thebestpdf')}>
      <CssBaseline />
      <Button variant="contained" size="large">Continue</Button>
    </ThemeProvider>
  );
}
```

## Loading brand fonts

Fonts are **not** bundled. Add a Google Fonts link for the brand(s) you render:

```tsx
import { googleFontsUrl } from '@multibrand/design-system';

const href = googleFontsUrl(['thebestpdf']);
// <link rel="stylesheet" href={href} /> in your document head
```

The demo's [index.html](../apps/demo/index.html) loads all six families (only
needed because the demo switches brands at runtime). Lato (OnlyDoc) ships
weights 400/700/900 only — see [ASSUMPTIONS.md](../ASSUMPTIONS.md).

## Where things live

- Raw Figma exports: `packages/design-system/tokens/figma-export/`
- Generated tokens: `packages/design-system/src/tokens/generated/<brand>.ts`
- Theme factory: `packages/design-system/src/theme/createBrandTheme.ts`
- Component geometry measured from Figma component sheets:
  `packages/design-system/src/theme/componentSpecs.ts`
