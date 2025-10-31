import { type SetStateAction } from "react";
import { LuMessageSquareMore } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { IoFlashOutline } from "react-icons/io5";
import SingleEventLader from "../../loader/Single.event.lader";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useGetOneEchoQuery } from "../../../redux/features/echo/echoApi";

interface DataTypes {
  isShow: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  id: string;
}

function ViewEcho({ isShow, setShow, id }: DataTypes) {
  const { data, isLoading } = useGetOneEchoQuery(id);
  const { name, email, message, tip, status, shoutOut, city } =
    data?.echo || {};
  return (
    <div className="fixed inset-0 flex justify-center items-center w-full min-h-screen z-50 overflow-auto bg-white/20 backdrop-blur-xs">
      <div
        className={`relative p-10 flex flex-col w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-96 m-auto justify-center bg-white rounded-2xl shadow-xl ${
          isShow ? "zoom-animation" : ""
        }`}
      >
        {isLoading ? (
          <SingleEventLader />
        ) : (
          <div className="flex flex-col gap-5 rounded-2xl">
            <h2 className="text-[#3D424B] font-medium text-xl">Echo Request</h2>
            <div>
              <h3 className="text-[#3D424B] font-medium text-xl">{name}</h3>
              <p className="text-[#3D424B] font-normal text-lg">{email}</p>
            </div>
            <div>
              <div>
                <h2 className="text-[#3D424B] font-medium text-xl">Message</h2>
                <span className="flex gap-2 items-center">
                  <LuMessageSquareMore size={20} />
                  <p className="text-[#3D424B] font-normal text-lg">
                    {message}
                  </p>
                </span>
              </div>
              <div className="my-5">
                <h2 className="text-[#3D424B] font-medium text-xl">City</h2>
                <span className="flex gap-2 items-center">
                  <SlLocationPin size={20} />
                  <p className="text-[#3D424B] font-normal text-lg">{city}</p>
                </span>
              </div>
              <div className="my-5">
                <h2 className="text-[#3D424B] font-medium text-xl">Shoutout</h2>
                <span className="flex gap-2 items-center">
                  <IoFlashOutline size={20} />
                  <p className="text-[#3D424B] font-normal text-lg">
                    {shoutOut}
                  </p>
                </span>
              </div>
              <div className="my-5">
                <h2 className="text-[#3D424B] font-medium text-xl">Tip</h2>
                <span className="flex gap-2 items-center">
                  <RiMoneyDollarCircleLine size={20} />
                  <p className="text-[#3D424B] font-normal text-lg">{tip}</p>
                </span>
              </div>
              <div>
                <h2 className="text-[#3D424B] font-medium text-xl">Status</h2>
                <p className="text-[#3D424B] font-normal text-lg">{status}</p>
              </div>
            </div>
          </div>
        )}
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

export default ViewEcho;
