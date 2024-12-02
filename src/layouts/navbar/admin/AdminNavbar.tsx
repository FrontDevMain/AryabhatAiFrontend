import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { ArrowRight } from "@mui/icons-material";
import AdminNavConfig from "./AdminConfig";
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

export default function AdminNavbar() {
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
        {AdminNavConfig[0].items.map((item) => {
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
