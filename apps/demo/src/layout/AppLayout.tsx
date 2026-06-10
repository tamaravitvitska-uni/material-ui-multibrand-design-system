import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import { BrandSwitcher, useBrand } from '@multibrand/design-system';

const NAV = [
  { label: 'Landing demo', path: '/' },
  { label: 'Components', path: '/components' },
  { label: 'Pricing demo', path: '/pricing' },
  { label: 'Tokens', path: '/tokens' },
];

export function AppLayout() {
  const { meta, tokens } = useBrand();
  const { pathname } = useLocation();
  const current = NAV.find((item) => item.path === pathname)?.path ?? '/';

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 6 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: `${tokens.radius.r2}px`,
              bgcolor: 'primary.main',
              flexShrink: 0,
            }}
          />
          <Typography variant="h6" sx={{ mr: 4, whiteSpace: 'nowrap' }}>
            {meta.label}
          </Typography>
          <Tabs value={current} sx={{ flexGrow: 1, minHeight: 0 }}>
            {NAV.map((item) => (
              <Tab
                key={item.path}
                label={item.label}
                value={item.path}
                component={RouterLink}
                to={item.path}
              />
            ))}
          </Tabs>
          <BrandSwitcher />
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Box component="footer" sx={{ py: 6, borderTop: 1, borderColor: 'divider' }}>
        <Container>
          <Typography variant="body2" color="text.secondary">
            Multi-brand design system demo — every visual decision on this page comes from{' '}
            {meta.label} tokens. Switch the brand (top right) to restyle everything.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
