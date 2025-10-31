import { useEffect, useRef, useState } from "react";
import Wristbands from "./Wristbands";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useCheckDiscountMutation } from "../../redux/features/onboard/onboardApi";
import cardValidator from "../../utils/card.validator";
import AffiliateThanks from "../popups/Affiliate.thanks";

interface UserType {
  frequency: string;
  domain: string;
  packageType: string;
  planKey: string;
  planPrice: number;
  planOldPrice: number;
  email: string;
  password: string;
  landerName: string;
  midName: string;
  address: string;
  nickName: string;
  phone: string;
  secondEmail: string;
  aggreement: boolean;
  extraRed: string;
  extraBlack: string;
  extraGreen: string;
  extraYellow: string;
  extraBlue: string;
  extraWhite: string;
  extraOrange: string;
  cardNumber: string;
  discount: boolean;
  referalCode: string;
}

interface Types {
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  setCardshow: React.Dispatch<React.SetStateAction<string>>;
  cardShow: string;
  user: UserType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

function StepFour({
  user,
  handleChange,
  setUser,
  setCardshow,
  cardShow,
}: Types) {
  const [showWrist, setShowWrist] = useState<boolean>(false);
  const [checkDiscount, { isLoading }] = useCheckDiscountMutation();
  const [discountCode, setDiscountCode] = useState<string>("");
  const [isShow, setIsShow] = useState(false);
  const wristRef = useRef<HTMLDivElement | null>(null);
  const { aggreement, packageType, frequency } = user || {};
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wristRef.current &&
        !wristRef.current.contains(event.target as Node)
      ) {
        setShowWrist(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheck = () => {
    if (!discountCode) {
      return;
    }
    const data = { code: discountCode };
    checkDiscount(data)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setDiscountCode("");
        setUser((prev) => ({
          ...prev,
          discount: true,
          referalCode: res.referalCode,
        }));
        setIsShow(true);
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
      });
  };

  function formatCardNumber(value: string): string {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-md font-medium text-black">
          Extra Wristbands (Optional)
        </label>
        <div className="relative" ref={wristRef}>
          <div
            tabIndex={0}
            className="bg-[#F3F3F3] border border-gray-300 cursor-pointer focus-within:border-[#96c94b] focus-within:border py-3 flex gap-2 items-center justify-between px-3 w-full text-center rounded-xl text-normal"
            onClick={() => setShowWrist((prev) => !prev)}
          >
            <p>Select Wristbands</p>
            {showWrist ? (
              <i className="fa-solid fa-angle-up"></i>
            ) : (
              <i className="fa-solid fa-angle-down"></i>
            )}
          </div>
          <p className="text-sm font-normal text-gray-500 italic mt-2">
            One wristband comes with the gold package; purchase more now or
            later at YourWorldLife.store. Shipping included.
          </p>
          <Wristbands showWrist={showWrist} setUser={setUser} user={user} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-md font-medium text-black">
              Affiliate discount code (optional)
            </label>
            <input
              type="text"
              placeholder="Enter affiliate discount code"
              disabled={packageType !== "gold" || frequency !== "yearly"}
              value={discountCode}
              onChange={handleDiscountChange}
              name="discountCode"
              autoComplete="discountCode"
              required={false}
              className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border py-3 px-3 w-full rounded-xl text-normal"
            />
          </div>
          <p
            onClick={handleCheck}
            className="primary-btn !w-fit flex gap-2 items-center"
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
                <span>Loading...</span>
              </>
            ) : (
              "Activate Discount Code"
            )}
          </p>
        </div>
        <p className="text-sm font-normal text-black italic mt-2 bg-green-300 p-3 rounded-md border-l-5 border-green-500">
          Enjoy 2 complimentary months through our affiliate program —
          applicable only to the yearly Gold plan. Would you like to upgrade to
          the annual Gold plan to benefit from this?{" "}
          <span>Change your plan</span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-md font-medium text-black">
          Card number <span className="text-[#cf3832]">*</span>
        </label>

        <input
          type="text"
          value={cardShow}
          required
          name="cardShow"
          onChange={(e) => {
            const formatted = formatCardNumber(e.target.value);
            setUser((prev) => ({
              ...prev,
              cardNumber: formatted,
            }));
            setCardshow(formatted);
          }}
          className={`bg-[#F3F3F3] border border-gray-300 px-4 py-3 rounded-xl w-full focus:outline-0 
      ${cardValidator(cardShow) ? "border-green-500" : "border-red-500"}`}
          placeholder="1234 5678 9012 3456"
        />
        {!cardValidator(cardShow) && cardShow.length > 0 && (
          <span className="text-red-500 text-sm">Invalid card number</span>
        )}
      </div>
      <div className="flex gap-2 items-center w-full">
        <input
          type="checkbox"
          id="aggrement"
          required
          checked={aggreement}
          name="aggreement"
          onChange={handleChange}
        />
        <label
          htmlFor="aggrement"
          className="text-md font-medium text-black mt-1 cursor-pointer"
        >
          I accept the Terms & Conditions
        </label>
      </div>
      {isShow && (
        <AffiliateThanks
          showTab={isShow}
          setShowTab={setIsShow}
          code={user?.referalCode}
        />
      )}
    </div>
  );
}

export default StepFour;
