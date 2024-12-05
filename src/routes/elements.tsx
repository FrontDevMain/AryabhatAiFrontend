import { ElementType, lazy, Suspense } from "react";

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={"...loading"}>
      <Component {...props} />
    </Suspense>
  );

//AUTH PAGES
export const LoginPage = Loadable(
  lazy(() => import("../pages/auth/AuthLoginForm"))
);
export const ForgotPassword = Loadable(
  lazy(() => import("../pages/auth/ForgotPassword"))
);
export const ForgotPasswordOtp = Loadable(
  lazy(() => import("../pages/auth/VerifyForgotPasswordOtp"))
);
export const NewPassword = Loadable(
  lazy(() => import("../pages/auth/AuthNewPassword"))
);
export const SignUp = Loadable(lazy(() => import("../pages/auth/AuthSignUp")));
export const SignUpOtp = Loadable(
  lazy(() => import("../pages/auth/VerifySignUpOtp"))
);
export const SignUpRegistration = Loadable(
  lazy(() => import("../pages/auth/AuthSignUpDetails"))
);

//ADMIN PAGES
export const Dashboard = Loadable(
  lazy(() => import("../pages/Admin/Dashboard"))
);
export const FIleRepository = Loadable(
  lazy(() => import("../pages/Admin/FIleRepository"))
);
export const License = Loadable(lazy(() => import("../pages/Admin/License")));
export const LLM = Loadable(lazy(() => import("../pages/Admin/LLM")));
export const OtherStorageDevices = Loadable(
  lazy(() => import("../pages/Admin/OtherStorageDevices"))
);
export const Users = Loadable(lazy(() => import("../pages/Admin/Users")));
export const Tags = Loadable(lazy(() => import("../pages/Admin/Tags")));

//USER PAGES
export const UserDashboard = Loadable(
  lazy(() => import("../pages/Users/UserDashboard"))
);
