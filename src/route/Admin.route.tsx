import { Navigate, Outlet } from "react-router";
import { useState } from "react";
import Header from "../dashboard/header/Header";
import DashFooter from "../dashboard/component/Dash.footer";
import { useAuth } from "../hook/useAuth";
import AdminSidebar from "../dashboard/sidebar/admin/Admin.sidebar";
import AdminMobileHeader from "../dashboard/header/Admin.mobile.header";

function AdminRoute() {
  const [sidebar, setSidebard] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const { user, isLoading } = useAuth() as {
    user: { role: string } | null;
    isLoading: boolean;
  };

  if (!isLoading && user?.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return (
    <main className="flex">
      <AdminSidebar sidebar={sidebar} />
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
        <AdminMobileHeader setNavbar={setNavbar} navbar={navbar} />
      </div>
    </main>
  );
}

export default AdminRoute;
