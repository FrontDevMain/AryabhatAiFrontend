function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/auth";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dashboard: path(ROOTS_DASHBOARD, "/dashboard"),
  fileRepository: path(ROOTS_DASHBOARD, "/fileRepository"),
  license: path(ROOTS_DASHBOARD, "/license"),
  llm: path(ROOTS_DASHBOARD, "/llm"),
  otherStorageDevices: path(ROOTS_DASHBOARD, "/otherStorageDevices"),
  users: path(ROOTS_DASHBOARD, "/users"),
};
