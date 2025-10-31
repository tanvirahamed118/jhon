import { type SetStateAction } from "react";
import { GrDomain } from "react-icons/gr";
import { HiOutlineMailOpen } from "react-icons/hi";
import SingleEventLader from "../../loader/Single.event.lader";
import { useGetOneDomainQuery } from "../../../redux/features/domain/domainApi";
import { BsSignpost2 } from "react-icons/bs";

interface DataTypes {
  isShow: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  id: string;
}

function AdminViewDomain({ isShow, setShow, id }: DataTypes) {
  const { data, isLoading } = useGetOneDomainQuery(id);
  const { domain, email, create_at } = data?.domain || {};

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
              Domain Request
            </h2>
            <div>
              <div>
                <h2 className="text-[#3D424B] font-medium text-xl">Domain</h2>
                <span className="flex gap-2 items-center">
                  <GrDomain size={20} />
                  <p className="text-[#3D424B] font-normal text-lg">{domain}</p>
                </span>
              </div>
              <div className="my-5">
                <h2 className="text-[#3D424B] font-medium text-xl">Email</h2>
                <span className="flex gap-2 items-center">
                  <HiOutlineMailOpen size={20} />
                  <p className="text-[#3D424B] font-normal text-lg">{email}</p>
                </span>
              </div>
              <div className="my-5">
                <h2 className="text-[#3D424B] font-medium text-xl">
                  Create At
                </h2>
                <span className="flex gap-2 items-center">
                  <BsSignpost2 size={20} />
                  <p className="text-[#3D424B] font-normal text-lg">
                    {formattedDate(create_at)}
                  </p>
                </span>
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

export default AdminViewDomain;
