import { createTheme, type Theme } from '@mui/material/styles';
import './augmentation';
import { brandTokens } from '../tokens/generated';
import type { BrandId, BrandTokens } from '../tokens/types';
import { BRANDS } from '../brands';
import { buildPalette } from './palette';
import { buildTypography } from './typography';
import { buildComponents } from './components';
import { buildShadows } from './shadows';
import { getComponentSpecs } from './componentSpecs';

/**
 * Create a complete MUI theme for one brand from its normalized tokens.
 *
 * Theme inheritance model: every brand theme is produced by this single
 * factory — the shared "base theme" is the mapping logic itself, and each
 * brand only contributes data (its token set). Brand-specific component
 * geometry comes from componentSpecs.ts.
 */
export function createBrandTheme(brandId: BrandId): Theme {
  const tokens: BrandTokens = brandTokens[brandId];
  const brand = BRANDS[brandId];
  const specs = getComponentSpecs(tokens);

  return createTheme({
    brand,
    tokens,
    // theme.spacing(1) === 4px. The Figma scale whitelists the allowed
    // values (tokens.spacing.scale); always pick multiples that land on it.
    spacing: tokens.spacing.unit,
    shape: { borderRadius: tokens.radius.r2 },
    palette: buildPalette(tokens),
    typography: buildTypography(tokens, specs, brand.fontStack),
    shadows: buildShadows(),
    components: buildComponents(tokens, specs, brand),
  });
}

const cache = new Map<BrandId, Theme>();

/** Memoized variant of createBrandTheme — themes are immutable per brand. */
export function getBrandTheme(brandId: BrandId): Theme {
  let theme = cache.get(brandId);
  if (!theme) {
    theme = createBrandTheme(brandId);
    cache.set(brandId, theme);
  }
  return theme;
}
