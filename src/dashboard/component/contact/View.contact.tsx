import React, { useEffect, type SetStateAction } from "react";
import {
  useGetOneContactQuery,
  useSeenContactMutation,
} from "../../../redux/features/contact/contactApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function ViewContact({
  id,
  showViewTab,
  setShowViewTab,
}: {
  id: string;
  showViewTab: boolean;
  setShowViewTab: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { data } = useGetOneContactQuery(id);
  const [seenContact] = useSeenContactMutation();
  const { name, email, phone, subject, message } = data?.contact || {};

  useEffect(() => {
    if (data?.contact && !data.contact.seen) {
      seenContact(id)
        .unwrap()
        .then((res) => {
          toast.success(res.message);
        })
        .catch((error) => {
          const err = error as FetchBaseQueryError;
          const errorMessage = (err.data as { message: string }).message;
          toast.error(errorMessage);
        });
    }
  }, [id, data]);

  return (
    <section className="inset-0 bg-[#00000039] flex fixed left-0 justify-center items-center w-full z-50">
      <div
        className={`w-full m-auto flex justify-center items-center ${
          showViewTab ? "zoom-animation" : ""
        }`}
      >
        <div className="relative w-11/12 lg:w-6/12 xl:w-4/12 rounded-lg bg-[#ffffff] h-full p-10">
          <div>
            <h2 className="text-3xl font-medium text-black">
              View Contact Details
            </h2>
            <div className="rounded-md shadow overflow-hidden my-5">
              <table className="table-auto border-collapse w-full oboardTable">
                <thead>
                  <tr className="border border-gray-300">
                    <td className="text-left p-3 font-medium">Key</td>
                    <td className="text-left p-3 font-medium">Value</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-gray-300">
                    <td className="text-left p-3">Full Name</td>
                    <td className="text-left p-3">{name}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="text-left p-3">Email</td>
                    <td className="text-left p-3">{email}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="text-left p-3">Phone</td>
                    <td className="text-left p-3">{phone}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="text-left p-3">Subject</td>
                    <td className="text-left p-3">{subject}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="text-left p-3">Message</td>
                    <td className="text-left p-3">{message}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={() => setShowViewTab(false)}
            className="absolute top-3 right-3 cursor-pointer text-red-500 text-3xl"
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ViewContact;
