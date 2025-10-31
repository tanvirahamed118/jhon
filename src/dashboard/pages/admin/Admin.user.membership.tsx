import { useEffect, useState } from "react";
import {
  useGetOneUserQuery,
  useUpdateMembershipMutation,
} from "../../../redux/features/auth/authApi";
import { useParams } from "react-router";
import { planData } from "../../../utils/domains";
import SelectComponent from "../../../component/ui/Select.component";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function AdminUserMembership() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useGetOneUserQuery(id);
  const [updateMembership, { isLoading: updateLoad }] =
    useUpdateMembershipMutation();
  const [membership, setMembership] = useState({
    plan: "",
    price: "",
    duration: "",
    activate_at: "",
    oldPrice: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMembership({
      ...membership,
      [name]: value,
    });
  };
  const { plan, price, duration, activate_at, oldPrice, status } =
    membership || {};

  useEffect(() => {
    if (data) {
      setMembership(data?.user?.membership);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMembership({ membership, id })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
      });
  };

  return isLoading ? (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#cbf38b] border-solid"></div>
    </div>
  ) : (
    <div className="mt-5">
      <div className="my-5">
        <p className="text-gray-700 text-medium text-xl pb-5">
          Update User Membership
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-md font-normal text-[#737373]">
              Plan
            </label>
            <SelectComponent
              value={plan}
              label="Select Plan"
              handleChange={(item: string) =>
                setMembership((prev) => ({ ...prev, plan: item }))
              }
              datas={planData}
              color="#F3F3F3"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-md font-normal text-[#737373]">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={price}
              onChange={handleChange}
              className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
              placeholder="Update firstname"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-md font-normal text-[#737373]">
              Duration
            </label>
            <SelectComponent
              value={duration}
              label="Select Package"
              handleChange={(item: string) =>
                setMembership((prev) => ({ ...prev, duration: item }))
              }
              datas={[
                { key: "Monthly", value: "monthly" },
                { key: "Yearly", value: "yearly" },
              ]}
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
                setMembership((prev) => ({ ...prev, status: item }))
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
              Expired In
            </label>
            <input
              type="datetime-local"
              name="activate_at"
              value={
                activate_at
                  ? activate_at.replace(" ", "T").slice(0, 16) // e.g. 2026-10-27T18:00
                  : ""
              }
              onChange={handleChange}
              className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-md font-normal text-[#737373]">
              Old Price
            </label>
            <input
              type="text"
              name="oldPrice"
              value={oldPrice}
              onChange={handleChange}
              className="bg-[#f5f5f5] text-[#262626] border border-gray-300 text-base px-4 py-3 rounded-xl w-full focus:outline-[#96c94b]"
              placeholder="Update firstname"
            />
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
  );
}

export default AdminUserMembership;
