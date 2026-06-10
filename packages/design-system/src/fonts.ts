import { brandTokens } from './tokens/generated';
import { BRAND_IDS, type BrandId } from './tokens/types';

/**
 * Weights requested per family. Google Fonts instantiates these from the
 * variable fonts where available. Lato only ships 100/300/400/700/900 —
 * 500/600 requests are dropped for it (browsers fall back to the nearest
 * available weight).
 */
const DEFAULT_WEIGHTS = [400, 500, 600, 700, 800, 900];
const STATIC_FAMILY_WEIGHTS: Record<string, number[]> = {
  Lato: [400, 700, 900],
};

/**
 * Build a Google Fonts css2 URL covering the brand fonts.
 * Pass a subset of brand ids to only load what a given app needs.
 */
export function googleFontsUrl(brands: readonly BrandId[] = BRAND_IDS): string {
  const families = [...new Set(brands.map((id) => brandTokens[id].fontFamily))];
  const params = families
    .map((family) => {
      const weights = STATIC_FAMILY_WEIGHTS[family] ?? DEFAULT_WEIGHTS;
      return `family=${family.replace(/ /g, '+')}:wght@${weights.join(';')}`;
    })
    .join('&');
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}
