// @mui
import { alpha, styled } from '@mui/material/styles';
import { CardActionArea, Radio, FormControlLabel, Stack, Box } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledWrap = styled(Box)(({ theme }) => ({
  gap: 8,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  marginBottom: 20,
  padding: 5,
  borderRadius: 10,
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------

type StyledCardProps = {
  selected: boolean;
};

export const StyledCard = styled(CardActionArea, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<StyledCardProps>(({ selected, theme }) => ({
  height: 52,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  borderRadius: theme.shape.borderRadius,
  // border: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  '& .svg-color': {
    width: 28,
    height: 28,
  },
  ...(selected && {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    borderColor: alpha(theme.palette.grey[500], 0.24),
  }),
}));

// ----------------------------------------------------------------------

type StyledCircleColorProps = {
  selected: boolean;
  color: string;
};

export const StyledCircleColor = styled('div', {
  shouldForwardProp: (prop) => prop !== 'selected',
})<StyledCircleColorProps>(({ selected, color, theme }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: color,
  transition: theme.transitions.create(['width', 'height'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  ...(selected && {
    width: 24,
    height: 24,
    boxShadow: `-2px 4px 8px 0px ${alpha(color, 0.48)}`,
  }),
}));

// ----------------------------------------------------------------------

type MaskControlProps = {
  value: string;
};

export function MaskControl({ value }: MaskControlProps) {
  return (
    <FormControlLabel
      label=""
      value={value}
      control={<Radio sx={{ display: 'none' }} />}
      sx={{
        m: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      }}
    />
  );
}

// ----------------------------------------------------------------------
