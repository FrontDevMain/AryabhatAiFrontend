export const END_POINTS = {
  AUTH: {
    LOGIN: "auth/login",
    SIGN_UP: "auth/signup",
    OTP_VALIDATION: "otp/validate",
    RESEND_OTP: "auth/resend",
    FORGOT_PASSWORD: "forgot-password",
    UPDATE_PASSWORD: "updated-password",
    REGISTER: "auth/register",
    OAUth2_AUTHENTICATION: "auth",
    UPDATE_ACTIVITY: "update_activity",
    USER_DETAILS: "users/me",
    LOGOUT: "auth/logout",
    LOGIN_WITH_GOOGLE: "auth/google",
    LOGIN_WITH_MICROSOFT: "auth/microsoft",
  },
  ADMIN: {
    ADMIN_PRIVILEGES: {
      USER_DETAILS: "UserDetails",
      USERS_ROLE: "Users/Role",
      USERS_LICENSE: "Users/License",
      INVITE_USERS: "invite-users",
    },
    FILE_REPOSITORIES: {
      UPLOAD_FILE: "Files/Upload",
      GET_ALL_FILES: "Files/GetFiles",
      DOWNLOAD_FILES: (id: string) => `Files/DownloadFile/${id}`,
      DOWNLOAD_PREVIEW: (id: string) => `Files/Preview/${id}`,
      MODIFY_DEPARTMENT: `Files/ModifyDepartment`,
      DELETE_FILE: (id: string) => `Files/DeleteFile?file_id=${id}`,
    },
    TAGS: {
      GET_TAGS: "Tags/GetTags",
      CREATE_TAGS: "Tags/CreateTag",
      RENAME_TAGS: "Tags/RenameTag",
      DELETE_TAGS: (id: string) => `Tags/DeleteTag?tag_id=${id}`,
    },
    SETTINGS: {
      GET_CONFIG: "app_settings/configure-db",
    },
  },
};
