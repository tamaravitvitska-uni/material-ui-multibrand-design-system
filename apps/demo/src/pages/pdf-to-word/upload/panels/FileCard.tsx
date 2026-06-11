import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import { useTheme } from '@mui/material/styles';
import { baseAccent } from '../../tokenAccents';
import type { DemoFile } from '../conversionMachine';

export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export interface FileBadgeProps {
  /** Per-format color role: PDF = crimson, DOC = Word blue (mode doc §4);
   *  'file' = neutral badge for unrecognized formats. */
  format: 'pdf' | 'doc' | 'file';
}

/** Square format badge — red PDF / blue DOC, as in the PDFGuru file rows. */
export function FileBadge({ format }: FileBadgeProps) {
  const theme = useTheme();
  const background =
    format === 'file'
      ? theme.tokens.palette.background.darkBlueGrey
      : baseAccent(theme, format === 'pdf' ? 'red' : 'blue');

  return (
    <Box
      sx={{
        width: 44,
        height: 44,
        flexShrink: 0,
        borderRadius: `${theme.tokens.radius.r3}px`,
        bgcolor: background,
        color: 'common.white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="captionXs" component="span" sx={{ fontWeight: 800, color: 'inherit' }}>
        {format.toUpperCase()}
      </Typography>
    </Box>
  );
}

export interface FileCardProps {
  file: DemoFile;
  format?: FileBadgeProps['format'];
  /** Overrides the size · pages caption line. */
  caption?: string;
  /** Right-hand slot: status icon, spinner… */
  status?: ReactNode;
  /** Renders a remove (trash) button when provided. */
  onRemove?: () => void;
  dimmed?: boolean;
}

/** File row used by selected / progress / password / error panels. */
export function FileCard({ file, format = 'pdf', caption, status, onRemove, dimmed }: FileCardProps) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{
        alignItems: 'center',
        width: '100%',
        textAlign: 'left',
        p: 4,
        borderRadius: `${theme.tokens.radius.r4}px`,
        bgcolor: theme.tokens.palette.background.blueGrey,
        opacity: dimmed ? 0.6 : 1,
      }}
    >
      <FileBadge format={format} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="body1" sx={{ fontWeight: 700 }} noWrap title={file.name}>
          {file.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {caption ??
            (format === 'file'
              ? formatFileSize(file.sizeBytes)
              : `${format.toUpperCase()} · ${formatFileSize(file.sizeBytes)} · ${file.pages} ${
                  file.pages === 1 ? 'page' : 'pages'
                }`)}
        </Typography>
      </Box>
      {status}
      {onRemove && (
        <Tooltip title="Remove file">
          <IconButton aria-label="Remove file" onClick={onRemove} size="small">
            <DeleteOutlineRounded fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}
