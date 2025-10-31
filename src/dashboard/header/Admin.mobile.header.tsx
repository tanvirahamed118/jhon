import { Link, NavLink } from "react-router";
import Logo from "../../assets/logo.png";
import { useEffect } from "react";

interface Types {
  navbar: boolean;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminMobileHeader({ navbar, setNavbar }: Types) {
  const handleClose = () => {
    setNavbar(false);
  };

  useEffect(() => {
    if (navbar) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [navbar]);

  return (
    <header className="w-full">
      <div
        onClick={() => setNavbar(false)}
        className={`fixed top-0 left-0 w-full h-full bg-[#00000040] z-20 ${
          navbar ? "active" : "inactive"
        }`}
      ></div>

      <div
        className={
          navbar
            ? "w-72 h-screen bg-white border-r border-gray-200 absolute top-0 left-0 active z-20"
            : "w-72 h-screen bg-white border-r border-gray-200 absolute top-0 left-0 inactive"
        }
      >
        <div className="relative">
          <div className="flex justify-center items-center py-2">
            <Link to={""}>
              <img onClick={handleClose} src={Logo} alt="" className="w-24" />
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
          <button
            onClick={handleClose}
            className="border border-gray-300 shadow-sm rounded-full bg-white w-8 h-8 flex justify-center items-center absolute top-1 right-[-15px] hover:bg-[#2B7F75] hover:text-white cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminMobileHeader;
