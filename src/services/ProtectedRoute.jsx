import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/pages/common/Loading";

const ProtectedRoute = ({ roles = [], redirectPath = "/signin", children }) => {
  const location = useLocation();
  const { user, config, loading } = useAuth();
  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (
    user.changedDefaultPassword &&
    location.pathname === "/change-password-first-time"
  ) {
    if (user.role.toLowerCase() === "supervisor") {
      return <Navigate to="/supervisor-dashboard" replace />;
    }
    if (user.role.toLowerCase() === "teacher") {
      return <Navigate to="/teacher-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  if (
    user.role === "admin" &&
    !config.onboarding &&
    location.pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }
  if (
    user.role === "admin" &&
    config.onboarding &&
    location.pathname === "/onboarding"
  ) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (
    user &&
    !user.changedDefaultPassword &&
    location.pathname !== "/change-password-first-time" &&
    location.pathname !== "/onboarding"
  ) {
    return (
      <Navigate
        to="/change-password-first-time"
        state={{ from: location }}
        replace
      />
    );
  }

  if (roles.length > 0 && !roles.includes(user.role.toLowerCase())) {
    if (user.role.toLowerCase() === "admin") {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    if (user.role.toLowerCase() === "supervisor") {
      return (
        <Navigate
          to="/supervisor-dashboard"
          state={{ from: location }}
          replace
        />
      );
    }
    if (user.role.toLowerCase() === "teacher") {
      return (
        <Navigate to="/teacher-dashboard" state={{ from: location }} replace />
      );
    }
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
