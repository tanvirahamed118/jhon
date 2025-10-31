import { type SetStateAction } from "react";
import { useAuth } from "../../../hook/useAuth";
import toast from "react-hot-toast";

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
  userId: string | null;
  vfrCreate: string | null;
  socialLinks: UrlsTypes;
  portrait?: File | null;
  logo?: File | null;
  banner?: File | null;
  background?: File | null;
  epkFile?: File | null;
  merchendiseUrl: string;
}

interface DataTypes {
  onboard: OnboardTypes;
  setOnboard: React.Dispatch<SetStateAction<OnboardTypes>>;
  portraitRef: React.RefObject<HTMLInputElement | null>;
  logoRef: React.RefObject<HTMLInputElement | null>;
  bannerRef: React.RefObject<HTMLInputElement | null>;
  backgroundRef: React.RefObject<HTMLInputElement | null>;
  epkFileRef: React.RefObject<HTMLInputElement | null>;
}

interface UserType {
  package?: string;
}

function OneboardTow({
  setOnboard,
  portraitRef,
  logoRef,
  bannerRef,
  backgroundRef,
  epkFileRef,
  onboard,
}: DataTypes) {
  const { user } = useAuth() as { user: UserType | null };
  const packedType = user?.package;
  let disableBox;
  if (packedType === "bronze" || packedType === "silver") {
    disableBox = true;
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof OnboardTypes
  ) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    const fileSizeMB = file.size / (1024 * 1024);
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    if (fileExt === "epk" && fileSizeMB > 10) {
      toast.error("EPK files must be less than 10MB.");
      e.target.value = "";
      return;
    } else if (fileExt !== "epk" && fileSizeMB > 2) {
      toast.error("Files must be less than 2MB.");
      e.target.value = "";
      return;
    }
    setOnboard((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <p className="text-2xl font-medium text-black mt-5">
          Step 2: Media & Files
        </p>
      </div>

      {!onboard?.logo && (
        <p className="mt-5 text-black text-sm bg-amber-100 p-3 border-l-3 border-amber-300 rounded-md">
          If you do not select your logo, the first letter of your lander will
          be your logo.
        </p>
      )}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-lg font-medium text-black">
            Portrait Upload
          </label>
          <input
            type="file"
            name="portrait"
            ref={portraitRef}
            accept="image/jpeg,image/jpg,image/png"
            onChange={(e) => handleFileChange(e, "portrait")}
            className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border p-3 w-full rounded-xl text-normal"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-lg font-medium text-black">
            Logo Upload
          </label>
          <input
            type="file"
            name="logo"
            ref={logoRef}
            accept="image/jpeg,image/jpg,image/png"
            onChange={(e) => handleFileChange(e, "logo")}
            className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border p-3 w-full rounded-xl text-normal"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-lg font-medium text-black">
            Banner Image
          </label>
          <input
            type="file"
            name="banner"
            ref={bannerRef}
            disabled={disableBox}
            accept="image/jpeg,image/jpg,image/png"
            onChange={(e) => handleFileChange(e, "banner")}
            className={`border border-gray-300 bg-[#F3F3F3] p-3 rounded-lg w-full focus:outline-1 focus:outline-[#96c94b] ${
              disableBox && "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-lg font-medium text-black">
            Background Image
          </label>
          <input
            type="file"
            name="background"
            ref={backgroundRef}
            disabled={disableBox}
            accept="image/jpeg,image/jpg,image/png"
            onChange={(e) => handleFileChange(e, "background")}
            className={`border border-gray-300 bg-[#F3F3F3] p-3 rounded-lg w-full focus:outline-1 focus:outline-[#96c94b] ${
              disableBox && "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-lg font-medium text-black">
            EPK.zip File Upload
          </label>
          <input
            type="file"
            name="epkFile"
            ref={epkFileRef}
            disabled={disableBox}
            accept=".zip,application/zip"
            onChange={(e) => handleFileChange(e, "epkFile")}
            className={`border border-gray-300 bg-[#F3F3F3] p-3 rounded-lg w-full focus:outline-1 focus:outline-[#96c94b] ${
              disableBox && "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default OneboardTow;
