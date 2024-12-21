import { Box, List, ListItemText, Stack, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowForwardIosSharp, Dashboard } from "@mui/icons-material";
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
        alignSelf: "start",
      }}
    >
      <List
        sx={{
          maxWidth: 360,
          bgcolor: theme.palette.background.default,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {AdminNavConfig.map((item) => {
          return (
            <CustomListItemButton
              key={item.path}
              onClick={() => {
                setActive(item.path);
                navigate(item.path);
              }}
              selected={active == item.path}
            >
              <Box
                component="span"
                className="svg-color"
                sx={{
                  width: 24,
                  height: 24,
                  mr: 1,
                  display: "inline-block",
                  bgcolor: "currentColor",
                  mask: `url(${`/assets/icons/adminIcons/${item.icon}.svg`}) no-repeat center / contain`,
                  WebkitMask: `url(${`/assets/icons/adminIcons/${item.icon}.svg`}) no-repeat center / contain`,
                }}
              />

              <ListItemText primary={item.title} />
              <ArrowForwardIosSharp sx={{ fontSize: 15 }} />
            </CustomListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
