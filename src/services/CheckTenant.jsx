import { Navigate, Outlet } from "react-router-dom";
import { getSubdomain } from "tldts";

const CheckTenant = ({ children }) => {
    const tenantSubdomain = getSubdomain(window.location.hostname, {
      validHosts: ["localhost"],
    });
  
    if (!tenantSubdomain) {
      return <Navigate to="/notenant" replace />;
    }
    return children ?? <Outlet />;
  }

  export default CheckTenant;