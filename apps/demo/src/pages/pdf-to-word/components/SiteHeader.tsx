import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CheckRounded from '@mui/icons-material/CheckRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import MenuRounded from '@mui/icons-material/MenuRounded';
import { useTheme } from '@mui/material/styles';
import { CONTENT_MAX_WIDTH, HEADER_LINKS, TOOL_MENU } from '../demoData';
import { baseAccent } from '../tokenAccents';
import { BrandWordmark } from './BrandWordmark';

/** Per-format accent dot for tool menu items (mode doc §4: Word blue, Excel
 *  green, PPT orange, PDF red) — colors from basePalette tokens. */
function FormatDot({ format }: { format: (typeof TOOL_MENU)[number]['format'] }) {
  const theme = useTheme();
  const color = baseAccent(
    theme,
    ({ doc: 'blue', xls: 'green', ppt: 'orange', pdf: 'red' } as const)[format],
  );

  return (
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: `${theme.tokens.radius.r1}px`,
        bgcolor: color,
        flexShrink: 0,
      }}
    />
  );
}

/**
 * PDFGuru marketing header: wordmark left, slim "Tools ▾ / Contact us" nav,
 * outlined login right (Figma node 50648-16354). Mobile: logo + hamburger
 * drawer (docs/modes/pdfguru.md §3).
 */
export function SiteHeader() {
  const [toolsAnchor, setToolsAnchor] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position="sticky">
      <Container sx={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <Toolbar disableGutters sx={{ gap: 6, py: 2 }}>
          <BrandWordmark />

          {/* Desktop nav */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ flexGrow: 1, ml: 6, display: { xs: 'none', md: 'flex' } }}
          >
            <Button
              variant="text"
              color="cta"
              endIcon={<ExpandMoreRounded />}
              onClick={(event) => setToolsAnchor(event.currentTarget)}
              aria-haspopup="menu"
              aria-expanded={toolsAnchor ? 'true' : undefined}
            >
              {HEADER_LINKS.tools}
            </Button>
            <Button variant="text" color="cta">
              {HEADER_LINKS.contact}
            </Button>
          </Stack>

          <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />

          <Button
            variant="outlined"
            color="cta"
            size="medium"
            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
          >
            {HEADER_LINKS.login}
          </Button>

          {/* Mobile hamburger */}
          <IconButton
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuRounded />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Tools mega-menu (radius 16 surface / 10 items via theme) */}
      <Menu
        anchorEl={toolsAnchor}
        open={Boolean(toolsAnchor)}
        onClose={() => setToolsAnchor(null)}
        elevation={8}
      >
        {TOOL_MENU.map((tool) => (
          <MenuItem
            key={tool.key}
            selected={Boolean(tool.current)}
            onClick={() => setToolsAnchor(null)}
            sx={{ minWidth: 240, gap: 3, py: 2.5 }}
          >
            <FormatDot format={tool.format} />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {tool.label}
            </Typography>
            {tool.current && <CheckRounded fontSize="small" color="primary" />}
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 4 }} role="presentation">
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <BrandWordmark />
            <IconButton aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
              <CloseRounded />
            </IconButton>
          </Stack>
          <List>
            {TOOL_MENU.map((tool) => (
              <ListItemButton
                key={tool.key}
                selected={Boolean(tool.current)}
                onClick={() => setDrawerOpen(false)}
                sx={{ gap: 3 }}
              >
                <FormatDot format={tool.format} />
                <ListItemText
                  primary={tool.label}
                  slotProps={{ primary: { variant: 'body2' } }}
                />
              </ListItemButton>
            ))}
            <ListItemButton onClick={() => setDrawerOpen(false)}>
              <ListItemText
                primary={HEADER_LINKS.contact}
                slotProps={{ primary: { variant: 'body2' } }}
              />
            </ListItemButton>
          </List>
          <Button variant="outlined" color="cta" fullWidth sx={{ mt: 4 }}>
            {HEADER_LINKS.login}
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}
