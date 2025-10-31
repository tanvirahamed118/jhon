import { Link, NavLink } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../../hook/useAuth";
import MYDJLIFE from "../../assets/logos/mydjlife.png";
import MYINFLUENCERLIFE from "../../assets/logos/myinfluencerlife.png";
import MYSTUDENTLIFE from "../../assets/logos/mystudentlife.png";
import MYRESTRURENTLIFE from "../../assets/logos/myrestrurentlife.png";
import MYBUSINESSLIFE from "../../assets/logos/myBusinessLife.png";
import MYCHEFLIFE from "../../assets/logos/myChefLife.png";
import MYMUSICLIFE from "../../assets/logos/myMusicLife.png";
import MYPIZZALIFE from "../../assets/logos/myPizzaLife.png";
import MYSTORELIFE from "../../assets/logos/myStoreLife.png";
import MYBARTENDINGLIFE from "../../assets/logos/myBartendingLife.png";
import MYFRELANCERLIFE from "../../assets/logos/myFreelancerLife.png";
import MYSERVICELIFE from "../../assets/logos/myservicelife.png";
import MYTEMPLIFE from "../../assets/logos/mytemplife.png";
import MYCOOKINGLIFE from "../../assets/logos/mycookinglife.png";
import MYCPALIFE from "../../assets/logos/mycpalife.png";
import MYENTERTAINMENTLIFE from "../../assets/logos/myentertainmentlife.png";
import MYNIGHTLIFE from "../../assets/logos/mynightlife.png";
import MYAILIFE from "../../assets/logos/myailife.png";
import MYCLUBLIFE from "../../assets/logos/myclublife.png";
import MYMEDIALIFE from "../../assets/logos/mymedialife.png";
import MYSTYLISTLIFE from "../../assets/logos/mystylistlife.png";
import MYDEVLIFE from "../../assets/logos/mydevlife.png";
import MYLATINLIFE from "../../assets/logos/mylatinlife.png";
import MYMARKETLIFE from "../../assets/logos/mymakerlife.png";
import MYSALOONLIFE from "../../assets/logos/mysaloonLife.png";
import MYBARBERLIFE from "../../assets/logos/mybarberlife.png";
import MYGYMLIFE from "../../assets/logos/mygymlife.png";
import MYNITELIFE from "../../assets/logos/mynitelife.png";
import MYSALONLIFE from "../../assets/logos/mysalonlife.png";
import MYWORLDLIFE from "../../assets/logos/myworldlife.png";
import MYBARLIFE from "../../assets/logos/mybarlife.png";
import MYEVENTLIFE from "../../assets/logos/myeventlife.png";
import { RiCalendarEventLine } from "react-icons/ri";
import { FiGitPullRequest } from "react-icons/fi";

interface Types {
  navbar: boolean;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileHeader({ navbar, setNavbar }: Types) {
  const handleClose = () => {
    setNavbar(false);
  };

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
              <img
                src={getLogo[domain.replace(".me", "")]}
                alt=""
                className="w-24 h-24 min-w-24 min-h-24"
              />
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
                    to={"/dashboard"}
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
                    to={"/build-your-lander"}
                    className={({ isActive }) =>
                      `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                        isActive
                          ? " text-[#000000] bg-[#96c94b]"
                          : " text-[#212529]"
                      }`
                    }
                  >
                    <i className="fa-regular fa-calendar-plus"></i>
                    <p className="font-medium text-base">Build Your Lander</p>
                  </NavLink>
                </li>

                <li className="px-4">
                  <NavLink
                    to={"/onboard"}
                    className={({ isActive }) =>
                      `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                        isActive
                          ? " text-[#000000] bg-[#96c94b]"
                          : " text-[#212529]"
                      }`
                    }
                  >
                    <i className="fa-solid fa-synagogue"></i>
                    <p className="font-medium text-base">Onboard</p>
                  </NavLink>
                </li>

                <li className="px-4">
                  <NavLink
                    to={"/subscription"}
                    className={({ isActive }) =>
                      `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                        isActive
                          ? " text-[#000000] bg-[#96c94b]"
                          : " text-[#212529]"
                      }`
                    }
                  >
                    <i className="fa-solid fa-money-bill-trend-up"></i>
                    <p className="font-medium text-base">Subscription</p>
                  </NavLink>
                </li>

                {user?.package === "gold" && (
                  <li className="px-4">
                    <NavLink
                      to={"/brandbook"}
                      className={({ isActive }) =>
                        `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                          isActive
                            ? " text-[#000000] bg-[#96c94b]"
                            : " text-[#212529]"
                        }`
                      }
                    >
                      <RiCalendarEventLine size={20} />
                      <p className="font-medium text-base">Brandbook</p>
                    </NavLink>
                  </li>
                )}
                {user?.package === "gold" && (
                  <li className="px-4">
                    <NavLink
                      to={"/echo"}
                      className={({ isActive }) =>
                        `flex gap-3 rounded-lg items-center hover:text-[#000000] hover:bg-[#96c94b] py-2 px-4 ${
                          isActive
                            ? " text-[#000000] bg-[#96c94b]"
                            : " text-[#212529]"
                        }`
                      }
                    >
                      <FiGitPullRequest size={20} />
                      <p className="font-medium text-base">Echo</p>
                    </NavLink>
                  </li>
                )}

                <li className="px-4">
                  <NavLink
                    to={"/profile"}
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
                    to={"/setting"}
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

export default MobileHeader;
