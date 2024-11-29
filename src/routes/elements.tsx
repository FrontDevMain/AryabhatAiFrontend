import { ElementType, lazy, Suspense } from "react";

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={"...loading"}>
      <Component {...props} />
    </Suspense>
  );

//login page
export const LoginPage = Loadable(
  lazy(() => import("../pages/auth/AuthLoginForm"))
);

export const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
export const FIleRepository = Loadable(
  lazy(() => import("../pages/FIleRepository"))
);
export const License = Loadable(lazy(() => import("../pages/License")));
export const LLM = Loadable(lazy(() => import("../pages/LLM")));
export const OtherStorageDevices = Loadable(
  lazy(() => import("../pages/OtherStorageDevices"))
);
export const Users = Loadable(lazy(() => import("../pages/Users")));
