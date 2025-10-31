import React, { useEffect, useRef, useState } from "react";
import SettingPassUpdate from "../component/setting/Setting.pass.update";
import { Link } from "react-router";
import { useAuth } from "../../hook/useAuth";
import { useUpdateUserMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import InputComponent from "../../component/ui/Input.component";
import cardValidator from "../../utils/card.validator";
import DeactivateAccount from "../component/setting/Deactivate.account";

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
  cardNumber: string;
  id: string | null;
}

interface AuthType {
  user: UserType | null;
}

function Setting() {
  const logoRef = useRef<HTMLInputElement>(null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [onFocus, setOnFocus] = useState(false);
  const { user: userAuth } = useAuth() as AuthType;
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
    if (!cardValidator(cardNumber) && onFocus) {
      toast.error("Invalid card number!");
      return;
    }
    const formData = new FormData();
    formData.append("username", username ? username : "");
    formData.append("landerName", landerName ? landerName : "");
    formData.append("firstName", firstName ? firstName : "");
    formData.append("lastName", lastName ? lastName : "");
    formData.append("midName", midName ? midName : "");
    formData.append("nickName", nickName ? nickName : "");
    formData.append("secondEmail", secondEmail ? secondEmail : "");
    formData.append("cardNumber", cardNumber ? cardNumber?.slice(-4) : "");
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
        setOnFocus(false);
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
        setOnFocus(false);
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

  function formatCardNumber(value: string): string {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  }

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
              <p className="text-normal text-sm md:text-base">{midName}</p>
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
                    {landerName?.slice(0, 1)}
                  </p>
                )}
              </div>
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5"
                >
                  <div className="flex flex-col gap-1">
                    <p>Username</p>
                    <InputComponent
                      type="text"
                      placeholder="Update username"
                      name="username"
                      value={username || ""}
                      handleChange={handleChange}
                      autoComplete="username"
                      required={false}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Lander Name</p>
                    <InputComponent
                      type="text"
                      placeholder="Update landername"
                      name="landerName"
                      value={landerName || ""}
                      handleChange={handleChange}
                      autoComplete="landerName"
                      required={false}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Mid Name</p>
                    <InputComponent
                      type="text"
                      placeholder="Update middle name"
                      name="midName"
                      value={midName || ""}
                      handleChange={handleChange}
                      autoComplete="midName"
                      required={false}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Nick Name</p>
                    <InputComponent
                      type="text"
                      placeholder="Update nick name"
                      name="nickName"
                      value={nickName || ""}
                      handleChange={handleChange}
                      autoComplete="nickName"
                      required={false}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>First Name</p>
                    <InputComponent
                      type="text"
                      placeholder="Update first name"
                      name="firstName"
                      value={firstName || ""}
                      handleChange={handleChange}
                      autoComplete="firstName"
                      required={false}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Last Name</p>
                    <InputComponent
                      type="text"
                      placeholder="Update last name"
                      name="lastName"
                      value={lastName || ""}
                      handleChange={handleChange}
                      autoComplete="lastName"
                      required={false}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Card Number</p>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => {
                        setOnFocus(true);
                        const formatted = formatCardNumber(e.target.value);
                        setUser((prev) => ({
                          ...prev,
                          cardNumber: formatted,
                        }));
                      }}
                      className={`bg-[#F3F3F3] border-green-300 border px-4 py-3 rounded-xl w-full outline-none ${
                        !cardValidator(cardNumber) && onFocus
                          ? "!border-red-500"
                          : "border-green-300"
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {!cardValidator(cardNumber) && onFocus && (
                      <span className="text-red-500 text-sm">
                        Invalid card number
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Email address</p>
                    <input
                      type="text"
                      name="email"
                      value={email || ""}
                      placeholder="Enter email address"
                      disabled
                      className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border py-3 px-3 w-full rounded-xl text-normal"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Second Email address</p>

                    <InputComponent
                      type="email"
                      placeholder="Update second email"
                      name="secondEmail"
                      value={secondEmail || ""}
                      handleChange={handleChange}
                      autoComplete="secondEmail"
                      required={false}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Enter phone number</p>
                    <InputComponent
                      type="number"
                      placeholder="Update second email"
                      name="phone"
                      value={phone || ""}
                      handleChange={handleChange}
                      autoComplete="phone"
                      required={false}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Enter your address</p>
                    <InputComponent
                      type="text"
                      placeholder="Update second email"
                      name="address"
                      value={address || ""}
                      handleChange={handleChange}
                      autoComplete="address"
                      required={false}
                    />
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
                        className="text-normal w-full outline-0 bg-[#F3F3F3] !p-2 !rounded-xl"
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
              <div className="mt-10 border-t border-gray-300">
                <div className="my-5">
                  <p className="text-gray-700 text-medium text-xl pb-5">
                    Update your password
                  </p>
                </div>
                <SettingPassUpdate id={userAuth ? userAuth?.id : ""} />
              </div>
              <DeactivateAccount />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Setting;
