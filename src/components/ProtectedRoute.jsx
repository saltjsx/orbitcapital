import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/sso" replace />;
  }

  return children;
};

export default ProtectedRoute;
