import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signin from './pages/Signin'
import Unauthorized from './pages/Unauthorized'
import ProtectedRoute from "./services/ProtectedRoute";

const router = createHashRouter([
  {
    path: "/",
    index: true,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;