import { createHashRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useDocumentDirection } from "./hooks/useDocumentDirection";
import Signin from "./pages/Signin";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./services/ProtectedRoute";
import NoTenantError from "./pages/NoTenantError";
import CheckTenant from "./services/CheckTenant";
import Layout from "./layouts/layout";
import Reports from "./pages/admin/Reports";
import Teachers from "./pages/admin/Teachers";
import Classes from "./pages/admin/Classes";
import Students from "./pages/admin/Students";
import ReportHealthDetails from "./layouts/admin/reports/ReportsHealthDetails";
import ReportsPedagogicalDetails from "./layouts/admin/reports/ReportsPedagogicalDetails";
import ReportsFinancialDetails from "./layouts/admin/reports/ReportsFinancialDetails";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import Expenses from "./pages/admin/Expenses";
import Attendance from "./pages/admin/Attendance";
import Incomes from "./pages/admin/Incomes";
import FinancialPerformance from "./pages/admin/FinancialPerformance";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <CheckTenant>
        <AuthProvider>
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        </AuthProvider>
      </CheckTenant>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path:'reports',
        element: <Reports />,
      },
      {
        path:'teachers',
        element: <Teachers />,
      },
      {
        path:'classes',
        element: <Classes />,
      },
      {
        path:'students',
        element: <Students />,
      },
      {
        path:'financial-performance',
        element: <FinancialPerformance />,
      },
      {
        path:'expenses',
        element: <Expenses />,
      },
      {
        path:'incomes',
        element: <Incomes />,
      },
      {
        path:'attendance',
        element: <Attendance />,
      },
      {
        path:'settings',
        element: <Settings />,
      },
      {
        path:'reports/health/:reportId',
        element: <ReportHealthDetails />,
      },
      {
        path:'reports/pedagogical/:reportId',
        element: <ReportsPedagogicalDetails />,
      },
      {
        path:'reports/financial/:reportId',
        element: <ReportsFinancialDetails />,
      },
    ],
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
  useDocumentDirection();
  return (
    <RouterProvider router={router} />
  )
}

export default App;