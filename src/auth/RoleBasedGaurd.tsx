import React from "react";
import { useAuthContext } from "./useAuthContext";
import { Stack, Typography } from "@mui/material";
import { Unathorized } from "src/assets/icons/Unathorized";

function RoleBasedGaurd({
  roles,
  children,
}: {
  roles: any[];
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();

  if (!roles.includes(user.tempAccountType)) {
    return (
      <Stack>
        <Typography textAlign={"center"} variant="h4">
          Permission Denied
        </Typography>
      </Stack>
    );
  }

  return <>{children}</>;
}

export default RoleBasedGaurd;
