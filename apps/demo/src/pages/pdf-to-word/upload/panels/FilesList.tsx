import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded';
import LockRounded from '@mui/icons-material/LockRounded';
import { useTheme } from '@mui/material/styles';
import { FILE_LIST, PASSWORD_PANEL, ROW_ERROR_COPY } from '../../demoData';
import type { QueuedFile } from '../conversionMachine';
import { FileBadge, formatFileSize } from './FileCard';

interface FileRowProps {
  row: QueuedFile;
  onRemove: () => void;
  onUnlock: (password: string) => void;
}

/** Inline unlock form for password-protected rows. */
function UnlockForm({ failedAttempt, onUnlock }: { failedAttempt: boolean; onUnlock: (pw: string) => void }) {
  const [password, setPassword] = useState('');
  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        onUnlock(password);
      }}
      sx={{ mt: 3 }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        sx={{ alignItems: { xs: 'stretch', sm: 'flex-start' } }}
      >
        <TextField
          type="password"
          size="small"
          label={PASSWORD_PANEL.fieldLabel}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={failedAttempt}
          helperText={failedAttempt ? PASSWORD_PANEL.wrongPassword : PASSWORD_PANEL.hint}
          fullWidth
          sx={{ maxWidth: { sm: 320 } }}
        />
        <Button type="submit" variant="contained" color="primary" size="medium" disabled={!password}>
          {PASSWORD_PANEL.submit}
        </Button>
      </Stack>
    </Box>
  );
}

export interface FilesListProps {
  files: QueuedFile[];
  onRemove: (id: string) => void;
  onUnlock: (id: string, password: string) => void;
}

/** The queued-file list rendered under the dropzone. */
export function FilesList({ files, onRemove, onUnlock }: FilesListProps) {
  return (
    <Stack spacing={3}>
      {files.map((row) => (
        <FileRow
          key={row.id}
          row={row}
          onRemove={() => onRemove(row.id)}
          onUnlock={(password) => onUnlock(row.id, password)}
        />
      ))}
    </Stack>
  );
}

/**
 * One queued file: status caption above the name (Figma node 49025-3914 —
 * green "ready to process" line), trash on the right; password rows expand
 * an inline unlock form.
 */
export function FileRow({ row, onRemove, onUnlock }: FileRowProps) {
  const theme = useTheme();
  const { status, file } = row;

  const caption =
    status.kind === 'ready'
      ? { text: FILE_LIST.readyCaption, color: 'success.main' }
      : status.kind === 'analyzing'
        ? { text: FILE_LIST.analyzingCaption, color: 'text.secondary' }
        : status.kind === 'password'
          ? { text: FILE_LIST.passwordCaption, color: 'text.secondary' }
          : { text: ROW_ERROR_COPY[status.reason], color: 'error.main' };

  const trailing =
    status.kind === 'analyzing' ? (
      <CircularProgress size={20} color="primary" />
    ) : status.kind === 'ready' ? (
      <CheckCircleRounded color="success" aria-label="Ready to convert" />
    ) : status.kind === 'password' ? (
      <LockRounded color="primary" aria-label="Password protected" />
    ) : (
      <ErrorOutlineRounded color="error" aria-label="File error" />
    );

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: `${theme.tokens.radius.r4}px`,
        bgcolor: theme.tokens.palette.background.blueGrey,
      }}
    >
      <Stack direction="row" spacing={4} sx={{ alignItems: 'center', textAlign: 'left' }}>
        <FileBadge
          format={
            status.kind === 'row-error' && status.reason === 'unsupported-format' ? 'file' : 'pdf'
          }
        />
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="captionXs" component="p" sx={{ fontWeight: 700, color: caption.color }}>
            {caption.text}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 700 }} noWrap title={file.name}>
            {file.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatFileSize(file.sizeBytes)}
            {status.kind !== 'row-error' &&
              ` · ${file.pages} ${file.pages === 1 ? 'page' : 'pages'}`}
          </Typography>
        </Box>
        {trailing}
        <Tooltip title="Remove file">
          <IconButton aria-label={`Remove ${file.name}`} onClick={onRemove} size="small">
            <DeleteOutlineRounded fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Collapse in={status.kind === 'password'} unmountOnExit>
        <UnlockForm
          failedAttempt={status.kind === 'password' && status.failedAttempt}
          onUnlock={onUnlock}
        />
      </Collapse>
    </Box>
  );
}
