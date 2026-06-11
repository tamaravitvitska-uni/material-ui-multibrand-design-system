import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import TuneRounded from '@mui/icons-material/TuneRounded';
import { useTheme } from '@mui/material/styles';
import { SAMPLE_FILE, TRIGGER_HELP } from '../demoData';
import type { FlowState, QueuedFile } from '../upload/conversionMachine';
import type { ConversionFlow } from '../upload/useConversionFlow';

const fileA = SAMPLE_FILE;
const fileB = { name: 'Invoice-march.pdf', sizeBytes: 482_304, pages: 4 };

const row = (id: string, file: typeof fileA, status: QueuedFile['status']): QueuedFile => ({
  id: `demo-${id}`,
  file,
  status,
});

const READY_TWO: QueuedFile[] = [
  row('a', fileA, { kind: 'ready' }),
  row('b', fileB, { kind: 'ready' }),
];

interface InspectorEntry {
  label: string;
  /** Identifies the active chip. */
  match: (state: FlowState) => boolean;
  jump: { phase: FlowState['phase']; files: QueuedFile[]; dragging?: boolean };
}

const inGather = (state: FlowState) => state.phase.kind === 'gather';

const ENTRIES: InspectorEntry[] = [
  {
    label: 'Default',
    match: (s) =>
      inGather(s) && !s.files.length && !s.dragging && !(s.phase.kind === 'gather' && s.phase.emptied),
    jump: { phase: { kind: 'gather', emptied: false }, files: [] },
  },
  {
    label: 'Drag & drop',
    match: (s) => s.dragging,
    jump: { phase: { kind: 'gather', emptied: false }, files: [], dragging: true },
  },
  {
    label: 'Loading (analyzing)',
    match: (s) => s.files.some((r) => r.status.kind === 'analyzing'),
    jump: {
      phase: { kind: 'gather', emptied: false },
      files: [row('ready', fileB, { kind: 'ready' }), row('an', fileA, { kind: 'analyzing' })],
    },
  },
  {
    label: 'Files selected',
    match: (s) => inGather(s) && s.files.length > 0 && s.files.every((r) => r.status.kind === 'ready'),
    jump: { phase: { kind: 'gather', emptied: false }, files: READY_TWO },
  },
  {
    label: 'Password protected',
    match: (s) => s.files.some((r) => r.status.kind === 'password'),
    jump: {
      phase: { kind: 'gather', emptied: false },
      files: [
        row('ready', fileB, { kind: 'ready' }),
        row('pw', { ...fileA, name: 'Contract-protected.pdf' }, { kind: 'password', failedAttempt: false }),
      ],
    },
  },
  {
    label: 'Unsupported format',
    match: (s) =>
      s.files.some((r) => r.status.kind === 'row-error' && r.status.reason === 'unsupported-format'),
    jump: {
      phase: { kind: 'gather', emptied: false },
      files: [
        row('err', { name: 'Photo-album.heic', sizeBytes: 1_814_528, pages: 1 }, { kind: 'row-error', reason: 'unsupported-format' }),
        row('ready', fileB, { kind: 'ready' }),
      ],
    },
  },
  {
    label: 'File too large',
    match: (s) =>
      s.files.some((r) => r.status.kind === 'row-error' && r.status.reason === 'file-too-large'),
    jump: {
      phase: { kind: 'gather', emptied: false },
      files: [
        row('err', { name: 'Huge-catalog.pdf', sizeBytes: 25 * 1024 * 1024, pages: 260 }, { kind: 'row-error', reason: 'file-too-large' }),
        row('ready', fileB, { kind: 'ready' }),
      ],
    },
  },
  {
    label: 'Corrupted file',
    match: (s) =>
      s.files.some((r) => r.status.kind === 'row-error' && r.status.reason === 'corrupted-file'),
    jump: {
      phase: { kind: 'gather', emptied: false },
      files: [
        row('err', { ...fileA, name: 'Recovered-scan.pdf' }, { kind: 'row-error', reason: 'corrupted-file' }),
        row('ready', fileB, { kind: 'ready' }),
      ],
    },
  },
  {
    label: 'Upload progress',
    match: (s) => s.phase.kind === 'uploading',
    jump: { phase: { kind: 'uploading', progress: 46 }, files: READY_TWO },
  },
  {
    label: 'Conversion progress',
    match: (s) => s.phase.kind === 'converting',
    jump: { phase: { kind: 'converting', progress: 58 }, files: READY_TWO },
  },
  {
    label: 'Conversion success',
    match: (s) => s.phase.kind === 'success',
    jump: { phase: { kind: 'success' }, files: READY_TWO },
  },
  {
    label: 'Download ready',
    match: (s) => s.phase.kind === 'download-ready',
    jump: { phase: { kind: 'download-ready' }, files: READY_TWO },
  },
  {
    label: 'Server error',
    match: (s) => s.phase.kind === 'server-error',
    jump: { phase: { kind: 'server-error' }, files: READY_TWO },
  },
  {
    label: 'Empty',
    match: (s) => s.phase.kind === 'gather' && s.phase.emptied && !s.files.length,
    jump: { phase: { kind: 'gather', emptied: true }, files: [] },
  },
];

/**
 * Demo-only floating panel: jump the upload widget into any of its states
 * for review/QA. Not part of the product page itself.
 */
export function StateInspector({ flow }: { flow: ConversionFlow }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { state, dispatch } = flow;

  return (
    <Box sx={{ position: 'fixed', right: 16, bottom: 16, zIndex: theme.zIndex.fab }}>
      <Stack spacing={3} sx={{ alignItems: 'flex-end' }}>
        <Collapse in={open}>
          <Paper elevation={8} sx={{ p: 4, width: 320 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
              Demo state inspector
            </Typography>
            <Typography variant="captionXs" color="text.secondary" component="p" sx={{ mb: 3 }}>
              Jump the upload widget into any flow state. {TRIGGER_HELP}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={state.paused}
                  onChange={() => dispatch({ type: 'PAUSE_TOGGLED' })}
                />
              }
              label={
                <Typography variant="caption">Freeze auto-advance (for screenshots)</Typography>
              }
              sx={{ mb: 3, ml: 0 }}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {ENTRIES.map((entry) => {
                const active = entry.match(state);
                return (
                  <Chip
                    key={entry.label}
                    label={entry.label}
                    size="small"
                    color={active ? 'primary' : undefined}
                    variant={active ? 'filled' : 'outlined'}
                    onClick={() =>
                      dispatch({
                        type: 'JUMPED',
                        phase: entry.jump.phase,
                        files: entry.jump.files,
                        dragging: entry.jump.dragging,
                      })
                    }
                  />
                );
              })}
            </Box>
          </Paper>
        </Collapse>

        <Tooltip title="Demo: jump between upload states" placement="left">
          <Button
            variant="contained"
            color="cta"
            size="small"
            startIcon={<TuneRounded />}
            onClick={() => setOpen((value) => !value)}
          >
            Demo states
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  );
}
