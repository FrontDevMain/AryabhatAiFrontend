import { createContext, useCallback, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";
import { fetchLicense } from "src/redux/actions/license/LicenseActions";
import { fetchLlm } from "src/redux/actions/llm/LlmActions";
import { fetchNotebookList } from "src/redux/actions/Notebook/NotebookActions";
import { fetchTheme } from "src/redux/actions/theme/ThemeActions";

type AuthContextTypes = {
  isInitialize: boolean;
  isAuthenticated: boolean;
  isLicensed: boolean;
  user: {
    user_email: string;
    user_city: null | string;
    user_state: null | string;
    user_country: string;
    user_username: string;
    user_firstname: string;
    user_license: boolean;
    user_accountType: string;
    tempAccountType: string;
    user_profile_picture: null | string;
    user_id: string;
    user_ObjectId: string;
  };
  login: () => void;
  logout: () => void;
  initialize: () => void;
  updateUserType: (val: string) => void;
};

export const AuthContext = createContext<AuthContextTypes | null>(null);

const initialState = {
  isInitialize: false,
  isAuthenticated: false,
  user: null,
};

function reducer(state: any, action: any) {
  if (action.type == "login") {
    return {
      ...state,
      isInitialize: true,
      isAuthenticated: true,
      isLicensed: true,
      user: action.payload,
    };
  } else if (action.type == "logout") {
    return {
      ...state,
      isInitialize: true,
      isAuthenticated: false,
      isLicensed: false,
      user: null,
    };
  }
  return state;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const reduxDispatch = useDispatch();

  const initialize = useCallback(async () => {
    try {
      const token = localStorage.getItem("auth");
      if (token) {
        const Response = await fetcher.get(END_POINTS.AUTH.USER_DETAILS);
        if (Response.status == 200) {
          await reduxDispatch(fetchLicense());
          reduxDispatch(fetchLlm());
          reduxDispatch(
            fetchTheme({
              user_id: Response.data.user_id,
              Theme_logo: "",
              Theme_theme: "",
              Theme_font_size: 0,
              Theme_primary_colour: "",
              Theme_neutral_colour: "",
              Setting_archive_record: 0,
              SMTP_server_address: "",
              SMTP_server_port: 0,
              SMTP_server_sequrity: "",
              SMTP_email_address: "",
              SMTP_username: "",
              SMTP_password: "",
              intend: "get",
            })
          );
          dispatch({
            type: "login",
            payload: {
              ...Response.data,
              tempAccountType: Response.data.user_accountType,
            },
          });
        } else {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      logout();
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = () => {
    initialize();
  };

  const logout = () => {
    localStorage.removeItem("auth");
    dispatch({
      type: "logout",
    });
  };

  const updateUserType = (val: string) => {
    if (val == "User") {
      reduxDispatch(fetchNotebookList(state.user.user_id));
    }
    dispatch({
      type: "login",
      payload: {
        ...state.user,
        tempAccountType: val,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, initialize, updateUserType }}
    >
      {children}
    </AuthContext.Provider>
  );
}
