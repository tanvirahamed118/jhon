import React, { type SetStateAction } from "react";
import toast from "react-hot-toast";

interface UrlsTypes {
  [key: string]: string;
}

interface DataTypes {
  onboard: OnboardTypes;
  setOnboard: React.Dispatch<SetStateAction<OnboardTypes>>;
}

interface OnboardTypes {
  referalCode: string;
  bio: string;
  tagLine: string;
  offerings: string;
  services: string[];
  funnySaying: string;
  merchendiseUrl: string;
  userId: string | null;
  vfrCreate: string | null;
  socialLinks: UrlsTypes;
  portrait?: File | null;
  logo?: File | null;
  banner?: File | null;
  background?: File | null;
  epkFile?: File | null;
}

function OnboardServices({ setOnboard, onboard }: DataTypes) {
  const handleFeatureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setOnboard((prev) => {
      const updated = [...prev.services];
      updated[index] = value;
      return { ...prev, services: updated };
    });
  };

  const handleAddFeature = () => {
    if (onboard?.services?.length >= 5) {
      toast.error("Maximum 5 box allow!");
      return;
    }
    setOnboard((prev) => ({ ...prev, services: [...prev.services, ""] }));
  };

  const handleRemoveFeature = (index: number) => {
    setOnboard((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="border border-gray-300 p-5 rounded-md">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-normal text-md capitalize font-normal">
          Add your services
        </h2>
        <div onClick={handleAddFeature} className="dark-gold cursor-pointer">
          <i className="fa-solid fa-plus text-xl"></i>
        </div>
      </div>
      <div
        className={`w-full flex flex-col gap-5 ${
          onboard?.services?.length > 0 ? "mt-5" : "mt-0"
        }`}
      >
        {onboard?.services.map((feature, index) => (
          <div key={index} className="flex w-full gap-3 items-center">
            <input
              type="text"
              value={feature ?? ""}
              required={onboard?.offerings?.length > 0}
              onChange={(e) => handleFeatureChange(e, index)}
              className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border py-3 px-3 w-full rounded-xl text-normal"
              placeholder="Add your features"
            />
            <div
              onClick={() => handleRemoveFeature(index)}
              className="dark-gold cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnboardServices;
