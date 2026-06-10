#!/usr/bin/env node
/**
 * Token normalization layer.
 *
 * Reads the raw Figma variable-collection exports in tokens/figma-export/
 * and emits typed, per-brand token modules into src/tokens/generated/.
 *
 * Figma is the single source of truth: never edit the generated files by hand.
 * To update tokens: re-export the collections from Figma (same file names),
 * drop them into tokens/figma-export/ and run `npm run build:tokens`.
 *
 * Normalizations applied:
 *  - Figma rgba objects (0..1 floats) -> CSS hex / rgba() strings
 *  - Figma font-weight names ("Black", "SemiBold", ...) -> numeric weights
 *  - Variable paths ("main color variables/primary/primary-main") -> stable
 *    semantic token paths (palette.primary.main)
 *  - The universal Spacings collection -> a shared spacing scale
 *  - Per-mode values -> one self-contained token file per brand
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXPORT_DIR = join(__dirname, '..', 'tokens', 'figma-export');
const OUT_DIR = join(__dirname, '..', 'src', 'tokens', 'generated');

/** Figma mode names -> stable brand ids used across the codebase. */
const BRAND_IDS = {
  ResumeLeader: 'resumeleader',
  PDFGuru: 'pdfguru',
  TheBestPDF: 'thebestpdf',
  PDFLeader: 'pdfleader',
  OnlyDoc: 'onlydoc',
  PDFFly: 'pdffly',
};

const FONT_WEIGHTS = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readCollection(file) {
  return JSON.parse(readFileSync(join(EXPORT_DIR, file), 'utf8'));
}

function toHexPair(v) {
  return Math.round(v * 255)
    .toString(16)
    .padStart(2, '0');
}

