import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ReplayRounded from '@mui/icons-material/ReplayRounded';
import type { DemoFile } from '../conversionMachine';
import { SERVER_ERROR_COPY } from '../../demoData';
import { FileCard } from './FileCard';

export interface ErrorPanelProps {
  files: DemoFile[];
  /** Re-run the batch with the same files. */
  onRetry: () => void;
  /** Return to the gather screen (files preserved). */
  onBackToFiles: () => void;
}

/**
 * Batch-level server error (per-file problems render inline on the rows).
 * Pattern from docs/modes/pdfguru.md §4: Alert severity="error" + retry CTA
 * + supportive copy.
 */
export function ErrorPanel({ files, onRetry, onBackToFiles }: ErrorPanelProps) {
  return (
    <Stack spacing={5} sx={{ width: '100%' }}>
      <Stack spacing={3}>
        {files.map((file) => (
          <FileCard key={file.name} file={file} dimmed />
        ))}
      </Stack>

      <Alert severity="error">
        <AlertTitle>{SERVER_ERROR_COPY.title}</AlertTitle>
        {SERVER_ERROR_COPY.body}
      </Alert>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'center' }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ReplayRounded />}
          onClick={onRetry}
        >
          {SERVER_ERROR_COPY.primaryAction}
        </Button>
        <Button variant="text" color="cta" size="large" onClick={onBackToFiles}>
          {SERVER_ERROR_COPY.secondaryAction}
        </Button>
      </Stack>
    </Stack>
  );
}
