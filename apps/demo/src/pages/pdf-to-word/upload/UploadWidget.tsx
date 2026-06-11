import { useCallback, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import { useTheme } from '@mui/material/styles';
import { CONVERTED_ASSET_URL, FILE_LIST, LIMITS } from '../demoData';
import {
  canConvert,
  readyFiles,
  toDemoFile,
  type DemoFile,
  type QueuedFile,
} from './conversionMachine';
import type { ConversionFlow } from './useConversionFlow';
import { DragOverlay } from './panels/DragOverlay';
import { DropzonePanel } from './panels/DropzonePanel';
import { ErrorPanel } from './panels/ErrorPanel';
import { FilesList } from './panels/FilesList';
import { ProgressPanel } from './panels/ProgressPanel';
import { ResultPanel, convertedName } from './panels/ResultPanel';

async function downloadConvertedFile(file: DemoFile) {
  // The demo "backend" serves a pre-made valid .docx, renamed to the source
  // document's stem so the flow feels real.
  const response = await fetch(CONVERTED_ASSET_URL);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = convertedName(file);
  anchor.click();
  URL.revokeObjectURL(url);
}

async function downloadAll(files: DemoFile[]) {
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop -- sequential so every download lands
    await downloadConvertedFile(file);
  }
}

/** Summary line + Convert CTA under the file list (Figma node 49025-3914). */
function GatherFooter({
  files,
  onConvert,
}: {
  files: QueuedFile[];
  onConvert: () => void;
}) {
  const ready = readyFiles(files).length;
  const analyzing = files.some((row) => row.status.kind === 'analyzing');
  const locked = files.some((row) => row.status.kind === 'password');

  const summary = analyzing
    ? { text: FILE_LIST.analyzingSummary, color: 'text.secondary', check: false }
    : locked
      ? { text: FILE_LIST.blockedSummary, color: 'text.secondary', check: false }
      : ready > 0
        ? { text: FILE_LIST.analyzedSummary(ready), color: 'success.main', check: true }
        : { text: FILE_LIST.errorsOnlySummary, color: 'error.main', check: false };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={4}
      sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between' }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        {summary.check && <CheckCircleRounded fontSize="small" color="success" />}
        <Typography variant="caption" sx={{ fontWeight: 700, color: summary.color }}>
          {summary.text}
        </Typography>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        size="large"
        endIcon={<ArrowForwardRounded />}
        disabled={!canConvert(files)}
        onClick={onConvert}
      >
        {FILE_LIST.convert}
      </Button>
    </Stack>
  );
}

export interface UploadWidgetProps {
  flow: ConversionFlow;
}

/**
 * The conversion widget. While gathering, the dropzone stays on top with the
 * queued files listed below it (Figma node 49025-3914); batch phases swap
 * the card content. Owns the file input + window-level drag & drop.
 */
export function UploadWidget({ flow }: UploadWidgetProps) {
  const theme = useTheme();
  const { tokens } = theme;
  const { state, dispatch } = flow;
  const { phase, files, dragging } = state;

  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const gathering = phase.kind === 'gather';
  const atCapacity = files.length >= LIMITS.maxFiles;

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const addFiles = useCallback(
    (list: FileList | File[]) => {
      const mapped = Array.from(list).map(toDemoFile);
      if (mapped.length) dispatch({ type: 'FILES_ADDED', files: mapped });
    },
    [dispatch],
  );

  // Window-level drag & drop: dropping files anywhere on the page works.
  useEffect(() => {
    const hasFiles = (event: DragEvent) =>
      Array.from(event.dataTransfer?.types ?? []).includes('Files');

    const onDragEnter = (event: DragEvent) => {
      if (!hasFiles(event) || !gathering) return;
      event.preventDefault();
      dragDepth.current += 1;
      dispatch({ type: 'DRAG_CHANGED', dragging: true });
    };
    const onDragOver = (event: DragEvent) => {
      if (hasFiles(event)) event.preventDefault();
    };
    const onDragLeave = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) dispatch({ type: 'DRAG_CHANGED', dragging: false });
    };
    const onDrop = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      dragDepth.current = 0;
      if (gathering && event.dataTransfer?.files?.length) addFiles(event.dataTransfer.files);
      else dispatch({ type: 'DRAG_CHANGED', dragging: false });
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dispatch({ type: 'DRAG_CHANGED', dragging: false });
    };

    window.addEventListener('dragenter', onDragEnter);
    window.addEventListener('dragover', onDragOver);
    window.addEventListener('dragleave', onDragLeave);
    window.addEventListener('drop', onDrop);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('dragenter', onDragEnter);
      window.removeEventListener('dragover', onDragOver);
      window.removeEventListener('dragleave', onDragLeave);
      window.removeEventListener('drop', onDrop);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [gathering, addFiles, dispatch]);

  const batchFiles = files.map((row) => row.file);

  const body =
    phase.kind === 'gather' ? (
      <Stack spacing={5} sx={{ width: '100%' }}>
        <DropzonePanel
          variant={files.length ? 'compact' : phase.emptied ? 'empty' : 'default'}
          dragActive={dragging}
          atCapacity={atCapacity}
          onChooseFile={openFileDialog}
        />
        {files.length > 0 && (
          <>
            <FilesList
              files={files}
              onRemove={(id) => dispatch({ type: 'ROW_REMOVED', id })}
              onUnlock={(id, password) => dispatch({ type: 'PASSWORD_SUBMITTED', id, password })}
            />
            <GatherFooter files={files} onConvert={() => dispatch({ type: 'CONVERT_STARTED' })} />
          </>
        )}
      </Stack>
    ) : phase.kind === 'uploading' || phase.kind === 'converting' ? (
      <ProgressPanel
        mode={phase.kind}
        files={batchFiles}
        progress={phase.progress}
        onCancel={
          phase.kind === 'uploading' ? () => dispatch({ type: 'BACK_TO_FILES' }) : undefined
        }
      />
    ) : phase.kind === 'success' || phase.kind === 'download-ready' ? (
      <ResultPanel
        mode={phase.kind}
        files={batchFiles}
        onDownload={(file) => void downloadConvertedFile(file)}
        onDownloadAll={() => void downloadAll(batchFiles)}
        onConvertAnother={() => dispatch({ type: 'RESET' })}
      />
    ) : (
      <ErrorPanel
        files={batchFiles}
        onRetry={() => dispatch({ type: 'RETRY' })}
        onBackToFiles={() => dispatch({ type: 'BACK_TO_FILES' })}
      />
    );

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'background.paper',
        borderRadius: `${tokens.radius.r7}px`,
        boxShadow: 6,
        p: { xs: 4, md: 6 },
      }}
    >
      <Box
        sx={{
          // Stable card height while panels swap; the gather list grows freely.
          minHeight: gathering && files.length ? 0 : { xs: 320, md: 360 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& > *': { width: '100%' },
        }}
      >
        {body}
      </Box>

      <input
        ref={inputRef}
        type="file"
        accept={LIMITS.acceptAttribute}
        multiple
        hidden
        aria-hidden
        tabIndex={-1}
        onChange={(event) => {
          if (event.target.files?.length) addFiles(event.target.files);
          event.target.value = '';
        }}
      />

      <DragOverlay
        open={dragging}
        onDismiss={() => dispatch({ type: 'DRAG_CHANGED', dragging: false })}
      />
    </Box>
  );
}
