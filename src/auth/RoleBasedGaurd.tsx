import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

function RoleBasedGaurd({ children }: { children: React.ReactNode }) {
  const { updateUserType } = useAuthContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.split("/").includes("user")) {
      updateUserType("user");
    } else {
      updateUserType("admin");
    }
  }, [pathname]);

  return <>{children}</>;
}

export default RoleBasedGaurd;
