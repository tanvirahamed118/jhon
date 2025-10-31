import { useEffect, useRef, useState } from "react";
import Profile from "../../assets/avatar-3.webp";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import {
  useGetOneUserQuery,
  useUpdateUserByAdminMutation,
} from "../../../redux/features/auth/authApi";
import { domains, frequencyData, packageData } from "../../../utils/domains";
import SelectComponent from "../../../component/ui/Select.component";
import { useParams } from "react-router";

interface UserType {
  username: string;
  firstName: string;
  midName: string;
  lastName: string;
  email: string;
  secondEmail: string;
  phone: string;
  profile: File | null;
  address: string;
  landerName: string;
  nickName: string;
  package: string;
  frequency: string;
  status: string;
  domain: string;
  cardNumber: string;
}

function AdminUserProfile() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useGetOneUserQuery(id);
  const [updateUserByAdmin, { isLoading: updateLoad }] =
    useUpdateUserByAdminMutation();
  const logoRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<UserType>({
    username: "",
    firstName: "",
    midName: "",
    lastName: "",
    email: "",
    secondEmail: "",
    phone: "",
    profile: null,
    address: "",
    landerName: "",
    nickName: "",
    package: "",
    frequency: "",
    status: "",
    domain: "",
    cardNumber: "",
  });

  useEffect(() => {
    if (data) {
      setUser(data?.user);
    }
  }, [data]);

  const {
    username,
    firstName,
    midName,
    lastName,
    email,
    secondEmail,
    phone,
    profile,
    address,
    landerName,
    nickName,
    frequency,
    status,
    domain,
    cardNumber,
  } = user || {};

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
    const formData = new FormData();
    formData.append("username", username ? username : "");
    formData.append("firstName", firstName ? firstName : "");
    formData.append("midName", midName ? midName : "");
    formData.append("lastName", lastName ? lastName : "");
    formData.append("email", email ? email : "");
    formData.append("secondEmail", secondEmail ? secondEmail : "");
    formData.append("phone", phone ? phone : "");
    formData.append("address", address ? address : "");
    formData.append("landerName", landerName ? landerName : "");
    formData.append("nickName", nickName ? nickName : "");
    formData.append("frequency", frequency ? frequency : "");
    formData.append("status", status ? status : "");
    formData.append("domain", domain ? domain : "");
    formData.append("cardNumber", cardNumber ? cardNumber : "");
    formData.append("package", user.package ? user.package : "");
    if (profile && profile instanceof File) {
      formData.append("profile", profile);
    }

    updateUserByAdmin({ formData, id: id })
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0] || null;
    setUser((prevState) => ({
      ...prevState,
      profile: file,
    }));
  };

  const domainData = domains.map((item) => ({ key: item, value: item }));

  return isLoading ? (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#cbf38b] border-solid"></div>
    </div>
  ) : (
    <div className="w-full">
      <h2 className="text-xl text-normal font-medium">
        User Profile Information
      </h2>
      <div className="mt-5">
        <div className="flex flex-wrap gap-5 items-center">
          <div className="w-20 h-20 min-h-20 min-w-20 rounded-full shadow-lg overflow-hidden p-1">
            <img
              src={
                profile
                  ? profile instanceof File
                    ? URL.createObjectURL(profile)
                    : profile
                  : Profile
              }
              alt="Profile"
              className="rounded-full w-full h-full object-cover"
            />
          </div>

          <button className="bg-[#cbf38b] px-6 py-3 rounded-lg text-md font-normal text-normal">
            <label
              htmlFor="image"
              className="flex gap-2 items-center cursor-pointer"
            >
              <i className="fa-solid fa-plus"></i>
              <p>Upload Image</p>
            </label>
            <input
              name="profile"
              ref={logoRef}
              accept="image/jpeg,image/jpg,image/png,image/svg+xml"
              onChange={handleFileChange}
              type="file"
              id="image"
              className="hidden"
            />
          </button>

          <button
            type="button"
            onClick={() =>
              setUser((prev) => ({
                ...prev,
                profile: null,
              }))
            }
            className="border border-gray-300 px-4 py-3 rounded-lg"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="mt-10 w-full">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
                placeholder="Update Username"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Domain
              </label>
              <SelectComponent
                value={domain}
                label="Select Domain"
                handleChange={(item: string) =>
                  setUser((prev) => ({ ...prev, domain: item }))
                }
                datas={domainData}
                color="#F3F3F3"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Package
              </label>
              <SelectComponent
                value={user?.package}
                label="Select Package"
                handleChange={(item: string) =>
                  setUser((prev) => ({ ...prev, package: item }))
                }
                datas={packageData}
                color="#F3F3F3"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Frequency
              </label>
              <SelectComponent
                value={frequency}
                label="Select Frequency"
                handleChange={(item: string) =>
                  setUser((prev) => ({ ...prev, frequency: item }))
                }
                datas={frequencyData}
                color="#F3F3F3"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Status
              </label>
              <SelectComponent
                value={status}
                label="Select Status"
                handleChange={(item: string) =>
                  setUser((prev) => ({ ...prev, status: item }))
                }
                datas={[
                  { key: "Pending", value: "PENDING" },
                  { key: "Activate", value: "ACTIVATE" },
                  { key: "Deactivate", value: "DEACTIVATE" },
                  { key: "Suspend", value: "SUSPEND" },
                ]}
                color="#F3F3F3"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Fristname
              </label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
                placeholder="Update firstname"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                MidName
              </label>
              <input
                type="text"
                name="midName"
                value={midName}
                onChange={handleChange}
                className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
                placeholder="Update Midname"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Lastname
              </label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
                placeholder="Update Lastname"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
                placeholder="Update Email"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Second Email
              </label>
              <input
                type="email"
                name="secondEmail"
                value={secondEmail}
                onChange={handleChange}
                className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
                placeholder="Update Second Email"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Lander Name
              </label>
              <input
                type="text"
                name="landerName"
                value={landerName}
                onChange={handleChange}
                className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
                placeholder="Update Lander Name"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Nick Name
              </label>
              <input
                type="text"
                name="nickName"
                value={nickName}
                onChange={handleChange}
                className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
                placeholder="Update Nick Name"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Phone
              </label>
              <input
                type="number"
                name="phone"
                value={phone}
                onChange={handleChange}
                className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
                placeholder="Update Phone"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={cardNumber}
                onChange={handleChange}
                className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
                placeholder="Update card number"
              />
            </div>
            <div className="flex flex-col gap-1 w-full md:col-span-2">
              <label htmlFor="" className="text-md font-normal text-[#737373]">
                Address
              </label>
              <textarea
                name="address"
                value={address}
                onChange={handleChange}
                rows={4}
                className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
                placeholder="Update Address"
              ></textarea>
            </div>
          </div>
          <div className="w-full flex justify-end mt-5">
            <button
              className="bg-[#cbf38b] px-6 py-3 rounded-lg text-md font-normal text-black"
              type="submit"
            >
              {updateLoad ? (
                <i className="fa-solid fa-circle-notch animate-spin"></i>
              ) : (
                "Save Setting"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminUserProfile;
