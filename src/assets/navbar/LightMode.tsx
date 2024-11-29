import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

function DarkMode() {
  const theme = useTheme();

  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.5011 15.701C13.6491 15.701 16.2011 13.149 16.2011 10.001C16.2011 6.853 13.6491 4.30103 10.5011 4.30103C7.35304 4.30103 4.80106 6.853 4.80106 10.001C4.80106 13.149 7.35304 15.701 10.5011 15.701Z"
        stroke={theme.palette.text.primary}
      />
      <path
        d="M10.5 0.5V1.45M10.5 18.55V19.5M20 10H19.05M1.95 10H1M17.2165 3.2835L16.8441 3.65685M4.1559 16.3441L3.78255 16.7174M17.2165 16.7165L16.8441 16.3431M4.1559 3.6559L3.78255 3.28255"
        stroke={theme.palette.text.primary}
        stroke-linecap="round"
      />
    </svg>
  );
}

export default memo(DarkMode);
