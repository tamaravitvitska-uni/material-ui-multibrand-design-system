import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useBrand } from '@multibrand/design-system';

function Swatch({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={1} sx={{ width: 108 }}>
      <Box
        sx={{
          height: 56,
          borderRadius: 2,
          bgcolor: value,
          border: '1px solid',
          borderColor: 'divider',
        }}
      />
      <Typography variant="captionXs" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="captionXs" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
        {value}
      </Typography>
    </Stack>
  );
}

function SwatchRow({ title, colors }: { title: string; colors: Record<string, string> }) {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        {title}
      </Typography>
      <Stack direction="row" spacing={3} useFlexGap sx={{ flexWrap: 'wrap' }}>
        {Object.entries(colors).map(([key, value]) => (
          <Swatch key={key} label={key} value={value} />
        ))}
      </Stack>
    </Box>
  );
}

export function TokensPage() {
  const { meta, tokens } = useBrand();
  const p = tokens.palette;

  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        {meta.label} tokens
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Font: <strong>{tokens.fontFamily}</strong> · Brand id: <code>{tokens.id}</code>
      </Typography>
      <Typography variant="body2" sx={{ mb: 10 }}>
        Figma sources:{' '}
        <Link href={meta.figma.componentSheet} target="_blank" rel="noreferrer">
          component sheet
        </Link>
        {' · '}
        <Link href={meta.figma.productFile} target="_blank" rel="noreferrer">
          product file
        </Link>
      </Typography>

      <Typography variant="h5" sx={{ mb: 1 }}>
        Color
      </Typography>
      <Divider sx={{ mb: 6 }} />
      <SwatchRow
        title="Primary"
        colors={{
          main: p.primary.main,
          light: p.primary.light,
          dark: p.primary.dark,
          contrastText: p.primary.contrastText,
        }}
      />
      <SwatchRow
        title="Secondary"
        colors={{
          main: p.secondary.main,
          light: p.secondary.light,
          dark: p.secondary.dark,
          contrastText: p.secondary.contrastText,
        }}
      />
      <SwatchRow
        title="CTA (Figma: action)"
        colors={{ main: p.cta.main, light: p.cta.light, dark: p.cta.dark, contrastText: p.cta.contrastText }}
      />
      <SwatchRow
        title="Status"
        colors={{
          error: p.error.main,
          warning: p.warning.main,
          info: p.info.main,
          success: p.success.main,
        }}
      />
      <SwatchRow
        title="Backgrounds"
        colors={{
          default: p.background.default,
          lightGrey: p.background.lightGrey,
          blueGrey: p.background.blueGrey,
          darkBlueGrey: p.background.darkBlueGrey,
          dark: p.background.dark,
        }}
      />
      <SwatchRow title="Primary tonal ramp (50–900)" colors={tokens.scales.primary} />
      <SwatchRow title="Secondary tonal ramp (50–900)" colors={tokens.scales.secondary} />

      <Typography variant="h5" sx={{ mt: 12, mb: 1 }}>
        Corner radius
      </Typography>
      <Divider sx={{ mb: 6 }} />
      <Stack direction="row" spacing={4} useFlexGap sx={{ mb: 12, flexWrap: 'wrap' }}>
        {Object.entries(tokens.radius).map(([key, value]) => (
          <Stack key={key} spacing={1} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: `${value}px`,
                bgcolor: tokens.scales.primaryOpacity['16'],
                border: '2px solid',
                borderColor: 'primary.main',
              }}
            />
            <Typography variant="captionXs">
              {key} · {value}px
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Typography variant="h5" sx={{ mb: 1 }}>
        Spacing scale (universal)
      </Typography>
      <Divider sx={{ mb: 6 }} />
      <Stack spacing={2} sx={{ mb: 12 }}>
        {tokens.spacing.scale
          .filter((value) => value > 0)
          .map((value) => (
            <Stack key={value} direction="row" spacing={4} sx={{ alignItems: 'center' }}>
              <Typography variant="captionXs" sx={{ width: 48 }}>
                {value}px
              </Typography>
              <Box
                sx={{
                  height: 12,
                  width: value,
                  bgcolor: 'primary.main',
                  borderRadius: `${tokens.radius.r1}px`,
                }}
              />
            </Stack>
          ))}
      </Stack>

      <Typography variant="h5" sx={{ mb: 1 }}>
        Type scale
      </Typography>
      <Divider sx={{ mb: 6 }} />
      <Card variant="outlined">
        <CardContent sx={{ p: 8 }}>
          <Stack spacing={4}>
            {(
              [
                ['leading', tokens.typography.leading.desktop],
                ['title1 / h1', tokens.typography.title1.desktop],
                ['title2 / h2', tokens.typography.title2.desktop],
                ['title3 / h3', tokens.typography.title3.desktop],
                ['title4 / h4', tokens.typography.title4.desktop],
                ['title5 / h5', tokens.typography.title5.desktop],
                ['title6 / h6', tokens.typography.title6.desktop],
                ['subtitle', tokens.typography.subtitle],
                ['body', tokens.typography.body],
                ['body2', tokens.typography.body2],
                ['caption', tokens.typography.caption],
                ['captionXs', tokens.typography.captionXs],
              ] as const
            ).map(([name, style]) => (
              <Stack
                key={name}
                direction="row"
                spacing={6}
                sx={{ overflow: 'hidden', alignItems: 'baseline' }}
              >
                <Typography variant="captionXs" color="text.secondary" sx={{ width: 110, flexShrink: 0 }}>
                  {name}
                  <br />
                  {style.size}px / {style.lineHeight}px / {style.weight}
                </Typography>
                <Typography
                  noWrap
                  sx={{
                    fontSize: `${Math.min(style.size, 56)}px`,
                    fontWeight: style.weight,
                    lineHeight: 1.2,
                  }}
                >
                  {tokens.fontFamily}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
