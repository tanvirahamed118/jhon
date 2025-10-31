import { useEffect, useState, type SetStateAction } from "react";
import SelectComponent from "../../../component/ui/Select.component";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  useGetOneEchoQuery,
  useUpdateEchoMutation,
} from "../../../redux/features/echo/echoApi";
import useGetCity from "../../../hook/useGetCity";

interface DataTypes {
  isShow: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  id: string;
}
function AdminEchoUpdate({ isShow, setShow, id }: DataTypes) {
  const [echo, setEcho] = useState({
    name: "",
    email: "",
    message: "",
    tip: "",
    city: "",
    shoutOut: "",
    status: "",
  });
  const { data } = useGetOneEchoQuery(id);

  const [updateEcho, { isLoading }] = useUpdateEchoMutation();

  const { name, email, message, tip, city, shoutOut, status } = echo || {};
  useEffect(() => {
    if (data) {
      setEcho(data?.echo);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEcho({
      ...echo,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateEcho({ id, echo })
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

  const getAllCity = useGetCity();
  const getDatas = getAllCity?.map((item: { name: string }) => ({
    key: item.name,
    value: item.name,
  }));

  return (
    <div className="fixed inset-0 flex justify-center items-center w-full min-h-screen z-50 overflow-auto bg-white/20 backdrop-blur-xs">
      <div
        className={`relative p-10 flex flex-col w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-3/12 m-auto justify-center rounded-xl shadow-xl bg-[#fff] ${
          isShow ? "zoom-animation" : ""
        }`}
      >
        <div className="flex flex-col gap-5 rounded-2xl">
          <h2 className="text-[#3D424B] font-medium text-3xl">Update Echo</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 mt-2 md:mt-3"
          >
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
              type="number"
              name="tip"
              onChange={handleChange}
              value={tip}
              required
              className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border p-3 w-full rounded-lg text-normal"
              placeholder="Enter your email"
            />
            <SelectComponent
              value={status}
              label="Select status"
              handleChange={(item) =>
                setEcho((prev) => ({ ...prev, status: item }))
              }
              datas={[
                { key: "PENDING", value: "PENDING" },
                { key: "CONFIRMED", value: "CONFIRMED" },
                { key: "CANCELED", value: "CANCELED" },
                { key: "REJECTED", value: "REJECTED" },
              ]}
              color="#F3F3F3"
            />
            <SelectComponent
              handleChange={(item) =>
                setEcho((prev) => ({ ...prev, city: item }))
              }
              datas={getDatas}
              value={city}
              label="Select City"
              color="#F3F3F3"
            />
            <textarea
              name="message"
              value={message}
              onChange={handleChange}
              required
              className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border p-2 w-full rounded-md text-normal"
              placeholder="Enter your message"
            ></textarea>
            <textarea
              name="shoutOut"
              value={shoutOut}
              onChange={handleChange}
              required
              className="bg-[#F3F3F3] border border-gray-300 focus:outline focus:outline-[#96c94b] focus:border p-2 w-full rounded-md text-normal"
              placeholder="Enter your shoutOut"
            ></textarea>

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

export default AdminEchoUpdate;
