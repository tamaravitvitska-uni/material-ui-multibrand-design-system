import { useId } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { baseAccent } from '../tokenAccents';

export interface DashedFrameProps {
  /** Corner radius in px (pass a `theme.tokens.radius.*` value). */
  radius: number;
  /**
   * Single stroke color. When omitted, the frame renders the PDFGuru
   * multicolor dashed border (Figma node 50648-16354) as a gradient built
   * from `tokens.materialPalette.basePalette` accents.
   */
  color?: string;
}

/**
 * Decorative dashed border that overlays its parent (absolute inset 0).
 * SVG is the only way to combine dashes with a gradient stroke; every color
 * comes from brand tokens. Stroke width follows the brand's outlined-button
 * border width so the dropzone "weight" matches the buttons.
 */
export function DashedFrame({ radius, color }: DashedFrameProps) {
  const theme = useTheme();
  const gradientId = useId();
  const strokeWidth = 2;
  const inset = strokeWidth / 2;

  const stops = (
    ['amber', 'orange', 'red', 'purple', 'deepPurple', 'blue', 'cyan', 'teal', 'green'] as const
  ).map((name) => baseAccent(theme, name));

  return (
    <Box
      component="svg"
      aria-hidden
      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {!color && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            {stops.map((stop, index) => (
              <stop key={stop} offset={index / (stops.length - 1)} stopColor={stop} />
            ))}
          </linearGradient>
        </defs>
      )}
      <rect
        x={inset}
        y={inset}
        rx={radius}
        fill="none"
        stroke={color ?? `url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeDasharray="8 8"
        strokeLinecap="round"
        style={{ width: `calc(100% - ${strokeWidth}px)`, height: `calc(100% - ${strokeWidth}px)` }}
      />
    </Box>
  );
}
