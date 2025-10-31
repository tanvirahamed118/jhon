import { useEffect, useRef, useState, type SetStateAction } from "react";
import { useAuth } from "../../../hook/useAuth";

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
}
interface UserType {
  package?: string;
  landerName: string;
}
function OneboardThree({ setOnboard, onboard }: DataTypes) {
  const { user } = useAuth() as { user: UserType | null };
  const { landerName } = user || {};
  const packedType = user?.package;

  const [showSocial, setShowSocial] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);

  const tabRef = useRef<HTMLDivElement | null>(null);
  const allUrls = [
    "FACEBOOK",
    "TWITTER",
    "LINKEDIN",
    "YOUTUBE",
    "TIKTOK",
    "INSTAGRAM",
    "SNAPCHAT",
    "REDDIT",
    "TUMBLR",
    "PINTEREST",
    "TELEGRAM",
    "CUSTOM",
    "EMAIL",
    "WECHAT",
    "PHONE",
    "WHATSAPP",
    "DISCORD",
    "TWITCH",
    "GITHUB",
    "SOUNDCLOUD",
    "VIMEO",
    "SPOTIFY",
    "CLUBHOUSE",
    "PERISCOPE",
    "DRIBBLE",
    "BEHANCE",
    "DAILYMOTION",
    "MIXCLOUD",
    "FLICKR",
    "ANCHOR",
    "PATREON",
    "NEXTDOOR",
  ];

  const alwaysAvailable = [
    "FACEBOOK",
    "TWITTER",
    "LINKEDIN",
    "YOUTUBE",
    "TIKTOK",
    "INSTAGRAM",
    "SNAPCHAT",
    "REDDIT",
    "TUMBLR",
    "PINTEREST",
    "TELEGRAM",
  ];

  const { merchendiseUrl, vfrCreate } = onboard || {};

  const toggleUrl = (value: string) => {
    setUrls((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const value = e.target.value;
    setOnboard((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tabRef.current && !tabRef.current.contains(event.target as Node)) {
        setShowSocial(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <span>
          <p className="text-2xl font-medium text-black mt-5">
            Step 3: Activate Social Links
          </p>
          <p className="text-xl font-normal text-black mt-2">
            Select and add your social media links.
          </p>
        </span>
      </div>
      <div className="flex flex-col gap-5 mt-10">
        <div className="flex flex-col gap-1 w-full">
          <label className="text-lg font-medium text-black">
            Choose Available Platforms:
          </label>
          <div className="relative w-full" ref={tabRef}>
            <div
              tabIndex={0}
              onClick={() => setShowSocial(!showSocial)}
              className="bg-[#F3F3F3] border border-gray-300 cursor-pointer focus-within:border-[#96c94b] focus-within:border py-3 flex gap-2 items-center justify-between px-3 w-full text-center rounded-xl text-normal"
            >
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-share-nodes text-xl"></i>
                <p>Choose Platforms</p>
              </span>
              {showSocial ? (
                <i className="fa-solid fa-angle-up"></i>
              ) : (
                <i className="fa-solid fa-angle-down"></i>
              )}
            </div>
            <p className="text-normal bg-amber-100 p-3 rounded-lg text-md mt-2">
              Please add your social media URLs now. You won't be able to modify
              them later.
            </p>
            <div
              className={`absolute bg-white rounded-md shadow-md border border-gray-100 w-full top-13 left-0 transition-all duration-200 ease-in-out transform ${
                showSocial
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-90 -translate-y-4 pointer-events-none"
              }`}
            >
              <ul className="flex flex-col w-full h-[400px] custom-scroll overflow-y-scroll">
                {allUrls.map((item, index) => {
                  const isAlways = alwaysAvailable.includes(item);
                  const isDisabled = !isAlways && packedType !== "gold";
                  return (
                    <li
                      key={index}
                      className={`flex gap-2 p-3 hover:bg-[#F3F3F3] items-center border-b border-gray-300 ${
                        urls.includes(item) ? "bg-[#F3F3F3]" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={item}
                        checked={urls.includes(item)}
                        onChange={() => toggleUrl(item)}
                        disabled={isDisabled}
                      />
                      <label
                        htmlFor={item}
                        className={`text-md font-medium cursor-pointer ${
                          isDisabled
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-black"
                        }`}
                      >
                        {item}
                        {isDisabled && (
                          <span className="text-xs text-red-500">
                            (Gold only)
                          </span>
                        )}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 my-5">
        {urls.map((name, idx) => (
          <div key={idx} className="flex flex-col gap-1 w-full">
            <label className="text-lg font-medium text-black">{name}:</label>
            <input
              type="url"
              onChange={(e) => handleChange(e, name)}
              placeholder={`Enter your ${name} link`}
              className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border py-3 px-3 w-full rounded-xl text-normal"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-lg font-medium text-black">
            Funny Saying
          </label>
          <textarea
            rows={3}
            name="funnySaying"
            value={onboard?.funnySaying}
            placeholder="Add your funny saying"
            onChange={(e) =>
              setOnboard((prev: OnboardTypes) => ({
                ...prev,
                funnySaying: e.target.value,
              }))
            }
            className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border py-3 px-3 w-full rounded-xl text-normal"
          ></textarea>
        </div>
        <div className="flex gap-2 w-full mt-3">
          <input
            onChange={(e) => {
              setOnboard((prev) => ({
                ...prev,
                vfrCreate: e.target.checked ? "yes" : "no",
              }));
            }}
            name="vfrCreate"
            type="checkbox"
            id="vfcFile"
            checked={vfrCreate === "yes"}
          />
          <label
            htmlFor="vfcFile"
            className="text-md font-normal text-black cursor-pointer"
          >
            Do you want to build a VFC File?{" "}
          </label>
        </div>
        <div>
          <div className="flex gap-2 w-full">
            <input
              onChange={(e) => {
                setOnboard((prev) => ({
                  ...prev,
                  merchendiseUrl: e.target.checked
                    ? `${
                        import.meta.env.VITE_APP_MERCHANDISE_URL
                      }/${landerName}`
                    : "",
                }));
              }}
              name="vfrCreate"
              type="checkbox"
              id="merchendiseUrl"
              checked={!!merchendiseUrl}
            />
            <label
              htmlFor="merchendiseUrl"
              className="text-md font-normal text-black cursor-pointer"
            >
              Do you want to create merchandise URL?
            </label>
          </div>
          {merchendiseUrl && (
            <p className="text-gray-400 text-sm font-normal">
              Your Merchandise url: {merchendiseUrl}
            </p>
          )}
        </div>
        <div>
          {merchendiseUrl && (
            <p className="text-black text-sm bg-amber-100 p-3 border-l-3 border-amber-300 rounded-md">
              Please set up a Stripe Express account, as it is required for
              merchandise requests.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OneboardThree;
