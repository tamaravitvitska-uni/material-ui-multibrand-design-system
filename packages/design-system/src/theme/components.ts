import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../tokens/types';
import type { ButtonSizeSpec, ComponentSpecs } from './componentSpecs';
import type { BrandMeta } from '../brands';

const px = (n: number) => `${n}px`;

function buttonSize(size: ButtonSizeSpec) {
  return {
    minHeight: px(size.height),
    paddingLeft: px(size.paddingX),
    paddingRight: px(size.paddingX),
    fontSize: px(size.fontSize),
    lineHeight: px(size.lineHeight),
    borderRadius: px(size.radius),
  };
}

/**
 * MUI component overrides driven entirely by brand tokens + the geometry
 * measured from the Figma component sheets. No hardcoded brand values —
 * change the tokens and every brand restyles itself.
 */
export function buildComponents(
  tokens: BrandTokens,
  specs: ComponentSpecs,
  brand: BrandMeta,
): Components<Theme> {
  const p = tokens.palette;
  const { button } = specs;

  /** Figma "tonal" button variant: 16% tint fill, colored label. */
  const tonal = (color: 'primary' | 'secondary' | 'error' | 'cta') => {
    const opacityScale = {
      primary: tokens.scales.primaryOpacity,
      secondary: tokens.scales.secondaryOpacity,
      error: tokens.scales.errorOpacity,
      cta: tokens.scales.actionOpacity,
    }[color];
    const tokenColor = p[color];
    return {
      props: { variant: 'tonal' as const, color },
      style: {
        backgroundColor: opacityScale['16'],
        color: color === 'cta' ? p.text.primary : tokenColor.main,
        '&:hover': { backgroundColor: opacityScale['24'] },
        '&:active': { backgroundColor: opacityScale['32'] },
        '&.Mui-disabled': {
          backgroundColor: p.action.disabledBackground,
          color: p.action.disabled,
        },
      },
    };
  };

  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: p.background.default,
          fontFamily: brand.fontStack,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: button.textTransform,
          fontWeight: button.fontWeight,
          boxShadow: 'none',
        },
        sizeLarge: buttonSize(button.sizes.large),
        sizeMedium: buttonSize(button.sizes.medium),
        sizeSmall: buttonSize(button.sizes.small),
        outlined: {
          borderWidth: px(button.outlinedBorderWidth),
          '&:hover': { borderWidth: px(button.outlinedBorderWidth) },
        },
      },
      variants: [
        // Figma outlined buttons use solid main-color borders (MUI defaults
        // to a translucent border).
        {
          props: { variant: 'outlined', color: 'primary' },
          style: { borderColor: p.primary.main },
        },
        {
          props: { variant: 'outlined', color: 'secondary' },
          style: { borderColor: p.secondary.main },
        },
        // Black CTA buttons (Figma "action" color) for every variant.
        {
          props: { color: 'cta', variant: 'contained' },
          style: {
            backgroundColor: p.cta.main,
            color: p.cta.contrastText,
            '&:hover': { backgroundColor: p.cta.light },
          },
        },
        {
          props: { color: 'cta', variant: 'outlined' },
          style: {
            borderColor: p.service.buttonOutlineActionBorder,
            color: p.text.primary,
            '&:hover': {
              borderColor: p.cta.main,
              backgroundColor: tokens.scales.actionOpacity['4'],
            },
          },
        },
        {
          props: { color: 'cta', variant: 'text' },
          style: {
            color: p.text.primary,
            '&:hover': { backgroundColor: tokens.scales.actionOpacity['8'] },
          },
        },
        tonal('primary'),
        tonal('secondary'),
        tonal('error'),
        tonal('cta'),
      ],
    },

    MuiButtonGroup: {
      defaultProps: { disableElevation: true },
    },

    MuiIconButton: {
      styleOverrides: {
        root: { borderRadius: px(tokens.radius.r2) },
      },
    },

    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: px(specs.menu.surfaceRadius) },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: { borderRadius: px(specs.card.radius) },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: px(specs.dialog.radius) },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: { borderRadius: px(specs.menu.surfaceRadius) },
        list: { padding: px(tokens.spacing.groups.small[0]) }, // 4
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: px(specs.menu.itemRadius),
          '&.Mui-selected': { backgroundColor: tokens.scales.primaryOpacity['8'] },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: px(specs.input.radius),
          '& .MuiOutlinedInput-notchedOutline': { borderColor: p.service.outlineBorder },
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: px(specs.input.radius),
          borderTopRightRadius: px(specs.input.radius),
          backgroundColor: p.service.filledInputBackground,
          '&.Mui-disabled': { backgroundColor: p.service.filledInputDisabledBackground },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { fontWeight: tokens.typography.body2.emphWeight },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: px(specs.alert.radius) },
      },
    },

    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: p.service.snackbarBackground,
          borderRadius: px(specs.alert.radius),
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: p.service.tooltip,
          borderRadius: px(tokens.radius.r1),
          fontSize: px(tokens.typography.captionXs.size),
        },
        arrow: { color: p.service.tooltip },
      },
    },

    MuiBackdrop: {
      styleOverrides: {
        root: {
          '&:not(.MuiBackdrop-invisible)': { backgroundColor: p.service.backdropOverlay },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: p.service.divider },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: tokens.typography.body.emphWeight,
          fontSize: px(tokens.typography.body.size),
        },
      },
    },

    MuiAppBar: {
      defaultProps: { color: 'inherit', elevation: 0 },
      styleOverrides: {
        colorInherit: {
          backgroundColor: p.background.paper,
          borderBottom: `1px solid ${p.service.divider}`,
        },
      },
    },

    MuiLink: {
      defaultProps: { underline: 'hover' },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: px(button.sizes.medium.radius),
        },
      },
    },
  };
}
