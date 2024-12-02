import { MoreVert } from '@mui/icons-material';
import {
  Box,
  Icon,
  IconButton,
  List,
  ListItemText,
  Popover,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Avatar } from 'src/components/avatar';

function AccountPopover() {
  //openpopover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const user = {
    id: '1',
    profile:
      'https://images.unsplash.com/photo-1695927621677-ec96e048dce2?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'sharad choudhary',
    email: 'abc@xyz.com',
  };

  const CustomList = styled(List)(({ theme }) => ({
    padding: theme.spacing(1),
  }));

  const CustomListItemText = styled(ListItemText)(({ theme }) => ({
    padding: '15px 10px',
    width: 200,
    borderRadius: 5,
    color: 'text.secondary',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.secondary.light, // Selected text color
    },
  }));

  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      gap={1}
      sx={{ mb: 2, px: 2 }}
    >
      <Avatar src={user.profile} />
      <Box sx={{ maxWidth: 130 }}>
        <Typography color="text.secondary" noWrap textOverflow={'ellipsis'}>
          {user.name}
        </Typography>
        <Typography color="text.disabled" noWrap textOverflow={'ellipsis'}>
          {user.email}
        </Typography>
      </Box>
      <div style={{ position: 'relative' }}>
        <IconButton aria-describedby={id} onClick={handleOpenPopover}>
          <Icon>
            <MoreVert />
          </Icon>
        </IconButton>
        <Popover
          id={id}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <CustomList disablePadding>
            <CustomListItemText>Change Profile Picture</CustomListItemText>
            <CustomListItemText>Logout</CustomListItemText>
            <CustomListItemText>Choose LLM</CustomListItemText>
          </CustomList>
        </Popover>
      </div>
    </Stack>
  );
}

export default AccountPopover;
