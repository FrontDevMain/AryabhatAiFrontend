// routes
import { PATH_ADMIN_DASHBOARD } from "../../../routes/path";

// ----------------------------------------------------------------------

const AdminNavConfig = [
  {
    subheader: "Dashboard",
    items: [
      {
        title: "Dashboard",
        path: PATH_ADMIN_DASHBOARD.dashboard,
      },
      {
        title: "Users",
        path: PATH_ADMIN_DASHBOARD.users,
      },
      {
        title: "File Repository",
        path: PATH_ADMIN_DASHBOARD.fileRepository,
      },
      {
        title: "Other Storage Devices",
        path: PATH_ADMIN_DASHBOARD.otherStorageDevices,
      },
      {
        title: "License",
        path: PATH_ADMIN_DASHBOARD.license,
      },
      {
        title: "LLM",
        path: PATH_ADMIN_DASHBOARD.llm,
      },
      {
        title: "Tags",
        path: PATH_ADMIN_DASHBOARD.tags,
      },
      {
        title: "Connectors",
        path: PATH_ADMIN_DASHBOARD.connectors,
      },
      {
        title: "Settings",
        path: PATH_ADMIN_DASHBOARD.settings,
      },
    ],
  },
];

export default AdminNavConfig;
