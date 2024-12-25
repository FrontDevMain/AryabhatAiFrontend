import {
  FETCH_THEME_REQUEST,
  FETCH_THEME_SUCCESS,
  FETCH_THEME_FAILURE,
  Theme,
} from "../actions/theme/ThemeActionTypes";

interface UserState {
  loading: boolean;
  theme: Theme;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  theme: {
    user_id: "",
    Theme_logo: null,
    Theme_theme: "Light",
    Theme_font_size: 14,
    Theme_primary_colour: "#1b75bc",
    Theme_neutral_colour: "#ffffff",
    Theme_Layout: "vertical",
    Setting_archive_record: 30,
    SMTP_server_address: "localhost",
    SMTP_server_port: 587,
    SMTP_server_sequrity: "StartTLS",
    SMTP_email_address: "support@diagonal.ai",
    SMTP_username: "support@diagonal.ai",
    SMTP_password: null,
  },
  error: null,
};

const themeReducer = (
  state = initialState,
  action: {
    type: string;
    payload: Theme | any;
  }
): UserState => {
  switch (action.type) {
    case FETCH_THEME_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_THEME_SUCCESS:
      return {
        ...state,
        loading: false,
        theme: {
          ...state,
          ...action.payload,
        },
        error: null,
      };
    case FETCH_THEME_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default themeReducer;
