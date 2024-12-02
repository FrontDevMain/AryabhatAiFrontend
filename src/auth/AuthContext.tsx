import { createContext, useCallback, useEffect, useReducer } from "react";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";

type AuthContextTypes = {
  isAuthenticated: boolean;
  user: any;
  login: () => void;
  logout: () => void;
  initialize: () => void;
};

export const AuthContext = createContext<AuthContextTypes | null>(null);

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state: any, action: any) {
  if (action.type == "login") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload,
    };
  } else if (action.type == "logout") {
    return {
      ...state,
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
        console.log(Response);
      } else {
        logout();
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
