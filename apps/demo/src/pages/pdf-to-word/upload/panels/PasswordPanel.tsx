import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockRounded from '@mui/icons-material/LockRounded';
import { useTheme } from '@mui/material/styles';
import type { DemoFile } from '../conversionMachine';
import { PASSWORD_PANEL } from '../../demoData';
import { FileCard } from './FileCard';

export interface PasswordPanelProps {
  file: DemoFile;
  failedAttempt: boolean;
  onSubmit: (password: string) => void;
  onUseAnotherFile: () => void;
}

/** Password-protected PDF: ask for the document password before converting. */
export function PasswordPanel({
  file,
  failedAttempt,
  onSubmit,
  onUseAnotherFile,
}: PasswordPanelProps) {
  const theme = useTheme();
  const [password, setPassword] = useState('');

  const submit = () => onSubmit(password);

  return (
    <Stack spacing={5} sx={{ width: '100%' }}>
      <FileCard file={file} caption="Password-protected PDF" onRemove={onUseAnotherFile} />

      <Stack direction="row" spacing={4} sx={{ alignItems: 'flex-start' }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            flexShrink: 0,
            borderRadius: `${theme.tokens.radius.r3}px`,
            bgcolor: theme.tokens.scales.primaryOpacity['8'],
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LockRounded />
        </Box>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {PASSWORD_PANEL.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {PASSWORD_PANEL.body}
          </Typography>
        </Box>
      </Stack>

      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          sx={{ alignItems: { xs: 'stretch', sm: 'flex-start' } }}
        >
          <TextField
            type="password"
            label={PASSWORD_PANEL.fieldLabel}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={failedAttempt}
            helperText={failedAttempt ? PASSWORD_PANEL.wrongPassword : PASSWORD_PANEL.hint}
            autoFocus
            fullWidth
            sx={{ maxWidth: { sm: 360 } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={password.length === 0}
          >
            {PASSWORD_PANEL.submit}
          </Button>
        </Stack>
      </Box>

      <Button
        variant="text"
        color="cta"
        size="small"
        onClick={onUseAnotherFile}
        sx={{ alignSelf: 'center' }}
      >
        {PASSWORD_PANEL.useAnother}
      </Button>
    </Stack>
  );
}
