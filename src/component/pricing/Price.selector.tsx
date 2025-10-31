import React, { useState, type RefObject, type SetStateAction } from "react";
import { useAuth } from "../../hook/useAuth";
import domainData from "../../utils/domainData";
import ReqestDomainTab from "../popups/Reqest.domain.tab";

interface DataTypes {
  pricingRef: RefObject<HTMLDivElement | null>;
  isShow: boolean;
  setIsShow: React.Dispatch<SetStateAction<boolean>>;
  selectedDomain: string | number;
  handleSelectDomain: (value: string) => void;
}

function PriceSelector({
  pricingRef,
  isShow,
  setIsShow,
  selectedDomain,
  handleSelectDomain,
}: DataTypes) {
  const [search, setSearch] = useState<string>("");
  const { user } = useAuth();
  const [reqTab, setReqTab] = useState<boolean>(false);
  const allDomains = Object.keys(domainData);

  return (
    <div className="mt-2 w-full flex flex-col gap-3">
      <div className="relative w-full " ref={pricingRef}>
        <div
          tabIndex={1}
          onClick={() => {
            if (!user) {
              setIsShow(!isShow);
            }
          }}
          className={`flex justify-between items-center border border-gray-300 p-3 rounded-lg w-full text-md font-normal text-black cursor-pointer ${
            user
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white focus:outline-1 focus:outline-[#96c94b]"
          }`}
        >
          {selectedDomain ? (
            <p>{selectedDomain}.me</p>
          ) : (
            <p>Choose Your Domain</p>
          )}
          {isShow ? (
            <i className="fa-solid fa-angle-up"></i>
          ) : (
            <i className="fa-solid fa-angle-down"></i>
          )}
        </div>

        {/* Dropdown */}
        <div
          className={`w-full z-10 absolute top-14 left-0 bg-white shadow rounded-md transition-all duration-200 ease-in-out transform ${
            isShow
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="p-2">
            <input
              type="text"
              placeholder="Search your domain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border text-sm font-normal text-black border-gray-300 px-3 py-1 rounded-md w-full focus:outline-0"
            />
          </div>
          <div className="custom-scroll min-h-48 h-48 overflow-y-auto">
            <ul className="flex flex-col">
              <li className="border-b border-gray-300 p-2 flex justify-between items-center">
                <p className="text-lg font-normal text-green-600">Select One</p>
                <button
                  className="cursor-pointer py-1 px-4 border border-gray-300 rounded-lg"
                  onClick={() => {
                    handleSelectDomain("");
                    setIsShow(false);
                  }}
                >
                  Reset
                </button>
              </li>
              {allDomains
                .filter((item) =>
                  item.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, index) => {
                  const hasPackage =
                    Object.keys(domainData[item].packages).length > 0;
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        if (hasPackage) {
                          handleSelectDomain(item);
                          setIsShow(false);
                        }
                      }}
                      className={`text-sm font-normal border-b border-gray-300 p-2
                        ${
                          hasPackage
                            ? "text-black hover:bg-gray-50 cursor-pointer"
                            : "text-gray-400 bg-gray-100 cursor-not-allowed"
                        }`}
                    >
                      {item}.me
                      {!hasPackage && (
                        <span className="ml-2 text-xs text-red-500">
                          (No packages)
                        </span>
                      )}
                    </li>
                  );
                })}
              <li
                className="text-sm font-normal border-b border-gray-300 p-2 text-black hover:bg-gray-50 cursor-pointer"
                onClick={() => setReqTab(true)}
              >
                Request a domain not listed
              </li>
            </ul>
          </div>
        </div>
      </div>
      {reqTab && <ReqestDomainTab reqTab={reqTab} setReqTab={setReqTab} />}
    </div>
  );
}

export default PriceSelector;
