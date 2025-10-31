import React from "react";
import logo from "../assets/avatar-3.webp";
import { Link } from "react-router";
import UserTemplates from "../component/User.templates";

function SingleUser() {
  const data = {
    username: "jony",
    email: "admin@gmail.com",
    phone: "11111",
    profile: "http://localhost:5173/src/dashboard/assets/banner_img.png",
    role: "user",
    address: "adddasd",
  };

  const { username, email, phone, profile, role, address } = data || {};

  return (
    <React.Fragment>
      <div className="p-3 md:p-5">
        <div className="w-full">
          <h2 className="text-normal text-2xl md:text-3xl">User infos</h2>
          <ul className="flex gap-2 items-center py-2">
            <li>
              <Link
                to="/users"
                className="text-normal text-md md:text-base underline"
              >
                Back
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="jost border border-gray-300 p-5 md:p-10 rounded-lg bg-white">
            <div className="border-b border-gray-300 pb-5 flex justify-between w-full items-center">
              <div className="flex flex-col gap-3">
                <p className="text-2xl text-medium">General Infos</p>
                <p className="text-gray-500 text-md font-normal">
                  {username} profile genaral infos
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Link
                  to={``}
                  className="border border-gray-300 w-10 h-10 flex justify-center items-center rounded-md shadow"
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </Link>
                <Link
                  to={``}
                  className="border border-gray-300 w-10 h-10 flex justify-center items-center rounded-md shadow"
                >
                  <i className="fa-regular fa-eye"></i>
                </Link>
              </div>
            </div>
            <div className="mt-5">
              <div className="border-b border-gray-300 pb-5">
                <p className="text-2xl text-medium">Avater</p>
                <img
                  src={profile ? profile : logo}
                  alt=""
                  className="w-24 rounded-md mt-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-6">
                <div className="flex flex-col gap-1">
                  <p>Username</p>
                  <span className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-md">
                    <i className="fa-regular fa-user border-r border-gray-300 pr-2"></i>
                    <p className="text-bold text-md capitalize">{username}</p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Your email address</p>
                  <span className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-md">
                    <i className="fa-regular fa-envelope border-r border-gray-300 pr-2"></i>
                    <p className="text-bold text-md capitalize">{email}</p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Your phone number</p>
                  <span className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-md">
                    <i className="fa-solid fa-phone-volume border-r border-gray-300 pr-2"></i>
                    <p className="text-bold text-md">
                      {phone ? phone : "Not availavle"}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Your role</p>
                  <span className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-md">
                    <i className="fa-regular fa-address-book border-r border-gray-300 pr-2"></i>
                    <p className="text-bold text-md">{role}</p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Your address</p>
                  <span className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-md">
                    <i className="fa-regular fa-id-badge border-r border-gray-300 pr-2"></i>
                    <p className="text-bold text-md">
                      {address ? address : "Not available"}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-normal">
            User Created Templates: <span className="font-bold">20</span>
          </h2>
          <UserTemplates />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SingleUser;
