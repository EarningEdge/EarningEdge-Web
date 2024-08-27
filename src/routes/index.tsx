import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoutes";
import App from "../App";

import CustomLayout from "../components/layout/custom-layout/CustomLayout";
import ErrorBoundary from "../components/layout/error/ErrorBoundary";

// Lazy Loading all the pages
const AddPhno = lazy(() => import("../pages/auth/add-phnumber/AddPhno"));
const UserOB = lazy(() => import("../pages/auth/user-details/UserDetails"));
const ConfirmMail = lazy(
  (): any => import("../pages/auth/confirm-email/ConfirmMail")
);
const ConfirmPhno = lazy(
  (): any => import("../pages/auth/confirm-phnumber/ConfirmPhno")
);
const ConnectBroker = lazy(
  (): any => import("../pages/auth/connect-broker/ConnectBroker")
);
const Login = lazy((): any => import("../pages/auth/user-login/UserLogin"));
const Signup = lazy((): any => import("../pages/auth/user-signup/UserSignup"));
const Journal = lazy((): any => import("../pages/auth/auth-screen/Home"));
const Auth = lazy((): any => import("../pages/auth/auth-screen/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<CustomLayout> </CustomLayout>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "add-phno",
        element: <AddPhno />,
      },
      {
        path: "confirm-email",
        element: <ConfirmMail />,
      },
     {
        path: "confirm-phno",
        element: <ConfirmPhno />,
      }, 
      {
        path: "user-details",
        element: <UserOB />,
      },
      {
        path: "connectbroker",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <ConnectBroker /> }],
      },

      {
        path: "*",
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);

export default router;
