let redirectLoginCallback: () => void;

export const setRedirectLoginCallback = (callback: () => void) => {
  redirectLoginCallback = callback;
};

export const redirectToLogin = () => {
  if (redirectLoginCallback) {
    redirectLoginCallback();
  }
};

export const isLoggedin = () => {
  return (
    typeof window?.localStorage !== "undefined" &&
    !!localStorage.getItem("auth")
  );
};

export const getToken = () => {
  let token = null;
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      if (parsedAuthData.token) {
        token = parsedAuthData.token;
      }
    }
  }
  return token;
};

export const userAuthority = () => {
  let userAuthority = [];
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      if (parsedAuthData.userauthority) {
        userAuthority = parsedAuthData.userauthority;
      }
    }
  }
  return userAuthority;
};

export const getAuthUser = () => {
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    const authData = localStorage.getItem("auth");
    if (authData) {
      return JSON.parse(authData);
    }
  }
  return null;
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  let isAuthenticated = false;
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      if (parsedAuthData.token) {
        isAuthenticated = true;
      }
    }
  }
  return isAuthenticated;
};
