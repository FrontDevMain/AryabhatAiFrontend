import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  Stack,
  useTheme,
} from "@mui/material";
import Logo from "src/components/logo";
import AdminNavbar from "./navbar/admin/AdminNavbar";
import ChangeMode from "./navbar/common/ChangeMode";
import AccountPopover from "./navbar/common/AccountPopover";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserNavbar from "./navbar/user/UserNavbar";
import { useAuthContext } from "src/auth/useAuthContext";
import { useEffect } from "react";
import { PATH_AFTER_ADMIN_LOGIN } from "src/config";
import RoleBasedGaurd from "src/auth/RoleBasedGaurd";

const DashboardLayout = () => {
  const { user } = useAuthContext();
  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      pathname.split("/").includes("user") &&
      user.tempAccountType != "user"
    ) {
      navigate(PATH_AFTER_ADMIN_LOGIN);
    }
  }, []);

  return (
    <Box sx={{ pt: 8 }}>
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
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={1}
        >
          <Logo />
        </Stack>
        <Box sx={{ width: "85%", height: "inherit", margin: "0px auto" }}>
          <Stack
            flexDirection={"column"}
            justifyContent={"space-between"}
            sx={{ height: "inherit" }}
          >
            <Box>
              {user?.tempAccountType == "User" ? (
                <UserNavbar />
              ) : (
                <AdminNavbar />
              )}
            </Box>

            <Box>
              <AccountPopover />
              <ChangeMode />
            </Box>
          </Stack>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ height: "calc(100Vh - 64px)" }}>
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{
            backgroundColor: theme.palette.background.default,
            position: "fixed",
            top: 0,
            zIndex: 1100,
          }}
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

        <Box
          sx={{
            marginLeft: 37,
            // ml: 37,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: theme.palette.background.neutral,
            p: 2,
            minHeight: "100%",
            overflow: "scroll",
          }}
        >
          <RoleBasedGaurd>
            <Outlet />
          </RoleBasedGaurd>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
