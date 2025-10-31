import React from "react";
import Banner from "../assets/job-feed-logo.webp";
import Style from "../../utils/custom.module.css";
import { Link } from "react-router";
import { useAuth } from "../../hook/useAuth";

interface authType {
  user: UserType | null;
}

interface UserType {
  address: string | null;
  phone: string | null;
  domain: string | null;
  package: string | null;
  frequency: string | null;
  planPrice: string | null;
  membership: MembershipType;
}

interface MembershipType {
  create_at: string | null;
  activate_at: string | null;
  price: string | null;
  duration: string | null;
  status: string | null;
  expired: string | null;
}

function Subscription() {
  const { user } = useAuth() as authType;

  const {
    address,
    phone,
    domain,
    package: pkgType,
    frequency,
    planPrice,
  } = user || {};

  const { create_at, activate_at, price, duration, status } =
    user?.membership || {};

  const formattedDate = (value: string) => {
    const createDate = new Date(value);
    return createDate?.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <React.Fragment>
      <div className="p-3 md:p-5 min-h-screen">
        <div className="w-full">
          <h2 className="text-normal text-2xl md:text-3xl">Subscription</h2>
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
              <Link
                to="/subscription"
                className="text-normal text-sm md:text-base"
              >
                Subscription
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="bg-white border border-gray-300 p-5 md:p-10 rounded-xl flex lg:flex-row flex-col gap-10 md:gap-0 justify-between items-center">
            <div className="flex flex-col gap-3">
              <h2 className="jost text-medium text-xl md:text-4xl leading-relaxed w-full lg:w-8/12">
                Build Your Brand with My Brand Life
              </h2>
              <h2 className="jost text-medium text-xl md:text-2xl leading-relaxed w-full lg:w-8/12">
                From idea to launch, manage everything in one place — create,
                customize, and scale your business with ease.
              </h2>
              <p className="text-gray-400 font-normal text-lg">
                Top Template Development Platform
              </p>
              <p className="text-gray-400 font-normal text-lg">
                Login | Build | Launch | Succeed 🚀
              </p>
            </div>
            <img src={Banner} alt="" />
          </div>
          <div className="bg-white p-5 md:-10 rounded-lg mt-5 border border-gray-300">
            <div className="w-full lg:w-6/12 md:flex-row flex-col flex justify-between mt-10">
              <div>
                <h2 className="text-gray-500 text-md font-bold">From</h2>
                <p className="text-gray-500 text-sm font-normal">
                  {address ? address : "not-available"}
                </p>
                <p className="text-gray-500 text-sm font-normal">
                  {phone ? phone : "not-available"}
                </p>

                <div className="py-5">
                  <p className="text-gray-500 text-md font-bold">Start At</p>
                  <p className="text-gray-500 text-sm font-normal">
                    {create_at ? formattedDate(create_at) : "not-available"}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-gray-500 text-md font-bold">
                  Package Deatils:
                </h2>
                <p className="text-gray-500 text-sm font-normal capitalize">
                  Package: {pkgType ? pkgType : "not-available"}
                </p>
                <p className="text-gray-500 text-sm font-normal capitalize">
                  Frequency: {frequency ? frequency : "not-available"}
                </p>
                <p className="text-gray-500 text-sm font-normal capitalize">
                  Price: ${planPrice ? planPrice : "not-available"}
                </p>
                <p className="text-gray-500 text-sm font-normal capitalize">
                  Expired In:{" "}
                  {activate_at ? formattedDate(activate_at) : "not-available"}
                </p>

                <div className="py-5">
                  <p className="text-gray-500 text-md font-bold">End On</p>
                  <p className="text-gray-500 text-sm font-normal">
                    {activate_at ? formattedDate(activate_at) : "not-available"}
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table
                className={`${Style.subTable} bg-[#F1F1F1] rounded-lg w-full mt-5 min-w-[1000px] `}
              >
                <thead>
                  <tr>
                    <th>Domain</th>
                    <th>Package</th>
                    <th>Plan Price</th>
                    <th>Plan Duration</th>
                    <th>Status</th>
                    <th className="w-52">Start At</th>
                    <th>Expired In</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{domain ? domain : "not-available"}</td>
                    <td className="capitalize">
                      {pkgType ? pkgType : "not-available"}
                    </td>
                    <td>{price ? `$${planPrice}` : "not-available"}</td>
                    <td className="capitalize">
                      {duration ? duration : "not-available"}
                    </td>
                    <td>
                      <p
                        className={` px-3 py-1 rounded-md text-sm font-bold w-fit ${
                          status === "PENDING"
                            ? "text-red-500 bg-red-100"
                            : "text-green-500 bg-green-100"
                        }`}
                      >
                        {status}
                      </p>
                    </td>
                    <td>
                      {create_at ? formattedDate(create_at) : "not-available"}
                    </td>
                    <td>
                      {activate_at
                        ? formattedDate(activate_at)
                        : "not-available"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Subscription;
