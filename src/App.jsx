import { createHashRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useDocumentDirection } from "./hooks/useDocumentDirection";
import Signin from "./pages/auth/Signin";
import Unauthorized from "./pages/common/Unauthorized";
import ProtectedRoute from "./services/ProtectedRoute";
import NoTenantError from "./pages/common/NoTenantError";
import CheckTenant from "./services/CheckTenant";
import Layout from "./layouts/layout";
import Reports from "./pages/admin/Reports";
import Teachers from "./pages/admin/Teachers";
import Classes from "./pages/admin/Classes";
import Students from "./pages/admin/Students";
import ReportHealthDetails from "./components/reports/ReportsHealthDetails";
import ReportsPedagogicalDetails from "./components/reports/ReportsPedagogicalDetails";
import ReportsFinancialDetails from "./components/reports/ReportsFinancialDetails";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import Expenses from "./pages/admin/Expenses";
import Attendance from "./pages/admin/Attendance";
import Incomes from "./pages/admin/Incomes";
import FinancialPerformance from "./pages/admin/FinancialPerformance";
import DashboardSupervisor from "./pages/supervisor/DashboardSupervisor";
import ClassesSupervisor from "./pages/supervisor/ClassesSupervisor";
import TeachersSupervisor from "./pages/supervisor/TeachersSupervisor";
import AttendanceSupervisor from "./pages/supervisor/AttendanceSupervisor";
import DashboardTeacher from "./pages/teacher/DashboardTeacher";
import StudentsTeacher from "./pages/teacher/StudentsTeacher";
import AttendanceTeacher from "./pages/teacher/AttendanceTeacher";
import ReportsTeacher from "./pages/teacher/ReportsTeacher";
import SettingsUser from "./pages/supervisor/SettingsUser";
import ChangePasswordFirstTime from "./pages/auth/ChangePasswordFirstTime";
import Onboarding from "./pages/admin/Onboarding";

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
        element: <ProtectedRoute roles={["admin"]} />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "teachers",
            element: <Teachers />,
          },
          {
            path: "classes",
            element: <Classes />,
          },
          {
            path: "financial-performance",
            element: <FinancialPerformance />,
          },
          {
            path: "expenses",
            element: <Expenses />,
          },
          {
            path: "incomes",
            element: <Incomes />,
          },
          {
            path: "attendance",
            element: <Attendance />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        element: <ProtectedRoute roles={["admin", "supervisor"]} />,
        children: [
          {
            path: "students",
            element: <Students />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
        ],
      },
      {
        element: <ProtectedRoute roles={["supervisor"]} />,
        children: [
          {
            path: "supervisor-dashboard",
            element: <DashboardSupervisor />,
          },
          {
            path: "supervisor-classes",
            element: <ClassesSupervisor />,
          },
          {
            path: "supervisor-teachers",
            element: <TeachersSupervisor />,
          },
          {
            path: "supervisor-attendance",
            element: <AttendanceSupervisor />,
          },
        ],
      },
      {
        element: <ProtectedRoute roles={["supervisor", "teacher"]} />,
        children: [
          {
            path: "settings-user",
            element: <SettingsUser />,
          },
        ],
      },
      {
        element: <ProtectedRoute roles={["teacher"]} />,
        children: [
          {
            path: "teacher-dashboard",
            element: <DashboardTeacher />,
          },
          {
            path: "teacher-students",
            element: <StudentsTeacher />,
          },
          {
            path: "teacher-attendance",
            element: <AttendanceTeacher />,
          },
          {
            path: "teacher-reports",
            element: <ReportsTeacher />,
          },
        ],
      },
      {
        path: "reports/health/:reportId",
        element: <ReportHealthDetails />,
      },
      {
        path: "reports/pedagogical/:reportId",
        element: <ReportsPedagogicalDetails />,
      },
      {
        path: "reports/financial/:reportId",
        element: <ReportsFinancialDetails />,
      },
    ],
  },
  {
    path: "/change-password-first-time",
    element: (
      <CheckTenant>
        <AuthProvider>
          <ProtectedRoute>
            <ChangePasswordFirstTime />
          </ProtectedRoute>
        </AuthProvider>
      </CheckTenant>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <CheckTenant>
        <AuthProvider>
          <ProtectedRoute roles={["admin"]}>
            <Onboarding />
          </ProtectedRoute>
        </AuthProvider>
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
  useDocumentDirection();
  return <RouterProvider router={router} />;
}

export default App;
