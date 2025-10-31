import { useEffect, type SetStateAction } from "react";
import SingleEventLader from "../../loader/Single.event.lader";
import {
  useGetOneContactQuery,
  useSeenContactMutation,
} from "../../../redux/features/contact/contactApi";

interface DataTypes {
  isShow: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  id: string;
}

function ViewContact({ isShow, setShow, id }: DataTypes) {
  const { data, isLoading } = useGetOneContactQuery(id);
  const { firstname, email, message, subject, phone, niche, lastname } =
    data?.contact || {};

  const [seenContact] = useSeenContactMutation();

  useEffect(() => {
    seenContact(id).unwrap();
  }, [id]);

  return (
    <div className="fixed inset-0 flex justify-center items-center w-full min-h-screen z-50 overflow-auto bg-white/20 backdrop-blur-xs">
      <div
        className={`relative p-10 flex flex-col w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-5/12 m-auto justify-center bg-white rounded-2xl shadow-xl ${
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
            <div className="w-full flex flex-col gap-5">
              <div>
                <h2 className="text-[#3D424B] font-medium text-xl">
                  First Name
                </h2>
                <p className="text-[#3D424B] font-normal text-lg">
                  {firstname}
                </p>
              </div>
              <div>
                <h2 className="text-[#3D424B] font-medium text-xl">
                  Last Name
                </h2>
                <p className="text-[#3D424B] font-normal text-lg">{lastname}</p>
              </div>
              <div>
                <h2 className="text-[#3D424B] font-medium text-xl">Email</h2>
                <p className="text-[#3D424B] font-normal text-lg">{email}</p>
              </div>
              <div>
                <h2 className="text-[#3D424B] font-medium text-xl">Niche</h2>
                <p className="text-[#3D424B] font-normal text-lg">{niche}</p>
              </div>
              <div>
                <h2 className="text-[#3D424B] font-medium text-xl">Subject</h2>
                <p className="text-[#3D424B] font-normal text-lg">{subject}</p>
              </div>
              <div>
                <h2 className="text-[#3D424B] font-medium text-xl">Message</h2>
                <p className="text-[#3D424B] font-normal text-lg">{message}</p>
              </div>
              <div>
                <h2 className="text-[#3D424B] font-medium text-xl">Phone</h2>
                <p className="text-[#3D424B] font-normal text-lg">{phone}</p>
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

export default ViewContact;
