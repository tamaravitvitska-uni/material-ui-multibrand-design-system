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
import type { FlowAction, UploadPhase } from '../upload/conversionMachine';
import type { ConversionFlow } from '../upload/useConversionFlow';

interface InspectorEntry {
  label: string;
  /** Identifies the active chip. */
  match: (phase: UploadPhase, dragging: boolean) => boolean;
  actions: FlowAction[];
}

const file = SAMPLE_FILE;

const ENTRIES: InspectorEntry[] = [
  { label: 'Default', match: (p, d) => p.kind === 'idle' && !d, actions: [{ type: 'JUMPED', phase: { kind: 'idle' } }, { type: 'DRAG_CHANGED', dragging: false }] },
  { label: 'Drag & drop', match: (_p, d) => d, actions: [{ type: 'JUMPED', phase: { kind: 'idle' } }, { type: 'DRAG_CHANGED', dragging: true }] },
  { label: 'Loading (analyzing)', match: (p) => p.kind === 'analyzing', actions: [{ type: 'JUMPED', phase: { kind: 'analyzing', file } }] },
  { label: 'File selected', match: (p) => p.kind === 'selected', actions: [{ type: 'JUMPED', phase: { kind: 'selected', file } }] },
  { label: 'Upload progress', match: (p) => p.kind === 'uploading', actions: [{ type: 'JUMPED', phase: { kind: 'uploading', file, progress: 46 } }] },
  { label: 'Conversion progress', match: (p) => p.kind === 'converting', actions: [{ type: 'JUMPED', phase: { kind: 'converting', file, progress: 58 } }] },
  { label: 'Conversion success', match: (p) => p.kind === 'success', actions: [{ type: 'JUMPED', phase: { kind: 'success', file } }] },
  { label: 'Download ready', match: (p) => p.kind === 'download-ready', actions: [{ type: 'JUMPED', phase: { kind: 'download-ready', file } }] },
  { label: 'Password protected', match: (p) => p.kind === 'password', actions: [{ type: 'JUMPED', phase: { kind: 'password', file: { ...file, name: 'Contract-protected.pdf' }, failedAttempt: false } }] },
  { label: 'Unsupported format', match: (p) => p.kind === 'error' && p.reason === 'unsupported-format', actions: [{ type: 'JUMPED', phase: { kind: 'error', file: { ...file, name: 'Photo-album.heic' }, reason: 'unsupported-format' } }] },
  { label: 'File too large', match: (p) => p.kind === 'error' && p.reason === 'file-too-large', actions: [{ type: 'JUMPED', phase: { kind: 'error', file: { ...file, name: 'Huge-catalog.pdf', sizeBytes: 25 * 1024 * 1024, pages: 260 }, reason: 'file-too-large' } }] },
  { label: 'Corrupted file', match: (p) => p.kind === 'error' && p.reason === 'corrupted-file', actions: [{ type: 'JUMPED', phase: { kind: 'error', file: { ...file, name: 'Recovered-scan.pdf' }, reason: 'corrupted-file' } }] },
  { label: 'Server error', match: (p) => p.kind === 'error' && p.reason === 'server-error', actions: [{ type: 'JUMPED', phase: { kind: 'error', file, reason: 'server-error' } }] },
  { label: 'Empty', match: (p) => p.kind === 'empty', actions: [{ type: 'JUMPED', phase: { kind: 'empty' } }] },
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
                const active = entry.match(state.phase, state.dragging);
                return (
                  <Chip
                    key={entry.label}
                    label={entry.label}
                    size="small"
                    color={active ? 'primary' : undefined}
                    variant={active ? 'filled' : 'outlined'}
                    onClick={() => entry.actions.forEach(dispatch)}
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
