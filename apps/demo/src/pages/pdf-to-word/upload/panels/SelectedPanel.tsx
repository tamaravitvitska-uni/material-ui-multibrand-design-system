import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import type { DemoFile } from '../conversionMachine';
import { HERO } from '../../demoData';
import { FileCard } from './FileCard';

export interface SelectedPanelProps {
  file: DemoFile;
  onConvert: () => void;
  onRemove: () => void;
}

/** File selected and validated — the single funnel decision: convert. */
export function SelectedPanel({ file, onConvert, onRemove }: SelectedPanelProps) {
  return (
    <Stack spacing={5} sx={{ width: '100%' }}>
      <FileCard
        file={file}
        onRemove={onRemove}
        status={<CheckCircleRounded color="success" aria-label="Ready to convert" />}
      />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'center' }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForwardRounded />}
          onClick={onConvert}
        >
          Convert to Word
        </Button>
        <Button variant="text" color="cta" size="large" onClick={onRemove}>
          Discard
        </Button>
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
        {HERO.assurance}
      </Typography>
    </Stack>
  );
}
