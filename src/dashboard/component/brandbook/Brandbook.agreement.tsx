import { type SetStateAction } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useToggleEventMutation } from "../../../redux/features/event/eventApi";
import { useAuth } from "../../../hook/useAuth";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface DataTypes {
  isShow: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  status: boolean;
  body: string;
}

function BrandbookAgreement({ isShow, setShow, status, body }: DataTypes) {
  const { user } = useAuth();
  const id = user?.id;
  const [toggleEvent, { isLoading }] = useToggleEventMutation();

  const handleSubmit = () => {
    const event = { status: status };
    toggleEvent({ id, event })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setShow(false);
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center w-full min-h-screen z-50 overflow-auto bg-white/20 backdrop-blur-xs">
      <div
        className={`relative p-10 flex flex-col w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-3/12 m-auto justify-center rounded-lg shadow-xl bg-[#fff] ${
          isShow ? "zoom-animation" : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-5 rounded-2xl">
          <AiOutlineQuestionCircle color="#52C372" size={100} />
          <h2 className="text-[#3D424B] font-medium text-2xl">Are you Sure?</h2>
          <p className="text-[#3D424B] font-normal text-md text-center">
            {body}
          </p>
          <div className="flex gap-5 items-center">
            <button
              onClick={() => setShow(false)}
              className="cursor-pointer bg-gray-300 w-fit text-normal px-6 py-2 rounded-md flex justify-center items-center gap-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#cbf38b] w-fit text-normal px-6 py-2 rounded-md flex cursor-pointer justify-center items-center gap-2"
            >
              {isLoading ? (
                <i className="fa-solid fa-circle-notch animate-spin"></i>
              ) : (
                "Accept"
              )}
            </button>
          </div>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-red-500 text-2xl absolute top-1 right-1 cursor-pointer"
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
    </div>
  );
}

export default BrandbookAgreement;
