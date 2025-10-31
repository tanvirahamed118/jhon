import { useState } from "react";
import { useRequestDomainMutation } from "../../redux/features/onboard/onboardApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface TypesForm {
  reqTab: boolean;
  setReqTab: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReqestDomainTab({ reqTab, setReqTab }: TypesForm) {
  const [user, setUser] = useState<{ domain: string; email: string }>({
    domain: "",
    email: "",
  });
  const [requestDomain, { isLoading }] = useRequestDomainMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestDomain(user)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setUser({
          email: "",
          domain: "",
        });
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="inset-0 bg-[#00000053] flex fixed left-0 justify-center items-center w-full min-h-screen z-50 overflow-auto">
      <div
        className={`relative flex flex-col w-11/12 md:w-8/12 lg:w-6/12 2xl:w-4/12 m-auto justify-center p-10 rounded-lg shadow-sm bg-[#ffffff] border border-gray-300 ${
          reqTab ? "zoom-animation" : ""
        }`}
      >
        <h2 className="text-2xl font-medium text-black text-center mt-5 mb-2">
          Request A Domain
        </h2>
        <p className="text-md font-normal text-black text-center">
          Fill the form and submit it. We will notify shortly.
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full my-5 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="" className="text-md font-normal text-black">
              Domain
            </label>
            <input
              type="text"
              name="domain"
              value={user.domain}
              onChange={handleChange}
              required
              className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-1 focus:outline-[#96c94b]"
              placeholder="Enter email"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="" className="text-md font-normal text-black">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-1 focus:outline-[#96c94b]"
              placeholder="Enter email"
            />
          </div>
          <button
            type="submit"
            className="primary-btn w-fit !px-6 flex gap-2 items-center"
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
              "Submit Request"
            )}
          </button>
        </form>
        <button
          onClick={() => setReqTab(false)}
          className="bg-red-400 w-10 h-10 flex justify-center items-center rounded-full text-white absolute top-3 right-3 cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default ReqestDomainTab;
