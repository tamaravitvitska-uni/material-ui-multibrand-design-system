import type { BrandId, BrandTokens } from '../tokens/types';

/**
 * Component geometry measured from the Figma "Design System / Core"
 * component sheets (one sheet per brand, see BRANDS[id].figma.componentSheet).
 *
 * Figma's variable export does not include component-level styling, so these
 * values were extracted from the component sheets themselves. They reference
 * the radius tokens wherever the sheets bind to them; sizes/paddings are the
 * measured values. Update here if the Figma component sheets change.
 */

export interface ButtonSizeSpec {
  /** Component height in px. */
  height: number;
  paddingX: number;
  fontSize: number;
  lineHeight: number;
  radius: number;
}

export interface ComponentSpecs {
  button: {
    sizes: { large: ButtonSizeSpec; medium: ButtonSizeSpec; small: ButtonSizeSpec };
    fontWeight: number;
    /** Sentence case across all brands — never uppercase. */
    textTransform: 'none';
    outlinedBorderWidth: number;
  };
  /** Outlined/filled input fields. */
  input: { radius: number };
  /** Cards and prominent surfaces. */
  card: { radius: number };
  /** Dialogs / modals. */
  dialog: { radius: number };
  /** Menus, popovers, autocomplete papers. */
  menu: { surfaceRadius: number; itemRadius: number };
  /** Small status surfaces: alerts, snackbars. */
  alert: { radius: number };
}

export function getComponentSpecs(tokens: BrandTokens): ComponentSpecs {
  const { radius } = tokens;
  const base: Record<BrandId, ComponentSpecs> = {
    resumeleader: {
      button: {
        sizes: {
          large: { height: 56, paddingX: 24, fontSize: 18, lineHeight: 24, radius: radius.r5 }, // 16
          medium: { height: 48, paddingX: 16, fontSize: 16, lineHeight: 24, radius: radius.r4 }, // 12
          small: { height: 32, paddingX: 8, fontSize: 14, lineHeight: 20, radius: radius.r2 }, // 8
        },
        fontWeight: 500,
        textTransform: 'none',
        outlinedBorderWidth: 1,
      },
      input: { radius: radius.r4 },
      card: { radius: radius.r5 },
      dialog: { radius: radius.r6 },
      menu: { surfaceRadius: radius.r5, itemRadius: radius.r3 },
      alert: { radius: radius.r4 },
    },
    pdfguru: {
      button: {
        sizes: {
          large: { height: 56, paddingX: 32, fontSize: 18, lineHeight: 24, radius: radius.r4 }, // 12
          medium: { height: 48, paddingX: 20, fontSize: 18, lineHeight: 18, radius: radius.r2 }, // 8
          small: { height: 32, paddingX: 10, fontSize: 13, lineHeight: 20, radius: radius.r2 }, // 8
        },
        fontWeight: 700,
        textTransform: 'none',
        outlinedBorderWidth: 2,
      },
      input: { radius: radius.r3 },
      card: { radius: radius.r5 },
      dialog: { radius: radius.r6 },
      menu: { surfaceRadius: radius.r5, itemRadius: radius.r3 },
      alert: { radius: radius.r4 },
    },
    thebestpdf: {
      button: {
        sizes: {
          large: { height: 54, paddingX: 24, fontSize: 16, lineHeight: 22, radius: radius.r2 }, // 4
          medium: { height: 42, paddingX: 20, fontSize: 14, lineHeight: 18, radius: radius.r2 }, // 4
          small: { height: 30, paddingX: 10, fontSize: 14, lineHeight: 18, radius: radius.r1 }, // 2
        },
        fontWeight: 600,
        textTransform: 'none',
        outlinedBorderWidth: 1,
      },
      input: { radius: radius.r3 },
      card: { radius: radius.r5 },
      dialog: { radius: radius.r6 },
      menu: { surfaceRadius: radius.r5, itemRadius: radius.r2 },
      alert: { radius: radius.r3 },
    },
    pdfleader: {
      button: {
        sizes: {
          // PDFLeader button radii (24/16/16) are sheet-measured literals —
          // they sit between this brand's radius tokens (r3=20, r4=32).
          large: { height: 72, paddingX: 32, fontSize: 24, lineHeight: 24, radius: 24 },
          medium: { height: 52, paddingX: 32, fontSize: 18, lineHeight: 24, radius: 16 },
          small: { height: 30, paddingX: 12, fontSize: 16, lineHeight: 18, radius: 16 },
        },
        fontWeight: 700,
        textTransform: 'none',
        outlinedBorderWidth: 2,
      },
      input: { radius: radius.r2 }, // 12
      card: { radius: radius.r3 }, // 20
      dialog: { radius: radius.r3 },
      menu: { surfaceRadius: radius.r3, itemRadius: radius.r1 },
      alert: { radius: radius.r2 },
    },
    onlydoc: {
      button: {
        sizes: {
          large: { height: 56, paddingX: 24, fontSize: 18, lineHeight: 24, radius: radius.r5 }, // 16
          medium: { height: 48, paddingX: 16, fontSize: 16, lineHeight: 24, radius: radius.r4 }, // 12
          small: { height: 32, paddingX: 8, fontSize: 14, lineHeight: 20, radius: radius.r2 }, // 8
        },
        fontWeight: 700,
        textTransform: 'none',
        outlinedBorderWidth: 1,
      },
      input: { radius: radius.r4 },
      card: { radius: radius.r5 },
      dialog: { radius: radius.r6 },
      menu: { surfaceRadius: radius.r5, itemRadius: radius.r3 },
      alert: { radius: radius.r4 },
    },
    pdffly: {
      button: {
        sizes: {
          large: { height: 56, paddingX: 24, fontSize: 18, lineHeight: 24, radius: radius.r5 }, // 16
          medium: { height: 48, paddingX: 16, fontSize: 16, lineHeight: 24, radius: radius.r4 }, // 12
          small: { height: 32, paddingX: 8, fontSize: 14, lineHeight: 20, radius: radius.r2 }, // 8
        },
        fontWeight: 500,
        textTransform: 'none',
        outlinedBorderWidth: 1,
      },
      input: { radius: radius.r4 },
      card: { radius: radius.r5 },
      dialog: { radius: radius.r6 },
      menu: { surfaceRadius: radius.r5, itemRadius: radius.r3 },
      alert: { radius: radius.r4 },
    },
  };
  return base[tokens.id];
}
