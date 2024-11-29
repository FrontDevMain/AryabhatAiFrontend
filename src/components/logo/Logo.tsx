import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, BoxProps, Stack, Typography } from '@mui/material';
import reverdesLogo from '../../assets/logo/Reversed.svg';
import monotonLogo from '../../assets/logo/Monotone.svg';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          minWidth: 96,
          width: 60,
          p: 1,
          py: 6,
          ...sx,
        }}
        {...other}
      >
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <img
            src={theme.palette.mode == 'light' ? monotonLogo : reverdesLogo}
            alt="LOGO"
            width={'100%'}
            height={'100%'}
          />{' '}
          <Typography variant="h3" color="text.primary">
            Aryabhat
          </Typography>
        </Stack>
      </Box>
    );

    if (disabledLink) {
      return <>{logo}</>;
    }

    return (
      <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
