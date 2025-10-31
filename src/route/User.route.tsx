import { Navigate, Outlet } from "react-router";
import Spiner from "../component/Spiner";
import { useOnboard } from "../hook/useOnboard";

const UserRoute = () => {
  const { onboard, isLoading } = useOnboard();
  if (isLoading) return <Spiner />;

  return onboard ? <Outlet /> : <Navigate to="/error" />;
};

export default UserRoute;
