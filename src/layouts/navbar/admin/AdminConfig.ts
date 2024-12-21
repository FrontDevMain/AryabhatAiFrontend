import { PATH_ADMIN_DASHBOARD } from "../../../routes/path";

// ----------------------------------------------------------------------
const AdminNavConfig = [
  {
    title: "Dashboard",
    path: PATH_ADMIN_DASHBOARD.dashboard,
    icon: "dashboard",
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "Users",
    path: PATH_ADMIN_DASHBOARD.users,
    icon: "users",
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "File Repository",
    path: PATH_ADMIN_DASHBOARD.fileRepository,
    icon: "fileRepository",
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "Other Storage Devices",
    path: PATH_ADMIN_DASHBOARD.otherStorageDevices,
    icon: "otherStorage",
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "License",
    path: PATH_ADMIN_DASHBOARD.license,
    icon: "license",
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "LLM",
    path: PATH_ADMIN_DASHBOARD.llm,
    icon: "llm",
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "Tags",
    path: PATH_ADMIN_DASHBOARD.tags,
    icon: "tags",
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "Connectors",
    path: PATH_ADMIN_DASHBOARD.connectors,
    icon: "connectors",
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "Settings",
    path: PATH_ADMIN_DASHBOARD.settings,
    icon: "settings",
    roles: ["Admin", "SuperAdmin"],
  },
];

export default AdminNavConfig;
