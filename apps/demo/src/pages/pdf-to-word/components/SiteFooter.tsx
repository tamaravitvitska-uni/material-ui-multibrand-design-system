import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { CONTENT_MAX_WIDTH, FOOTER } from '../demoData';
import { BrandWordmark } from './BrandWordmark';

/**
 * Dark footer on tokens.palette.background.dark with whiteOpacity muted text
 * (ai-vibe-coding.md component vocabulary).
 */
export function SiteFooter() {
  const theme = useTheme();
  const { tokens } = theme;
  const muted = tokens.scales.whiteOpacity['75'];

  return (
    <Box component="footer" sx={{ bgcolor: tokens.palette.background.dark, color: 'common.white' }}>
      <Container sx={{ maxWidth: CONTENT_MAX_WIDTH, pt: { xs: 12, md: 16 }, pb: 8 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' },
            gap: { xs: 8, md: 12 },
          }}
        >
          <Stack spacing={4} sx={{ pr: { md: 12 } }}>
            <BrandWordmark onDark />
            <Typography variant="body2" sx={{ color: muted }}>
              {FOOTER.tagline}
            </Typography>
          </Stack>

          {FOOTER.columns.map((column) => (
            <Stack key={column.title} spacing={3}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'common.white' }}>
                {column.title}
              </Typography>
              {column.links.map((label) => (
                <Link
                  key={label}
                  href="#"
                  variant="body2"
                  sx={{ color: muted, '&:hover': { color: 'common.white' } }}
                >
                  {label}
                </Link>
              ))}
            </Stack>
          ))}
        </Box>

        <Divider sx={{ my: 8, borderColor: tokens.scales.whiteOpacity['12'] }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={4}
          sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
        >
          <Typography variant="captionXs" sx={{ color: muted }}>
            {FOOTER.legal}
          </Typography>
          <Stack direction="row" spacing={6}>
            {FOOTER.legalLinks.map((label) => (
              <Link
                key={label}
                href="#"
                variant="captionXs"
                sx={{ color: muted, '&:hover': { color: 'common.white' } }}
              >
                {label}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
