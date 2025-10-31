import Logo from "../../../assets/logo.png";
import { Link, NavLink } from "react-router";

function SidebarCollaps() {
  return (
    <div className="">
      <div className="flex justify-center items-center py-2">
        <Link to="/">
          <img src={Logo} alt="" className="w-12 h-12 min-w-12 min-h-12" />
        </Link>
      </div>
      <div className="mt-5">
        <nav className="mt-5">
          <ul className="flex flex-col gap-3">
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/admin/dashboard"}
                  end
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-solid fa-table-columns text-lg"></i>
                </NavLink>
                <p className="absolute left-full z-20 top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Dashboard
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/admin/user"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-regular fa-circle-user text-lg"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  User
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/admin/onboard"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-solid fa-synagogue text-lg"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Onboard
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/admin/brandbook"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-regular fa-calendar-days text-lg"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Brandbook
                </p>
              </div>
            </li>

            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/admin/echo"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-regular fa-building text-lg"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Echo
                </p>
              </div>
            </li>

            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/admin/domain_request"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-regular fa-hard-drive text-lg"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Domain Request
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/admin/contact"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-regular fa-file-lines text-lg"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Contact
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/admin/profile"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-regular fa-id-badge text-lg"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Profile
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/admin/setting"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-solid fa-gear text-lg"></i>
                </NavLink>
                <p className="absolute left-full z-50 top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Setting
                </p>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SidebarCollaps;
