import { useState, type SetStateAction } from "react";
import domainData from "../../utils/domainData";
import { useUpdateUserMembershipMutation } from "../../redux/features/onboard/onboardApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import SelectComponent from "../../component/ui/Select.component";

type Package = {
  frequencies: Frequency[];
};

type Frequency = {
  key: string;
  planKey: string;
  price: number;
  oldPrice: number;
};

type Packages = {
  bronze: Package;
  silver: Package;
  gold: Package;
};

interface UserType {
  frequency: string;
  domain: string;
  packageType: string;
  planKey: string;
  templateId: string;
  planPrice: number;
  planOldPrice: number;
}

function UpdateMembership({
  showUpdateTab,
  id,
  templateId,
  setShowUpdateTab,
}: {
  showUpdateTab: boolean;
  id: string;
  templateId: string;
  setShowUpdateTab: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [user, setUser] = useState<UserType>({
    domain: "",
    packageType: "",
    planKey: "",
    planPrice: 0,
    planOldPrice: 0,
    frequency: "",
    templateId: templateId,
  });
  const { domain, packageType, frequency } = user;
  const [updateUserMembership, { isLoading }] =
    useUpdateUserMembershipMutation();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "domain") {
      user.frequency = "";
      user.packageType = "";
    }
    if (name === "packageType") {
      user.frequency = "";
      user.planKey = "";
      user.planPrice = 0;
      user.planOldPrice = 0;
    }

    let planKey = user.planKey;
    let planPrice = user.planPrice;
    let planOldPrice = user.planOldPrice;

    if (name === "frequency" && e.target instanceof HTMLInputElement) {
      planKey = e.target.getAttribute("data-plan-key") || planKey;
      planPrice = Number(e.target.getAttribute("data-plan-price")) || planPrice;
      planOldPrice =
        Number(e.target.getAttribute("data-plan-old-price")) || planOldPrice;
    }

    setUser({
      ...user,
      [name]: value,
      planKey,
      planPrice,
      planOldPrice,
    });
  };

  const availablePackages =
    domain && domainData[domain as keyof typeof domainData]
      ? Object.keys(domainData[domain as keyof typeof domainData].packages)
      : [];

  const availableFrequencies: Frequency[] =
    domain && packageType
      ? domainData[domain as keyof typeof domainData]?.packages?.[
          packageType as keyof Packages
        ]?.frequencies || []
      : [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserMembership({ id, user })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        if (res?.pageUrl) {
          window.location.href = res.pageUrl;
        }
        setShowUpdateTab(false);
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
        setShowUpdateTab(false);
      });
  };

  const domainOptions = Object.keys(domainData).map((key) => ({
    key: key,
    value: key,
  }));
  const packageOptions = availablePackages.map((key) => ({
    key: key,
    value: key,
  }));

  const handleDomainSelect = (value: string) => {
    setUser((prev) => ({
      ...prev,
      domain: value,
      packageType: "",
    }));
  };
  const handlePackageSelect = (value: string) => {
    setUser((prev) => ({
      ...prev,
      packageType: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center w-full h-screen min-h-screen z-[99999] bg-white/20 backdrop-blur-xs">
      <div
        className={`relative p-10 flex flex-col w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-5/12 m-auto justify-center rounded-xl shadow-xl bg-[#fff] ${
          showUpdateTab ? "zoom-animation" : ""
        }`}
      >
        <div className="flex flex-col gap-5">
          <p className="bg-amber-100 py-2 px-3 rounded-lg border-l-3 border-amber-300 text-black">
            By updating your membership, your current benefits and billing may
            change. Please review carefully before confirming.
          </p>
          <h2 className="text-lg lg:text-3xl font-xl font-medium capitalize">
            Update your membsership, Please select your plan
          </h2>
          <p className="bg-[#96c94b] w-16 md:w-24 h-2 rounded-full"></p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-md font-medium text-black">
                Choose Your Domain
              </label>
              <SelectComponent
                value={user.domain}
                label="Select domain"
                handleChange={handleDomainSelect}
                datas={domainOptions}
                color="#F3F3F3"
              />
            </div>
            {domain && (
              <div className="flex flex-col gap-2 w-full">
                <label className="text-md font-medium text-black">
                  Choose Your Package
                </label>
                <SelectComponent
                  value={user.packageType}
                  label="Select package"
                  handleChange={handlePackageSelect}
                  datas={packageOptions}
                  color="#F3F3F3"
                />
              </div>
            )}
            {packageType && availableFrequencies && (
              <div className="flex flex-col gap-2 w-full">
                <label className="text-md font-medium text-black">
                  Billing Frequency
                </label>
                {availableFrequencies.map((freq) => (
                  <span key={freq.key} className="flex gap-1 items-center">
                    <input
                      value={freq.key}
                      onChange={handleChange}
                      type="radio"
                      id={freq.key}
                      name="frequency"
                      required
                      data-plan-key={freq.planKey}
                      data-plan-price={freq.price}
                      data-plan-old-price={freq.oldPrice}
                      checked={frequency === freq.key}
                    />
                    <label htmlFor={freq.key}>
                      {freq.key} - ${freq.price}
                    </label>
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="primary-btn flex gap-2 items-center px-4 justify-center"
            disabled={isLoading}
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
                <p>Submit & Pay</p>
              </>
            )}
          </button>
        </form>
        <button
          onClick={() => setShowUpdateTab(false)}
          className="bg-red-400 w-10 h-10 flex justify-center items-center rounded-full text-white absolute top-3 right-3 cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default UpdateMembership;
