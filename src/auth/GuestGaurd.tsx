import React from "react";
import { useAuthContext } from "./useAuthContext";
import { Navigate } from "react-router-dom";
import { PATH_AFTER_ADMIN_LOGIN, PATH_AFTER_USER_LOGIN } from "src/config";

function GuestGaurd({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isInitialize } = useAuthContext();

  if (isAuthenticated) {
    return user.user_accountType == "user" ? (
      <Navigate to={PATH_AFTER_USER_LOGIN} />
    ) : (
      <Navigate to={PATH_AFTER_ADMIN_LOGIN} />
    );
  }

  if (!isInitialize) {
    return <h1>Loading</h1>;
  }

  return <>{children}</>;
}

export default GuestGaurd;
