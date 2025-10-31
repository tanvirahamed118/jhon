import { Link, NavLink } from "react-router";
import Logo from "../../assets/logo.png";

interface Types {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileHeader({ isShow, setIsShow }: Types) {
  return (
    <section
      className={
        isShow
          ? "fixed w-72 inset-0 min-h-[100vh] max-h-screen max-w-72 top-0 left-0 bg-white border-r border-gray-200 active z-10"
          : "fixed w-72 inset-0 min-h-[100vh] max-h-screen max-w-72 top-0 left-0 bg-white border-r border-gray-200 inactive"
      }
    >
      <div className="w-full h-full relative">
        <div className="flex justify-center items-center py-5">
          <Link to="/" className="block">
            <img src={Logo} alt="" className="w-24 h-full" />
          </Link>
        </div>
        <div className="px-5">
          <ul className="flex flex-col gap-5">
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
        <div className="flex gap-5 items-center p-3 mt-5">
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
              `text-md font-medium  py-2 px-3 rounded-md ${
                isActive ? "bg-[#bb2d28] text-white" : "bg-[#96c94b] text-black"
              }`
            }
          >
            Register Domain
          </NavLink>
        </div>
        <div className="absolute bottom-5 left-5">
          <div className="flex gap-3 items-center justify-center mb-3">
            <a
              href="https://www.facebook.com/MyBrandLife"
              target="_blank"
              className="text-gray-300 hover:text-[#bb2d28]"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/mybrandlife.me/"
              target="_blank"
              className="text-gray-300 hover:text-[#bb2d28]"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/mybrandlife/"
              target="_blank"
              className="text-gray-300 hover:text-[#bb2d28]"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://www.youtube.com/@MyBrandLife"
              target="_blank"
              className="text-gray-300 hover:text-[#bb2d28]"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
          <p className="text-gray-400 text-xs font-normal">
            © {new Date().getFullYear()} MyBrandLife.me. All rights reserved.
          </p>
        </div>
        <button
          onClick={() => setIsShow(false)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-xl hover:text-[#bb2d28]"></i>
        </button>
      </div>
    </section>
  );
}

export default MobileHeader;
