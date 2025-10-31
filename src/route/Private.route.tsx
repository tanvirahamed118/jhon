import { Navigate, Outlet } from "react-router";
import Spiner from "../component/Spiner";
import { useAuth } from "../hook/useAuth";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Spiner />;
  return user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
