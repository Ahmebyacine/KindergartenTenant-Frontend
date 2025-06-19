import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/pages/Loading';

const ProtectedRoute = ({ roles = [], redirectPath = '/signin', children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role.toLowerCase())) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;