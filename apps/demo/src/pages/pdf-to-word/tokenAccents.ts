import type { Theme } from '@mui/material/styles';

export type BaseAccentName =
  | 'red'
  | 'purple'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'orange'
  | 'deepPurple'
  | 'green'
  | 'amber';

/**
 * Typed accessor for `tokens.materialPalette.basePalette` accents (the
 * pastel category swatches of docs/modes/pdfguru.md §1). The token type
 * widens nested groups to `string | Record<string, string>`; this narrows
 * them in one place. The main accent of each group is keyed by the group's
 * own name (e.g. basePalette.red.red).
 */
export function baseAccent(theme: Theme, name: BaseAccentName): string {
  const basePalette = theme.tokens.materialPalette.basePalette as Record<
    BaseAccentName,
    Record<string, string>
  >;
  return basePalette[name][name];
}
