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
  /** 'success' = celebratory moment right after conversion; 'download-ready' adds the result list. */
  mode: 'success' | 'download-ready';
  files: DemoFile[];
  onDownload: (file: DemoFile) => void;
  onDownloadAll: () => void;
  onConvertAnother: () => void;
}

/** Conversion success + download-ready states — mint pill per mode doc §4. */
export function ResultPanel({
  mode,
  files,
  onDownload,
  onDownloadAll,
  onConvertAnother,
}: ResultPanelProps) {
  const theme = useTheme();
  const { tokens } = theme;
  const single = files.length === 1;

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
            {RESULT_COPY.successTitle(files.length)}
          </Typography>
        </Stack>
      </Grow>

      <Typography variant="body2" color="text.secondary" aria-live="polite">
        {RESULT_COPY.successBody}
      </Typography>

      {mode === 'download-ready' && (
        <Stack spacing={5} sx={{ width: '100%', alignItems: 'center' }}>
          <Stack spacing={3} sx={{ width: '100%' }}>
            {files.map((file) => (
              <FileCard
                key={file.name}
                file={{ ...file, name: convertedName(file) }}
                format="doc"
                caption={`DOCX · ${formatFileSize(Math.round(file.sizeBytes * 0.92))} · ${
                  file.pages
                } ${file.pages === 1 ? 'page' : 'pages'}`}
                status={
                  // Per-row download for multi-file batches; the single-file
                  // case gets one big crimson CTA below instead.
                  !single ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<DownloadRounded />}
                      onClick={() => onDownload(file)}
                    >
                      {RESULT_COPY.downloadRow}
                    </Button>
                  ) : undefined
                }
              />
            ))}
          </Stack>

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
              onClick={single ? () => onDownload(files[0]) : onDownloadAll}
            >
              {single ? RESULT_COPY.download : RESULT_COPY.downloadAll}
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
