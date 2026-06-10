import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import { useBrand } from '../provider/BrandProvider';
import { BRAND_LIST } from '../brands';
import { brandTokens } from '../tokens/generated';
import type { BrandId } from '../tokens/types';

/** Color dot showing a brand's primary color. */
function BrandDot({ brand }: { brand: BrandId }) {
  return (
    <Box
      component="span"
      sx={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        flexShrink: 0,
        bgcolor: brandTokens[brand].palette.primary.main,
        border: '1px solid',
        borderColor: 'divider',
      }}
    />
  );
}

export interface BrandSwitcherProps {
  size?: 'small' | 'medium';
}

/**
 * Drop-in brand selector. Reads and writes the active brand through
 * BrandProvider — place anywhere below it (e.g. in an AppBar).
 */
export function BrandSwitcher({ size = 'small' }: BrandSwitcherProps) {
  const { brand, setBrand } = useBrand();

  const handleChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value as BrandId);
  };

  return (
    <Select
      value={brand}
      onChange={handleChange}
      size={size}
      aria-label="Active brand"
      renderValue={(selected) => {
        const meta = BRAND_LIST.find((b) => b.id === selected);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BrandDot brand={selected as BrandId} />
            {meta?.label}
          </Box>
        );
      }}
    >
      {BRAND_LIST.map((meta) => (
        <MenuItem key={meta.id} value={meta.id}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BrandDot brand={meta.id} />
            <ListItemText primary={meta.label} secondary={meta.product} />
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}
