/**
 * Normalized design-token model.
 *
 * These types mirror the Figma variable collections after normalization by
 * scripts/build-tokens.mjs. Every brand (Figma mode) resolves to one complete
 * BrandTokens object — the single source of truth for its MUI theme.
 */

export const BRAND_IDS = [
  'resumeleader',
  'pdfguru',
  'thebestpdf',
  'pdfleader',
  'onlydoc',
  'pdffly',
] as const;

export type BrandId = (typeof BRAND_IDS)[number];

/** A color group following MUI's main/light/dark/contrastText convention. */
export interface MainColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
  /** Solid hover color (Figma: state/<color>-hover). */
  hover: string;
  /** 50% tint of main (Figma: state/<color>-50%). */
  main50: string;
}

/** Status colors (error/warning/info/success) carry opacity-based states. */
export interface StatusColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
  /** Translucent hover overlay (Figma: state/hoverOpacity). */
  hoverOpacity: string;
  /** Translucent selected overlay (Figma: state/selectedOpacity). */
  selectedOpacity: string;
  /** 50% alpha of main (Figma: state/main-50%). */
  main50: string;
}

export interface BrandPalette {
  primary: MainColor;
  secondary: MainColor;
  /**
   * High-emphasis CTA color (black in all current brands).
   * Figma group: "main color variables/action". Named `cta` here to avoid
   * clashing with MUI's palette.action state colors.
   */
  cta: MainColor;
  error: StatusColor;
  warning: StatusColor;
  info: StatusColor;
  success: StatusColor;
  text: { primary: string; secondary: string; disabled: string };
  background: {
    default: string;
    paper: string;
    lightGrey: string;
    blueGrey: string;
    darkBlueGrey: string;
    dark: string;
  };
  common: { black: string; white: string };
  /** Interaction state colors (Figma: "action colors"). Maps to MUI palette.action. */
  action: {
    active: string;
    hover: string;
    selected: string;
    disabled: string;
    disabledBackground: string;
    stroke: string;
  };
  /** Component-specific service colors (Figma: "other service colors"). */
  service: {
    backdropOverlay: string;
    buttonOutlineActionBorder: string;
    divider: string;
    filledInputBackground: string;
    filledInputDisabledBackground: string;
    outlineBorder: string;
    snackbarBackground: string;
    tooltip: string;
  };
}

/** Tonal + opacity ramps (Figma: "4. Additional colors"). */
export interface BrandScales {
  /** Solid tonal ramp of the primary color, steps 50–900. */
  primary: Record<string, string>;
  secondary: Record<string, string>;
  primaryOpacity: Record<string, string>;
  secondaryOpacity: Record<string, string>;
  actionOpacity: Record<string, string>;
  errorOpacity: Record<string, string>;
  warningOpacity: Record<string, string>;
  infoOpacity: Record<string, string>;
  successOpacity: Record<string, string>;
  whiteOpacity: Record<string, string>;
}

export interface SpacingTokens {
  /** MUI spacing factor — theme.spacing(1) === unit px. */
  unit: number;
  /** Every allowed spacing value in px (whitelist from Figma). */
  scale: number[];
  groups: {
    micro: number[];
    small: number[];
    medium: number[];
    large: number[];
    huge: number[];
  };
}

/** Per-brand corner radius scale (Figma: "2. Corner radiuses"). */
export interface RadiusTokens {
  none: number;
  r1: number;
  r2: number;
  r3: number;
  r4: number;
  r5: number;
  r6: number;
  r7: number;
  r8: number;
  r9: number;
}

export interface TypeStyle {
  size: number;
  lineHeight: number;
  weight: number;
  /** Emphasized weight where the scale defines one. */
  emphWeight?: number;
}

export interface ResponsiveTypeStyle {
  desktop: TypeStyle;
  mobile: TypeStyle;
}

export interface BrandTypography {
  /** Hero/display style (96px desktop) — exposed as the `leading` variant. */
  leading: ResponsiveTypeStyle;
  title1: ResponsiveTypeStyle;
  title2: ResponsiveTypeStyle;
  title3: ResponsiveTypeStyle;
  title4: ResponsiveTypeStyle;
  title5: ResponsiveTypeStyle;
  title6: ResponsiveTypeStyle;
  subtitle: TypeStyle;
  body: TypeStyle;
  body2: TypeStyle;
  caption: TypeStyle;
  captionXs: TypeStyle;
}

export interface BrandTokens {
  id: BrandId;
  name: string;
  /** Brand font family (Figma: "font styles/font/project font"). */
  fontFamily: string;
  palette: BrandPalette;
  scales: BrandScales;
  /** Full Material palette ramps as configured for this brand. */
  materialPalette: Record<string, Record<string, string | Record<string, string>>>;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  typography: BrandTypography;
}
