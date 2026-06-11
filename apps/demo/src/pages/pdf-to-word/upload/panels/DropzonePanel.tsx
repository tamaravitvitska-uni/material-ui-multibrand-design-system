import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import UploadFileRounded from '@mui/icons-material/UploadFileRounded';
import { useTheme } from '@mui/material/styles';
import { DashedFrame } from '../../components/DashedFrame';
import { COMPACT_DROPZONE, EMPTY_STATE, HERO, ILLUSTRATION_URL } from '../../demoData';

export interface DropzonePanelProps {
  /**
   * 'default' — tall, with the hero illustration; 'empty' — post-removal
   * copy; 'compact' — slim strip shown above the queued-file list
   * (Figma node 49025-3914 keeps the dropzone after files are added).
   */
  variant: 'default' | 'empty' | 'compact';
  /** A file is being dragged over the page — violet active styling. */
  dragActive: boolean;
  /** File cap reached — keep the zone visible but disabled. */
  atCapacity?: boolean;
  onChooseFile: () => void;
}

/**
 * Drop surface. Multicolor dashed frame from the PDFGuru tool-page dropzone;
 * drag-over switches to the violet tint + violet dashes described in
 * docs/modes/pdfguru.md §4.
 */
export function DropzonePanel({ variant, dragActive, atCapacity, onChooseFile }: DropzonePanelProps) {
  const theme = useTheme();
  const { tokens } = theme;
  const compact = variant === 'compact';

  const title = compact
    ? COMPACT_DROPZONE.title
    : variant === 'empty'
      ? EMPTY_STATE.title
      : HERO.dropTitle;

  return (
    <Box
      role="button"
      tabIndex={atCapacity ? -1 : 0}
      aria-label={`${title}. ${HERO.formatsCaption}`}
      aria-disabled={atCapacity || undefined}
      onClick={atCapacity ? undefined : onChooseFile}
      onKeyDown={(event) => {
        if (!atCapacity && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onChooseFile();
        }
      }}
      sx={{
        position: 'relative',
        cursor: atCapacity ? 'default' : 'pointer',
        borderRadius: `${tokens.radius.r5}px`,
        bgcolor: dragActive ? tokens.scales.primaryOpacity['8'] : 'transparent',
        transition: theme.transitions.create('background-color', { duration: 150 }),
        px: { xs: 4, md: compact ? 6 : 12 },
        py: compact ? { xs: 5, md: 6 } : { xs: 8, md: 10 },
        opacity: atCapacity ? 0.6 : 1,
        '&:hover': atCapacity ? undefined : { bgcolor: tokens.scales.primaryOpacity['4'] },
        '&:focus-visible': {
          outline: `2px solid ${tokens.palette.primary.main}`,
          outlineOffset: 2,
        },
      }}
    >
      <DashedFrame
        radius={tokens.radius.r5}
        color={dragActive ? tokens.palette.primary.main : undefined}
      />

      {/* The full-screen DragOverlay carries the message while dragging —
          fade this content out so the two don't collide through the backdrop. */}
      <Stack
        spacing={compact ? 2 : 4}
        sx={{
          alignItems: 'center',
          textAlign: 'center',
          opacity: dragActive ? 0 : 1,
          transition: theme.transitions.create('opacity', { duration: 150 }),
        }}
      >
        {!compact && (
          // PDFGuru illustration (Figma "Graphical Design Forma" 3663-4724).
          <Box
            component="img"
            src={ILLUSTRATION_URL}
            alt=""
            sx={{ width: { xs: 132, md: 168 }, height: { xs: 132, md: 168 } }}
          />
        )}

        <Stack spacing={1} sx={{ alignItems: 'center' }}>
          <Typography
            variant={compact ? 'h6' : 'h5'}
            component="p"
            sx={{ color: 'primary.main', fontWeight: 800 }}
          >
            {title}
          </Typography>
          {variant === 'empty' && (
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
              {EMPTY_STATE.body}
            </Typography>
          )}
          {variant === 'default' && (
            <Typography variant="body2" color="text.secondary">
              {HERO.dropHint}
            </Typography>
          )}
        </Stack>

        {!atCapacity && (
          <Button
            variant="contained"
            color="primary"
            size={compact ? 'medium' : 'large'}
            startIcon={<UploadFileRounded />}
            onClick={(event) => {
              event.stopPropagation();
              onChooseFile();
            }}
          >
            {variant === 'empty' ? EMPTY_STATE.action : HERO.chooseFile}
          </Button>
        )}

        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700 }}>
          {atCapacity ? COMPACT_DROPZONE.atCapacity : HERO.formatsCaption}
        </Typography>
      </Stack>
    </Box>
  );
}
