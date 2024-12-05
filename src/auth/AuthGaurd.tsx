import React from "react";

import { Navigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

function AuthGaurd({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitialize } = useAuthContext();

  if (!isInitialize) {
    return <h1>Loading</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return <>{children}</>;
}

export default AuthGaurd;
