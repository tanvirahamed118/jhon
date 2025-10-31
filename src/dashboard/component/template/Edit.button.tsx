import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateSocialsMutation } from "../../../redux/features/onboard/onboardApi";
import { useParams } from "react-router";

interface TypesForm {
  isShowButton: boolean;
  setIsShowButton: React.Dispatch<React.SetStateAction<boolean>>;
  buttons: TypesOfButton[];
}

interface TypesOfButton {
  id: string;
  name: string;
  url: string;
  templateId: string;
}

function EditButton({ isShowButton, setIsShowButton, buttons }: TypesForm) {
  const [onboard, setOnboard] = useState<TypesOfButton[]>(buttons);
  const [updateSocials, { isLoading }] = useUpdateSocialsMutation();
  const params = useParams();
  const id = params.id;

  const handleChange = (id: string, value: string) => {
    setOnboard((prev) =>
      prev.map((btn) => (btn.id === id ? { ...btn, url: value } : btn))
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSocials({ id, onboard })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setIsShowButton(false);
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="inset-0 bg-[#00000039] flex fixed left-0 justify-center items-center w-full min-h-screen z-50 overflow-auto">
      <div
        className={`relative flex flex-col w-11/12 3xl:w-6/12 xl:w-8/12 m-auto justify-center p-4 rounded-lg shadow-sm bg-[#ffffff] border border-gray-300 ${
          isShowButton ? "zoom-animation" : ""
        }`}
      >
        <div className="p-5 min-h-[90vh] h-[90vh] overflow-y-auto">
          <div className="flex flex-col gap-2 border-b border-gray-300 pb-5 mb-5">
            <h2 className="text-3xl">Edit All Buttons</h2>
            <p className="text-md font-normal text-gray-400">
              Update your button here
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
              {onboard?.map((item) => {
                const { id, name, url } = item || {};
                return (
                  <div key={id} className="flex flex-col gap-2">
                    <label
                      htmlFor=""
                      className="text-lg font-normal text-black"
                    >
                      {name}
                    </label>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleChange(id, e.target.value)}
                      placeholder={`Enter ${name}`}
                      className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border py-3 px-3 w-full rounded-xl text-normal"
                    />
                  </div>
                );
              })}
            </div>
            <button
              type="submit"
              className="primary-btn flex gap-2 items-center"
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
                  <p>Save</p>
                </>
              )}
            </button>
          </form>
        </div>

        <button
          onClick={() => setIsShowButton(false)}
          className="bg-red-400 w-10 h-10 flex justify-center items-center rounded-full text-white absolute top-3 right-3 cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default EditButton;
