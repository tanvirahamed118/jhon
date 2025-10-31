import React, { useEffect, useRef, useState, type SetStateAction } from "react";
import {
  useGetOneUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface UserType {
  profile: string | File | null;
  landerName: string | null;
  email: string | null;
  address: string | null;
  phone: string | null;
  midName: string | null;
  nickName: string | null;
  secondEmail: string | null;
  username: string | null;
  lastName: string | null;
  firstName: string | null;
  cardNumber: string | null;
  id: string | null;
}

function UpdateUser({
  id,
  showTab,
  setShowTab,
}: {
  id: string;
  showTab: boolean;
  setShowTab: React.Dispatch<SetStateAction<boolean>>;
}) {
  const logoRef = useRef<HTMLInputElement>(null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { data } = useGetOneUserQuery(id);
  const userAuth = data?.user as UserType;

  const [user, setUser] = useState<UserType>({
    profile: null,
    landerName: "",
    email: "",
    address: "",
    phone: "",
    midName: "",
    nickName: "",
    secondEmail: "",
    username: "",
    lastName: "",
    firstName: "",
    cardNumber: "",
    id: "",
  });
  const {
    landerName,
    midName,
    nickName,
    secondEmail,
    lastName,
    firstName,
    cardNumber,
    username,
    email,
    phone,
    address,
    profile,
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
    formData.append("landerName", landerName ? landerName : "");
    formData.append("firstName", firstName ? firstName : "");
    formData.append("lastName", lastName ? lastName : "");
    formData.append("midName", midName ? midName : "");
    formData.append("nickName", nickName ? nickName : "");
    formData.append("secondEmail", secondEmail ? secondEmail : "");
    formData.append("cardNumber", cardNumber ? cardNumber : "");
    formData.append("phone", phone ? phone : "");
    formData.append("address", address ? address : "");
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
    <section className="inset-0 bg-[#00000039] flex fixed left-0 justify-center items-center w-full z-50">
      <div
        className={`w-full m-auto flex justify-center items-center ${
          showTab ? "zoom-animation" : ""
        }`}
      >
        <div className="relative w-11/12 3xl:w-6/12 xl:w-8/12 rounded-lg bg-[#ffffff] h-full p-10">
          <div>
            <h2 className="text-3xl font-medium text-black border-b border-gray-300 pb-5">
              Update User Info
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5"
            >
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
                <p>Lander Name</p>
                <span className="flex gap-2 items-center border border-gray-300 rounded-md bg-gray-100">
                  <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Enter username"
                    name="landerName"
                    value={landerName || ""}
                    onChange={handleChange}
                    disabled
                    className="text-normal w-full outline-0 "
                  />
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p>Mid Name</p>
                <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                  <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Enter username"
                    name="midName"
                    value={midName || ""}
                    onChange={handleChange}
                    className="text-normal w-full outline-0"
                  />
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p>Nick Name</p>
                <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                  <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Enter username"
                    name="nickName"
                    value={nickName || ""}
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
                <p>Card Numberr</p>
                <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                  <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Enter cardNumber"
                    name="cardNumber"
                    value={cardNumber || ""}
                    onChange={handleChange}
                    className="text-normal w-full outline-0"
                  />
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p>Email address</p>
                <span className="flex gap-2 items-center border border-gray-300 rounded-md bg-gray-100">
                  <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    name="email"
                    value={email || ""}
                    placeholder="Enter email address"
                    disabled
                    className="text-normal w-full outline-0 "
                  />
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p>Second Email address</p>
                <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                  <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    name="secondEmail"
                    value={secondEmail || ""}
                    onChange={handleChange}
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
          <button
            onClick={() => setShowTab(false)}
            className="absolute top-3 right-3 cursor-pointer text-red-500 text-3xl"
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default UpdateUser;
