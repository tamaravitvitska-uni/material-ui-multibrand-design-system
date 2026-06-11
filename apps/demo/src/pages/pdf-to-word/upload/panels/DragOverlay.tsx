import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { DashedFrame } from '../../components/DashedFrame';
import { InkIllustration } from '../../components/InkIllustration';
import { DRAG_OVERLAY } from '../../demoData';

export interface DragOverlayProps {
  open: boolean;
  /** Click/Escape fallback so the inspector-triggered overlay can be closed. */
  onDismiss: () => void;
}

/**
 * Full-screen drag & drop overlay: gray backdrop + white dashed frame +
 * illustration (docs/modes/pdfguru.md §4 "full-screen gray drag overlay").
 */
export function DragOverlay({ open, onDismiss }: DragOverlayProps) {
  const theme = useTheme();
  const { tokens } = theme;

  return (
    <Fade in={open}>
      <Box
        onClick={onDismiss}
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: theme.zIndex.modal,
          bgcolor: tokens.palette.service.backdropOverlay,
          p: 6,
          display: open ? 'block' : 'none',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DashedFrame radius={tokens.radius.r6} color={tokens.palette.common.white} />
          <Stack spacing={5} sx={{ alignItems: 'center', textAlign: 'center', px: 6 }}>
            <InkIllustration size={150} monochrome={tokens.palette.common.white} />
            <Typography variant="h4" component="p" sx={{ color: 'common.white' }}>
              {DRAG_OVERLAY.title}
            </Typography>
            <Typography variant="body1" sx={{ color: tokens.scales.whiteOpacity['75'] }}>
              {DRAG_OVERLAY.caption}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Fade>
  );
}
