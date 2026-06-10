import type { Shadows } from '@mui/material/styles';

/**
 * Elevation scale.
 *
 * The Figma variable export contains no shadow collection; the only shadow
 * evidence in the component sheets is the layered soft style
 * `0 8px 40px rgba(0,0,0,0.08), 0 6px 12px -2px rgba(0,0,0,0.08)` used on
 * elevated surfaces (PDF Guru menu / "card hover"). This scale generalizes
 * that look: soft, low-opacity, large-blur shadows that grow with elevation.
 * Same scale for every brand (assumption documented in ASSUMPTIONS.md).
 */
export function buildShadows(): Shadows {
  const shadows: string[] = ['none'];
  for (let e = 1; e <= 24; e += 1) {
    const ambientY = Math.round(e * 1.5 + 2);
    const ambientBlur = ambientY * 4;
    const keyY = Math.max(2, Math.round(e * 0.75));
    const keyBlur = keyY * 2 + 4;
    shadows.push(
      `0 ${ambientY}px ${ambientBlur}px rgba(0, 0, 0, 0.08), ` +
        `0 ${keyY}px ${keyBlur}px -2px rgba(0, 0, 0, 0.08)`,
    );
  }
  return shadows as Shadows;
}
