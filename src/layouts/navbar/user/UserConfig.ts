import {
  PATH_ADMIN_DASHBOARD,
  PATH_USER_DASHBOARD,
} from "../../../routes/path";

// ----------------------------------------------------------------------
const UserNavConfig = [
  {
    title: "Notebook",
    path: PATH_USER_DASHBOARD.chatDashboard,
    icon: "dashboard",
  },
  {
    title: "Archive",
    path: PATH_USER_DASHBOARD.dashboard,
    icon: "users",
  },
];

export default UserNavConfig;
