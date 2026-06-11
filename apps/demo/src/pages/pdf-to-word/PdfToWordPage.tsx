import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import { ThemeProvider } from '@mui/material/styles';
import { getBrandTheme } from '@multibrand/design-system';
import { CONTENT_MAX_WIDTH, HERO } from './demoData';
import { BenefitsSection } from './components/BenefitsSection';
import { FaqSection } from './components/FaqSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { StateInspector } from './components/StateInspector';
import { TrustBar } from './components/TrustBar';
import { UploadWidget } from './upload/UploadWidget';
import { useConversionFlow } from './upload/useConversionFlow';

const HERO_FACTS = ['Free to try', 'No sign-up needed', 'Auto-deleted after 2 hours'];

/** Hero: focused tool-page header — H1 + short body + upload card
 *  (ai-vibe-coding.md "Tool page" recipe; layout per Figma node 50648-16354). */
function HeroSection({ flow }: { flow: ReturnType<typeof useConversionFlow> }) {
  return (
    <Box component="section">
      <Container sx={{ maxWidth: CONTENT_MAX_WIDTH, pt: { xs: 10, md: 16 }, pb: { xs: 12, md: 16 } }}>
        <Stack spacing={5} sx={{ alignItems: 'center', textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Typography variant="h1" sx={{ maxWidth: 800 }}>
            {HERO.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 640 }}>
            {HERO.subtitle}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 6 }}
            sx={{ alignItems: 'center' }}
          >
            {HERO_FACTS.map((fact) => (
              <Stack key={fact} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <CheckCircleRounded fontSize="small" color="success" />
                <Typography variant="caption" color="text.secondary">
                  {fact}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Box sx={{ maxWidth: 880, mx: 'auto' }}>
          <UploadWidget flow={flow} />
        </Box>
      </Container>
    </Box>
  );
}

function PageContent() {
  const flow = useConversionFlow();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Convert PDF to Word — PDF Guru';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSection flow={flow} />
        <TrustBar />
        <BenefitsSection />
        <HowItWorksSection />
        <FaqSection />
      </Box>
      <SiteFooter />
      <StateInspector flow={flow} />
    </Box>
  );
}

/**
 * Standalone PDF → Word tool page in PDFGuru mode.
 *
 * Pinned to the pdfguru brand theme per the task ("Use PDFGuru mode") and the
 * vibe-coding contract for standalone pages. The page code itself is
 * brand-agnostic: every visual value flows from theme tokens, so it would
 * restyle correctly under any other brand id passed to getBrandTheme.
 */
export function PdfToWordPage() {
  return (
    <ThemeProvider theme={getBrandTheme('pdfguru')}>
      <CssBaseline />
      <PageContent />
    </ThemeProvider>
  );
}
