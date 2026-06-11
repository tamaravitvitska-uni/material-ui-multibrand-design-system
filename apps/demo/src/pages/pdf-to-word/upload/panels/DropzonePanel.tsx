import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import UploadFileRounded from '@mui/icons-material/UploadFileRounded';
import { useTheme } from '@mui/material/styles';
import { DashedFrame } from '../../components/DashedFrame';
import { InkIllustration } from '../../components/InkIllustration';
import { EMPTY_STATE, HERO } from '../../demoData';

export interface DropzonePanelProps {
  /** 'empty' renders the post-removal variant (different copy). */
  variant: 'idle' | 'empty';
  /** A file is being dragged over the page — violet active styling. */
  dragActive: boolean;
  onChooseFile: () => void;
}

/**
 * Default / empty / drag-over surface. Multicolor dashed frame from the
 * PDFGuru tool-page dropzone; drag-over switches to the violet tint +
 * violet dashes described in docs/modes/pdfguru.md §4.
 */
export function DropzonePanel({ variant, dragActive, onChooseFile }: DropzonePanelProps) {
  const theme = useTheme();
  const { tokens } = theme;
  const isEmpty = variant === 'empty';

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-label={`${HERO.dropTitle}. ${HERO.formatsCaption}`}
      onClick={onChooseFile}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onChooseFile();
        }
      }}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: `${tokens.radius.r5}px`,
        bgcolor: dragActive ? tokens.scales.primaryOpacity['8'] : 'transparent',
        transition: theme.transitions.create('background-color', { duration: 150 }),
        px: { xs: 4, md: 12 },
        py: { xs: 8, md: 10 },
        '&:hover': { bgcolor: tokens.scales.primaryOpacity['4'] },
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
        spacing={4}
        sx={{
          alignItems: 'center',
          textAlign: 'center',
          opacity: dragActive ? 0 : 1,
          transition: theme.transitions.create('opacity', { duration: 150 }),
        }}
      >
        <InkIllustration size={132} />

        <Stack spacing={1} sx={{ alignItems: 'center' }}>
          <Typography variant="h5" component="p" sx={{ color: 'primary.main' }}>
            {isEmpty ? EMPTY_STATE.title : HERO.dropTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
            {isEmpty ? EMPTY_STATE.body : HERO.dropHint}
          </Typography>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<UploadFileRounded />}
          onClick={(event) => {
            event.stopPropagation();
            onChooseFile();
          }}
        >
          {isEmpty ? EMPTY_STATE.action : HERO.chooseFile}
        </Button>

        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700 }}>
          {HERO.formatsCaption}
        </Typography>
      </Stack>
    </Box>
  );
}
