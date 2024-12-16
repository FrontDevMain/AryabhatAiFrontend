import { Box, Stack, styled, Typography, useTheme } from "@mui/material";
import upImage from "../assets/login/loginUpBg.svg";
import downImage from "../assets/login/loginDownBg.svg";
import centerImage from "../assets/login/loginCenterBg.svg";
import user from "../assets/login/user.svg";
import { Outlet } from "react-router-dom";
import Reversed from "../assets/logo/Reversed.svg";

export default function GuestLayout() {
  const theme = useTheme();
  const StyledCard = styled("div")(({ theme }) => ({
    height: "auto",
    width: "100%",
    maxWidth: 450,
    margin: "auto",
  }));

  return (
    <Box
      sx={{
        background: "linear-gradient(89.94deg, #253072 1.16%, #1B60A5 99.95%)",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        sx={{ position: "absolute", top: 0, left: 0 }}
      >
        <img src={Reversed} alt="LOGO" width={96} style={{ padding: 15 }} />
        <Typography variant="caption" sx={{ color: "#ffffff", fontSize: 28 }}>
          Aryabhat
        </Typography>
      </Stack>
      <Box
        sx={{
          backgroundImage: `url(${upImage}), url(${downImage}), url(${centerImage})`,
          backgroundPosition: "top, bottom, bottom center",
          backgroundSize: "100%, 100%, 110%",
          backgroundRepeat: "no-repeat",
          height: "inherit",
          width: "inherit",
        }}
      >
        <Stack
          sx={{
            height: "90%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            overflow: "scroll",
            p: 5,
          }}
        >
          <StyledCard>
            <img src={user} style={{ margin: "20px auto", height: "100px" }} />
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                padding: 2,
              }}
            >
              <Outlet />
            </Box>
          </StyledCard>
        </Stack>
      </Box>
    </Box>
  );
}
