import { useState, type SetStateAction } from "react";
import SelectComponent from "../../../component/ui/Select.component";
import { useUpdateEventStatusMutation } from "../../../redux/features/event/eventApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface DataTypes {
  isShow: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  id: string;
  status: string;
}
function UpdateBrandbook({ isShow, setShow, id, status }: DataTypes) {
  const [event, setEvent] = useState({
    status: status,
  });

  const [updateEventStatus, { isLoading }] = useUpdateEventStatusMutation();

  const handleChange = (value: string) => {
    setEvent((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateEventStatus({ id, event })
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
        className={`relative p-10 flex flex-col w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-3/12 m-auto justify-center rounded-xl shadow-xl bg-[#fff] ${
          isShow ? "zoom-animation" : ""
        }`}
      >
        <div className="flex flex-col gap-5 rounded-2xl">
          <div>
            <h2 className="text-[#3D424B] font-medium text-3xl">
              Update Brandbook Status
            </h2>
            <h2 className="text-[#3D424B] font-medium text-xl mt-5 mb-2">
              Are you sure?
            </h2>
            <h2 className="text-[#3D424B] font-normal text-md">
              When you update a booking, a notification email will be
              automatically sent to the customer. Please make sure all details
              are correct before proceeding.
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1 mt-3">
            <label htmlFor="" className="text-[#3D424B] font-normal text-md">
              Select Status
            </label>
            <div className="w-full">
              <SelectComponent
                value={event.status}
                label="Select status"
                handleChange={handleChange}
                datas={[
                  { key: "PENDING", value: "PENDING" },
                  { key: "CONFIRMED", value: "CONFIRMED" },
                  { key: "REJECTED", value: "REJECTED" },
                ]}
                color="#F3F3F3"
              />
            </div>
            <button className="bg-[#cbf38b] px-6 py-3 cursor-pointer rounded-lg flex gap-2 items-center w-fit mt-3">
              {isLoading ? (
                <i className="fa-solid fa-circle-notch animate-spin"></i>
              ) : (
                "Update"
              )}
            </button>
          </form>
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

export default UpdateBrandbook;
