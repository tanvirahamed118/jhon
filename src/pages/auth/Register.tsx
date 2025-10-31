import { Link } from "react-router";
import Logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import StepOne from "../../component/auth/Step-one";
import StepTow from "../../component/auth/Step-tow";
import StepThree from "../../component/auth/Step.three";
import StepFour from "../../component/auth/Step-four";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import type store from "../../redux/app/store";
import { useSelector } from "react-redux";

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

type RootState = ReturnType<typeof store.getState>;

function Register() {
  const [register, { isLoading }] = useRegisterMutation();
  const [cardShow, setCardshow] = useState("");
  const [notes, setNotes] = useState<string>("");
  const [conPassword, setConPassword] = useState<string>("");
  const state = useSelector((state: RootState) => state.onboard);
  const { domain, pkgType } = state || {};
  const [user, setUser] = useState<UserType>({
    domain: "",
    packageType: "",
    planKey: "",
    planPrice: 0,
    planOldPrice: 0,
    frequency: "",
    email: "",
    password: "",
    landerName: "",
    midName: "",
    address: "",
    nickName: "",
    phone: "",
    secondEmail: "",
    aggreement: false,
    extraRed: "",
    extraBlack: "",
    extraGreen: "",
    extraYellow: "",
    extraBlue: "",
    extraWhite: "",
    extraOrange: "",
    cardNumber: "",
    discount: false,
    referalCode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const regex = /^[a-zA-Z0-9]*$/;

    const isChecked =
      e.target instanceof HTMLInputElement && type === "checkbox"
        ? e.target.checked
        : undefined;
    if (value === "yearly") {
      setNotes(
        "Thank you for choosing the yearly plan. Receive 2 additional months at no extra cost when a valid referral code is used."
      );
    }
    if (value === "monthly") {
      setNotes("Subscribe yearly and receive 2 additional months free.");
    }
    if (value === "request_a_domain_not_listed") {
      return;
    }
    if (name === "landerName" && !regex.test(value)) {
      toast.error("Spaces or special characters are not allowed.");
      return;
    }
    if (name === "domain") {
      user.frequency = "";
      user.packageType = "";
    }
    if (name === "packageType") {
      user.frequency = "";
      user.planKey = "";
      user.planPrice = 0;
      user.planOldPrice = 0;
    }
    let planKey = user.planKey;
    let planPrice = user.planPrice;
    let planOldPrice = user.planOldPrice;
    if (name === "frequency" && e.target instanceof HTMLInputElement) {
      planKey = e.target.getAttribute("data-plan-key") || planKey;
      planPrice = Number(e.target.getAttribute("data-plan-price")) || planPrice;
      planOldPrice =
        Number(e.target.getAttribute("data-plan-old-price")) || planOldPrice;
    }
    setUser({
      ...user,
      [name]: type === "checkbox" ? isChecked : value,
      planKey,
      planPrice,
      planOldPrice,
    });
  };

  useEffect(() => {
    if (domain && pkgType) {
      setUser((prev) => ({
        ...prev,
        domain: domain,
        packageType: pkgType,
      }));
    }
  }, [domain, pkgType]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.password !== conPassword) {
      toast.error("Password did not match!");
      return;
    }
    if (user.password && user.password.length < 8) {
      toast.error("Password length too short!");
      return;
    }
    register(user)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setUser({
          domain: "",
          packageType: "",
          planKey: "",
          planPrice: 0,
          planOldPrice: 0,
          frequency: "",
          email: "",
          password: "",
          landerName: "",
          midName: "",
          address: "",
          nickName: "",
          phone: "",
          secondEmail: "",
          aggreement: false,
          extraRed: "",
          extraBlack: "",
          extraGreen: "",
          extraYellow: "",
          extraBlue: "",
          extraWhite: "",
          extraOrange: "",
          cardNumber: "",
          discount: false,
          referalCode: "",
        });
        localStorage.setItem("email", JSON.stringify(res?.user?.email));
        setConPassword("");
        setCardshow("");
        if (res.pageUrl) {
          window.location.href = res.pageUrl;
        }
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
      });
  };

  const { packageType, frequency, referalCode } = user || {};

  return (
    <section>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="bg-[#F2FAFF] flex w-full h-full flex-col gap-2 items-center justify-center px-2 py-5 md:p-20">
          <Link to="/">
            <img src={Logo} alt="" className="w-32" />
          </Link>
          <h2 className="text-4xl md:text-5xl font-bold text-black text-center">
            Your Brand, Your Life, Your Way.
          </h2>
          <p className="text-2xl font-medium text-black text-center">
            Thanks for choosing a lander domain!{" "}
          </p>
          <div>
            {user?.domain && (
              <p className="text-base font-normal text-black text-center">
                <span className="font-medium"> Domain:</span> {user?.domain}.me
              </p>
            )}
            {packageType && (
              <p className="text-base font-normal text-black text-center">
                <span className="font-medium">Package:</span> {packageType}
              </p>
            )}
            {frequency && (
              <p className="text-base font-normal text-black text-center">
                <span className="font-medium">Billing:</span> {frequency}
              </p>
            )}
          </div>
        </div>
        <div className="w-full lg:w-8/12 xl:w-6/12 h-full flex flex-col items-start justify-center p-3 xl:p-20">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-xl font-medium capitalize">
              Select Your Domain, Plan & Billing
            </h2>
            <p className="bg-[#96c94b] w-24 h-2 rounded-full"></p>
            <p>
              At MyBrandLife, our mission is to empower individuals and
              businesses by providing tailored, industry-specific landing pages
              that enhance their online presence and engagement.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-5 mt-5"
          >
            <StepOne
              notes={notes}
              handleChange={handleChange}
              user={user}
              setUser={setUser}
            />

            <StepTow
              user={user}
              setConPassword={setConPassword}
              conPassword={conPassword}
              handleChange={handleChange}
            />
            <StepThree user={user} handleChange={handleChange} />
            <StepFour
              handleChange={handleChange}
              user={user}
              setUser={setUser}
              setCardshow={setCardshow}
              cardShow={cardShow}
            />
            <div className="flex gap-3 items-center">
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
                    <p>
                      {referalCode ? "Pay & Get 2 month extra" : "Build & Pay"}
                    </p>
                  </>
                )}
              </button>
            </div>
            <p className="text-md font-normal text-black">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline font-medium">
                Sing In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
