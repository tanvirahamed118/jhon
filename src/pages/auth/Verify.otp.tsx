import { useState, useRef, useEffect } from "react";
import verify from "../../assets/verify-email.png";
import type { ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
import {
  useSendOtpCodeMutation,
  useVerifyUserMutation,
} from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router";

function VerifyOtp() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(45);
  const auth = localStorage.getItem("email");
  const email = auth ? JSON?.parse(auth) : "";
  const [verifyUser, { isLoading }] = useVerifyUserMutation();
  const [sendOtpCode, { isLoading: isSendLoad }] = useSendOtpCodeMutation();
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const newCode = [...code];
    if (value === "") {
      newCode[index] = "";
      setCode(newCode);
      return;
    }
    if (!isNaN(Number(value)) && value.length === 1) {
      newCode[index] = value;
      setCode(newCode);
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("Text");
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split("");
      setCode(digits);
      inputsRef.current[5]?.focus();
    }
  };

  useEffect(() => {
    const codeString = code.join("");
    if (codeString.length === 6 && !code.includes("")) {
      const user = { code: codeString };
      verifyUser(user)
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setCode(["", "", "", "", "", ""]);
          localStorage.removeItem("email");
          navigate("/dashboard");
        })
        .catch((error) => {
          const err = error as FetchBaseQueryError;
          const errorMessage = (err.data as { message: string }).message;
          toast.error(errorMessage);
        });
    }
  }, [code, verifyUser, navigate]);

  useEffect(() => {
    if (email) {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [timer, email]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleResend = () => {
    const user = { email: email };
    if (email) {
      sendOtpCode(user)
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setTimer(45);
        })
        .catch((error) => {
          const err = error as FetchBaseQueryError;
          const errorMessage = (err.data as { message: string }).message;
          toast.error(errorMessage);
        });
    }
  };

  return (
    <section className="w-full items-center flex justify-center py-20">
      <div className="items-center flex justify-center w-full">
        <div className="flex flex-col gap-2 items-center justify-center bg-white w-11/12 xl:w-4/12 lg:w-8/12 border border-gray-300 p-10 rounded-lg">
          <img src={verify} alt="Verify Email" className="w-24 h-auto" />
          <h2 className="text-2xl font-normal text-[#111111]">
            Check your email inbox.
          </h2>
          <p className="text-base font-normal text-[#111111] pt-5 text-center">
            Verify your account. A 6-digit verification code has been sent to{" "}
            {email}. Please enter the code below to proceed. If you did not
            receive the code, you can resend it after 00:45. Note: You have only
            one opportunity to request a new code.
          </p>
          <p className="text-base font-normal text-[#111111] p-0 text-center">
            If you still do not receive a code after resending, please contact
            our support team: support@mybrandlife.me.
          </p>

          <form className="flex gap-2 items-center verify-input">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) inputsRef.current[index] = el;
                }}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="border border-gray-300 rounded-md h-12 w-8 text-2xl text-center"
              />
            ))}
          </form>

          <div>
            {isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992M2.985 19.644v-4.992m0 0h4.992m-4.993 0
                 3.181 3.183a8.25 8.25 0 0 0
                 13.803-3.7M4.031 9.865a8.25
                 8.25 0 0 1 13.803-3.7l3.181
                 3.182"
                />
              </svg>
            )}
          </div>

          <p className="text-base font-medium text-[#111111] text-center mt-6">
            {timer > 0 ? (
              email ? (
                <>Resend in 00:{timer.toString().padStart(2, "0")}</>
              ) : null
            ) : (
              email && (
                <button
                  onClick={handleResend}
                  className="border-0 text-blue-400 cursor-pointer text-lg font-normal hover:underline flex gap-2 items-center"
                >
                  {isSendLoad ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 animate-spin"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992M2.985
                          19.644v-4.992m0 0h4.992m-4.993
                          0 3.181 3.183a8.25 8.25 0 0 0
                          13.803-3.7M4.031 9.865a8.25
                          8.25 0 0 1 13.803-3.7l3.181
                          3.182"
                        />
                      </svg>
                      <p>Loading...</p>
                    </>
                  ) : (
                    "Send New Code"
                  )}
                </button>
              )
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

export default VerifyOtp;
