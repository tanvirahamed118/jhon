import React from "react";
import { useAuth } from "../../hook/useAuth";

interface authType {
  user: UserType | null;
}

interface UserType {
  profile: string | null;
  landerName: string | null;
  domain: string | null;
  email: string | null;
  role: string | null;
  address: string | null;
  phone: string | null;
  status: string | null;
  midName: string | null;
  nickName: string | null;
  secondEmail: string | null;
  username: string | null;
  lastName: string | null;
  firstName: string | null;
  cardNumber: string | null;
}
function Profile() {
  const { user } = useAuth() as authType;

  const {
    landerName,
    email,
    phone,
    profile,
    role,
    address,
    midName,
    nickName,
    secondEmail,
    username,
    status,
    lastName,
    firstName,
    cardNumber,
  } = user || {};

  return (
    <React.Fragment>
      <div className="p-3 md:p-5">
        <div className="w-full">
          <h2 className="text-normal text-2xl md:text-3xl">Persoal Profile</h2>
          <ul className="flex gap-2 items-center py-2">
            <li>
              <a href="" className="text-normal text-sm md:text-base">
                Dashboard
              </a>
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
              <p className="text-2xl text-medium">Profile Infos</p>
              <p className="text-gray-500 text-md font-normal">
                Your detail profile infos
              </p>
            </div>
            <div className="mt-5">
              <div className="border-b border-gray-300 pb-5">
                {profile ? (
                  <img src={profile} alt="" className="w-24 rounded-md mt-2" />
                ) : (
                  <p className="min-w-24 min-h-24 w-24 h-24 rounded-md bg-gray-300 text-6xl uppercase text-normal flex justify-center items-center">
                    {landerName?.slice(0, 1)}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-6">
                <div className="flex flex-col gap-1">
                  <p>Lander name</p>
                  <span className="bg-[#F1F1F1] flex gap-2 items-center border border-gray-200 rounded-md">
                    <i className="fa-regular fa-user border-r border-gray-300 py-3 px-4 text-xl"></i>
                    <p className="text-bold text-md capitalize p-3">
                      {landerName}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Email</p>
                  <span className="bg-[#F1F1F1] flex gap-2 items-center border border-gray-300 rounded-md">
                    <i className="fa-regular fa-envelope border-r border-gray-300 px-4 py-3 text-xl"></i>
                    <p className="text-bold text-md capitalize p-3">{email}</p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Your phone number</p>
                  <span className="bg-[#F1F1F1] flex gap-2 items-center border border-gray-200 rounded-md">
                    <i className="fa-solid fa-phone-volume border-r border-gray-300 py-3 px-4 text-lg"></i>
                    <p className="text-bold text-md p-3">
                      {phone ? phone : "Not availavle"}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Role</p>
                  <span className="bg-[#F1F1F1] flex gap-2 items-center border border-gray-200 rounded-md">
                    <i className="fa-solid fa-ruler-vertical border-r border-gray-300 py-3 px-4 text-2xl"></i>
                    <p className="text-bold text-md p-3">{role}</p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Address</p>
                  <span className="bg-[#F1F1F1] flex gap-2 items-center border border-gray-200 rounded-md">
                    <i className="fa-regular fa-address-book border-r border-gray-300 py-3 px-4 text-xl"></i>
                    <p className="text-bold text-md p-">
                      {address ? address : "Not available"}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Mid Name</p>
                  <span className="bg-[#F1F1F1] flex gap-2 items-center border border-gray-200 rounded-md">
                    <i className="fa-regular fa-id-badge border-r border-gray-300 py-3 px-4 text-xl"></i>
                    <p className="text-bold text-md p-3">
                      {midName ? midName : "Not available"}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Second Email</p>
                  <span className="bg-[#F1F1F1] flex gap-2 items-center border border-gray-200 rounded-md">
                    <i className="fa-regular fa-envelope border-r border-gray-300 py-3 px-4 text-xl"></i>
                    <p className="text-bold text-md p-3">
                      {secondEmail ? secondEmail : "Not available"}
                    </p>
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Card Number</p>
                  <span className="bg-[#F1F1F1] flex gap-2 items-center border border-gray-200 rounded-md">
                    <i className="fa-regular fa-credit-card border-r border-gray-300 py-3 px-4 text-xl"></i>
                    <p className="text-bold text-md p-3">
                      {cardNumber ? cardNumber : "Not available"}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Nick Name</p>
                  <span className="bg-[#F1F1F1] flex gap-2 items-center border border-gray-200 rounded-md">
                    <i className="fa-solid fa-user-astronaut border-r border-gray-300 py-3 px-4 text-xl"></i>
                    <p className="text-bold text-md p-3">
                      {nickName ? nickName : "Not available"}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Username</p>
                  <span className="bg-[#F1F1F1] flex gap-2 items-center border border-gray-200 rounded-md">
                    <i className="fa-regular fa-id-badge border-r border-gray-200 py-3 px-4 text-xl"></i>
                    <p className="text-bold text-md p-3">
                      {username ? username : "Not available"}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>First Name</p>
                  <span className="bg-[#F1F1F1] flex gap-2 items-center border border-gray-200 rounded-md">
                    <i className="fa-solid fa-user-gear border-r border-gray-200 py-3 px-4 text-xl"></i>
                    <p className="text-bold text-md p-3">
                      {firstName ? firstName : "Not available"}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Last Name</p>
                  <span className="bg-[#F1F1F1] flex gap-2 items-center border border-gray-200 rounded-md">
                    <i className="fa-solid fa-user-gear border-r border-gray-200 py-3 px-4 text-xl"></i>
                    <p className="text-bold text-md p-3">
                      {lastName ? lastName : "Not available"}
                    </p>
                  </span>
                </div>
                <div className="bg-[#F1F1F1] flex gap-5 border border-gray-200 px-4 py-2 rounded-md md:col-span-2">
                  <p>Profile Status:</p>
                  <span className="flex gap-2 items-center">
                    <p
                      className={` px-3 py-1 rounded-md text-sm font-bold w-fit ${
                        status === "ACTIVATE"
                          ? "text-green-500 bg-green-100"
                          : "text-red-500 bg-red-100"
                      }`}
                    >
                      {status}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;
