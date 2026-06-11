import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import DevicesRounded from '@mui/icons-material/DevicesRounded';
import GridViewRounded from '@mui/icons-material/GridViewRounded';
import LockRounded from '@mui/icons-material/LockRounded';
import { useTheme } from '@mui/material/styles';
import { BENEFITS, CONTENT_MAX_WIDTH } from '../demoData';

const ICONS: Record<string, React.ReactNode> = {
  layout: <GridViewRounded />,
  ai: <AutoAwesomeRounded />,
  privacy: <LockRounded />,
  devices: <DevicesRounded />,
};

/** Benefits: outlined feature cards (ai-vibe-coding.md landing recipe). */
export function BenefitsSection() {
  const theme = useTheme();
  const { tokens } = theme;

  return (
    <Box sx={{ bgcolor: tokens.palette.background.blueGrey }}>
      <Container sx={{ maxWidth: CONTENT_MAX_WIDTH, py: { xs: 16, md: 24 } }}>
        <Typography variant="h2" sx={{ mb: 3, textAlign: 'center' }}>
          {BENEFITS.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: { xs: 10, md: 12 }, maxWidth: 560, mx: 'auto', textAlign: 'center' }}
        >
          {BENEFITS.subtitle}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
            gap: 6,
          }}
        >
          {BENEFITS.items.map((benefit) => (
            <Card key={benefit.key} variant="outlined" sx={{ bgcolor: 'background.paper' }}>
              <CardContent sx={{ p: 6 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: `${tokens.radius.r3}px`,
                    bgcolor: tokens.scales.primaryOpacity['8'],
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 4,
                  }}
                >
                  {ICONS[benefit.key]}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {benefit.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
