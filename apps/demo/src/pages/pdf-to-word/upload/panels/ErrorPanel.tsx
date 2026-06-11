import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ReplayRounded from '@mui/icons-material/ReplayRounded';
import UploadFileRounded from '@mui/icons-material/UploadFileRounded';
import type { DemoFile, ErrorReason } from '../conversionMachine';
import { ERROR_COPY } from '../../demoData';
import { FileCard } from './FileCard';

export interface ErrorPanelProps {
  reason: ErrorReason;
  file: DemoFile | null;
  /** Re-run the conversion with the same file (server errors only). */
  onRetry: () => void;
  /** Open the file picker for a fresh file. */
  onChooseAnother: () => void;
}

/**
 * Unsupported format / file too large / corrupted file / server error.
 * Pattern from docs/modes/pdfguru.md §4: Alert severity="error" + retry CTA
 * + supportive copy.
 */
export function ErrorPanel({ reason, file, onRetry, onChooseAnother }: ErrorPanelProps) {
  const copy = ERROR_COPY[reason];
  const retryable = reason === 'server-error' && file !== null;

  return (
    <Stack spacing={5} sx={{ width: '100%' }}>
      {file && (
        <FileCard file={file} format={reason === 'unsupported-format' ? 'file' : 'pdf'} dimmed />
      )}

      <Alert severity="error">
        <AlertTitle>{copy.title}</AlertTitle>
        {copy.body}
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
          startIcon={retryable ? <ReplayRounded /> : <UploadFileRounded />}
          onClick={retryable ? onRetry : onChooseAnother}
        >
          {copy.primaryAction}
        </Button>
        {retryable && (
          <Button variant="text" color="cta" size="large" onClick={onChooseAnother}>
            {ERROR_COPY['server-error'].secondaryAction}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
