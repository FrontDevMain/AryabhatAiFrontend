import React, { useEffect } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { PATH_AFTER_ADMIN_LOGIN } from "src/config";

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