/** Figma {r,g,b,a} floats -> '#rrggbb' or 'rgba(r, g, b, a)'. */
function colorToCss(value) {
  const { r, g, b, a } = value;
  if (a >= 0.999) return `#${toHexPair(r)}${toHexPair(g)}${toHexPair(b)}`;
  const alpha = Math.round(a * 1000) / 1000;
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`;
}

function toWeight(value) {
  if (typeof value === 'number') return value;
  const key = String(value).replace(/[\s-]/g, '').toLowerCase();
  if (key in FONT_WEIGHTS) return FONT_WEIGHTS[key];
  const parsed = Number(value);
  if (!Number.isNaN(parsed)) return parsed;
  throw new Error(`Unknown font weight: ${value}`);
}

/**
 * Build, for one collection, a map: brandId -> { 'variable/name': normalizedValue }.
 * Collections with a single UNIVERSAL mode return the same values for every brand.
 */
function valuesByBrand(collection) {
  const modeEntries = Object.entries(collection.modes); // [modeId, modeName]
  const universal = modeEntries.length === 1;
  const result = Object.fromEntries(Object.values(BRAND_IDS).map((id) => [id, {}]));

  for (const variable of collection.variables) {
    for (const [modeId, modeName] of modeEntries) {
      const resolved = variable.resolvedValuesByMode[modeId]?.resolvedValue;
      if (resolved === undefined) continue;
      const value =
        variable.type === 'COLOR' ? colorToCss(resolved) : resolved;
      if (universal) {
        for (const id of Object.values(BRAND_IDS)) result[id][variable.name] = value;
      } else {
        const brandId = BRAND_IDS[modeName];
        if (!brandId) throw new Error(`Unknown Figma mode "${modeName}" in ${collection.name}`);
        result[brandId][variable.name] = value;
      }
    }
  }
  return result;
}

function req(vars, name) {
  if (!(name in vars)) throw new Error(`Missing expected Figma variable: "${name}"`);
  return vars[name];
}

// ---------------------------------------------------------------------------
// Collection-specific shaping
// ---------------------------------------------------------------------------

/** 1. Spacings (universal) -> shared spacing scale. */
function shapeSpacing(vars) {
  const groups = { micro: [], small: [], medium: [], large: [], huge: [] };
  const scale = new Set([0]);
  for (const [name, value] of Object.entries(vars)) {
    scale.add(value);
    if (name.startsWith('Micro')) groups.micro.push(value);
    else if (name.startsWith('Small')) groups.small.push(value);
    else if (name.startsWith('Medium')) groups.medium.push(value);
    else if (name.startsWith('Large')) groups.large.push(value);
    else if (name.startsWith('Huge')) groups.huge.push(value);
  }
  for (const key of Object.keys(groups)) groups[key].sort((a, b) => a - b);
  return {
    unit: 4, // MUI spacing factor: theme.spacing(1) === 4px
    scale: [...scale].sort((a, b) => a - b),
    groups,
  };
}

/** 2. Corner radiuses -> { none, r1..r9 }. */
function shapeRadius(vars) {
  const radius = { none: req(vars, 'Corner radiuses/radius-none') };
  for (let i = 1; i <= 9; i += 1) {
    radius[`r${i}`] = req(vars, `Corner radiuses/radius-${i}`);
  }
  return radius;
}

/** 3. Base changeable variables -> semantic palette + typography. */
function shapePalette(vars) {
  const statusColor = (key) => ({
    main: req(vars, `${key}/main`),
    light: req(vars, `${key}/light`),
    dark: req(vars, `${key}/dark`),
    contrastText: req(vars, `${key}/contrastText`),
    hoverOpacity: req(vars, `${key}/state/hoverOpacity`),
    selectedOpacity: req(vars, `${key}/state/selectedOpacity`),
    main50: req(vars, `${key}/state/main-50%`),
  });
  const mainColor = (key) => ({
    main: req(vars, `main color variables/${key}/${key}-main`),
    light: req(vars, `main color variables/${key}/${key}-light`),
    dark: req(vars, `main color variables/${key}/${key}-dark`),
    contrastText: req(vars, `main color variables/${key}/${key}-contrastText`),
  });

  return {
    primary: {
      ...mainColor('primary'),
      hover: req(vars, 'main color variables/state/primary/primary-hover'),
      main50: req(vars, 'main color variables/state/primary/primary-50%'),
    },
    secondary: {
      ...mainColor('secondary'),
      hover: req(vars, 'main color variables/state/secondary/secondary-hover'),
      main50: req(vars, 'main color variables/state/secondary/secondary-50%'),
    },
    // Figma group "main color variables/action": the black high-emphasis CTA
    // color. Exposed as `cta` to avoid clashing with MUI's palette.action.
    cta: {
      ...mainColor('action'),
      hover: req(vars, 'main color variables/state/action/action-hover'),
      // Figma quirk: the 50% state for the action color is stored under
      // "state/action/secondary-50%".
      main50: req(vars, 'main color variables/state/action/secondary-50%'),
    },
    error: statusColor('error'),
    warning: statusColor('warning'),
    info: statusColor('info'),
    success: statusColor('success'),
    text: {
      primary: req(vars, 'text colors/primary'),
      secondary: req(vars, 'text colors/secondary'),
      disabled: req(vars, 'text colors/disabled'),
    },
    background: {
      default: req(vars, 'background colors/white bg'),
      paper: req(vars, 'background colors/white bg'),
      lightGrey: req(vars, 'background colors/light-grey'),
      blueGrey: req(vars, 'background colors/blue-grey'),
      darkBlueGrey: req(vars, 'background colors/dark-blue-grey'),
      dark: req(vars, 'background colors/dark-background'),
    },
    common: {
      black: req(vars, 'common colors/black'),
      white: req(vars, 'common colors/white'),
    },
    action: {
      active: req(vars, 'action colors/active'),
      hover: req(vars, 'action colors/hover'),
      selected: req(vars, 'action colors/selected'),
      disabled: req(vars, 'action colors/disabled'),
      disabledBackground: req(vars, 'action colors/disabledBackground'),
      stroke: req(vars, 'action colors/stroke'),
    },
    service: {
      backdropOverlay: req(vars, 'other service colors/backdrop-overlay'),
      buttonOutlineActionBorder: req(vars, 'other service colors/button-outline-action-border'),
      divider: req(vars, 'other service colors/divider'),
      filledInputBackground: req(vars, 'other service colors/filled-input-background'),
      filledInputDisabledBackground: req(vars, 'other service colors/filled-input-disabled-background'),
      outlineBorder: req(vars, 'other service colors/outline-border'),
      snackbarBackground: req(vars, 'other service colors/snackbar-background'),
      tooltip: req(vars, 'other service colors/tooltip'),
    },
  };
}

function shapeTypography(vars) {
  const responsive = (group) => ({
    desktop: {
      size: req(vars, `font styles/${group} Desktop/font size`),
      lineHeight: req(vars, `font styles/${group} Desktop/font height`),
      weight: toWeight(req(vars, `font styles/${group} Desktop/font weight`)),
    },
    mobile: {
      size: req(vars, `font styles/${group} Mobile/font size`),
      lineHeight: req(vars, `font styles/${group} Mobile/font height`),
      weight: toWeight(req(vars, `font styles/${group} Mobile/font weight`)),
    },
  });
  // Title 6 names its keys differently and carries Usual + Emph weights.
  const title6 = (mode) => ({
    size: req(vars, `font styles/Title 6 ${mode}/font size`),
    lineHeight: req(vars, `font styles/Title 6 ${mode}/height`),
    weight: toWeight(req(vars, `font styles/Title 6 ${mode}/font weight Usual`)),
    emphWeight: toWeight(req(vars, `font styles/Title 6 ${mode}/font weight Emph`)),
  });
  const general = (key, { weightKey } = {}) => ({
    size: req(vars, `font styles/General/${key} size`),
    lineHeight: req(vars, `font styles/General/${key} height`),
    weight: weightKey ? toWeight(req(vars, weightKey)) : 400,
    emphWeight: toWeight(req(vars, `font styles/General/${key} Emph weight`)),
  });

  return {
    fontFamily: req(vars, 'font styles/font/project font'),
    leading: responsive('Leading'),
    title1: responsive('Title 1'),
    title2: responsive('Title 2'),
    title3: responsive('Title 3'),
    title4: responsive('Title 4'),
    title5: responsive('Title 5'),
    title6: { desktop: title6('Desktop'), mobile: title6('Mobile') },
    subtitle: general('subtitle', { weightKey: 'font styles/General/subtitle weight' }),
    body: general('body'),
    body2: general('body 2'),
    caption: general('caption'),
    captionXs: general('caption xs'),
  };
}

/** 4. Additional colors -> tonal + opacity scales. */
function shapeScales(vars) {
  const scales = {
    primary: {},
    secondary: {},
    primaryOpacity: {},
    secondaryOpacity: {},
    actionOpacity: {},
    errorOpacity: {},
    warningOpacity: {},
    infoOpacity: {},
    successOpacity: {},
    whiteOpacity: {},
  };
  for (const [name, value] of Object.entries(vars)) {
    const parts = name.split('/');
    if (parts.length === 3 && parts[1] === 'Filled') scales[parts[0]][parts[2]] = value;
    else if (parts.length === 3 && parts[1] === 'Opacities') scales[`${parts[0]}Opacity`][parts[2]] = value;
    else if (parts.length === 2) scales[`${parts[0]}Opacity`][parts[1]] = value;
    else throw new Error(`Unexpected additional-color variable: ${name}`);
  }
  return scales;
}

/** 5. Material palette -> nested { hue: { step: color } } map. */
function shapeMaterialPalette(vars) {
  const palette = {};
  for (const [name, value] of Object.entries(vars)) {
    const parts = name.split('/');
    let node = palette;
    for (const part of parts.slice(0, -1)) {
      node[part] = node[part] ?? {};
      node = node[part];
    }
    node[parts.at(-1)] = value;
  }
  return palette;
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

const spacingByBrand = valuesByBrand(readCollection('1-spacings.json'));
const radiusByBrand = valuesByBrand(readCollection('2-corner-radiuses.json'));
const baseByBrand = valuesByBrand(readCollection('3-base-changeable-variables.json'));
const additionalByBrand = valuesByBrand(readCollection('4-additional-colors.json'));
const materialByBrand = valuesByBrand(readCollection('5-material-palette.json'));

mkdirSync(OUT_DIR, { recursive: true });

const brandIds = Object.values(BRAND_IDS);
const brandNames = Object.fromEntries(
  Object.entries(BRAND_IDS).map(([name, id]) => [id, name]),
);

for (const id of brandIds) {
  const typography = shapeTypography(baseByBrand[id]);
  const tokens = {
    id,
    name: brandNames[id],
    fontFamily: typography.fontFamily,
    palette: shapePalette(baseByBrand[id]),
    scales: shapeScales(additionalByBrand[id]),
    materialPalette: shapeMaterialPalette(materialByBrand[id]),
    spacing: shapeSpacing(spacingByBrand[id]),
    radius: shapeRadius(radiusByBrand[id]),
    typography,
  };
  delete tokens.typography.fontFamily; // hoisted to the top level

  const source = `// AUTO-GENERATED by scripts/build-tokens.mjs — DO NOT EDIT.
// Source of truth: Figma "Design System / Core" variable collections
// (tokens/figma-export/*.json). Re-run \`npm run build:tokens\` after re-export.
import type { BrandTokens } from '../types';

export const ${id}: BrandTokens = ${JSON.stringify(tokens, null, 2)};
`;
  writeFileSync(join(OUT_DIR, `${id}.ts`), source);
  console.log(`✔ src/tokens/generated/${id}.ts`);
}

const indexSource = `// AUTO-GENERATED by scripts/build-tokens.mjs — DO NOT EDIT.
import type { BrandId, BrandTokens } from '../types';
${brandIds.map((id) => `import { ${id} } from './${id}';`).join('\n')}

export const brandTokens: Record<BrandId, BrandTokens> = {
${brandIds.map((id) => `  ${id},`).join('\n')}
};

${brandIds.map((id) => `export { ${id} };`).join('\n')}
`;
writeFileSync(join(OUT_DIR, 'index.ts'), indexSource);
console.log('✔ src/tokens/generated/index.ts');
