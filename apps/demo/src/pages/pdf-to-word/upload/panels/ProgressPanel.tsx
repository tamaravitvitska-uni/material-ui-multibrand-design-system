import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import type { DemoFile } from '../conversionMachine';
import { PROGRESS_COPY } from '../../demoData';
import { FileCard } from './FileCard';

export interface ProgressPanelProps {
  mode: 'analyzing' | 'uploading' | 'converting';
  file: DemoFile;
  /** 0–100 for uploading/converting; ignored while analyzing. */
  progress?: number;
  onCancel?: () => void;
}

/** Loading / upload-progress / conversion-progress states. */
export function ProgressPanel({ mode, file, progress = 0, onCancel }: ProgressPanelProps) {
  const theme = useTheme();
  const rounded = Math.round(progress);

  const stageIndex = Math.min(
    PROGRESS_COPY.convertingStages.length - 1,
    Math.floor((progress / 100) * PROGRESS_COPY.convertingStages.length),
  );

  const label =
    mode === 'analyzing'
      ? PROGRESS_COPY.analyzing
      : mode === 'uploading'
        ? `${PROGRESS_COPY.uploading}… ${rounded}%`
        : `${PROGRESS_COPY.convertingStages[stageIndex]} (${stageIndex + 1} of ${
            PROGRESS_COPY.convertingStages.length
          })…`;

  return (
    <Stack spacing={5} sx={{ width: '100%', alignItems: 'stretch' }}>
      <FileCard
        file={file}
        status={mode === 'analyzing' ? <CircularProgress size={20} color="primary" /> : undefined}
      />

      {/* Loaders are always violet — docs/modes/pdfguru.md §1 ("primary … loaders"). */}
      {mode !== 'analyzing' && (
        <LinearProgress
          variant="determinate"
          value={progress}
          color="primary"
          aria-label={label}
          sx={{
            height: 8,
            borderRadius: `${theme.tokens.radius.r9}px`,
            bgcolor: theme.tokens.scales.actionOpacity['8'],
            '& .MuiLinearProgress-bar': { borderRadius: `${theme.tokens.radius.r9}px` },
          }}
        />
      )}

      <Stack
        direction="row"
        spacing={4}
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant="body2" color="text.secondary" aria-live="polite">
          {label}
        </Typography>
        {mode === 'uploading' && onCancel && (
          <Button variant="text" color="cta" size="small" onClick={onCancel}>
            {PROGRESS_COPY.cancel}
          </Button>
        )}
        {mode === 'converting' && (
          <Typography variant="captionXs" color="text.secondary">
            {PROGRESS_COPY.convertingNote}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
