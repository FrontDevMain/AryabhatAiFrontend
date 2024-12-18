import { Box, List, ListItemText, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ArrowForwardIosRounded,
  ArrowForwardIosSharp,
  ArrowRight,
} from "@mui/icons-material";
import AdminNavConfig from "./AdminConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomListItemButton } from "src/theme/globalStyles";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { pathname } = useLocation();
  const [active, setActive] = useState(pathname);

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

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
              key={item.path}
              onClick={() => {
                setActive(item.path);
                navigate(item.path);
              }}
              selected={active == item.path}
            >
              <ListItemText primary={item.title} />
              <ArrowForwardIosSharp sx={{ fontSize: 15 }} />
            </CustomListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
