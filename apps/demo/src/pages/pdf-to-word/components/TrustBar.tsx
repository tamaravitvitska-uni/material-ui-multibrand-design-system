import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BoltRounded from '@mui/icons-material/BoltRounded';
import TouchAppRounded from '@mui/icons-material/TouchAppRounded';
import VerifiedUserRounded from '@mui/icons-material/VerifiedUserRounded';
import { useTheme } from '@mui/material/styles';
import { CONTENT_MAX_WIDTH, TRUST_ITEMS, TRUST_STATS } from '../demoData';
import { DashedFrame } from './DashedFrame';

const ICONS: Record<string, React.ReactNode> = {
  privacy: <VerifiedUserRounded />,
  easy: <TouchAppRounded />,
  fast: <BoltRounded />,
};

/**
 * Trust block: dashed-tile icon trio from the PDFGuru tool page (Figma node
 * 50648-16354 — "Privacy-Focused / Easy to Use / Lightning-Fast" row) plus a
 * demo stats line.
 */
export function TrustBar() {
  const theme = useTheme();
  const { tokens } = theme;

  return (
    <Container sx={{ maxWidth: CONTENT_MAX_WIDTH, py: { xs: 12, md: 20 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          gap: { xs: 6, md: 8 },
        }}
      >
        {TRUST_ITEMS.map((item) => (
          <Stack
            key={item.key}
            direction="row"
            spacing={4}
            sx={{ alignItems: 'flex-start', justifyContent: { md: 'center' } }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 48,
                height: 48,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.primary',
              }}
            >
              <DashedFrame radius={tokens.radius.r3} color={tokens.palette.action.stroke} />
              {ICONS[item.key]}
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 300 }}>
                {item.body}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        component="p"
        sx={{ mt: { xs: 8, md: 12 }, textAlign: 'center' }}
      >
        {TRUST_STATS}
      </Typography>
    </Container>
  );
}
