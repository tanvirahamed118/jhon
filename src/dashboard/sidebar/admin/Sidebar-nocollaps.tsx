import Logo from "../../../assets/logo.png";
import { Link, NavLink } from "react-router";

function SidebarNoCollaps() {
  return (
    <div className="">
      <div className="flex justify-center items-center py-2">
        <Link to={"/"}>
          <img src={Logo} alt="" className="w-24 h-24 min-w-24 min-h-24" />
        </Link>
      </div>
      <div className="mt-5">
        <h2 className="text-thin text-sm pl-8 uppercase tracking-widest">
          Overview
        </h2>
        <nav className="mt-5">
          <ul className="flex flex-col gap-1">
            <li className="px-4">
              <NavLink
                to={"/admin/dashboard"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                    isActive
                      ? " text-[#000000] bg-[#96c94b]"
                      : " text-[#212529]"
                  }`
                }
                end
              >
                <i className="fa-solid fa-table-columns text-sm"></i>
                <p className="text-base font-medium">Dashboard</p>
              </NavLink>
            </li>

            <li className="px-4">
              <NavLink
                to={"/admin/user"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                    isActive
                      ? " text-[#000000] bg-[#96c94b]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-regular fa-circle-user"></i>
                <p className="font-medium text-base">User</p>
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink
                to={"/admin/onboard"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                    isActive
                      ? " text-[#000000] bg-[#96c94b]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-solid fa-synagogue text-md"></i>
                <p className="font-medium text-base">Onboard</p>
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink
                to={"/admin/brandbook"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                    isActive
                      ? " text-[#000000] bg-[#96c94b]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-regular fa-calendar-days"></i>
                <p className="font-medium text-base">Brandbook</p>
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink
                to={"/admin/echo"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                    isActive
                      ? " text-[#000000] bg-[#96c94b]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-regular fa-building"></i>
                <p className="font-medium text-base">Echo</p>
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink
                to={"/admin/domain_request"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                    isActive
                      ? " text-[#000000] bg-[#96c94b]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-regular fa-hard-drive"></i>
                <p className="font-medium text-base">Domain Request</p>
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink
                to={"/admin/contact"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                    isActive
                      ? " text-[#000000] bg-[#96c94b]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-regular fa-file-lines"></i>
                <p className="font-medium text-base">Contact</p>
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink
                to={"/admin/profile"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                    isActive
                      ? " text-[#000000] bg-[#96c94b]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-regular fa-id-badge"></i>
                <p className="font-medium text-base">Profile</p>
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink
                to={"/admin/setting"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                    isActive
                      ? " text-[#000000] bg-[#96c94b]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-solid fa-gear text-sm"></i>
                <p className="font-medium text-base">Setting</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SidebarNoCollaps;
