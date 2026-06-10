import type { PaletteOptions } from '@mui/material/styles';
import type { BrandTokens } from '../tokens/types';

/**
 * Map normalized brand tokens onto MUI's palette.
 *
 * Token -> slot:
 *   palette.primary/secondary           -> main color variables
 *   palette.cta                         -> "main color variables/action" (black CTA)
 *   error/warning/info/success          -> status colors
 *   text / background / common          -> 1:1
 *   divider                             -> other service colors/divider
 *   action.*                            -> Figma "action colors"
 *
 * Extra brand colors that have no MUI slot (service colors, opacity ramps,
 * tonal scales, the Material palette) stay reachable via `theme.tokens`.
 */
export function buildPalette(tokens: BrandTokens): PaletteOptions {
  const p = tokens.palette;
  const main = (c: { main: string; light: string; dark: string; contrastText: string }) => ({
    main: c.main,
    light: c.light,
    dark: c.dark,
    contrastText: c.contrastText,
  });

  return {
    mode: 'light',
    primary: main(p.primary),
    secondary: main(p.secondary),
    cta: main(p.cta),
    error: main(p.error),
    warning: main(p.warning),
    info: main(p.info),
    success: main(p.success),
    text: { ...p.text },
    background: { default: p.background.default, paper: p.background.paper },
    common: { ...p.common },
    divider: p.service.divider,
    action: {
      active: p.action.active,
      hover: p.action.hover,
      selected: p.action.selected,
      disabled: p.action.disabled,
      disabledBackground: p.action.disabledBackground,
    },
  };
}
