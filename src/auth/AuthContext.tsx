import { createContext, useCallback, useEffect, useReducer } from 'react';

type AuthContextTypes = {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextTypes | null>(null);

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state: any, action: any) {
  if (action.type == 'login') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload,
    };
  } else if (action.type == 'logout') {
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

  // const initialize = useCallback(() => {
  //   try {
  //     const token = window !== undefined && localStorage.getItem('token');
  //     if (token) {
  //       ///api call
  //     } else {
  //       throw new Error();
  //     }
  //   } catch (err) {
  //     dispatch({
  //       type: 'logout',
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   initialize();
  // }, [initialize]);

  const login = (email: string, password: string) => {
    dispatch({
      type: 'login',
      user: {
        email,
        password,
      },
    });
  };

  const logout = () => {
    dispatch({
      type: 'logout',
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
  );
}
