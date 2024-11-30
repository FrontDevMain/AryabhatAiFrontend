import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import {
  Dashboard,
  FIleRepository,
  License,
  LLM,
  LoginPage,
  OtherStorageDevices,
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
      ],
    },
    {
      path: "/auth",
      element: (
        <AuthGaurd>
          {" "}
          <DashboardLayout />
        </AuthGaurd>
      ),
      children: [
        { element: <Navigate to={"/auth"} replace />, index: true },
        { path: "dashboard", element: <Dashboard /> },
        { path: "fileRepository", element: <FIleRepository /> },
        { path: "license", element: <License /> },
        { path: "llm", element: <LLM /> },
        { path: "otherStorageDevices", element: <OtherStorageDevices /> },
        { path: "users", element: <Users /> },
      ],
    },
  ]);
}
