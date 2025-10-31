import { useRef, useState } from "react";
import { useAuth } from "../../../hook/useAuth";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useUpdateImagesMutation } from "../../../redux/features/onboard/onboardApi";
import { useParams } from "react-router";

interface TypesForm {
  isShowFile: boolean;
  setIsShowFiles: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OnboardTypes {
  portrait?: File | null;
  logo?: File | null;
  banner?: File | null;
  background?: File | null;
  epkFile?: File | null;
}

interface UserType {
  package?: string;
}

function EditFiles({ isShowFile, setIsShowFiles }: TypesForm) {
  const params = useParams();
  const id = params.id;
  const { user } = useAuth() as { user: UserType | null };
  const packedType = user?.package;

  let disableBox;
  if (packedType === "bronze" || packedType === "silver") {
    disableBox = true;
  }
  const portraitRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);
  const backgroundRef = useRef<HTMLInputElement>(null);
  const epkFileRef = useRef<HTMLInputElement>(null);
  const [updateImages, { isLoading }] = useUpdateImagesMutation();
  const [onboard, setOnboard] = useState<OnboardTypes>({
    portrait: null,
    logo: null,
    banner: null,
    background: null,
    epkFile: null,
  });
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof OnboardTypes
  ) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    setOnboard((prev) => ({
      ...prev,
      [field]: file,
    }));
  };
  const { portrait, logo, banner, background, epkFile } = onboard || {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("portrait", portrait ? portrait : "");
    formData.append("logo", logo ? logo : "");
    formData.append("banner", banner ? banner : "");
    formData.append("background", background ? background : "");
    formData.append("epkFile", epkFile ? epkFile : "");
    updateImages({ id, formData })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setIsShowFiles(false);
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
        className={`relative flex flex-col w-11/12 2xl:w-6/12 xl:w-8/12 m-auto justify-center p-4 rounded-lg shadow-sm bg-[#ffffff] border border-gray-300 ${
          isShowFile ? "zoom-animation" : ""
        }`}
      >
        <div className="p-5 min-h-full overflow-y-auto">
          <div className="flex flex-col gap-2 border-b border-gray-300 pb-5 mb-5">
            <h2 className="text-3xl">Update All Files</h2>
            <p className="text-md font-normal text-gray-400">
              Update your files settings here!
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-lg font-normal text-black">
                  Logo
                </label>
                <input
                  type="file"
                  name="logo"
                  ref={logoRef}
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) => handleFileChange(e, "logo")}
                  className="flex gap-2 items-center border bg-[#F3F3F3] p-3 border-gray-300 !rounded-xl outline-[#96c94b]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-lg font-normal text-black">
                  Template Portrate
                </label>
                <input
                  type="file"
                  name="portrait"
                  ref={portraitRef}
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) => handleFileChange(e, "portrait")}
                  className="flex gap-2 items-center border bg-[#F3F3F3] p-3 border-gray-300 !rounded-xl outline-[#96c94b]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-lg font-normal text-black">
                  Banner Image
                </label>
                <input
                  type="file"
                  name="banner"
                  ref={bannerRef}
                  disabled={disableBox}
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) => handleFileChange(e, "banner")}
                  className={`border bg-[#F3F3F3] border-gray-300 px-4 py-2 !rounded-xl w-full focus:outline-1 focus:outline-[#96c94b] ${
                    disableBox && "bg-[#e6e6e6] cursor-not-allowed"
                  }`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-lg font-normal text-black">
                  Background Image
                </label>
                <input
                  type="file"
                  name="background"
                  ref={backgroundRef}
                  disabled={disableBox}
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) => handleFileChange(e, "background")}
                  className={`border bg-[#F3F3F3] border-gray-300 px-4 py-2 !rounded-xl w-full focus:outline-1 focus:outline-[#96c94b] ${
                    disableBox && "bg-[#e6e6e6] cursor-not-allowed"
                  }`}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-lg font-normal text-black">
                  Template EPK File
                </label>
                <input
                  type="file"
                  name="epkFile"
                  ref={epkFileRef}
                  disabled={disableBox}
                  accept=".zip,application/zip"
                  onChange={(e) => handleFileChange(e, "epkFile")}
                  className={`border bg-[#F3F3F3] border-gray-300 px-4 py-2 !rounded-xl w-full focus:outline-1 focus:outline-[#96c94b] ${
                    disableBox && "bg-[#e6e6e6] cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
            <button
              type="submit"
              className="primary-btn flex gap-2 items-center"
              disabled={
                !background && !banner && !logo && !portrait && !epkFile
              }
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
          onClick={() => setIsShowFiles(false)}
          className="bg-red-400 w-10 h-10 flex justify-center items-center rounded-full text-white absolute top-3 right-3 cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default EditFiles;
