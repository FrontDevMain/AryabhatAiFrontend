import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NotFound } from "src/assets/icons/NotFound";
import { useAuthContext } from "src/auth/useAuthContext";

function NotFoundPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        height: "60%",
        width: "60%",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      <NotFound />
      <Typography variant="h4" mb={2}>
        Page Not Found
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Home
      </Button>
    </Stack>
  );
}

export default NotFoundPage;
