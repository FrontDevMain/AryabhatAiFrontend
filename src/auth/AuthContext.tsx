import { createContext, useCallback, useEffect, useReducer } from "react";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";

type AuthContextTypes = {
  isInitialize: boolean;
  isAuthenticated: boolean;
  user: {
    user_email: string;
    user_city: null | string;
    user_state: null | string;
    user_country: string;
    user_username: string;
    user_firstname: string;
    user_license: boolean;
    user_accountType: string;
    user_profile_picture: null | string;
    user_id: string;
    user_ObjectId: string;
  };
  login: () => void;
  logout: () => void;
  initialize: () => void;
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
      user: action.payload,
    };
  } else if (action.type == "logout") {
    return {
      ...state,
      isInitialize: true,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const token = localStorage.getItem("auth");
      if (token) {
        const Response = await fetcher.get(END_POINTS.AUTH.USER_DETAILS);
        if (Response.status == 200) {
          dispatch({
            type: "login",
            payload: Response.data,
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

  return (
    <AuthContext.Provider value={{ ...state, login, logout, initialize }}>
      {children}
    </AuthContext.Provider>
  );
}
