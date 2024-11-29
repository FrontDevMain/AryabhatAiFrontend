import {
  Box,
  Collapse,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { ArrowRight, ExpandLess, ExpandMore } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavConfig from "./config";
import { useNavigate } from "react-router-dom";

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius, // Rounded corners
  marginBottom: theme.spacing(0.5), // Spacing between items
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.palette.primary.main, // Hover background
    color: theme.palette.background.default, // Selected text color
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main, // Selected background
    color: theme.palette.background.default, // Selected text color
    "&:hover": {
      backgroundColor: theme.palette.primary.dark, // Darker on hover when selected
      color: theme.palette.background.default, // Selected text color
    },
  },
}));

function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [active, setActive] = useState("dashboard");

  return (
    <Box
      sx={{
        overflow: "auto",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <List
        sx={{ maxWidth: 360, bgcolor: theme.palette.background.default }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {NavConfig[0].items.map((item) => {
          return (
            <CustomListItemButton
              onClick={() => {
                setActive(item.title);
                navigate(item.path);
              }}
              selected={active == item.title}
            >
              <ListItemText primary={item.title} />
              {<ArrowRight />}
            </CustomListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

function NavbarItems({ item, active, setActive }: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const [open, setOpen] = useState(active.item == item.title);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleActive = (item: "", subItem: "") => {
    console.log(item, subItem);
    setActive({
      item: item,
      subItem: subItem,
    });
  };

  const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius, // Rounded corners
    marginBottom: theme.spacing(1), // Spacing between items
    padding: theme.spacing(1.5),
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: theme.palette.primary.main, // Hover background
      color: theme.palette.background.default, // Selected text color
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main, // Selected background
      color: theme.palette.background.default, // Selected text color
      "&:hover": {
        backgroundColor: theme.palette.primary.dark, // Darker on hover when selected
        color: theme.palette.background.default, // Selected text color
      },
    },
  }));

  const CustomListSubItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius, // Rounded corners
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
    "&:hover": {
      color: theme.palette.primary.main, // Selected text color
    },
    "&.Mui-selected": {
      color: theme.palette.primary.main, // Selected text color
      "&:hover": {
        color: theme.palette.primary.main, // Darker on hover when selected
      },
    },
  }));

  const CustomList = styled(List)(({ theme }) => ({
    padding: theme.spacing(1),
  }));

  const CustomListItemText = styled(ListItemText)(({ theme }) => ({
    padding: "15px 10px",
    width: 200,
    borderRadius: 5,
    color: "text.secondary",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.secondary.light, // Selected text color
    },
  }));

  return (
    <Box key={item.title}>
      {" "}
      <CustomListItemButton
        onClick={() => {
          handleClick();
          handleActive(item.title, "");
        }}
        selected={active.item == item.title}
      >
        <ListItemText primary={item.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </CustomListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {item.children.map((child: any) => (
          <List component="div" disablePadding>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={1}
            >
              <CustomListSubItemButton
                sx={{ pl: 4 }}
                onClick={() => handleActive(item.title, child.title)}
                selected={
                  active.item == item.title && active.subItem == child.title
                }
              >
                <ListItemText primary={child.title} />
              </CustomListSubItemButton>
              <IconButton aria-describedby={id} onClick={handleOpenPopover}>
                <Icon>
                  <MoreVertIcon />
                </Icon>
              </IconButton>
              <Popover
                id={id}
                anchorEl={anchorEl}
                open={openPopover}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <CustomList disablePadding>
                  <CustomListItemText>Pin Chat on Top</CustomListItemText>
                  <CustomListItemText>Archive</CustomListItemText>
                  <CustomListItemText>Delete</CustomListItemText>
                  <CustomListItemText>Rename</CustomListItemText>
                </CustomList>
              </Popover>
            </Stack>
          </List>
        ))}
      </Collapse>
    </Box>
  );
}

export default Navbar;
