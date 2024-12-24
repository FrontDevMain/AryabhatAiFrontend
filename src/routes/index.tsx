import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import {
  Archive,
  Connectors,
  Dashboard,
  FIleRepository,
  ForgotPassword,
  ForgotPasswordOtp,
  License,
  LLM,
  LoginPage,
  NewPassword,
  Notebook,
  NotFoundPage,
  OtherStorageDevices,
  Settings,
  SignUp,
  SignUpOtp,
  SignUpRegistration,
  Tags,
  UserDashboard,
  Users,
} from "./elements";
import AuthGaurd from "src/auth/AuthGaurd";
import GuestGaurd from "src/auth/GuestGaurd";
import GuestLayout from "src/layouts/GuestLayout";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <GuestGaurd>
          <GuestLayout />
        </GuestGaurd>
      ),
      children: [
        { element: <Navigate to={"/login"} replace />, index: true },
        { path: "login", element: <LoginPage /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "verify-forgot-password-otp", element: <ForgotPasswordOtp /> },
        { path: "new-password", element: <NewPassword /> },
        { path: "signup", element: <SignUp /> },
        { path: "verify-signup-otp", element: <SignUpOtp /> },
        { path: "signup-details", element: <SignUpRegistration /> },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
    {
      path: "/admin",
      element: (
        <AuthGaurd>
          <DashboardLayout />
        </AuthGaurd>
      ),
      children: [
        { element: <Navigate to={"/admin/dashboard"} replace />, index: true },
        { path: "dashboard", element: <Dashboard /> },
        { path: "fileRepository", element: <FIleRepository /> },
        { path: "license", element: <License /> },
        { path: "llm", element: <LLM /> },
        { path: "otherStorageDevices", element: <OtherStorageDevices /> },
        { path: "users", element: <Users /> },
        { path: "tags", element: <Tags /> },
        { path: "connectors", element: <Connectors /> },
        { path: "settings", element: <Settings /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
    {
      path: "/user",
      element: (
        <AuthGaurd>
          <DashboardLayout />
        </AuthGaurd>
      ),
      children: [
        { element: <Navigate to={"/user/dashboard"} replace />, index: true },
        { path: "dashboard", element: <UserDashboard /> },
        { path: "notebook/:id", element: <Notebook /> },
        { path: "archive/:id", element: <Archive /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
}
