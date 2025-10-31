import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useUpdateUserMutation } from "../../../redux/features/auth/authApi";
import { useAuth } from "../../../hook/useAuth";
import SettingPassUpdate from "../../component/setting/Setting.pass.update";

interface UserType {
  profile: string | File | null;
  email: string | null;
  address: string | null;
  phone: string | null;
  username: string | null;
  lastName: string | null;
  firstName: string | null;
  id: string | null;
  secureKey: string | null;
}

interface AuthType {
  user: UserType | null;
}

function AdminSetting() {
  const logoRef = useRef<HTMLInputElement>(null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { user: userAuth } = useAuth() as AuthType;

  const [user, setUser] = useState<UserType>({
    profile: null,
    email: "",
    address: "",
    phone: "",
    username: "",
    lastName: "",
    firstName: "",
    id: "",
    secureKey: "",
  });
  const {
    lastName,
    firstName,
    username,
    email,
    phone,
    address,
    profile,
    secureKey,
  } = user || {};

  useEffect(() => {
    if (userAuth) {
      setUser(userAuth);
    }
  }, [userAuth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username ? username : "");
    formData.append("firstName", firstName ? firstName : "");
    formData.append("lastName", lastName ? lastName : "");
    formData.append("phone", phone ? phone : "");
    formData.append("address", address ? address : "");
    formData.append("secureKey", secureKey ? secureKey : "");
    if (profile instanceof File) {
      formData.append("profile", profile);
    }
    const id = userAuth ? userAuth?.id : "";

    updateUser({ formData, id })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        if (logoRef.current) logoRef.current.value = "";
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    setUser((prevState) => ({
      ...prevState,
      profile: file,
    }));
  };

  return (
    <React.Fragment>
      <div className="p-3 md:p-5">
        <div className="w-full">
          <h2 className="text-normal text-2xl md:text-3xl">Profile Settings</h2>
          <ul className="flex gap-2 items-center py-2">
            <li>
              <Link
                to="/dashboard"
                className="text-normal text-sm md:text-base"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-angles-right text-xs"></i>
            </li>
            <li>
              <p className="text-normal text-sm md:text-base">{username}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className="jost border border-gray-300 p-5 md:p-10 rounded-lg bg-white">
            <div className="border-b border-gray-300 pb-5">
              <p className="text-2xl text-medium">Genral Setting</p>
              <p className="text-gray-500 text-md font-normal">
                Update your settings
              </p>
            </div>
            <div className="mt-5">
              <div className="border-b border-gray-300 pb-5">
                {typeof profile === "string" ? (
                  <img src={profile} alt="" className="w-24 rounded-md mt-2" />
                ) : (
                  <p className="min-w-24 min-h-24 w-24 h-24 rounded-md bg-gray-300 text-6xl uppercase text-normal flex justify-center items-center">
                    {username?.slice(0, 1)}
                  </p>
                )}
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
                    <div className="flex flex-col gap-1">
                      <p>Username</p>
                      <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                        <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                          <i className="fa-regular fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Enter username"
                          name="username"
                          value={username || ""}
                          onChange={handleChange}
                          className="text-normal w-full outline-0"
                        />
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p>First Name</p>
                      <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                        <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                          <i className="fa-regular fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Enter username"
                          name="firstName"
                          value={firstName || ""}
                          onChange={handleChange}
                          className="text-normal w-full outline-0"
                        />
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p>Last Name</p>
                      <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                        <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                          <i className="fa-regular fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Enter username"
                          name="lastName"
                          value={lastName || ""}
                          onChange={handleChange}
                          className="text-normal w-full outline-0"
                        />
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p>Secret Key</p>
                      <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                        <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                          <i className="fa-regular fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Enter secureKey"
                          name="secureKey"
                          value={secureKey || ""}
                          onChange={handleChange}
                          className="text-normal w-full outline-0"
                        />
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p>Email address</p>
                      <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                        <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                          <i className="fa-regular fa-envelope"></i>
                        </span>
                        <input
                          type="text"
                          name="email"
                          value={email || ""}
                          placeholder="Enter email address"
                          className="text-normal w-full outline-0 "
                        />
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p>Enter phone number</p>
                      <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                        <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                          <i className="fa-solid fa-phone-volume"></i>
                        </span>
                        <input
                          type="number"
                          name="phone"
                          value={phone || ""}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          className="text-normal w-full outline-0"
                        />
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p>Enter your address</p>
                      <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                        <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                          <i className="fa-regular fa-id-badge"></i>
                        </span>
                        <input
                          type="text"
                          name="address"
                          value={address || ""}
                          onChange={handleChange}
                          placeholder="ENter address"
                          className="text-normal w-full outline-0"
                        />
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p>Select your profile</p>
                      <span className="flex gap-2 items-center ">
                        <input
                          type="file"
                          name="profile"
                          ref={logoRef}
                          accept="image/jpeg,image/jpg,image/png,image/svg+xml"
                          onChange={handleFileChange}
                          className="text-normal w-full outline-0 "
                        />
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="primary-btn w-fit flex gap-2 items-center px-4 justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 animate-spin"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                        <p>Loading...</p>
                      </>
                    ) : (
                      <>
                        <i className="fa-regular fa-paper-plane"></i>
                        <p>Save Setting</p>
                      </>
                    )}
                  </button>
                </form>
              </div>
              <div className="mt-10 border-t border-gray-300">
                <div className="my-5">
                  <p className="text-gray-700 text-medium text-xl pb-5">
                    Update your password
                  </p>
                </div>
                <SettingPassUpdate id={userAuth ? userAuth?.id : ""} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AdminSetting;
