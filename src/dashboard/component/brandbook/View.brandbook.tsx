import { type SetStateAction } from "react";
import { LuCalendarDays, LuClock4 } from "react-icons/lu";
import { useGetOneEventQuery } from "../../../redux/features/event/eventApi";
import SingleEventLader from "../../loader/Single.event.lader";

interface DataTypes {
  isShow: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  id: string;
}

function ViewBrandbook({ isShow, setShow, id }: DataTypes) {
  const { data, isLoading } = useGetOneEventQuery(id);
  const { name, email, time, date, note, status } = data?.event || {};
  const formattedDate = (value: string) => {
    const createDate = new Date(value);
    return createDate?.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
            <h2 className="text-[#3D424B] font-medium text-xl">
              Brandbook Booking
            </h2>
            <div>
              <h3 className="text-[#3D424B] font-medium text-2xl">{name}</h3>
              <p className="text-[#3D424B] font-normal text-lg">{email}</p>
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <LuCalendarDays color="#3D424B" size={20} />
                <p className="text-[#3D424B] font-normal text-lg">
                  {formattedDate(date)}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <LuClock4 color="#3D424B" size={20} />
                <p className="text-[#3D424B] font-normal text-lg">{time}</p>
              </div>
              <div className="my-5">
                <h2 className="text-[#3D424B] font-medium text-2xl">Note</h2>
                <p className="text-[#3D424B] font-normal text-lg">{note}</p>
              </div>
              <div>
                <h2 className="text-[#3D424B] font-medium text-2xl">Status</h2>
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

export default ViewBrandbook;
