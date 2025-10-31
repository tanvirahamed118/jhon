import React, { useEffect, useRef, useState, type SetStateAction } from "react";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  useGetOneContactQuery,
  useUpdateContactMutation,
} from "../../../redux/features/contact/contactApi";

interface UserType {
  name: string | null;
  email: string | null;
  message: string | null;
  phone: string | null;
  subject: string | null;
}

function EditContact({
  id,
  showTab,
  setShowTab,
}: {
  id: string;
  showTab: boolean;
  setShowTab: React.Dispatch<SetStateAction<boolean>>;
}) {
  const logoRef = useRef<HTMLInputElement>(null);
  const [updateContact, { isLoading }] = useUpdateContactMutation();
  const { data } = useGetOneContactQuery(id);
  const userAuth = data?.contact as UserType;

  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    message: "",
    phone: "",
    subject: "",
  });
  const { name, email, message, phone, subject } = user || {};

  useEffect(() => {
    if (userAuth) {
      setUser(userAuth);
    }
  }, [userAuth]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateContact({ user, id })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        if (logoRef.current) logoRef.current.value = "";
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
      });
  };

  return (
    <section className="inset-0 bg-[#00000039] flex fixed left-0 justify-center items-center w-full z-50">
      <div
        className={`w-full m-auto flex justify-center items-center ${
          showTab ? "zoom-animation" : ""
        }`}
      >
        <div className="relative w-11/12 lg:w-5/12 rounded-lg bg-[#ffffff] h-full p-10">
          <div>
            <h2 className="text-3xl font-medium text-black border-b border-gray-300 pb-5">
              Update Contact Info
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-black text-md font-normal">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name || ""}
                    name="name"
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="text-black text-md font-normal border border-[#D4DCEA] p-4 rounded-md bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-black text-md font-normal">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email || ""}
                    name="email"
                    onChange={handleChange}
                    required
                    placeholder="example@gmail.com"
                    className="text-black text-md font-normal border border-[#D4DCEA] p-4 rounded-md"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Phone Number</label>
                  <input
                    type="phone"
                    value={phone || ""}
                    name="phone"
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone no."
                    id=""
                    className="text-black text-md font-normal border border-[#D4DCEA] p-4 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Subject</label>
                  <input
                    type="subject"
                    value={subject || ""}
                    name="subject"
                    onChange={handleChange}
                    required
                    placeholder="Enter your subject"
                    className="text-black text-md font-normal border border-[#D4DCEA] p-4 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Message</label>
                <textarea
                  value={message || ""}
                  name="message"
                  onChange={handleChange}
                  required
                  placeholder="Enter your message"
                  rows={5}
                  className="text-black text-md font-normal border border-gray-300 px-4 py-3 rounded-md"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#96c94b] text-black text-md font-medium m-auto w-fit py-5 px-10 rounded-full flex gap-2 items-center cursor-pointer"
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
                  "Save Setting"
                )}
              </button>
            </form>
          </div>
          <button
            onClick={() => setShowTab(false)}
            className="absolute top-3 right-3 cursor-pointer text-red-500 text-3xl"
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default EditContact;
