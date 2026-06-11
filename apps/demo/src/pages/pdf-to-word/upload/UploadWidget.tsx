import { useCallback, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { CONVERTED_ASSET_URL, LIMITS } from '../demoData';
import { toDemoFile, type DemoFile } from './conversionMachine';
import type { ConversionFlow } from './useConversionFlow';
import { DragOverlay } from './panels/DragOverlay';
import { DropzonePanel } from './panels/DropzonePanel';
import { ErrorPanel } from './panels/ErrorPanel';
import { PasswordPanel } from './panels/PasswordPanel';
import { ProgressPanel } from './panels/ProgressPanel';
import { ResultPanel, convertedName } from './panels/ResultPanel';
import { SelectedPanel } from './panels/SelectedPanel';

/** Phases during which a dropped/picked file is ignored. */
const BUSY_KINDS = new Set(['analyzing', 'uploading', 'converting', 'success']);

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

export interface UploadWidgetProps {
  flow: ConversionFlow;
}

/**
 * The conversion widget: a single PDFGuru funnel card that renders one panel
 * per machine phase and owns the file input + window-level drag & drop.
 */
export function UploadWidget({ flow }: UploadWidgetProps) {
  const theme = useTheme();
  const { tokens } = theme;
  const { state, dispatch } = flow;
  const { phase, dragging } = state;

  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const busy = BUSY_KINDS.has(phase.kind);

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const pickFile = useCallback(
    (file: File) => {
      dispatch({ type: 'FILE_PICKED', file: toDemoFile(file) });
    },
    [dispatch],
  );

  // Window-level drag & drop: dropping a file anywhere on the page works.
  useEffect(() => {
    const hasFiles = (event: DragEvent) =>
      Array.from(event.dataTransfer?.types ?? []).includes('Files');

    const onDragEnter = (event: DragEvent) => {
      if (!hasFiles(event) || busy) return;
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
      const file = event.dataTransfer?.files?.[0];
      if (file && !busy) pickFile(file);
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
  }, [busy, dispatch, pickFile]);

  const panel = (() => {
    switch (phase.kind) {
      case 'idle':
      case 'empty':
        return (
          <DropzonePanel variant={phase.kind} dragActive={dragging} onChooseFile={openFileDialog} />
        );
      case 'analyzing':
        return <ProgressPanel mode="analyzing" file={phase.file} />;
      case 'selected':
        return (
          <SelectedPanel
            file={phase.file}
            onConvert={() => dispatch({ type: 'CONVERT_STARTED' })}
            onRemove={() => dispatch({ type: 'FILE_REMOVED' })}
          />
        );
      case 'password':
        return (
          <PasswordPanel
            file={phase.file}
            failedAttempt={phase.failedAttempt}
            onSubmit={(password) => dispatch({ type: 'PASSWORD_SUBMITTED', password })}
            onUseAnotherFile={() => dispatch({ type: 'FILE_REMOVED' })}
          />
        );
      case 'uploading':
        return (
          <ProgressPanel
            mode="uploading"
            file={phase.file}
            progress={phase.progress}
            onCancel={() => dispatch({ type: 'UPLOAD_CANCELLED' })}
          />
        );
      case 'converting':
        return <ProgressPanel mode="converting" file={phase.file} progress={phase.progress} />;
      case 'success':
      case 'download-ready':
        return (
          <ResultPanel
            mode={phase.kind}
            file={phase.file}
            onDownload={() => void downloadConvertedFile(phase.file)}
            onConvertAnother={() => dispatch({ type: 'RESET' })}
          />
        );
      case 'error':
        return (
          <ErrorPanel
            reason={phase.reason}
            file={phase.file}
            onRetry={() => dispatch({ type: 'CONVERT_STARTED' })}
            onChooseAnother={openFileDialog}
          />
        );
      default:
        return null;
    }
  })();

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
          // Fixed-ish height keeps the funnel card stable while panels swap.
          minHeight: { xs: 320, md: 360 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& > *': { width: '100%' },
        }}
      >
        {panel}
      </Box>

      <input
        ref={inputRef}
        type="file"
        accept={LIMITS.acceptAttribute}
        hidden
        aria-hidden
        tabIndex={-1}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) pickFile(file);
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
