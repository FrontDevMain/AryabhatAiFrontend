import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GuestLayout from './GuestLayout';
import AuthLoginForm from 'src/pages/auth/AuthLoginForm';
import AuthSignUp from 'src/pages/auth/AuthSignUp';
import ForgotPassword from 'src/pages/auth/ForgotPassword';
import VerifySignUpOtp from 'src/pages/auth/VerifySignUpOtp';
import AuthSignUpDetails from 'src/pages/auth/AuthSignUpDetails';
import VerifyForgotPasswordOtp from 'src/pages/auth/VerifyForgotPasswordOtp';
import AuthNewPassword from 'src/pages/auth/AuthNewPassword';
import DashboardLayout from './DashboardLayout';

function Router() {
  return (
    <Routes>
      <Route path="/auth" element={<DashboardLayout />} />
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<AuthLoginForm />} />
        <Route path="/signup" element={<AuthSignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-signup-otp" element={<VerifySignUpOtp />} />
        <Route path="/signup-details" element={<AuthSignUpDetails />} />
        <Route path="/verify-forgot-password-otp" element={<VerifyForgotPasswordOtp />} />
        <Route path="/new-password" element={<AuthNewPassword />} />
      </Route>
    </Routes>
  );
}

export default Router;
