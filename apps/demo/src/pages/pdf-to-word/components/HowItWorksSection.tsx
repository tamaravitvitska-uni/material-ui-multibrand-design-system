import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { CONTENT_MAX_WIDTH, HOW_IT_WORKS } from '../demoData';

/**
 * How it works: r9 violet number circles on lightGrey
 * (ai-vibe-coding.md landing recipe — "steps with r9 number circles").
 */
export function HowItWorksSection() {
  const theme = useTheme();
  const { tokens } = theme;

  return (
    <Box sx={{ bgcolor: tokens.palette.background.lightGrey }}>
      <Container sx={{ maxWidth: CONTENT_MAX_WIDTH, py: { xs: 16, md: 24 } }}>
        <Typography variant="h2" sx={{ mb: { xs: 10, md: 14 }, textAlign: 'center' }}>
          {HOW_IT_WORKS.title}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: { xs: 8, md: 8 },
          }}
        >
          {HOW_IT_WORKS.steps.map((item) => (
            <Stack key={item.step} spacing={4} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: `${tokens.radius.r9}px`,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" component="span" color="inherit" sx={{ fontWeight: 800 }}>
                  {item.step}
                </Typography>
              </Box>
              <Typography variant="h5">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                {item.body}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
