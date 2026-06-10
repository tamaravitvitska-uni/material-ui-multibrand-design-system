import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import CheckRounded from '@mui/icons-material/CheckRounded';
import { useBrand } from '@multibrand/design-system';

const PLANS = [
  {
    name: 'Basic',
    monthly: 5.99,
    features: ['5 tasks per day', 'Files up to 25 MB', 'Standard processing speed'],
    highlighted: false,
    cta: 'Choose Basic',
  },
  {
    name: 'Pro',
    monthly: 9.99,
    features: [
      'Unlimited tasks',
      'Files up to 500 MB',
      'Priority processing',
      'Batch operations',
      'No ads',
    ],
    highlighted: true,
    cta: 'Choose Pro',
  },
  {
    name: 'Team',
    monthly: 19.99,
    features: ['Everything in Pro', '5 seats included', 'Shared workspace', 'Priority support'],
    highlighted: false,
    cta: 'Choose Team',
  },
];

export function PricingPage() {
  const { meta, tokens } = useBrand();
  const [billing, setBilling] = React.useState<'monthly' | 'annual'>('annual');
  const discount = billing === 'annual' ? 0.6 : 1;

  return (
    <Container sx={{ py: { xs: 16, md: 24 } }}>
      <Typography variant="h2" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
        Simple pricing
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 10, textAlign: 'center' }}>
        Full access to every {meta.label} tool. Cancel anytime.
      </Typography>

      <Stack sx={{ mb: 12, alignItems: 'center' }}>
        <ToggleButtonGroup
          value={billing}
          exclusive
          onChange={(_, value) => value && setBilling(value)}
          color="primary"
          size="small"
        >
          <ToggleButton value="monthly">Monthly</ToggleButton>
          <ToggleButton value="annual">Annual&nbsp;·&nbsp;save 40%</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          gap: 6,
          alignItems: 'stretch',
          maxWidth: 1040,
          mx: 'auto',
        }}
      >
        {PLANS.map((plan) => (
          <Card
            key={plan.name}
            variant="outlined"
            sx={{
              position: 'relative',
              ...(plan.highlighted && {
                borderColor: 'primary.main',
                borderWidth: 2,
                boxShadow: 8,
              }),
            }}
          >
            <CardContent sx={{ p: 8, display: 'flex', flexDirection: 'column', height: '100%' }}>
              {plan.highlighted && (
                <Chip
                  label="Most popular"
                  color="primary"
                  size="small"
                  sx={{ position: 'absolute', top: 16, right: 16 }}
                />
              )}
              <Typography variant="h5" sx={{ mb: 2 }}>
                {plan.name}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 6, alignItems: 'baseline' }}>
                <Typography variant="h3" component="span">
                  ${(plan.monthly * discount).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  / month
                </Typography>
              </Stack>
              <List dense sx={{ flexGrow: 1, mb: 4 }}>
                {plan.features.map((feature) => (
                  <ListItem key={feature} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckRounded color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText slotProps={{ primary: { variant: 'body2' } }} primary={feature} />
                  </ListItem>
                ))}
              </List>
              <Button
                fullWidth
                size="large"
                variant={plan.highlighted ? 'contained' : 'tonal'}
                color="primary"
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          mt: 12,
          mx: 'auto',
          maxWidth: 720,
          textAlign: 'center',
          bgcolor: tokens.palette.background.lightGrey,
          borderRadius: `${tokens.radius.r4}px`,
          p: 6,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          30-day money-back guarantee · Secure payment · VAT included where applicable
        </Typography>
      </Box>
    </Container>
  );
}
