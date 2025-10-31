import React, { useEffect, useRef, useState } from "react";
import CoreValues from "../component/home/Core.values";
import BusinessInfo from "../component/home/Business.info";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import ProductRevenue from "../component/popups/Product.revenue";
import AffiliateProgram from "../component/popups/Affiliate.program";
import ContactPopup from "../component/popups/Contact-popup";
import GoldAccTab from "../component/popups/Gold.acc.tab";
import AdditionalTab from "../component/popups/Additional.tab";
import MerchandiseTab from "../component/popups/Merchandise.tab";
import WhyPlatTab from "../component/popups/Why.plat.tab";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  selectedDomain,
  selectedPackage,
} from "../redux/features/onboard/onboardSlice";
import {
  bronzeFeatures,
  goldFeatures,
  platinumFeatures,
  silverFeatures,
} from "../utils/pricing.features";
import domainData from "../utils/domainData";
import PriceSelector from "../component/pricing/Price.selector";
import LottieAnimation from "../component/Lottie.animation";

function Pricing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showTab, setShowTab] = useState<boolean>(false);
  const [affTab, setAffTab] = useState<boolean>(false);
  const [conTab, setConTab] = useState<boolean>(false);
  const [goldTab, setGoldTab] = useState<boolean>(false);
  const [addTab, setAddTab] = useState<boolean>(false);
  const [merTab, setMerTab] = useState<boolean>(false);
  const [whyTab, setWhyTab] = useState<boolean>(false);
  const [priceShow, setPriceShow] = useState<boolean>(false);
  const [type, setType] = useState<string>("yearly");
  const pricingRef = useRef<HTMLDivElement | null>(null);
  const [domainSelect, setDomainSelect] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setType("yearly");
    } else {
      setType("monthly");
    }
  };

  const handleChose = (pckg: string) => {
    navigate("/auth/register");
    dispatch(selectedPackage(pckg));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pricingRef.current &&
        !pricingRef.current.contains(event.target as Node)
      ) {
        setPriceShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedPackages = domainData[domainSelect]?.packages;

  const getPlanPrice = (plan: "bronze" | "silver" | "gold") => {
    const pkg = selectedPackages?.[plan];
    if (!pkg) return { price: null, oldPrice: null };

    const freq = pkg.frequencies.find((f) => f.key === type);
    return {
      price: freq?.price ?? null,
      oldPrice: freq?.oldPrice ?? null,
    };
  };

  const bronzePrice = getPlanPrice("bronze");
  const silverPrice = getPlanPrice("silver");
  const goldPrice = getPlanPrice("gold");

  const handleDomainSelection = (domain: string) => {
    setDomainSelect(domain);
    dispatch(selectedDomain(domain));
  };

  return (
    <React.Fragment>
      <Header />
      <section className="pt-10">
        <div className="container">
          <div>
            <h2 className="text-black text-3xl font-medium text-center">
              Choose your Domain Lander.
            </h2>
            <div className="w-full md:w-4/12 m-auto mb-10">
              <PriceSelector
                pricingRef={pricingRef}
                isShow={priceShow}
                setIsShow={setPriceShow}
                selectedDomain={domainSelect}
                handleSelectDomain={handleDomainSelection}
              />
            </div>
          </div>
          {domainSelect && (
            <div>
              <h2 className="text-black text-xl font-medium uppercase text-center">
                Pricing Plans
              </h2>
              <p className="text-black text-2xl leading-11 md:text-3xl font-medium text-center">
                Save 20% with annual billing (12 months for the price of 10)
              </p>
              <p className="text-md text-black font-normal text-center">
                NOTE: referral/affiliate codes are only valid on yearly
                subscription plans!
              </p>
              <div className="flex gap-5 justify-center items-center mt-5 mb-14">
                <p className="text-md text-black font-normal">Per Monthly</p>
                <div className="flex justify-center items-center">
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={handleChange}
                      checked={type === "yearly"}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <span className="flex gap-2">
                  <p className="text-md text-black font-normal">Per Yearly</p>
                  <p className="text-sm bg-[#96c94b] px-6 py-1 rounded-full font-normal">
                    Save 20%
                  </p>
                </span>
              </div>
            </div>
          )}

          {domainSelect ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-5">
              <div className="bg-[#FFF3E3] p-8 rounded-lg flex flex-col gap-2 items-center">
                <h2 className="text-3xl font-medium text-black">Bronze</h2>
                {bronzePrice.oldPrice ? (
                  <p className="text-gray-600 line-through text-sm font-medium">
                    ${bronzePrice.oldPrice}/{type}
                  </p>
                ) : null}
                <p className="text-3xl font-medium text-black">
                  ${bronzePrice.price ?? "--"}
                  <span className="!text-sm">/{type}</span>
                </p>
                {bronzePrice.price && (
                  <button
                    onClick={() => handleChose("bronze")}
                    className="w-full primary-btn transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    Chose Now
                  </button>
                )}
                <div className="mt-10">
                  <h2 className="text-xl font-medium text-black">
                    What's included:
                  </h2>
                  <ul className="flex flex-col gap-2 mt-5">
                    {bronzeFeatures?.map((item, index) => (
                      <li key={index} className="flex gap-2 items-center">
                        <i className="fa-solid fa-check text-[#96c94b]"></i>
                        <p className="text-md font-normal text-black">
                          {item?.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-[#FFF3E3] p-8 rounded-lg flex flex-col gap-2 items-center">
                <h2 className="text-3xl font-medium text-black">Silver</h2>
                {silverPrice.oldPrice ? (
                  <p className="text-gray-600 line-through text-sm font-medium">
                    ${silverPrice.oldPrice}/{type}
                  </p>
                ) : null}
                <p className="text-3xl font-medium text-black">
                  ${silverPrice.price ?? "--"}
                  <span className="!text-sm">/{type}</span>
                </p>
                {silverPrice.price && (
                  <button
                    onClick={() => handleChose("silver")}
                    className="w-full primary-btn transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    Chose Now
                  </button>
                )}

                <div className="mt-10">
                  <h2 className="text-xl font-medium text-black">
                    What's included:
                  </h2>
                  <ul className="flex flex-col gap-2 mt-5">
                    {silverFeatures?.map((item, index) => (
                      <li key={index} className="flex gap-2 items-center">
                        <i className="fa-solid fa-check text-[#96c94b]"></i>
                        <p className="text-md font-normal text-black">
                          {item?.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-[#FFF3E3] p-8 rounded-lg flex flex-col gap-2 items-center border-2 border-[#96c94b] relative">
                <p className="absolute top-[-16px] left-[95px] bg-[#96c94b] text-black px-4 py-1 rounded-full text-sm font-medium uppercase">
                  POPULAR
                </p>
                <h2 className="text-3xl font-medium text-black">Gold</h2>
                {goldPrice.oldPrice ? (
                  <p className="text-gray-600 line-through text-sm font-medium">
                    ${goldPrice.oldPrice}/{type}
                  </p>
                ) : null}
                <p className="text-3xl font-medium text-black">
                  ${goldPrice.price ?? "--"}
                  <span className="!text-sm">/{type}</span>
                </p>
                {goldPrice.price && (
                  <button
                    onClick={() => handleChose("gold")}
                    className="w-full primary-btn transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    Chose Now
                  </button>
                )}

                <div className="mt-10">
                  <h2 className="text-xl font-medium text-black">
                    What's included:
                  </h2>
                  <ul className="flex flex-col gap-2 mt-5">
                    {goldFeatures?.map((item, index) => (
                      <li key={index} className="flex gap-2 items-center">
                        <i className="fa-solid fa-check text-[#96c94b]"></i>
                        <p className="text-md font-normal text-black">
                          {item?.label}
                          {item?.note === "merch" ? (
                            <span
                              className="text-[#cf3832] cursor-pointer"
                              onClick={() => setShowTab(true)}
                            >
                              (NOTE)
                            </span>
                          ) : item?.note === "automatic" ? (
                            <span
                              className="text-[#cf3832] cursor-pointer"
                              onClick={() => setAffTab(true)}
                            >
                              (NOTE)
                            </span>
                          ) : item?.note === "contact" ? (
                            <span
                              className="text-[#cf3832] cursor-pointer"
                              onClick={() => setConTab(true)}
                            >
                              (NOTE)
                            </span>
                          ) : null}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-[#FFF3E3] p-8 rounded-lg flex flex-col gap-2 items-center">
                <h2 className="text-3xl font-medium text-black flex items-center gap-2">
                  Platinum{" "}
                  <span
                    className="text-[#cf3832] text-sm cursor-pointer"
                    onClick={() => setWhyTab(true)}
                  >
                    (NOTE)
                  </span>
                </h2>
                <p className="text-gray-600 line-through text-sm font-medium">
                  {type === "year" ? "$2399.88/year" : "$2399.88/year"}
                </p>

                <p className="text-3xl font-medium text-black">
                  {type === "year" ? "$1999.90" : "$1999.90"}
                  <span className="!text-sm">
                    {type === "year" ? "/year" : "/year"}
                  </span>
                </p>

                <button className="mt-5 w-full bg-gray-200 py-2 rounded-md border-gray-400 cursor-not-allowed">
                  Chose Now
                </button>

                <div className="mt-10">
                  <h2 className="text-xl font-medium text-black">
                    What's included:
                  </h2>
                  <ul className="flex flex-col gap-2 mt-5">
                    {platinumFeatures?.map((item, index) => (
                      <li key={index} className="flex gap-2 items-center">
                        <i className="fa-solid fa-check text-[#96c94b]"></i>
                        <p className="text-md font-normal text-black">
                          {item?.label}
                          {item?.note === "accounts" ? (
                            <span
                              className="text-[#cf3832] cursor-pointer"
                              onClick={() => setGoldTab(true)}
                            >
                              (NOTE)
                            </span>
                          ) : item?.note === "additional" ? (
                            <span
                              className="text-[#cf3832] cursor-pointer"
                              onClick={() => setAddTab(true)}
                            >
                              (NOTE)
                            </span>
                          ) : item?.note === "merchandise" ? (
                            <span
                              className="text-[#cf3832] cursor-pointer"
                              onClick={() => setMerTab(true)}
                            >
                              (NOTE)
                            </span>
                          ) : null}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <LottieAnimation />
          )}
        </div>
      </section>
      <CoreValues />
      <BusinessInfo />
      <Footer />
      {showTab && <ProductRevenue setShowTab={setShowTab} showTab={showTab} />}
      {affTab && <AffiliateProgram setAffTab={setAffTab} affTab={affTab} />}
      {conTab && <ContactPopup setConTab={setConTab} conTab={conTab} />}
      {goldTab && <GoldAccTab setGoldTab={setGoldTab} goldTab={goldTab} />}
      {addTab && <AdditionalTab setAddTab={setAddTab} addTab={addTab} />}
      {merTab && <MerchandiseTab setMerTab={setMerTab} merTab={merTab} />}
      {whyTab && <WhyPlatTab setWhyTab={setWhyTab} whyTab={whyTab} />}
    </React.Fragment>
  );
}

export default Pricing;
