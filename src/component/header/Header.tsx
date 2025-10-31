import Logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import MobileHeader from "./Mobile.header";
import React, { useState } from "react";
import { useAuth } from "../../hook/useAuth";

function Header() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <React.Fragment>
      <header className="border-b border-gray-200 h-24 flex justify-center items-center w-full bg-white z-10">
        <div className="container flex justify-between items-center">
          <div>
            <a href="/">
              <img src={Logo} alt="" className="w-18 h-full" />
            </a>
          </div>
          <div className="lg:hidden block">
            {isShow ? (
              <button
                onClick={() => setIsShow(false)}
                className="cursor-pointer bg-[#96c94b] w-10 h-10 flex justify-center items-center rounded-md"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            ) : (
              <button
                onClick={() => setIsShow(true)}
                className="cursor-pointer bg-[#96c94b] w-10 h-10 flex justify-center items-center rounded-md"
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
            )}
          </div>
          <div className="lg:block hidden">
            <ul className="flex gap-10 items-center">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    `text-md font-medium hover:text-[#bb2d28] hover:border-b hover:border-[#bb2d28] transition-all duration-300 ${
                      isActive
                        ? " text-[#bb2d28] border-b border-[#bb2d28]"
                        : " text-[#212529]"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pricing"
                  className={({ isActive }) =>
                    `text-md font-medium hover:text-[#bb2d28] hover:border-b hover:border-[#bb2d28] transition-all duration-300 ${
                      isActive
                        ? " text-[#bb2d28] border-b border-[#bb2d28]"
                        : " text-[#212529]"
                    }`
                  }
                >
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-md font-medium hover:text-[#bb2d28] hover:border-b hover:border-[#bb2d28] transition-all duration-300 ${
                      isActive
                        ? " text-[#bb2d28] border-b border-[#bb2d28]"
                        : " text-[#212529]"
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/follow-us"
                  className={({ isActive }) =>
                    `text-md font-medium hover:text-[#bb2d28] hover:border-b hover:border-[#bb2d28] transition-all duration-300 ${
                      isActive
                        ? " text-[#bb2d28] border-b border-[#bb2d28]"
                        : " text-[#212529]"
                    }`
                  }
                >
                  Follow US
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/follow"
                  className={({ isActive }) =>
                    `text-md font-medium hover:text-[#bb2d28] hover:border-b hover:border-[#bb2d28] transition-all duration-300 ${
                      isActive
                        ? " text-[#bb2d28] border-b border-[#bb2d28]"
                        : " text-[#212529]"
                    }`
                  }
                >
                  Directory
                </NavLink>
              </li>
            </ul>
          </div>
          {!user ? (
            <div className=" gap-5 items-center lg:flex hidden">
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `flex gap-2 items-center ${
                    isActive ? "text-[#96c94b]" : "text-[#bb2d28]"
                  }`
                }
              >
                <i className="fa-regular fa-circle-user text-2xl"></i>
                <p className="text-md font-medium">Login</p>
              </NavLink>
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `text-md font-medium px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-[#bb2d28] text-white"
                      : "bg-[#96c94b] text-black"
                  }`
                }
              >
                Register Your Brand
              </NavLink>
            </div>
          ) : (
            <Link
              to={user?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}
              className="primary-btn text-md font-medium"
            >
              Dashboard
            </Link>
          )}
        </div>
      </header>
      <MobileHeader isShow={isShow} setIsShow={setIsShow} />
    </React.Fragment>
  );
}

export default Header;
