import SidebarCollaps from "./Sidebar.collaps";
import SidebarNoCollaps from "./Sidebar-nocollaps";

interface Types {
  sidebar: boolean;
}

function AdminSidebar({ sidebar }: Types) {
  return (
    <aside
      className={
        sidebar
          ? "sticky top-0 xl:block hidden w-[70px] bg-white border-r-2 border-gray-100 max-h-screen h-screen transition-[width] duration-300 ease-in-out"
          : "sticky top-0 xl:block hidden w-72 min-w-72 bg-white border-r-2 border-gray-100 max-h-screen h-screen transition-[width] duration-300 ease-in-out"
      }
    >
      {sidebar ? <SidebarCollaps /> : <SidebarNoCollaps />}
    </aside>
  );
}

export default AdminSidebar;
