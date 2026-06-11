import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { baseAccent } from '../tokenAccents';

export interface InkIllustrationProps {
  /** Rendered width in px; height follows the 5:4 artwork ratio. */
  size?: number;
  /** Render in a single color (used on the dark drag overlay). */
  monochrome?: string;
}

/**
 * PDF → Word ink-line illustration in the PDFGuru style: flat black
 * line-art with red/yellow props (docs/modes/pdfguru.md §7). All colors come
 * from brand tokens; the geometry is artwork, not layout.
 */
export function InkIllustration({ size = 120, monochrome }: InkIllustrationProps) {
  const theme = useTheme();
  const ink = monochrome ?? theme.tokens.palette.text.primary;
  const red = monochrome ?? baseAccent(theme, 'red');
  const blue = monochrome ?? baseAccent(theme, 'blue');
  const amber = monochrome ?? baseAccent(theme, 'amber');
  const paper = monochrome ? 'none' : theme.tokens.palette.background.paper;

  return (
    <Box
      component="svg"
      aria-hidden
      viewBox="0 0 150 120"
      sx={{ width: size, height: (size * 4) / 5, display: 'block' }}
    >
      {/* PDF page (back left, slightly tilted) */}
      <g transform="rotate(-6 38 60)">
        <path
          d="M18 22h32l12 12v52a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4Z"
          fill={paper}
          stroke={ink}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M50 22v12h12" fill="none" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
        <rect x="22" y="44" width="28" height="4" rx="2" fill={red} />
        <rect x="22" y="54" width="34" height="4" rx="2" fill={ink} opacity="0.35" />
        <rect x="22" y="64" width="24" height="4" rx="2" fill={ink} opacity="0.35" />
        <rect x="20" y="28" width="20" height="10" rx="3" fill={red} />
        <text
          x="30"
          y="36"
          textAnchor="middle"
          fontSize="7"
          fontWeight="800"
          fontFamily="inherit"
          fill={monochrome ?? theme.tokens.palette.common.white}
        >
          PDF
        </text>
      </g>

      {/* Arrow */}
      <path
        d="M72 60c6 -10 14 -10 20 -4"
        fill="none"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M92 49l2 8-8 1"
        fill="none"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Word page (front right) */}
      <g transform="rotate(5 112 62)">
        <path
          d="M96 26h32l12 12v52a4 4 0 0 1-4 4H96a4 4 0 0 1-4-4V30a4 4 0 0 1 4-4Z"
          fill={paper}
          stroke={ink}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M128 26v12h12" fill="none" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
        <rect x="98" y="32" width="20" height="10" rx="3" fill={blue} />
        <text
          x="108"
          y="40"
          textAnchor="middle"
          fontSize="7"
          fontWeight="800"
          fontFamily="inherit"
          fill={monochrome ?? theme.tokens.palette.common.white}
        >
          DOC
        </text>
        <rect x="100" y="50" width="30" height="4" rx="2" fill={blue} />
        <rect x="100" y="60" width="34" height="4" rx="2" fill={ink} opacity="0.35" />
        <rect x="100" y="70" width="22" height="4" rx="2" fill={ink} opacity="0.35" />
      </g>

      {/* Props: sparkle + dots */}
      <path
        d="M76 18l2.4 6 6 2.4-6 2.4-2.4 6-2.4-6-6-2.4 6-2.4Z"
        fill={amber}
        stroke={ink}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="64" cy="98" r="3" fill={red} />
      <circle cx="86" cy="104" r="2.5" fill="none" stroke={ink} strokeWidth="2" />
    </Box>
  );
}
