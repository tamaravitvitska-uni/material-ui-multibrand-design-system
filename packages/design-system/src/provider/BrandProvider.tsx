import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { Theme } from '@mui/material/styles';
import { getBrandTheme } from '../theme/createBrandTheme';
import { BRANDS, type BrandMeta } from '../brands';
import { BRAND_IDS, type BrandId, type BrandTokens } from '../tokens/types';

export interface BrandContextValue {
  brand: BrandId;
  meta: BrandMeta;
  tokens: BrandTokens;
  theme: Theme;
  setBrand: (brand: BrandId) => void;
}

const BrandContext = React.createContext<BrandContextValue | null>(null);

export interface BrandProviderProps {
  children: React.ReactNode;
  /** Brand rendered on first load (default: resumeleader). */
  initialBrand?: BrandId;
  /**
   * localStorage key for persisting the selection across reloads.
   * Pass `null` to disable persistence (e.g. fixed-brand production apps).
   */
  storageKey?: string | null;
  /** Skip CssBaseline if the host app already provides one. */
  disableCssBaseline?: boolean;
}

function readStoredBrand(storageKey: string | null): BrandId | null {
  if (!storageKey || typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(storageKey);
  return stored && (BRAND_IDS as readonly string[]).includes(stored) ? (stored as BrandId) : null;
}

/**
 * Theme switching mechanism. Wrap the app once; every MUI component below
 * automatically restyles when the brand changes.
 *
 * Single-brand apps can skip this and use plain MUI:
 *   <ThemeProvider theme={getBrandTheme('pdfguru')}>
 */
export function BrandProvider({
  children,
  initialBrand = 'resumeleader',
  storageKey = 'mbds-brand',
  disableCssBaseline = false,
}: BrandProviderProps) {
  const [brand, setBrandState] = React.useState<BrandId>(
    () => readStoredBrand(storageKey) ?? initialBrand,
  );

  const setBrand = React.useCallback(
    (next: BrandId) => {
      setBrandState(next);
      if (storageKey && typeof window !== 'undefined') {
        window.localStorage.setItem(storageKey, next);
      }
    },
    [storageKey],
  );

  const theme = getBrandTheme(brand);
  const value = React.useMemo<BrandContextValue>(
    () => ({ brand, meta: BRANDS[brand], tokens: theme.tokens, theme, setBrand }),
    [brand, theme, setBrand],
  );

  return (
    <BrandContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {disableCssBaseline ? null : <CssBaseline />}
        {children}
      </ThemeProvider>
    </BrandContext.Provider>
  );
}

/** Access the active brand and the switcher from any component. */
export function useBrand(): BrandContextValue {
  const context = React.useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used inside <BrandProvider>');
  }
  return context;
}
