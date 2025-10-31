import { Navigate, Outlet } from "react-router";
import { useState } from "react";
import Header from "../dashboard/header/Header";
import MobileHeader from "../dashboard/header/Mobile.header";
import DashFooter from "../dashboard/component/Dash.footer";
import { useAuth } from "../hook/useAuth";
import UserSidebar from "../dashboard/sidebar/user/User.sidebar";

function UserRoute() {
  const [sidebar, setSidebard] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const { user, isLoading } = useAuth() as {
    user: { role: string } | null;
    isLoading: boolean;
  };

  if (!isLoading && user?.role !== "USER") {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex">
      <UserSidebar sidebar={sidebar} />
      <div className="w-full min-w-0">
        <Header
          sidebar={sidebar}
          setSidebard={setSidebard}
          setNavbar={setNavbar}
        />
        <main className="h-auto min-h-screen bg-[#F5F5F5]">
          <Outlet />
        </main>
        <DashFooter />
        <MobileHeader setNavbar={setNavbar} navbar={navbar} />
      </div>
    </main>
  );
}

export default UserRoute;
