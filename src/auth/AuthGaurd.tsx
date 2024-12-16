import React from "react";

import { Navigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { PATH_ADMIN_DASHBOARD, PATH_USER_DASHBOARD } from "src/routes/path";

function AuthGaurd({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isInitialize } = useAuthContext();

  if (!isInitialize) {
    return <h1>Loading</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return <>{children}</>;
}

export default AuthGaurd;
