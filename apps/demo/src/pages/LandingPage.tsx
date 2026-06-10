import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BoltRounded from '@mui/icons-material/BoltRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import LockRounded from '@mui/icons-material/LockRounded';
import UploadFileRounded from '@mui/icons-material/UploadFileRounded';
import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import { useBrand } from '@multibrand/design-system';

const FEATURES = [
  {
    icon: <UploadFileRounded fontSize="large" color="primary" />,
    title: 'Drop a file, get a result',
    body: 'Upload any document and let the tool do the heavy lifting — no installs, no setup.',
  },
  {
    icon: <BoltRounded fontSize="large" color="primary" />,
    title: 'Fast by default',
    body: 'Most jobs finish in under 30 seconds, even for large files.',
  },
  {
    icon: <LockRounded fontSize="large" color="primary" />,
    title: 'Private & secure',
    body: 'Files are encrypted in transit and deleted automatically after processing.',
  },
];

const STEPS = [
  { step: '1', title: 'Upload', body: 'Drag & drop your file or pick it from your device.' },
  { step: '2', title: 'Process', body: 'We convert, compress or edit it — your choice.' },
  { step: '3', title: 'Download', body: 'Grab the result instantly or share a link.' },
];

const FAQ = [
  {
    q: 'Is there a free plan?',
    a: 'Yes — the core tools are free for occasional use. Heavy usage needs a subscription.',
  },
  {
    q: 'What file formats are supported?',
    a: 'PDF, Word, Excel, PowerPoint, and the common image formats. More are added regularly.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Of course. Subscriptions can be cancelled in one click from your account page.',
  },
];

/**
 * A brand-agnostic landing page: structure is fixed, every visual decision
 * (color, type, radius, spacing) flows from the active brand theme.
 */
export function LandingPage() {
  const { meta, tokens } = useBrand();

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ bgcolor: tokens.palette.background.blueGrey }}>
        <Container sx={{ py: { xs: 16, md: 30 }, textAlign: 'center' }}>
          <Chip label={`${meta.product} · ${meta.label}`} color="primary" variant="outlined" sx={{ mb: 6 }} />
          <Typography variant="leading" component="h1" sx={{ mb: 6, maxWidth: 960, mx: 'auto' }}>
            Every document tool you need
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: 10, maxWidth: 640, mx: 'auto' }}
          >
            Convert, compress, edit and sign — in your browser, in seconds. Trusted by 2M+ people
            every month.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} sx={{ justifyContent: 'center' }}>
            <Button variant="contained" color="primary" size="large">
              Get started free
            </Button>
            <Button variant="outlined" color="cta" size="large">
              See all tools
            </Button>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 8, justifyContent: 'center', alignItems: 'center' }}
          >
            <VerifiedRounded fontSize="small" color="success" />
            <Typography variant="captionXs" color="text.secondary">
              No credit card required · Cancel anytime
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Features */}
      <Container sx={{ py: { xs: 16, md: 24 } }}>
        <Typography variant="h2" sx={{ mb: 4, textAlign: 'center' }}>
          Why {meta.label}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 12, maxWidth: 560, mx: 'auto', textAlign: 'center' }}
        >
          One subscription, every tool. Built for speed and privacy.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 6 }}>
          {FEATURES.map((feature) => (
            <Card key={feature.title} variant="outlined">
              <CardContent sx={{ p: 8 }}>
                {feature.icon}
                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Steps */}
      <Box sx={{ bgcolor: tokens.palette.background.lightGrey }}>
        <Container sx={{ py: { xs: 16, md: 24 } }}>
          <Typography variant="h2" sx={{ mb: 12, textAlign: 'center' }}>
            Three steps, done
          </Typography>
          <Box
            sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 8 }}
          >
            {STEPS.map((item) => (
              <Stack key={item.step} spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
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
                  <Typography variant="h6" component="span" color="inherit">
                    {item.step}
                  </Typography>
                </Box>
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280 }}>
                  {item.body}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA banner */}
      <Container sx={{ py: { xs: 16, md: 24 } }}>
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: `${tokens.radius.r6}px`,
            px: { xs: 8, md: 20 },
            py: { xs: 12, md: 16 },
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" component="p" color="inherit" sx={{ mb: 4 }}>
            Ready to try {meta.label}?
          </Typography>
          <Typography variant="body1" sx={{ mb: 8, opacity: 0.85 }} color="inherit">
            Join millions of users who already work smarter with their documents.
          </Typography>
          <Button variant="contained" color="cta" size="large">
            Start now — it's free
          </Button>
        </Box>
      </Container>

      {/* FAQ */}
      <Container sx={{ pb: { xs: 16, md: 24 }, maxWidth: 'md' }}>
        <Typography variant="h3" component="h2" sx={{ mb: 10, textAlign: 'center' }}>
          Frequently asked questions
        </Typography>
        {FAQ.map((item) => (
          <Accordion key={item.q} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreRounded />}>
              <Typography variant="subtitle1">{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {item.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
