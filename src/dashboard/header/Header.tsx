import { useNavigate } from "react-router";
import HeaderProfile from "./Header.profile";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAuth } from "../../hook/useAuth";
import HeaderOnboards from "./Header.onboards";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";

interface Types {
  setSidebard: React.Dispatch<React.SetStateAction<boolean>>;
  sidebar: boolean;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserAuth {
  user: {
    role: string | null;
    landerName: string | null;
    profile: string | null;
    username: string | null;
  } | null;
}

function Header({ setSidebard, sidebar, setNavbar }: Types) {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const [isProfile, setIsProfile] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const notifyRef = useRef<HTMLDivElement | null>(null);
  const [existOnboard, setExistonboard] = useState<number>(0);
  const { user } = useAuth() as UserAuth;
  const { role, profile, landerName, username } = user || {};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifyRef.current &&
        !notifyRef.current.contains(event.target as Node)
      ) {
        setIsNotify(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout(user)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate("/");
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
      });
  };

  return (
    <header className="sticky z-10 top-0 bg-white flex justify-between items-center h-16 border-b-2 border-gray-200 p-3 md:px-5">
      <div className="flex gap-5 items-center w-3/12">
        <button
          onClick={() => setSidebard(!sidebar)}
          className="xl:flex hidden border border-gray-200 w-10 min-w-10 h-10 justify-center items-center rounded-lg cursor-pointer text-xl"
        >
          {sidebar ? (
            <TbLayoutSidebarLeftCollapse size={30} />
          ) : (
            <TbLayoutSidebarRightCollapse size={30} />
          )}
        </button>
        <button
          onClick={() => setNavbar(true)}
          className="block xl:hidden border shadow-sm border-gray-200 px-2 py-1 rounded-lg cursor-pointer"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <div className="flex gap-3 md:gap-5 items-center">
        {role === "ADMIN" && (
          <div className="relative" ref={notifyRef}>
            <button
              onClick={() => setIsNotify((prev) => !prev)}
              className="relative border border-gray-200 px-2 py-1 rounded-lg cursor-pointer"
            >
              <i className="fa-regular fa-bell"></i>

              {existOnboard > 0 && (
                <p className="bg-red-500 w-2 h-2 rounded-full absolute top-[-2px] right-[-2px]"></p>
              )}
            </button>
            <HeaderOnboards
              setExistonboard={setExistonboard}
              isNotify={isNotify}
            />
          </div>
        )}

        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setIsProfile((prev) => !prev)}
            className="flex gap-2 items-center cursor-pointer"
          >
            {user?.role === "USER" && (
              <p className="shadow uppercase border border-gray-200 px-4 py-2 rounded-xl">
                {landerName}
              </p>
            )}
            {profile ? (
              <img
                src={profile}
                alt=""
                className="w-10 min-w-10 rounded-full h-10 object-cover"
              />
            ) : (
              <p className="w-10 h-10 rounded-full bg-[#FFD2A3] text-xl uppercase text-normal flex justify-center items-center">
                {user?.role === "USER"
                  ? landerName?.slice(0, 1)
                  : username?.slice(0, 1)}
              </p>
            )}
          </div>

          <HeaderProfile
            isProfile={isProfile}
            handleLogout={handleLogout}
            setIsProfile={setIsProfile}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Toaster />
    </header>
  );
}

export default Header;
