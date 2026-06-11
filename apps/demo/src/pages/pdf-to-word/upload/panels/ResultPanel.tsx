import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import { useTheme } from '@mui/material/styles';
import type { DemoFile } from '../conversionMachine';
import { RESULT_COPY } from '../../demoData';
import { FileCard, formatFileSize } from './FileCard';

/** "name.pdf" → "name.docx" */
export function convertedName(file: DemoFile): string {
  return `${file.name.replace(/\.pdf$/i, '')}.docx`;
}

export interface ResultPanelProps {
  /** 'success' = celebratory moment right after conversion; 'download-ready' adds the result card. */
  mode: 'success' | 'download-ready';
  file: DemoFile;
  onDownload: () => void;
  onConvertAnother: () => void;
}

/** Conversion success + download-ready states — mint pill per mode doc §4. */
export function ResultPanel({ mode, file, onDownload, onConvertAnother }: ResultPanelProps) {
  const theme = useTheme();
  const { tokens } = theme;

  return (
    <Stack spacing={5} sx={{ width: '100%', alignItems: 'center' }}>
      <Grow in appear>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            px: 5,
            py: 2,
            borderRadius: `${tokens.radius.r9}px`,
            bgcolor: tokens.scales.successOpacity['16'],
            color: 'success.dark',
          }}
        >
          <CheckCircleRounded fontSize="small" color="inherit" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'inherit' }}>
            {RESULT_COPY.successTitle}
          </Typography>
        </Stack>
      </Grow>

      <Typography variant="body2" color="text.secondary" aria-live="polite">
        {RESULT_COPY.successBody}
      </Typography>

      {mode === 'download-ready' && (
        <Stack spacing={5} sx={{ width: '100%', alignItems: 'center' }}>
          <Box sx={{ width: '100%' }}>
            <FileCard
              file={{ ...file, name: convertedName(file) }}
              format="doc"
              caption={`DOCX · ${formatFileSize(Math.round(file.sizeBytes * 0.92))} · ${
                file.pages
              } ${file.pages === 1 ? 'page' : 'pages'}`}
            />
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'center' }}
          >
            {/* Download = crimson "editor/download" action; violet stays the funnel color
                (docs/modes/pdfguru.md §1, §7). */}
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<DownloadRounded />}
              onClick={onDownload}
            >
              {RESULT_COPY.download}
            </Button>
            <Button variant="text" color="primary" size="large" onClick={onConvertAnother}>
              {RESULT_COPY.convertAnother}
            </Button>
          </Stack>

          <Typography variant="captionXs" color="text.secondary">
            {RESULT_COPY.autoDeleteNote}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
