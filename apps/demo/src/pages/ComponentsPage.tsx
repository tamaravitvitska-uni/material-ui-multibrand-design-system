import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useBrand } from '@multibrand/design-system';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 12 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Divider sx={{ mb: 6 }} />
      {children}
    </Box>
  );
}

const BUTTON_VARIANTS = ['contained', 'tonal', 'outlined', 'text'] as const;
const BUTTON_COLORS = ['primary', 'secondary', 'cta', 'error'] as const;

export function ComponentsPage() {
  const { meta } = useBrand();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);

  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        Component gallery
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 10 }}>
        Every component below is a stock MUI component restyled by the {meta.label} theme — no
        local style overrides.
      </Typography>

      <Section title="Buttons — variant × color">
        <Stack spacing={4}>
          {BUTTON_VARIANTS.map((variant) => (
            <Stack key={variant} direction="row" spacing={4} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="captionXs" color="text.secondary" sx={{ width: 80 }}>
                {variant}
              </Typography>
              {BUTTON_COLORS.map((color) => (
                <Button key={color} variant={variant} color={color}>
                  Button
                </Button>
              ))}
            </Stack>
          ))}
          <Stack direction="row" spacing={4} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="captionXs" color="text.secondary" sx={{ width: 80 }}>
              sizes
            </Typography>
            <Button variant="contained" size="large">
              Large
            </Button>
            <Button variant="contained" size="medium">
              Medium
            </Button>
            <Button variant="contained" size="small">
              Small
            </Button>
            <Button variant="contained" disabled>
              Disabled
            </Button>
          </Stack>
        </Stack>
      </Section>

      <Section title="Inputs">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 6,
          }}
        >
          <TextField label="Outlined input" placeholder="you@example.com" />
          <TextField label="Filled input" variant="filled" placeholder="you@example.com" />
          <TextField label="Select" select defaultValue="pdf">
            <MenuItem value="pdf">PDF document</MenuItem>
            <MenuItem value="docx">Word document</MenuItem>
            <MenuItem value="xlsx">Spreadsheet</MenuItem>
          </TextField>
          <TextField label="With error" error helperText="This field is required" />
          <TextField label="Disabled" disabled value="Read only" />
          <TextField label="Multiline" multiline minRows={1} placeholder="Notes…" />
        </Box>
      </Section>

      <Section title="Selection controls">
        <Stack direction="row" spacing={8} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox" />
          <RadioGroup row defaultValue="a">
            <FormControlLabel value="a" control={<Radio />} label="Option A" />
            <FormControlLabel value="b" control={<Radio />} label="Option B" />
          </RadioGroup>
          <FormControlLabel control={<Switch defaultChecked />} label="Switch" />
          <Box sx={{ width: 200 }}>
            <Slider defaultValue={60} />
          </Box>
        </Stack>
      </Section>

      <Section title="Chips">
        <Stack direction="row" spacing={4} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Chip label="Default" />
          <Chip label="Primary" color="primary" />
          <Chip label="Secondary" color="secondary" />
          <Chip label="Success" color="success" />
          <Chip label="Outlined" variant="outlined" color="primary" />
          <Chip label="Deletable" color="primary" onDelete={() => {}} />
        </Stack>
      </Section>

      <Section title="Alerts & feedback">
        <Stack spacing={4} sx={{ mb: 6 }}>
          <Alert severity="success">Your file was converted successfully.</Alert>
          <Alert severity="info">Processing usually takes under 30 seconds.</Alert>
          <Alert severity="warning">This file is larger than 50 MB — conversion may be slow.</Alert>
          <Alert severity="error">We couldn't read this file. Try another format.</Alert>
        </Stack>
        <Stack direction="row" spacing={4}>
          <Button variant="outlined" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
          <Button variant="outlined" onClick={() => setSnackbarOpen(true)}>
            Show snackbar
          </Button>
          <Tooltip title="Tokens style this tooltip" arrow>
            <Button variant="text">Hover for tooltip</Button>
          </Tooltip>
        </Stack>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Delete this file?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action can't be undone. The file will be removed from your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="text" color="cta" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={() => setDialogOpen(false)}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="Changes saved"
        />
      </Section>

      <Section title="Navigation">
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="All files" />
          <Tab label="Recent" />
          <Tab label="Shared" />
        </Tabs>
      </Section>

      <Section title="Cards & elevation">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 6,
          }}
        >
          {[0, 2, 8].map((elevation) => (
            <Card key={elevation} elevation={elevation} variant={elevation === 0 ? 'outlined' : 'elevation'}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Elevation {elevation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Card radius and shadow come from the brand tokens.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Section>

      <Section title="Typography scale">
        <Stack spacing={3}>
          <Typography variant="leading" component="p">
            Leading
          </Typography>
          <Typography variant="h1" component="p">
            Title 1 / h1
          </Typography>
          <Typography variant="h2" component="p">
            Title 2 / h2
          </Typography>
          <Typography variant="h3" component="p">
            Title 3 / h3
          </Typography>
          <Typography variant="h4" component="p">
            Title 4 / h4
          </Typography>
          <Typography variant="h5" component="p">
            Title 5 / h5
          </Typography>
          <Typography variant="h6" component="p">
            Title 6 / h6
          </Typography>
          <Typography variant="subtitle1">Subtitle — supporting line under titles</Typography>
          <Typography variant="body1">
            Body 1 — primary reading size for paragraphs and descriptions.
          </Typography>
          <Typography variant="body2">
            Body 2 — secondary text, captions under cards, dense UI copy.
          </Typography>
          <Typography variant="caption" component="p">
            Caption — fine print and labels
          </Typography>
          <Typography variant="captionXs" component="p">
            Caption XS — smallest legal/footnote size
          </Typography>
        </Stack>
      </Section>
    </Container>
  );
}
