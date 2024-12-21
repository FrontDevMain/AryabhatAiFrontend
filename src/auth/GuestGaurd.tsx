import React from "react";
import { useAuthContext } from "./useAuthContext";
import { Navigate } from "react-router-dom";
import { PATH_AFTER_ADMIN_LOGIN, PATH_AFTER_USER_LOGIN } from "src/config";
import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

function GuestGaurd({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isInitialize, isLicensed, logout } =
    useAuthContext();

  if (isAuthenticated) {
    return user.user_accountType == "User" ? (
      <Navigate to={PATH_AFTER_USER_LOGIN} />
    ) : (
      <Navigate to={PATH_AFTER_ADMIN_LOGIN} />
    );
  }

  if (!isInitialize) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      {" "}
      <Modal
        open={!isLicensed}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={!isLicensed}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95%", md: 600 },
              bgcolor: "background.default",
              borderRadius: 2,
              boxShadow: 24,
              p: 3,
            }}
          >
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h3">License Status</Typography>
              <IconButton onClick={logout}>
                <Close />
              </IconButton>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography fontSize={24} textAlign={"center"}>
              You don't have valid license or license key expired. Please
              conatct to Management
            </Typography>
            <Stack alignItems={"center"} mt={2}>
              <Button variant="contained" size="large" onClick={logout}>
                Ok
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
      {children}
    </>
  );
}

export default GuestGaurd;
