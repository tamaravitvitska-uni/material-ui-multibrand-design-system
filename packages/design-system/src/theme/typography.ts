import type { TypographyVariantsOptions } from '@mui/material/styles';
import type { BrandTokens, ResponsiveTypeStyle, TypeStyle } from '../tokens/types';
import type { ComponentSpecs } from './componentSpecs';

const px = (n: number) => `${n}px`;

/**
 * Desktop styles apply from this breakpoint up; below it the Figma "Mobile"
 * styles apply. Matches MUI's default `md` = 900px.
 */
export const DESKTOP_MEDIA = '@media (min-width:900px)';

function fixed(style: TypeStyle) {
  return {
    fontSize: px(style.size),
    lineHeight: px(style.lineHeight),
    fontWeight: style.weight,
  };
}

/** Mobile-first: base = Figma Mobile, desktop override at md+. */
function responsive(style: ResponsiveTypeStyle) {
  return {
    ...fixed(style.mobile),
    [DESKTOP_MEDIA]: fixed(style.desktop),
  };
}

/**
 * Figma type scale -> MUI variants:
 *   Leading            -> `leading` (custom hero/display variant)
 *   Title 1..6         -> h1..h6
 *   subtitle           -> subtitle1   (subtitle2 derived: body2 size, subtitle weight)
 *   body / body 2      -> body1 / body2
 *   caption/caption xs -> caption / `captionXs` (custom)
 *   button             -> from the brand component sheet (sentence case)
 */
export function buildTypography(
  tokens: BrandTokens,
  specs: ComponentSpecs,
  fontStack: string,
): TypographyVariantsOptions {
  const t = tokens.typography;
  return {
    fontFamily: fontStack,
    leading: { fontFamily: fontStack, ...responsive(t.leading) },
    h1: responsive(t.title1),
    h2: responsive(t.title2),
    h3: responsive(t.title3),
    h4: responsive(t.title4),
    h5: responsive(t.title5),
    h6: responsive(t.title6),
    subtitle1: fixed(t.subtitle),
    subtitle2: { ...fixed(t.body2), fontWeight: t.subtitle.weight },
    body1: fixed(t.body),
    body2: fixed(t.body2),
    caption: fixed(t.caption),
    captionXs: { fontFamily: fontStack, ...fixed(t.captionXs) },
    overline: {
      fontSize: px(t.captionXs.size),
      lineHeight: px(t.captionXs.lineHeight),
      fontWeight: t.captionXs.emphWeight ?? 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    button: {
      fontSize: px(specs.button.sizes.medium.fontSize),
      lineHeight: px(specs.button.sizes.medium.lineHeight),
      fontWeight: specs.button.fontWeight,
      textTransform: specs.button.textTransform,
    },
  };
}
