import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import {
  Dashboard,
  FIleRepository,
  License,
  LLM,
  OtherStorageDevices,
  Users,
} from "./elements";

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <DashboardLayout />,
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
