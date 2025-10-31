import { useEffect, useRef, useState } from "react";
import OneboardOne from "../component/onboard/Onboard.one";
import OneboardTow from "../component/onboard/Onboard.tow";
import OneboardThree from "../component/onboard/Onboard.three";
import OnboardFour from "../component/onboard/Onboard.four";
import { useAuth } from "../../hook/useAuth";
import { useOnboardUserMutation } from "../../redux/features/onboard/onboardApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router";

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

interface UserType {
  package?: string;
  id: string;
  userTemplete: [];
  domain: string;
  frequency: string;
  landerName: string;
}

function CreateOnboard() {
  const [steps, setSteps] = useState<number>(1);
  const { user } = useAuth() as { user: UserType | null };
  const packedType = user?.package;
  const navigate = useNavigate();
  const [onboardUser, { isLoading }] = useOnboardUserMutation();
  const customerId = (user?.id ?? null) as string | null;
  const portraitRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);
  const backgroundRef = useRef<HTMLInputElement>(null);
  const epkFileRef = useRef<HTMLInputElement>(null);
  const [onboard, setOnboard] = useState<OnboardTypes>({
    referalCode: "",
    bio: "",
    tagLine: "",
    offerings: "",
    services: [],
    funnySaying: "",
    merchendiseUrl: "",
    vfrCreate: "",
    userId: customerId,
    socialLinks: {},
    portrait: null,
    logo: null,
    banner: null,
    background: null,
    epkFile: null,
  });
  const {
    referalCode,
    bio,
    tagLine,
    offerings,
    funnySaying,
    socialLinks,
    portrait,
    logo,
    banner,
    background,
    epkFile,
    userId,
    services,
    vfrCreate,
    merchendiseUrl,
  } = onboard || {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (steps === 1) {
      if (offerings?.length > 0 && services?.length === 0) {
        toast.error("Please add minimum tow services!");
        return;
      }
    }
    if (
      steps === 3 &&
      packedType === "gold" &&
      Object.keys(socialLinks).length === 0
    ) {
      toast.error("Please add at least one link.");
      return;
    }
    if (!services || services.filter((s) => s.trim() !== "").length === 1) {
      toast.error("Please add more than one service.");
      return;
    }
    if (steps < 4) {
      setSteps((prev) => prev + 1);
      return;
    }
    if (steps === 4) {
      const formData = new FormData();
      formData.append("referalCode", referalCode ? referalCode : "");
      formData.append("bio", bio ? bio : "");
      formData.append("userId", userId ? userId : "");
      formData.append("vfrCreate", vfrCreate ? vfrCreate : "");
      formData.append("merchendiseUrl", merchendiseUrl ? merchendiseUrl : "");
      formData.append("tagLine", tagLine ? tagLine : "");
      formData.append("offerings", offerings ? offerings : "");
      formData.append("funnySaying", funnySaying ? funnySaying : "");
      formData.append("portrait", portrait ? portrait : "");
      formData.append("logo", logo ? logo : "");
      formData.append("banner", banner ? banner : "");
      formData.append("background", background ? background : "");
      formData.append("epkFile", epkFile ? epkFile : "");
      Object.entries(socialLinks).forEach(([key, value]) => {
        formData.append(key, value);
      });
      services.forEach((item) => {
        formData.append("services", item);
      });
      onboardUser(formData)
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          if (portraitRef.current) portraitRef.current.value = "";
          if (logoRef.current) logoRef.current.value = "";
          if (bannerRef.current) bannerRef.current.value = "";
          if (backgroundRef.current) backgroundRef.current.value = "";
          if (epkFileRef.current) epkFileRef.current.value = "";
          setOnboard({
            referalCode: "",
            bio: "",
            tagLine: "",
            offerings: "",
            services: [],
            funnySaying: "",
            merchendiseUrl: "",
            vfrCreate: "",
            userId: userId,
            socialLinks: {},
            portrait: null,
            logo: null,
            banner: null,
            background: null,
            epkFile: null,
          });
          setTimeout(() => {
            navigate("/onboard");
          }, 1000);
        })
        .catch((error) => {
          const err = error as FetchBaseQueryError;
          const errorMessage = (err.data as { message: string }).message;
          toast.error(errorMessage);
        });
    }
  };

  useEffect(() => {
    setOnboard((prev) => ({
      ...prev,
      referalCode: `${user?.landerName}${Math.floor(Math.random() * 999)}`,
    }));
  }, [user]);

  const progress = (steps / 4) * 100;

  return (
    <section className="p-5 w-full 2xl:w-7/12">
      <div className="mt-5 bg-white border border-gray-300 rounded-md flex w-full h-full flex-col gap-5 items-start justify-center p-10 xl:p-20">
        <div className="flex flex-col gap-5 items-center w-full">
          <h2 className="text-2xl md:text-4xl font-xl font-medium uppercase text-center">
            Complete Your Profile
          </h2>
          <div>
            <p className="text-[#000] text-lg font-medium text-center">
              Package: {user?.package || "No package selected"}
            </p>
            <p className="text-[#000] text-lg font-medium text-center">
              Domain: {user?.domain || "No package selected"}
            </p>
            <p className="text-[#000] text-lg font-medium text-center">
              Billing Frequency: {user?.frequency || "No package selected"}
            </p>
          </div>
          <p className="bg-[#96c94b] w-24 h-2 rounded-full m-auto"></p>
        </div>

        <div className="w-full">
          <div className="relative w-full h-5 rounded-full bg-gray-300 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#cf3832] rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
            <span
              className="absolute top-[2px] text-xs text-white font-medium transition-all duration-500 ease-in-out"
              style={{ left: `${progress - 5}%` }}
            >
              {progress}%
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              steps === 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            {steps === 1 && (
              <OneboardOne onboard={onboard} setOnboard={setOnboard} />
            )}
          </div>
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              steps === 2 ? "opacity-100" : "opacity-0"
            }`}
          >
            {steps === 2 && (
              <OneboardTow
                onboard={onboard}
                setOnboard={setOnboard}
                portraitRef={portraitRef}
                logoRef={logoRef}
                bannerRef={bannerRef}
                backgroundRef={backgroundRef}
                epkFileRef={epkFileRef}
              />
            )}
          </div>
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              steps === 3 ? "opacity-100" : "opacity-0"
            }`}
          >
            {steps === 3 && (
              <OneboardThree onboard={onboard} setOnboard={setOnboard} />
            )}
          </div>
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              steps === 4 ? "opacity-100" : "opacity-0"
            }`}
          >
            {steps === 4 && <OnboardFour onboard={onboard} />}
          </div>
          <div className="flex gap-3 items-center mt-5">
            {steps > 1 && (
              <button
                type="button"
                onClick={() => setSteps((prev) => prev - 1)}
                className="cursor-pointer border border-[#96c94b] py-2 px-6 rounded-md flex gap-2 justify-center items-center"
              >
                Back
              </button>
            )}
            {steps === 4 ? (
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
                    <p>Submit</p>
                  </>
                )}
              </button>
            ) : (
              <button
                type="submit"
                className="primary-btn flex gap-2 items-center"
              >
                Continue to onboard
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateOnboard;
