function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/";
const ROOTS_ADMIN_DASHBOARD = "/admin";
const ROOTS_USER_DASHBOARD = "/user";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "login"),
  forgotPassword: path(ROOTS_AUTH, "forgot-password"),
  verifyForgotPasswordOtp: path(ROOTS_AUTH, "verify-forgot-password-otp"),
  newPassword: path(ROOTS_AUTH, "new-password"),
  signup: path(ROOTS_AUTH, "signup"),
  verifySignupOtp: path(ROOTS_AUTH, "verify-signup-otp"),
  signupDetails: path(ROOTS_AUTH, "signup-details"),
};

export const PATH_ADMIN_DASHBOARD = {
  root: ROOTS_ADMIN_DASHBOARD,
  dashboard: path(ROOTS_ADMIN_DASHBOARD, "/dashboard"),
  fileRepository: path(ROOTS_ADMIN_DASHBOARD, "/fileRepository"),
  license: path(ROOTS_ADMIN_DASHBOARD, "/license"),
  llm: path(ROOTS_ADMIN_DASHBOARD, "/llm"),
  otherStorageDevices: path(ROOTS_ADMIN_DASHBOARD, "/otherStorageDevices"),
  users: path(ROOTS_ADMIN_DASHBOARD, "/users"),
  tags: path(ROOTS_ADMIN_DASHBOARD, "/tags"),
  connectors: path(ROOTS_ADMIN_DASHBOARD, "/connectors"),
  settings: path(ROOTS_ADMIN_DASHBOARD, "/settings"),
};

export const PATH_USER_DASHBOARD = {
  root: ROOTS_USER_DASHBOARD,
  dashboard: path(ROOTS_USER_DASHBOARD, `/dashboard`),
  chatDashboard: (id: string) => path(ROOTS_USER_DASHBOARD, `/dashboard/${id}`),
};
