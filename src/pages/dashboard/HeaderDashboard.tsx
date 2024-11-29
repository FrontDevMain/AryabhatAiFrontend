import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  styled,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: 0,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main, // Hover background
  },
}));

const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  margin: 0,
  padding: '12px',
  color: theme.palette.text.primary, // Hover background
  '&:hover': {
    color: theme.palette.background.default,
  },
}));

function HeaderDashboard() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Stack direction={'row'} justifyContent={'start'} gap={2}>
      <List
        sx={{
          width: 150,
          padding: 0,
          position: 'relative',
        }}
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          onClick={handleClick}
          sx={{
            padding: 0,
            backgroundColor: theme.palette.background.default,
            borderRadius: open ? '20px 20px 0 0' : 20,
            overflow: 'clip',
            color: theme.palette.text.primary, // Hover background
            '&:hover': {
              color: theme.palette.background.default, // Hover background
              backgroundColor: theme.palette.secondary.main, // Hover background
            },
          }}
        >
          <ListItemText sx={{ padding: 1.5 }} primary={'Open Ai'} />
          {open ? <ExpandLess sx={{ marginRight: 2 }} /> : <ExpandMore sx={{ marginRight: 2 }} />}
        </ListItemButton>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{
            position: 'absolute',
            width: '100%',
          }}
        >
          <Stack
            sx={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              overflow: 'clip',
            }}
          >
            <CustomListItemButton>
              <CustomListItemText>LLAMA</CustomListItemText>
            </CustomListItemButton>
            <CustomListItemButton>
              <CustomListItemText>Mistral</CustomListItemText>
            </CustomListItemButton>
            <CustomListItemButton>
              <CustomListItemText>Claude</CustomListItemText>
            </CustomListItemButton>
          </Stack>
        </Collapse>
      </List>
      <VersionCard item={'Chat GPT 4.0'} />
      <VersionCard item={'Chat GPT 4.1'} />
      <VersionCard item={'Chat GPT 4.2'} />
    </Stack>
  );
}

function VersionCard({ item }: { item: string }) {
  const theme = useTheme();
  const [active, setActive] = useState('Chat GPT 4.1');
  return (
    <ListItemButton
      selected={item == active}
      sx={{
        padding: 0,
        borderRadius: 20,
        flexGrow: 0,
        overflow: 'clip',
        backgroundColor: theme.palette.background.default,
        '&:hover': {
          backgroundColor: theme.palette.primary.main, // Hover background
        },
        '&.Mui-selected': {
          backgroundColor: theme.palette.primary.main, // Selected text color
          '&:hover': {
            backgroundColor: theme.palette.primary.dark, // Darker on hover when selected
          },
        },
      }}
    >
      <CustomListItemText sx={{ color: active == item ? 'background.default' : 'text.primary' }}>
        {item}
      </CustomListItemText>
    </ListItemButton>
  );
}

export default HeaderDashboard;
