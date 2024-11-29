import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  Switch,
  IconButton,
  Stack,
  useTheme,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/material";
import Logo from "src/components/logo";
import Navbar from "./navbar/Navbar";
import ChangeMode from "./navbar/ChangeMode";
import AccountPopover from "./navbar/AccountPopover";
import MainDashboard from "src/pages/dashboard/MainDashboard";
import HeaderDashboard from "src/pages/dashboard/HeaderDashboard";
import SearchBar from "src/pages/dashboard/SearchBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const theme = useTheme();

  const textStyle = {
    color: theme.palette.text.secondary,
    borderRadius: 2,
    textAlign: "center",
    width: "90%",
    px: 4,
    py: 2,
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Drawer for Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 290,
          flexShrink: 0,
          height: "100%",
          [`& .MuiDrawer-paper`]: {
            width: 290,
            boxSizing: "border-box",
            borderRight: "none",
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Box sx={{ width: "85%", height: "inherit", margin: "0px auto" }}>
          <Stack
            flexDirection={"column"}
            justifyContent={"space-between"}
            sx={{ height: "inherit" }}
          >
            <Box>
              <Logo />
              <Navbar />
            </Box>
            <Box>
              <AccountPopover />
              <ChangeMode />
            </Box>
          </Stack>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* AppBar */}
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{ backgroundColor: theme.palette.background.default }}
        >
          <Toolbar>
            <Stack direction={"row"} justifyContent={"flex-end"} width={"100%"}>
              <Typography
                variant="h6"
                color="text.disabled"
                sx={{
                  border: "1px dashed #000",
                  borderRadius: 1,
                  px: 1,
                  justifySelf: "end",
                }}
              >
                Company Name
              </Typography>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Box
          sx={{
            p: 2,
            mx: 3,
            flexGrow: 1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: theme.palette.background.neutral,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
