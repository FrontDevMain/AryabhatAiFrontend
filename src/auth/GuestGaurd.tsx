import React from 'react';
import { useAuthContext } from './useAuthContext';
import { Navigate } from 'react-router-dom';

function GuestGaurd({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={'/auth'} />;
  }

  return <>{children}</>;
}

export default GuestGaurd;
