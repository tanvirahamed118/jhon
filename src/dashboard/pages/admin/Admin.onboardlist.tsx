import React, { useState } from "react";
import { Link } from "react-router";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import {
  useDeleteOnboardMutation,
  useGetAllOnboardByAdminQuery,
  useVerifyOnboardAdminMutation,
} from "../../../redux/features/onboard/onboardApi";
import Pagination from "../../../component/Pagination";
import SelectComponent from "../../../component/ui/Select.component";
import SearchComponent from "../../../component/ui/Search.component";
import AdminOnboardLoader from "./Admin.onboard.loader";

interface OnboardUser {
  domain: string;
  landerName: string;
  package: string;
  frequency: string;
  planPrice: string;
}

function AdminOnboardList() {
  const [page, setPage] = useState<number>(1);
  const [selectId, setSelectedId] = useState<string>("");
  const [searchBy, setSearchBy] = useState<string>("");
  const [statusBy, setStatusBy] = useState<string>("");

  const limit = 14;
  const [deleteOnboard, { isLoading: delLoading }] = useDeleteOnboardMutation();
  const [verifyOnboardAdmin, { isLoading: verifyLoading }] =
    useVerifyOnboardAdminMutation();

  const { data, isLoading, isFetching } = useGetAllOnboardByAdminQuery({
    page: page,
    limit: limit,
    searchBy,
    statusBy,
  });
  const onboardLists = data?.data?.onboard;
  const totalItems = data?.data?.totalOnboard;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    deleteOnboard(id)
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

  const handleVerify = (id: string) => {
    setSelectedId(id);

    verifyOnboardAdmin(id)
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

  // decide what to render
  let content;
  if (isLoading) {
    content = [...Array(8)].map((_, i) => <AdminOnboardLoader key={i} />);
  }

  if (isFetching) {
    content = [...Array(8)].map((_, i) => <AdminOnboardLoader key={i} />);
  }
  if (!isLoading && !isFetching && onboardLists?.length === 0) {
    content = (
      <tr>
        <td colSpan={7}>
          <p className="bg-amber-100 text-md font-normal p-3 rounded-md">
            Data not found!
          </p>
        </td>
      </tr>
    );
  }
  if (!isLoading && !isFetching && onboardLists?.length > 0) {
    content = onboardLists?.map(
      (item: {
        id: string;
        domain: string;
        plan: string;
        bio: string;
        create_at: string;
        userId: string;
        status: string;
        user: OnboardUser;
      }) => {
        const { id, status, user } = item || {};
        const { domain, landerName } = user;
        return (
          <tr key={id}>
            <td>{landerName}</td>
            <td>{user?.domain}</td>
            <td>{user?.package}</td>
            <td>{user?.planPrice}</td>
            <td>{user?.frequency}</td>
            <td>
              <p
                className={`w-fit px-3 py-1 rounded-md text-center font-medium text-sm capitalize ${
                  status === "ACTIVATE"
                    ? "bg-green-100 text-green-500"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {status}
              </p>
            </td>
            <td>
              <div className="flex gap-3">
                {status === "DEACTIVATE" && (
                  <button
                    onClick={() => handleVerify(id)}
                    className="border border-gray-300 w-fit px-3 h-8 flex justify-center items-center rounded-md cursor-pointer"
                  >
                    {verifyLoading && selectId === id ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 animate-spin"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                      </>
                    ) : (
                      <i className="fa-regular fa-circle-check"></i>
                    )}
                  </button>
                )}
                <Link
                  target="_blank"
                  to={`https://${domain}/${landerName}`}
                  className="border border-gray-300 w-8 h-8 flex justify-center items-center rounded-md"
                >
                  <i className="fa-regular fa-eye"></i>
                </Link>
                <Link
                  to={`/admin/onboard/update/${id}`}
                  className="border border-gray-300 w-8 h-8 flex justify-center items-center rounded-md"
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </Link>

                <button
                  onClick={() => handleDelete(id)}
                  className="border border-gray-300 w-8 h-8 flex justify-center items-center rounded-md cursor-pointer"
                >
                  {delLoading && selectId === id ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-3 h-3 animate-spin"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </>
                  ) : (
                    <i className="fa-regular fa-trash-can"></i>
                  )}
                </button>
              </div>
            </td>
          </tr>
        );
      }
    );
  }

  return (
    <React.Fragment>
      <div className="p-3 md:p-5 min-h-screen">
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center">
          <div className="md:w-6/12 w-full">
            <h2 className="text-normal text-2xl md:text-3xl">Onboard</h2>
            <ul className="flex gap-2 items-center py-2">
              <li>
                <Link
                  to="/dashboard"
                  className="text-normal text-sm md:text-base"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-angles-right text-xs"></i>
              </li>
              <li>
                <p className="text-normal text-sm md:text-base">Onboard List</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex md:w-auto w-full sm:flex-row flex-col justify-between items-start gap-3 md:items-center">
            <div className="w-full md:w-96">
              <SearchComponent
                name="search"
                color="white"
                placeholder="Seach by landername"
                required={false}
                autoComplete="text"
                handleChange={(e) => setSearchBy(e.target.value)}
              />
            </div>
            <div className="w-full md:w-52">
              <SelectComponent
                value={statusBy}
                color="white"
                handleChange={(item: string) => setStatusBy(item)}
                datas={[
                  { key: "Pending", value: "PENDING" },
                  { key: "Activate", value: "ACTIVATE" },
                  { key: "Deactivate", value: "DEACTIVATE" },
                  { key: "Suspend", value: "SUSPEND" },
                ]}
                label="Select Status"
              />
            </div>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="my-table table-fixed w-full min-w-[1200px]">
              <thead>
                <tr className="border-y border-gray-300">
                  <th>Lander Name</th>
                  <th>Selected Domain</th>
                  <th>Select Package</th>
                  <th>Package Price</th>
                  <th>Package Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{content}</tbody>
            </table>
          </div>
        </div>
        {totalItems > limit && (
          <Pagination
            handlePageChange={handlePageChange}
            page={page}
            totalItems={totalItems}
            itemsPerPage={limit}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default AdminOnboardList;
