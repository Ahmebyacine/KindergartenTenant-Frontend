import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./services/ProtectedRoute";
import NoTenantError from "./pages/NoTenantError";
import CheckTenant from "./services/CheckTenant";

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