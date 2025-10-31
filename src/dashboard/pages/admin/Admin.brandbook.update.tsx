import { useEffect, useState, type SetStateAction } from "react";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  useGetOneEventQuery,
  useUpdateEventMutation,
} from "../../../redux/features/event/eventApi";
import { DayPicker } from "react-day-picker";
import SelectComponent from "../../../component/ui/Select.component";

interface DataTypes {
  isShow: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  id: string;
}
function AdminBrandbookUpdate({ isShow, setShow, id }: DataTypes) {
  const [brandbook, setBrandbook] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    note: "",
    status: "",
  });
  const { data } = useGetOneEventQuery(id);

  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  const { name, email, date, time, note, status } = brandbook || {};
  useEffect(() => {
    if (data) {
      setBrandbook(data?.event);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBrandbook({
      ...brandbook,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateEvent({ id, brandbook })
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

  const formatTime = (timeString: string): string => {
    if (!timeString) return "";
    if (/^\d{2}:\d{2}$/.test(timeString)) return timeString;
    const match = timeString.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = match[2];
      const meridian = match[3].toUpperCase();

      let h = hours;
      if (meridian === "PM" && h < 12) h += 12;
      if (meridian === "AM" && h === 12) h = 0;
      return `${h.toString().padStart(2, "0")}:${minutes}`;
    }
    return "";
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center w-full min-h-screen z-50 overflow-auto bg-white/20 backdrop-blur-xs">
      <div
        className={`relative p-10 flex flex-col w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-5/12 m-auto justify-center rounded-xl shadow-xl bg-[#fff] ${
          isShow ? "zoom-animation" : ""
        }`}
      >
        <div className="flex flex-col gap-5 rounded-2xl">
          <h2 className="text-[#3D424B] font-medium text-3xl">Update Echo</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start"
          >
            <div className="w-full flex flex-col gap-5">
              <input
                type="text"
                value={name}
                onChange={handleChange}
                name="name"
                required
                className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border p-3 w-full rounded-lg text-normal"
                placeholder="Enter your name"
              />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={email}
                required
                className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border p-3 w-full rounded-lg text-normal"
                placeholder="Enter your email"
              />
              <input
                type="text"
                name="note"
                onChange={handleChange}
                value={note}
                required
                className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border p-3 w-full rounded-lg text-normal"
                placeholder="Enter your email"
              />
              <SelectComponent
                value={status}
                label="Select status"
                handleChange={(item) =>
                  setBrandbook((prev) => ({ ...prev, status: item }))
                }
                datas={[
                  { key: "PENDING", value: "PENDING" },
                  { key: "CONFIRMED", value: "CONFIRMED" },
                  { key: "CANCELED", value: "CANCELED" },
                  { key: "REJECTED", value: "REJECTED" },
                ]}
                color="#F3F3F3"
              />
              <input
                type="time"
                name="time"
                onChange={handleChange}
                value={time ? formatTime(time) : ""}
                required
                className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border p-3 w-full rounded-lg text-normal"
                placeholder="Select time"
              />
            </div>
            <DayPicker
              mode="single"
              selected={new Date(date)}
              onSelect={(date) => {
                if (date) {
                  const formatted = date.toLocaleDateString("en-CA");
                  setBrandbook((prev) => ({ ...prev, date: formatted }));
                }
              }}
              modifiersClassNames={{
                selected: "text-[#000] bg-[#96c94b] rounded-full",
                disabled: "text-gray-400",
                today: "text-[#000]",
                hidden: "text-gray-500",
                arrow: "text-red",
              }}
              disabled={{ before: new Date() }}
              modifiersStyles={{
                caption: { color: "#ffdd00" },
              }}
              className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border p-3 w-full rounded-lg text-normal"
            />

            <button
              type="submit"
              className="bg-[#cbf38b] px-6 py-3 cursor-pointer rounded-lg flex gap-2 items-center w-fit mt-3"
            >
              {isLoading ? (
                <i className="fa-solid fa-circle-notch animate-spin"></i>
              ) : (
                "Save"
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

export default AdminBrandbookUpdate;
