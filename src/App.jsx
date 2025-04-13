import {
  createHashRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./services/ProtectedRoute";
import NoTenantError from "./pages/NoTenantError";
import { getSubdomain } from "tldts";

function CheckTenant({ children }) {
  const tenantSubdomain = getSubdomain(window.location.hostname, {
    validHosts: ["localhost"],
  });

  if (!tenantSubdomain) {
    return <Navigate to="/notenant" replace />;
  }

  return children ?? <Outlet />;
}

const router = createHashRouter([
  {
    path: "/",
    index: true,
    element: (
      <CheckTenant>
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      </CheckTenant>
    ),
  },
  {
    path: "/signin",
    element: (
      <CheckTenant>
        <Signin />
      </CheckTenant>
    ),
  },
  {
    path: "/unauthorized",
    element: (
      <CheckTenant>
        <Unauthorized />
      </CheckTenant>
    ),
  },
  {
    path: "/notenant",
    element: <NoTenantError />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
