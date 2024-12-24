import { PATH_USER_DASHBOARD } from "../../../routes/path";

// ----------------------------------------------------------------------
const UserNavConfig = [
  {
    title: "Notebook",
    path: PATH_USER_DASHBOARD.chatDashboard,
    icon: "dashboard",
    roles: ["User"],
  },
  {
    title: "Archive",
    path: PATH_USER_DASHBOARD.dashboard,
    icon: "users",
    roles: ["User"],
  },
];

export default UserNavConfig;
