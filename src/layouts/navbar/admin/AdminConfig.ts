import { PATH_ADMIN_DASHBOARD } from "../../../routes/path";

// ----------------------------------------------------------------------
const AdminNavConfig = [
  {
    title: "Dashboard",
    path: PATH_ADMIN_DASHBOARD.dashboard,
    icon: "dashboard",
  },
  {
    title: "Users",
    path: PATH_ADMIN_DASHBOARD.users,
    icon: "users",
  },
  {
    title: "File Repository",
    path: PATH_ADMIN_DASHBOARD.fileRepository,
    icon: "fileRepository",
  },
  {
    title: "Other Storage Devices",
    path: PATH_ADMIN_DASHBOARD.otherStorageDevices,
    icon: "otherStorage",
  },
  {
    title: "License",
    path: PATH_ADMIN_DASHBOARD.license,
    icon: "license",
  },
  {
    title: "LLM",
    path: PATH_ADMIN_DASHBOARD.llm,
    icon: "llm",
  },
  {
    title: "Tags",
    path: PATH_ADMIN_DASHBOARD.tags,
    icon: "tags",
  },
  {
    title: "Connectors",
    path: PATH_ADMIN_DASHBOARD.connectors,
    icon: "connectors",
  },
  {
    title: "Settings",
    path: PATH_ADMIN_DASHBOARD.settings,
    icon: "settings",
  },
];

export default AdminNavConfig;
