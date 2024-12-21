import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import AdminNavConfig from "src/layouts/navbar/admin/AdminConfig";
// import unathorized from "../assets/icons/401Unauthorized.svg";
import { Stack, Typography } from "@mui/material";
import { Unathorized } from "src/assets/icons/Unathorized";

function RoleBasedGaurd({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const { updateUserType } = useAuthContext();
  const { pathname } = useLocation();
  const isEnableForAdminAndSuperAdmin = AdminNavConfig.find(
    (item) => item.path == pathname
  )?.roles;

  useEffect(() => {
    if (
      user.user_accountType !== "User" &&
      pathname.split("/").includes("user")
    ) {
      updateUserType("User");
    }
    if (
      user.user_accountType !== "User" &&
      !pathname.split("/").includes("user")
    ) {
      updateUserType(user.user_accountType);
    }
  }, [pathname]);

  if (
    user.user_accountType == "User" &&
    !pathname.split("/").includes("user")
  ) {
    return (
      <Stack>
        <Unathorized />
        <Typography textAlign={"center"} variant="h4">
          {" "}
          You Are Not Authorized to view this page
        </Typography>
      </Stack>
    );
  }

  //   if (!isEnableForAdminAndSuperAdmin?.includes(user.user_accountType)) {
  //     return <h1>Not Authorized</h1>;
  //   }

  return <>{children}</>;
}

export default RoleBasedGaurd;
