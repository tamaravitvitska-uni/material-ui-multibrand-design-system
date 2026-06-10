/**
 * MUI module augmentation for the multi-brand design system.
 *
 * Adds:
 *  - `theme.tokens`  — the full normalized BrandTokens object
 *  - `theme.brand`   — brand metadata (id, label, figma links)
 *  - `palette.cta`   — the black high-emphasis CTA color (Figma "action")
 *  - `tonal` button variant — 16% tint fill + colored label (Figma "tonal")
 *  - `leading` / `captionXs` typography variants
 */
import type { CSSProperties } from 'react';
import type { BrandTokens } from '../tokens/types';
import type { BrandMeta } from '../brands';

declare module '@mui/material/styles' {
  interface Theme {
    tokens: BrandTokens;
    brand: BrandMeta;
  }
  interface ThemeOptions {
    tokens?: BrandTokens;
    brand?: BrandMeta;
  }
  interface Palette {
    cta: Palette['primary'];
  }
  interface PaletteOptions {
    cta?: PaletteOptions['primary'];
  }
  interface TypographyVariants {
    leading: CSSProperties;
    captionXs: CSSProperties;
  }
  interface TypographyVariantsOptions {
    leading?: CSSProperties;
    captionXs?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    leading: true;
    captionXs: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    cta: true;
  }
  interface ButtonPropsVariantOverrides {
    tonal: true;
  }
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsColorOverrides {
    cta: true;
  }
  interface ButtonGroupPropsVariantOverrides {
    tonal: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    cta: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    cta: true;
  }
}

export {};
