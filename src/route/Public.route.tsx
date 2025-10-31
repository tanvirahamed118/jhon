import { Navigate, Outlet } from "react-router";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import Spiner from "../component/Spiner";
import { useAuth } from "../hook/useAuth";

const PublicRoute = () => {
  const { user, isLoading } = useAuth() as {
    user: { userTemplete: { verify: boolean }[] } | null;
    isLoading: boolean;
  };
  if (isLoading) {
    return <Spiner />;
  }
  if (!user) {
    return (
      <>
        <Header />
        <main className="h-auto min-h-screen bg-[#fff]">
          <Outlet />
        </main>
        <Footer />
      </>
    );
  }
  const needsLander =
    !user.userTemplete ||
    user.userTemplete.length === 0 ||
    !user.userTemplete[0].verify;
  const path = needsLander ? "/build-your-lander" : "/dashboard";
  return <Navigate to={path} replace />;
};

export default PublicRoute;
