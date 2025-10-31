import { Link } from "react-router";
import { useOnboard } from "../hook/useOnboard";
import { useState } from "react";
import SendInfo from "../component/Send.info";
import Spiner from "../component/Spiner";
import { usePlausible } from "../hook/usePlausible";
import EchoRequest from "../component/Echo.request";
import BrandbookRequest from "../component/Brandbook.request";
import { track } from "@plausible-analytics/tracker";

interface OnboardType {
  id: string;
  tagLine: string;
  logo: string;
  portrait: string;
  background: string;
  funnySaying: string;
  bio: string;
  vcfFile: string;
  offerings: string;
  enableEcho: boolean;
  merchendiseUrl: string;
  buttonSet: ButtonsType[];
  services: ServiceType[];
  user: UserType;
  layout: string;
  officialColor: string;
  enableEvent: boolean;
}

interface ButtonsType {
  id: string;
  name: string;
  url: string;
}
interface ServiceType {
  id: string;
  title: string;
}

interface UserType {
  landerName: string;
  calendarId: string;
  stripeAccountId: string;
}

function Wireframe() {
  const { onboard, isLoading } = useOnboard() as {
    onboard: OnboardType;
    isLoading: boolean;
  };

  const landername = onboard?.user?.landerName;
  usePlausible(landername);

  const [isShowInfo, setIsShowInfo] = useState<boolean>(false);
  const {
    tagLine,
    logo,
    portrait,
    background,
    buttonSet,
    services,
    bio,
    user,
    funnySaying,
    vcfFile,
    offerings,
    merchendiseUrl,
    id,
    enableEcho,
    layout,
    officialColor,
    enableEvent,
  } = onboard || {};

  const { landerName, stripeAccountId, calendarId } = user || {};

  return isLoading ? (
    <Spiner />
  ) : (
    <section>
      <div>
        <div
          className="py-5"
          style={
            portrait
              ? {
                  backgroundImage: `url(${portrait})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "black",
                }
              : { backgroundColor: "black" }
          }
        >
          <div
            className={`z-20 relative flex container m-auto 
                    ${
                      layout === "CENTER"
                        ? "flex-col justify-center items-center gap-5"
                        : layout === "RIGHT"
                        ? "flex-row-reverse justify-between items-center"
                        : "justify-between items-center"
                    }`}
          >
            <a href={`/${landerName}`}>
              {logo ? (
                <img
                  src={logo}
                  alt=""
                  className="min-w-20 w-20 h-20 md:min-w-32 min-h-20 md:min-h-32 md:w-32 md:h-32 rounded-full object-cover"
                />
              ) : (
                <p className="text-white text-8xl font-medium uppercase flex justify-center items-center min-w-20 w-20 h-20 md:min-w-32 min-h-20 md:min-h-32 md:w-32 md:h-32 rounded-full bg-gray-800">
                  {landerName?.slice(0, 1)}
                </p>
              )}
            </a>
            {services?.length > 0 && (
              <div>
                <h2 className="text-white text-3xl font-medium text-right">
                  Service Offered
                </h2>
                <ul
                  className={`mt-1 flex flex-col  ${
                    layout === "CENTER"
                      ? "items-center"
                      : layout === "LEFT"
                      ? "items-end"
                      : layout === "RIGHT"
                      ? "items-start"
                      : ""
                  }`}
                >
                  {services?.map((item) => (
                    <li
                      key={item.id}
                      className="text-md font-normal text-white"
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-[1px] bg-slate-400 animate-pulse"></div>
        <div
          className="w-full py-10 min-h-[80vh] h-full"
          style={
            background
              ? {
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }
              : { backgroundColor: "black" }
          }
        >
          <div className="w-11/12 md:w-7/12 lg:w-6/12 2xl:w-4/12 m-auto relative z-20">
            <div className="flex gap-2 md:gap-5 items-center ">
              <button
                onClick={() => {
                  setIsShowInfo(true);
                  track("ButtonClick", {
                    props: {
                      lander: landerName,
                      buttonName: "Info Submission",
                      currentDomain: window.location.hostname,
                    },
                  });
                }}
                className="flex justify-center px-4 gap-2 items-center w-full h-8 md:h-10 
                      rounded-lg hover:scale-105 duration-300 transition-all cursor-pointer 
                      border border-white"
                style={{
                  backgroundImage: `linear-gradient(to right, ${officialColor}, #fff)`,
                }}
              >
                <i className="fa-solid fa-upload text-xs md:text-md"></i>
                <p className="text-xs md:text-base font-normal">
                  Submit your infor
                </p>
              </button>
              {vcfFile && (
                <button
                  className="flex justify-center px-4 gap-2 items-center w-full h-8 md:h-10 
             rounded-lg hover:scale-105 duration-300 transition-all cursor-pointer 
             border border-white"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${officialColor}, #fff)`,
                  }}
                  onClick={() =>
                    track("ButtonClick", {
                      props: {
                        buttonName: "Download Info",
                        lander: landerName,
                        currentDomain: window.location.hostname,
                      },
                    })
                  }
                >
                  <i className="fa-solid fa-download text-xs md:text-md"></i>
                  <a
                    className="text-xs md:text-base font-normal"
                    download
                    target="_blank"
                    href={vcfFile}
                  >
                    Download My Info
                  </a>
                </button>
              )}
            </div>
            <div className="my-5 md:my-10">
              <h2 className="uppercase text-white text-3xl font-medium text-center">
                {tagLine}
              </h2>
              <p className="mt-3 text-md font-normal text-white text-center">
                {offerings}
              </p>
            </div>
            <div>
              <p className="text-white text-center text-xl font-medium">
                Funny Saying
              </p>
              <p className="text-white text-center text-lg font-normal">
                {funnySaying}
              </p>
            </div>
            <div className="my-3 md:my-5">
              <div className="flex gap-3 items-center mb-3">
                {enableEcho && stripeAccountId && (
                  <EchoRequest
                    officialColor={officialColor}
                    landerName={landerName}
                  />
                )}
                {enableEvent && calendarId && (
                  <BrandbookRequest
                    officialColor={officialColor}
                    landerName={landerName}
                  />
                )}
              </div>
              <button
                className="flex justify-center px-4 gap-2 items-center w-full h-8 md:h-10 
             rounded-lg hover:scale-105 duration-300 transition-all cursor-pointer 
             border border-white"
                style={{
                  backgroundImage: `linear-gradient(to right, ${officialColor}, #fff)`,
                }}
                onClick={() =>
                  track("ButtonClick", {
                    props: {
                      buttonName: "View Merchandise",
                      lander: landerName,
                      currentDomain: window.location.hostname,
                    },
                  })
                }
              >
                <i className="fa-solid fa-bag-shopping text-md"></i>
                <a target="_blank" className="capitalize" href={merchendiseUrl}>
                  {landerName} Merchandise
                </a>
              </button>
              <button
                className="flex justify-center px-4 gap-2 items-center w-full h-8 md:h-10 
             rounded-lg hover:scale-105 duration-300 transition-all cursor-pointer 
             border border-white mt-3"
                style={{
                  backgroundImage: `linear-gradient(to right, ${officialColor}, #fff)`,
                }}
                onClick={() =>
                  track("ButtonClick", {
                    props: {
                      buttonName: "View Live Board",
                      lander: landerName,
                      currentDomain: window.location.hostname,
                    },
                  })
                }
              >
                <i className="fa-regular fa-circle-play"></i>
                <Link to={`/${landerName}/request_tv`} className="capitalize">
                  {landerName} Live Board
                </Link>
              </button>
              <div className="grid grid-cols-2 gap-2 md:gap-3 mt-2 md:mt-3">
                {buttonSet?.map((item) => {
                  const { id, name, url } = item;
                  return (
                    <a
                      key={id}
                      target="_blank"
                      href={url}
                      onClick={() =>
                        track("ButtonClick", {
                          props: {
                            buttonName: `View ${name}`,
                            lander: landerName,
                            currentDomain: window.location.hostname,
                          },
                        })
                      }
                      className="flex justify-center px-4 gap-2 items-center w-full h-8 md:h-10 
             rounded-lg hover:scale-105 duration-300 transition-all cursor-pointer 
             border border-white"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${officialColor}, #fff)`,
                      }}
                    >
                      {name}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="mt-14">
              <h2 className="text-xl font-medium text-white text-center capitalize">
                About {landerName}
              </h2>
              <p className="text-gray-200 mt-3 text-md font-normal text-center w-full  m-auto">
                {bio}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-slate-400 animate-pulse"></div>
        <div className="bg-black py-10">
          <div className="container">
            <p className="text-white text-md font-normal text-center capitalize">
              © 2025 {landerName} | All Rights Reserved.
            </p>
            <ul className="flex gap-5 justify-center items-center mt-3">
              <li>
                <Link
                  onClick={() =>
                    track("ButtonClick", {
                      props: {
                        buttonName: "Check Terms & Conditions",
                        lander: landerName,
                        currentDomain: window.location.hostname,
                      },
                    })
                  }
                  to=""
                  className="text-white text-sm font-normal underline"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  onClick={() =>
                    track("ButtonClick", {
                      props: {
                        buttonName: "Check Privacy Policy",
                        lander: landerName,
                        currentDomain: window.location.hostname,
                      },
                    })
                  }
                  to=""
                  className="text-white text-sm font-normal underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isShowInfo && (
        <SendInfo
          isShowInfo={isShowInfo}
          setIsShowInfo={setIsShowInfo}
          id={id}
        />
      )}
    </section>
  );
}

export default Wireframe;
