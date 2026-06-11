import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export interface BrandWordmarkProps {
  /** Invert text color for dark surfaces (footer). */
  onDark?: boolean;
}

/**
 * "pdf guru"-style wordmark: first word in the brand's secondary (crimson)
 * accent, the rest in text color — lowercase, heaviest weight, per the
 * product header in Figma. Derived from theme.brand so it stays correct
 * under any brand.
 */
export function BrandWordmark({ onDark = false }: BrandWordmarkProps) {
  const theme = useTheme();
  const [first, ...rest] = theme.brand.label.toLowerCase().split(' ');

  return (
    <Typography
      variant="h5"
      component="span"
      sx={{
        fontWeight: 900,
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
        color: onDark ? 'common.white' : 'text.primary',
        userSelect: 'none',
      }}
    >
      <Typography component="span" variant="inherit" sx={{ color: 'secondary.main' }}>
        {first}
      </Typography>{' '}
      {rest.join(' ')}
    </Typography>
  );
}
