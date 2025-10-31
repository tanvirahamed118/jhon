import { type SetStateAction } from "react";
import OnboardServices from "./Onboard.services";
import TextareaComponent from "../../../component/ui/Textarea.component";
import InputComponent from "../../../component/ui/Input.component";

interface UrlsTypes {
  [key: string]: string;
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

interface DataTypes {
  onboard: OnboardTypes;
  setOnboard: React.Dispatch<SetStateAction<OnboardTypes>>;
}

function OneboardOne({ onboard, setOnboard }: DataTypes) {
  const { bio, tagLine, offerings, referalCode } = onboard || {};
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOnboard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <p className="text-2xl font-medium text-black mt-5">
          Step 1: Affiliate Code, Short Bio & Links
        </p>
      </div>
      <div className="flex flex-col gap-5 mt-10">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-lg font-medium text-black">
            Your affiliate code is a unique master key for all your data.{" "}
          </label>
          <div className="bg-[#F3F3F3] cursor-pointer border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-1 focus:outline-[#96c94b] flex gap-2 items-center justify-center">
            <i className="fa-solid fa-object-ungroup"></i>
            <p>{referalCode}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-lg font-medium text-black">
            Short Bio <span className="text-2xl text-red-500">*</span>
          </label>
          <TextareaComponent
            placeholder="Add your bio"
            name="bio"
            value={bio}
            autoComplete="bio"
            handleChange={handleChange}
            rows={3}
            required={true}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-lg font-medium text-black">
            Tag Line / Mission <span className="text-2xl text-red-500">*</span>
          </label>
          <InputComponent
            placeholder="Add your tagline"
            type="text"
            value={tagLine}
            handleChange={handleChange}
            name="tagLine"
            autoComplete="tagLine"
            required={true}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-lg font-medium text-black">
            Offerings
          </label>
          <InputComponent
            placeholder="Add your tagline"
            type="text"
            value={offerings}
            handleChange={handleChange}
            name="offerings"
            autoComplete="offerings"
            required={false}
          />
        </div>

        {offerings?.length > 0 && (
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-lg font-medium text-black">
              Business / Areas Serviced{" "}
              <span className="text-2xl text-red-500">*</span>
            </label>
            <OnboardServices onboard={onboard} setOnboard={setOnboard} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OneboardOne;
