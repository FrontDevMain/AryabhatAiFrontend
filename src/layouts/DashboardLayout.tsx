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
import { Outlet } from "react-router-dom";
import UserNavbar from "./navbar/user/UserNavbar";
import { useAuthContext } from "src/auth/useAuthContext";

const DashboardLayout = () => {
  const { user } = useAuthContext();
  const theme = useTheme();

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
              {user.user_accountType == "User" ? (
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
            p: 3,
            mx: 1,
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
