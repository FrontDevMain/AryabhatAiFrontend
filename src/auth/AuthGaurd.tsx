import React from 'react';

import { Navigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

function AuthGaurd({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return <>{children}</>;
}

export default AuthGaurd;
