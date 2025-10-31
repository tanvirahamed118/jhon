import Logo from "../../../assets/logo.png";
import { Link, NavLink } from "react-router";
import { useAuth } from "../../../hook/useAuth";
import MYDJLIFE from "../../../assets/logos/mydjlife.png";
import MYINFLUENCERLIFE from "../../../assets/logos/myinfluencerlife.png";
import MYSTUDENTLIFE from "../../../assets/logos/mystudentlife.png";
import MYRESTRURENTLIFE from "../../../assets/logos/myrestrurentlife.png";
import MYBUSINESSLIFE from "../../../assets/logos/myBusinessLife.png";
import MYCHEFLIFE from "../../../assets/logos/myChefLife.png";
import MYMUSICLIFE from "../../../assets/logos/myMusicLife.png";
import MYPIZZALIFE from "../../../assets/logos/myPizzaLife.png";
import MYSTORELIFE from "../../../assets/logos/myStoreLife.png";
import MYBARTENDINGLIFE from "../../../assets/logos/myBartendingLife.png";
import MYFRELANCERLIFE from "../../../assets/logos/myFreelancerLife.png";
import MYSERVICELIFE from "../../../assets/logos/myservicelife.png";
import MYTEMPLIFE from "../../../assets/logos/mytemplife.png";
import MYCOOKINGLIFE from "../../../assets/logos/mycookinglife.png";
import MYCPALIFE from "../../../assets/logos/mycpalife.png";
import MYENTERTAINMENTLIFE from "../../../assets/logos/myentertainmentlife.png";
import MYNIGHTLIFE from "../../../assets/logos/mynightlife.png";
import MYAILIFE from "../../../assets/logos/myailife.png";
import MYCLUBLIFE from "../../../assets/logos/myclublife.png";
import MYMEDIALIFE from "../../../assets/logos/mymedialife.png";
import MYSTYLISTLIFE from "../../../assets/logos/mystylistlife.png";
import MYDEVLIFE from "../../../assets/logos/mydevlife.png";
import MYLATINLIFE from "../../../assets/logos/mylatinlife.png";
import MYMARKETLIFE from "../../../assets/logos/mymakerlife.png";
import MYSALOONLIFE from "../../../assets/logos/mysaloonLife.png";
import MYBARBERLIFE from "../../../assets/logos/mybarberlife.png";
import MYGYMLIFE from "../../../assets/logos/mygymlife.png";
import MYNITELIFE from "../../../assets/logos/mynitelife.png";
import MYSALONLIFE from "../../../assets/logos/mysalonlife.png";
import MYWORLDLIFE from "../../../assets/logos/myworldlife.png";
import MYBARLIFE from "../../../assets/logos/mybarlife.png";
import MYEVENTLIFE from "../../../assets/logos/myeventlife.png";
import { RiCalendarEventLine } from "react-icons/ri";
import { FiGitPullRequest } from "react-icons/fi";

function SidebarCollaps() {
  const { user } = useAuth() as {
    user: { domain: string; role: string; package: string } | null;
  };
  const domain = user?.domain ?? "";
  const getLogo: Record<string, string> = {
    mydjlife: MYDJLIFE,
    myinfluencerlife: MYINFLUENCERLIFE,
    mystudentlife: MYSTUDENTLIFE,
    myrestaurantlife: MYRESTRURENTLIFE,
    mybusinesslife: MYBUSINESSLIFE,
    mycheflife: MYCHEFLIFE,
    mymusiclife: MYMUSICLIFE,
    mypizzalife: MYPIZZALIFE,
    mystorelife: MYSTORELIFE,
    mybartendinglife: MYBARTENDINGLIFE,
    myfreelancerlife: MYFRELANCERLIFE,
    myservicelife: MYSERVICELIFE,
    mytemplife: MYTEMPLIFE,
    mycookinglife: MYCOOKINGLIFE,
    mycpalife: MYCPALIFE,
    myentertainmentlife: MYENTERTAINMENTLIFE,
    mynightlife: MYNIGHTLIFE,
    myailife: MYAILIFE,
    myclublife: MYCLUBLIFE,
    mymedialife: MYMEDIALIFE,
    mystylistlife: MYSTYLISTLIFE,
    mydevlife: MYDEVLIFE,
    mylatinlife: MYLATINLIFE,
    mymakerlife: MYMARKETLIFE,
    mysaloonLife: MYSALOONLIFE,
    mybarberlife: MYBARBERLIFE,
    mygymlife: MYGYMLIFE,
    mynitelife: MYNITELIFE,
    mysalonlife: MYSALONLIFE,
    myworldlife: MYWORLDLIFE,
    mybarlife: MYBARLIFE,
    myeventlife: MYEVENTLIFE,
  };

  return (
    <div className="">
      <div className="flex justify-center items-center py-2">
        <Link to="/">
          {user?.role === "ADMIN" ? (
            <img src={Logo} alt="" className="w-24 h-24 min-w-24 min-h-24" />
          ) : (
            <img
              src={getLogo[domain.replace(".me", "")]}
              alt=""
              className="w-12 h-12 min-w-12 min-h-12"
            />
          )}
        </Link>
      </div>
      <div className="mt-5">
        <nav className="mt-5">
          <ul className="flex flex-col gap-4">
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/dashboard"}
                  end
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-solid fa-table-columns text-md"></i>
                </NavLink>
                <p className="absolute left-full z-20 top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Dashboard
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/build-your-lander"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-regular fa-calendar-plus"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Build Your Lander
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/onboard"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-solid fa-synagogue text-md"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Onboard
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/subscription"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-solid fa-money-bill-trend-up text-md"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Subscriptions
                </p>
              </div>
            </li>
            {user?.package === "gold" && (
              <li className="flex justify-center">
                <div className="group relative inline-block">
                  <NavLink
                    to={"/brandbook"}
                    className={({ isActive }) =>
                      `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                        isActive
                          ? "text-[#000000] bg-[#96c94b]"
                          : "text-[#212529]"
                      }`
                    }
                  >
                    <RiCalendarEventLine size={20} />
                  </NavLink>
                  <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                    Brandbook
                  </p>
                </div>
              </li>
            )}
            {user?.package === "gold" && (
              <li className="flex justify-center">
                <div className="group relative inline-block">
                  <NavLink
                    to={"/echo"}
                    className={({ isActive }) =>
                      `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                        isActive
                          ? "text-[#000000] bg-[#96c94b]"
                          : "text-[#212529]"
                      }`
                    }
                  >
                    <FiGitPullRequest size={20} />
                  </NavLink>
                  <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                    Echo
                  </p>
                </div>
              </li>
            )}
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/profile"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-regular fa-id-badge text-md"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#000] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  Profile
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/setting"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "text-[#000000] bg-[#96c94b]"
                        : "text-[#212529]"
                    }`
                  }
                >
                  <i className="fa-solid fa-gear text-md"></i>
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
