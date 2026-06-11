import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { FAQ } from '../demoData';

/** FAQ accordions (ai-vibe-coding.md landing recipe). */
export function FaqSection() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 16, md: 24 } }}>
      <Typography variant="h3" component="h2" sx={{ mb: { xs: 8, md: 10 }, textAlign: 'center' }}>
        {FAQ.title}
      </Typography>
      {FAQ.items.map((item) => (
        <Accordion key={item.q} disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {item.q}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {item.a}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
