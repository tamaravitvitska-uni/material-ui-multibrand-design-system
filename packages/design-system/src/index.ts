/**
 * @multibrand/design-system
 *
 * Multi-brand Material UI design system driven by Figma variables.
 * Six brands: ResumeLeader, PDF Guru, TheBestPDF, PDF Leader, OnlyDoc, PDFFly.
 */
import './theme/augmentation';

// Tokens
export { BRAND_IDS } from './tokens/types';
export type {
  BrandId,
  BrandTokens,
  BrandPalette,
  BrandScales,
  BrandTypography,
  RadiusTokens,
  SpacingTokens,
  TypeStyle,
  ResponsiveTypeStyle,
  MainColor,
  StatusColor,
} from './tokens/types';
export {
  brandTokens,
  resumeleader,
  pdfguru,
  thebestpdf,
  pdfleader,
  onlydoc,
  pdffly,
} from './tokens/generated';

// Brand registry
export { BRANDS, BRAND_LIST } from './brands';
export type { BrandMeta } from './brands';

// Themes
export { createBrandTheme, getBrandTheme } from './theme/createBrandTheme';
export { getComponentSpecs } from './theme/componentSpecs';
export type { ComponentSpecs, ButtonSizeSpec } from './theme/componentSpecs';
export { DESKTOP_MEDIA } from './theme/typography';

// Provider + components
export { BrandProvider, useBrand } from './provider/BrandProvider';
export type { BrandProviderProps, BrandContextValue } from './provider/BrandProvider';
export { BrandSwitcher } from './components/BrandSwitcher';
export type { BrandSwitcherProps } from './components/BrandSwitcher';

// Fonts
export { googleFontsUrl } from './fonts';
