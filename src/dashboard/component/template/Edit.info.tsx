import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useGetOneOnboardQuery,
  useUpdateInfoMutation,
} from "../../../redux/features/onboard/onboardApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import InputComponent from "../../../component/ui/Input.component";
import TextareaComponent from "../../../component/ui/Textarea.component";

interface TypesForm {
  isShowInfo: boolean;
  setIsShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OnboardType {
  midName: string;
  nickName: string;
  cardNumber: string;
  bio: string;
  tagLine: string;
  offerings: string;
  businessServiced: { id?: string; title: string }[];
  funnySaying: string;
}

function EditInfo({ isShowInfo, setIsShowInfo }: TypesForm) {
  const params = useParams();
  const id = params.id;
  const [updateInfo, { isLoading }] = useUpdateInfoMutation();
  const { data } = useGetOneOnboardQuery(id);
  const [onboard, setOnboard] = useState<OnboardType>({
    midName: "",
    nickName: "",
    cardNumber: "",
    bio: "",
    tagLine: "",
    offerings: "",
    businessServiced: [],
    funnySaying: "",
  });

  const {
    midName,
    nickName,
    cardNumber,
    bio,
    tagLine,
    offerings,
    funnySaying,
  } = onboard || {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOnboard({
      ...onboard,
      [name]: value,
    });
  };

  useEffect(() => {
    if (data) {
      setOnboard({
        ...data?.onboard,
        midName: data?.onboard?.user?.midName,
        nickName: data?.onboard?.user?.nickName,
        cardNumber: data?.onboard?.user?.cardNumber,
        businessServiced:
          data?.onboard?.services?.map((s: { id: string; title: string }) => ({
            id: s.id,
            title: s.title,
          })) || [],
      });
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateInfo({ id, onboard })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setIsShowInfo(false);
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
      });
  };

  const handleServiceChange = (index: number, value: string) => {
    const updatedServices = [...onboard.businessServiced];
    updatedServices[index].title = value;
    setOnboard({ ...onboard, businessServiced: updatedServices });
  };

  const handleAddService = () => {
    setOnboard({
      ...onboard,
      businessServiced: [...onboard.businessServiced, { title: "" }],
    });
  };

  const handleRemoveService = (index: number) => {
    const updated = onboard.businessServiced.filter((_, i) => i !== index);
    setOnboard({ ...onboard, businessServiced: updated });
  };

  return (
    <div className="inset-0 bg-[#00000039] flex fixed left-0 justify-center items-center w-full h-auto min-h-screen z-50 overflow-auto">
      <div
        className={`relative flex flex-col w-11/12 2xl:w-6/12 xl:w-8/12 m-auto justify-center p-4 rounded-lg shadow-sm bg-[#ffffff] border border-gray-300 ${
          isShowInfo ? "zoom-animation" : ""
        }`}
      >
        <div className="p-5 min-h-full overflow-y-auto">
          <div className="flex flex-col gap-2 border-b border-gray-300 pb-5 mb-5">
            <h2 className="text-3xl">Update General Infos</h2>
            <p className="text-md font-normal text-gray-400">
              Update your general info settings here!
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-lg font-normal text-black">
                  Mid Name
                </label>
                <InputComponent
                  type="text"
                  name="midName"
                  value={midName}
                  handleChange={handleChange}
                  placeholder="Enter nick name"
                  required={false}
                  autoComplete="midName"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-lg font-normal text-black">
                  Nick Name
                </label>
                <InputComponent
                  type="text"
                  name="nickName"
                  value={nickName}
                  handleChange={handleChange}
                  placeholder="Enter nick name"
                  required={false}
                  autoComplete="nickName"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-lg font-normal text-black">
                  Business offering
                </label>
                <TextareaComponent
                  name="offerings"
                  value={offerings}
                  handleChange={handleChange}
                  rows={3}
                  autoComplete="offerings"
                  required={false}
                  placeholder="Update offerings"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-lg font-normal text-black">
                  Bio
                </label>
                <TextareaComponent
                  name="bio"
                  value={bio}
                  handleChange={handleChange}
                  rows={3}
                  autoComplete="bio"
                  required={false}
                  placeholder="Update bio"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-lg font-normal text-black">
                  Tag Line
                </label>
                <InputComponent
                  type="text"
                  name="tagLine"
                  value={tagLine}
                  handleChange={handleChange}
                  placeholder="Enter tagLine"
                  required={false}
                  autoComplete="tagLine"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-lg font-normal text-black">
                  Card number
                </label>
                <InputComponent
                  type="text"
                  name="cardNumber"
                  value={cardNumber}
                  handleChange={handleChange}
                  placeholder="Enter tagLine"
                  required={false}
                  autoComplete="cardNumber"
                />
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <label htmlFor="" className="text-lg font-normal text-black">
                  Funny Saying
                </label>
                <InputComponent
                  type="text"
                  name="funnySaying"
                  value={funnySaying}
                  handleChange={handleChange}
                  placeholder="update funny saying"
                  required={false}
                  autoComplete="funnySaying"
                />
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-lg font-normal text-black">
                  Business Services
                </label>

                <div className="grid grid-cols-2 gap-5">
                  {onboard.businessServiced.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <InputComponent
                        type="text"
                        name={`service-${index}`}
                        value={service.title}
                        handleChange={(e) =>
                          handleServiceChange(index, e.target.value)
                        }
                        placeholder="Enter service title"
                        required={false}
                        autoComplete={`service-${index}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveService(index)}
                        className="bg-red-400 w-8 h-8 flex justify-center items-center rounded-full text-white cursor-pointer"
                      >
                        <i className="fa-solid fa-xmark text-lg"></i>
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddService}
                  className="primary-btn w-fit"
                >
                  Add Service
                </button>
              </div>
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
          onClick={() => setIsShowInfo(false)}
          className="bg-red-400 w-10 h-10 flex justify-center items-center rounded-full text-white absolute top-3 right-3 cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default EditInfo;
