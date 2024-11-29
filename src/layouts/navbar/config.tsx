// routes
import { PATH_DASHBOARD } from "../../routes/path";

// ----------------------------------------------------------------------

const NavConfig = [
  {
    subheader: "Dashboard",
    items: [
      {
        title: "Dashboard",
        path: PATH_DASHBOARD.dashboard,
      },
      {
        title: "Users",
        path: PATH_DASHBOARD.users,
      },
      {
        title: "File Repository",
        path: PATH_DASHBOARD.fileRepository,
      },
      {
        title: "Other Storage Devices",
        path: PATH_DASHBOARD.otherStorageDevices,
      },
      {
        title: "License",
        path: PATH_DASHBOARD.license,
      },
      {
        title: "LLM",
        path: PATH_DASHBOARD.llm,
      },
    ],
  },
];

export default NavConfig;
