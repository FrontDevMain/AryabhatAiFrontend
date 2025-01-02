import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  Stack,
  useTheme,
  IconButton,
} from "@mui/material";
import Logo from "src/components/logo";
import AdminNavbar from "./navbar/admin/AdminNavbar";
import ChangeMode from "./navbar/common/ChangeMode";
import AccountPopover from "./navbar/common/AccountPopover";
import { Outlet } from "react-router-dom";
import UserNavbar from "./navbar/user/UserNavbar";
import { useAuthContext } from "src/auth/useAuthContext";
import { MenuOpen } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";
import { useDispatch } from "react-redux";
import { fetchThemeSuccess } from "src/redux/actions/theme/ThemeActions";

const DashboardLayout = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { theme: themeSetting } = useSelector(
    (state: RootState) => state.theme
  );
  const isVertical = themeSetting.Theme_Layout == "vertical";

  return (
    <Box sx={{ pt: 8 }}>
      {/* Drawer for Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          // width: themeSetting.Theme_Layout == "vertical" ? 290 : 80,
          flexShrink: 0,
          height: "100%",
          [`& .MuiDrawer-paper`]: {
            width: isVertical ? 290 : 80,
            transition: "500ms ease width",
            boxSizing: "border-box",
            borderRight: "none",
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={isVertical ? "space-between" : "center"}
          gap={1}
        >
          <Box
            sx={{
              width: isVertical ? "100%" : 0,
              opacity: isVertical ? 1 : 0,
              transition: "500ms ease all",
            }}
          >
            <Logo />
          </Box>
          <IconButton
            sx={{ my: 3.3 }}
            onClick={() => {
              dispatch(
                fetchThemeSuccess({
                  ...themeSetting,
                  Theme_Layout: isVertical ? "mini" : "vertical",
                })
              );
              localStorage.setItem(
                "theme_layout",
                isVertical ? "mini" : "vertical"
              );
            }}
          >
            {isVertical ? (
              <MenuOpen
                sx={{
                  fontSize: 32,
                  transform: "rotate(0deg)",
                  transition: "500ms ease all",
                }}
              />
            ) : (
              <MenuOpen
                sx={{
                  fontSize: 32,
                  transform: "rotate(180deg)",
                  transition: "500ms ease all",
                }}
              />
            )}
          </IconButton>
        </Stack>
        <Box sx={{ height: "inherit", margin: "0px auto" }}>
          <Stack
            flexDirection={"column"}
            justifyContent={"space-between"}
            // alignItems={"center"}
            sx={{ height: "inherit", width: isVertical ? 260 : 50 }}
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
            marginLeft: isVertical ? 37 : 10,
            transition: "500ms ease margin",
            // ml: 37,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: theme.palette.background.neutral,
            p: 2,
            minHeight: "100%",
            overflow: "scroll",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
