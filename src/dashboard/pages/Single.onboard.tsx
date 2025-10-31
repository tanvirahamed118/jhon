import { Link, useParams } from "react-router";
import React, { useState } from "react";
import EditInfo from "../component/template/Edit.info";
import EditFiles from "../component/template/Edit.files";
import EditButton from "../component/template/Edit.button";
import { useGetOneOnboardQuery } from "../../redux/features/onboard/onboardApi";
import SingleLoadder from "../loader/Single.loadder";
import ButtonSetLoadder from "../loader/ButtonSet.loader";
import OnboardProfileLoader from "../loader/Onboard.profile.loader";
import { useAuth } from "../../hook/useAuth";

interface TypesOfButton {
  id: string;
  name: string;
  url: string;
  templateId: string;
}

function SIngleOnboard() {
  const [isShowInfo, setIsShowInfo] = useState<boolean>(false);
  const [isShowFile, setIsShowFiles] = useState<boolean>(false);
  const [isShowButton, setIsShowButton] = useState<boolean>(false);
  const params = useParams();
  const id = params.id;
  const { user } = useAuth();
  const { data, isError, isLoading } = useGetOneOnboardQuery(id);
  const onboard = !isError && data?.onboard ? data.onboard : null;
  const {
    layout,
    bio,
    tagLine,
    offerings,
    funnySaying,
    logo,
    portrait,
    banner,
    background,
    epkFile,
    buttonSet,
    services,
    merchendiseUrl,
    vcfFile,
  } = onboard || {};
  const {
    domain,
    frequency,
    package: packageType,
    planPrice,
    landerName,
    midName,
    nickName,
    discount,
    cardNumber,
    email,
  } = onboard?.user ?? {};

  // decide what to render
  let content;
  if (isLoading) {
    content = (
      <>
        <ButtonSetLoadder />
        <ButtonSetLoadder />
        <ButtonSetLoadder />
        <ButtonSetLoadder />
        <ButtonSetLoadder />
        <ButtonSetLoadder />
        <ButtonSetLoadder />
        <ButtonSetLoadder />
        <ButtonSetLoadder />
        <ButtonSetLoadder />
      </>
    );
  }
  if (!isLoading && buttonSet?.length === 0) {
    content = (
      <p className="bg-amber-100 text-black p-5 rounded-lg border-l-3 border-amber-400 w-full">
        Social link not found!
      </p>
    );
  }
  if (!isLoading && buttonSet?.length > 0) {
    content = buttonSet?.map((item: TypesOfButton) => {
      const { url, name, id } = item || {};
      return (
        <div key={id} className="flex flex-col gap-2">
          <p className="text-xl text-medium">{name}</p>
          <p className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-md">
            {url}
          </p>
        </div>
      );
    });
  }

  return (
    <React.Fragment>
      <section>
        <div className="w-full p-3 lg:p-5">
          <div className="w-full flex justify-between items-center mb-5">
            <h2 className="text-normal text-2xl md:text-3xl">
              Onboard Details
            </h2>
            <ul className="flex gap-2 items-center py-2">
              <li>
                <Link
                  to={user?.role === "ADMIN" ? "/admin/onboard" : "/onboard"}
                  className="bg-[#96c94b] px-6 py-2 rounded-lg text-normal text-md"
                >
                  Back
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex gap-5 2xl:flex-row flex-col">
            <div className="w-full 2xl:w-7/12">
              <div className="jost border border-gray-300 p-5 md:p-10 rounded-lg bg-white">
                <div className="border-b border-gray-300 pb-5 flex justify-between w-full items-center">
                  <div className="flex flex-col gap-3">
                    <p className="text-2xl text-medium">
                      Onboard General Infos
                    </p>
                    <p className="text-gray-500 text-md font-normal">
                      View and update general infos
                    </p>
                  </div>
                  <button
                    onClick={() => setIsShowInfo(true)}
                    className="border border-gray-300 w-10 h-10 flex justify-center items-center rounded-md shadow cursor-pointer"
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                </div>
                <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">
                      Email Address
                    </p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? <SingleLoadder /> : email}
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">Domain</p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? <SingleLoadder /> : domain}
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">
                      Lander Name
                    </p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? <SingleLoadder /> : landerName}
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">Mid Name</p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? <SingleLoadder /> : midName}
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">Nick Name</p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? (
                        <SingleLoadder />
                      ) : nickName ? (
                        nickName
                      ) : (
                        "not-available"
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">
                      Card Number
                    </p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? <SingleLoadder /> : cardNumber}
                    </div>
                  </div>
                  {merchendiseUrl && (
                    <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                      <p className="text-lg font-medium text-black">
                        Merchandise URL
                      </p>
                      <div className="text-sm font-normal text-gray-500">
                        {isLoading ? <SingleLoadder /> : merchendiseUrl}
                      </div>
                    </div>
                  )}
                  {vcfFile && (
                    <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                      <p className="text-lg font-medium text-black">
                        VFC FIle URL
                      </p>
                      <div className="text-sm font-normal text-gray-500 whitespace-pre-line break-words">
                        {isLoading ? (
                          <SingleLoadder />
                        ) : (
                          <a
                            target="_blank"
                            className="text-blue-500"
                            download
                            href={`${vcfFile}`}
                          >
                            Download VFC File
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  {discount && (
                    <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                      <p className="text-lg font-medium text-black">Discount</p>
                      <div className="text-md font-normal text-gray-500">
                        {isLoading ? <SingleLoadder /> : discount}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">Frequency</p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? <SingleLoadder /> : frequency}
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">Package</p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? <SingleLoadder /> : packageType}
                    </div>
                  </div>

                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">
                      Selected Plan Price
                    </p>
                    <div className="text-md font-normal text-gray-500">
                      ${isLoading ? <SingleLoadder /> : planPrice}
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">
                      Onboard Layout
                    </p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? <SingleLoadder /> : layout}
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">Your Bio</p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? <SingleLoadder /> : bio}
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">Tag Line</p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? <SingleLoadder /> : tagLine}
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">
                      Business offerings
                    </p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? <SingleLoadder /> : offerings}
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                    <p className="text-lg font-medium text-black">
                      Business serviced
                    </p>
                    <div className="text-md font-normal text-gray-500">
                      {isLoading ? (
                        <SingleLoadder />
                      ) : (
                        services
                          ?.map((item: { title: string }) => item.title)
                          .join(", ")
                      )}
                    </div>
                  </div>
                  {funnySaying && (
                    <div className="flex flex-col bg-[#F0F0F0] py-2 px-4 rounded-xl">
                      <p className="text-lg font-medium text-black">
                        Funny Sayting
                      </p>
                      <div className="text-md font-normal text-gray-500">
                        {isLoading ? <SingleLoadder /> : funnySaying}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full 2xl:w-5/12 flex flex-col gap-5">
              <div className="jost border border-gray-300 p-5 md:p-10 rounded-lg bg-white">
                <div className="border-b border-gray-300 pb-5 flex justify-between w-full items-center mb-5">
                  <div className="flex flex-col gap-3">
                    <p className="text-2xl text-medium">Onboard All Files</p>
                    <p className="text-gray-500 text-md font-normal">
                      View and update all files
                    </p>
                  </div>
                  <button
                    onClick={() => setIsShowFiles(true)}
                    className="border border-gray-300 w-10 h-10 flex justify-center items-center rounded-md shadow cursor-pointer"
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                </div>
                {isLoading ? (
                  <OnboardProfileLoader />
                ) : logo || background || banner || portrait || epkFile ? (
                  <div className="mt-3 gap-5 grid grid-cols-2 lg:grid-cols-3">
                    {logo && (
                      <div className="flex flex-col gap-2">
                        <p className="text-md text-medium">Logo</p>
                        <div className="w-full min-h-24 h-24 rounded-md">
                          <img
                            src={logo}
                            alt=""
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      </div>
                    )}
                    {portrait && (
                      <div className="flex flex-col gap-2">
                        <p className="text-md text-medium">Potrate</p>
                        <div className="w-full min-h-24 h-24 rounded-md">
                          <img
                            src={portrait}
                            alt=""
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      </div>
                    )}
                    {banner && (
                      <div className="flex flex-col gap-2">
                        <p className="text-md text-medium">Template Banner</p>
                        <div className="w-full min-h-24 h-24 rounded-md">
                          <img
                            src={banner}
                            alt=""
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      </div>
                    )}
                    {background && (
                      <div className="flex flex-col gap-2">
                        <p className="text-md text-medium">
                          Template Background
                        </p>
                        <div className="w-full min-h-24 h-24 rounded-md">
                          <img
                            src={background}
                            alt=""
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      </div>
                    )}

                    {epkFile && (
                      <div className="flex flex-col">
                        <p className="text-sm text-medium">
                          Template Background
                        </p>
                        <a
                          target="_blank"
                          href={`${epkFile}`}
                          className="text-blue-600 underline"
                        >
                          Download File
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="bg-amber-100 text-normal px-4 py-2 rounded-lg">
                    No files have been added yet. Please upload a new file to
                    continue.
                  </p>
                )}
              </div>
              <div className="jost border border-gray-300 p-5 md:p-10 rounded-lg bg-white">
                <div className="border-b border-gray-300 pb-5 flex justify-between w-full items-center">
                  <div className="flex flex-col gap-3">
                    <p className="text-2xl text-medium">
                      Onboard Social Buttons
                    </p>
                    <p className="text-gray-500 text-md font-normal">
                      View and update social buttons
                    </p>
                  </div>
                  {buttonSet?.length > 0 && (
                    <button
                      onClick={() => setIsShowButton(true)}
                      className="border border-gray-300 w-10 h-10 flex justify-center items-center rounded-md shadow cursor-pointer"
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  )}
                </div>
                <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isShowInfo && (
        <EditInfo isShowInfo={isShowInfo} setIsShowInfo={setIsShowInfo} />
      )}
      {isShowFile && (
        <EditFiles isShowFile={isShowFile} setIsShowFiles={setIsShowFiles} />
      )}
      {isShowButton && (
        <EditButton
          isShowButton={isShowButton}
          setIsShowButton={setIsShowButton}
          buttons={buttonSet}
        />
      )}
    </React.Fragment>
  );
}

export default SIngleOnboard;
