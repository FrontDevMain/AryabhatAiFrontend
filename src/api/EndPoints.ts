import { PAGINATION_PER_PAGE_SIZE } from "src/config";

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
    DELETE_PROFILE: "user/delete-profile-picture",
    CHANGE_PROFILE: "user/update-profile-picture",
  },
  ADMIN: {
    DASHBOARD: "app_settings/dashboard/analytics",
    ADMIN_PRIVILEGES: {
      USER_DETAILS: (page: number) =>
        `UserDetails?page=${page}&size=${PAGINATION_PER_PAGE_SIZE}`,
      USERS_ROLE: "Users/Role",
      USERS_LICENSE: "Users/License",
      INVITE_USERS: "invite-users",
    },
    FILE_REPOSITORIES: {
      UPLOAD_FILE: "Files/Upload",
      GET_ALL_FILES: (page: number, filter: string) =>
        `Files/GetFiles?page=${page}&page_size=${PAGINATION_PER_PAGE_SIZE}${filter}`,
      DOWNLOAD_FILES: (id: string) => `Files/DownloadFile/${id}`,
      DOWNLOAD_PREVIEW: (id: string) => `Files/Preview/${id}`,
      MODIFY_DEPARTMENT: `Files/ModifyDepartment`,
      DELETE_FILE: (id: string) => `Files/DeleteFile?file_id=${id}`,
    },
    TAGS: {
      GET_TAGS: (page: number, page_size: number, filter: string) =>
        `Tags/GetTags?page=${page}&page_size=${
          page_size || PAGINATION_PER_PAGE_SIZE
        }${filter}`,
      CREATE_TAGS: "Tags/CreateTag",
      RENAME_TAGS: "Tags/RenameTag",
      DELETE_TAGS: (id: string) => `Tags/DeleteTag?tag_id=${id}`,
    },
    SETTINGS: {
      GET_CONFIG: "app_settings/config",
      SEND_TEST_EMAIL: "app_settings/send-test-email",
      GET_CONNECTORS_LIST: "app_settings/allowed_database_service_provider",
      CONFIGURE_DB: "app_settings/configure-db",
    },
    LICENSE: {
      CHECK_LICENSE_STATUS: "License/check-license-status",
      CHECK_LICENSE_OVERVIEW: "License/license-overview",
      REVOKE_USER_LICENSE: "License/revoke-user-license",
      ISSUE_LICENSE: "License/issue-license",
      ACTIVATE_LICENSE: "License/activate-license",
    },
    LLM: {
      CREATE_LLM: "Llms/LlmDetails",
      GET_LLM_DETAILS: "Llms/GetLlmDetails",
      LLM_PROVIDER: "Llms/LlmProvider",
      UPDATE_STATUS: "Llms/ProviderStatus",
      DELETE_MODEL: (id: string) => `Llms/DeleteLlmDetails?model_id=${id}`,
      CONNECTIVITY_CHECK: "Llms/ConnectivityCheck",
    },
  },
  USER: {
    QUERY: {
      QUERY_NOTEBOOK: "QueryService/ask",
      CREATE_NOTEBOOK: "notebook/CreateNotebook",
      LIST_NOTEBOOK: "notebook/ListNotebooks",
      DELETE_NOTEBOOK: (id: string) => `notebook/Delete?chat_id=${id}`,
      ARCHIVE_NOTEBOOK: "notebook/Archive",
      PIN_NOTEBOOK: "notebook/Pin",
      REACT_NOTEBOOK: "notebook/React",
      SHOW_HISTORY: "notebook/ShowHistory",
      RENAME_NOTEBOOK: "notebook/rename_notebook",
    },
  },
};
