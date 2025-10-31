import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import InvoiceLoader from "../../loader/User.loader";
import Pagination from "../../../component/Pagination";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "../../../redux/features/auth/authApi";
import UpdateUser from "../Update.user";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import SearchComponent from "../../../component/ui/Search.component";
import SelectComponent from "../../../component/ui/Select.component";

function AdminUsers() {
  const [page, setPage] = useState<number>(1);
  const [searchBy, setSearchBy] = useState<string>("");
  const [statusBy, setStatusBy] = useState<string>("");
  const [selectId, setSelectedId] = useState<string>("");
  const [showTab, setShowTab] = useState<boolean>(false);
  const [deleteUser, { isLoading: delLoading }] = useDeleteUserMutation();
  const limit = 14;
  const { data, isLoading, isFetching } = useGetAllUserQuery({
    page,
    limit,
    searchBy,
    statusBy,
  });

  const formattedDate = (value: string) => {
    const createDate = new Date(value);
    return createDate?.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const totalItems = data?.data?.totalUser;
  const users = data?.data?.user;

  const handlePageChange = () => {
    setPage(2);
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    deleteUser(id)
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

  useEffect(() => {
    if (showTab) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showTab]);

  // decide what to render
  let content;
  if (isLoading) {
    content = [...Array(8)].map((_, i) => <InvoiceLoader key={i} />);
  }
  if (isFetching) {
    content = [...Array(8)].map((_, i) => <InvoiceLoader key={i} />);
  }
  if (!isLoading && !isFetching && users?.length === 0) {
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
  if (!isLoading && !isFetching && users?.length > 0) {
    content = users?.map(
      (item: {
        id: string;
        midName: string;
        username: string;
        email: string;
        create_at: string;
        phone: string;
        status: string;
        profile: string;
        landerName: string;
        domain: string;
        package: string;
      }) => {
        const {
          id,
          midName,
          email,
          create_at,
          status,
          profile,
          landerName,
          domain,
          package: pkgType,
        } = item || {};

        return (
          <tr key={id}>
            <td>
              <div className="flex gap-2 items-center">
                {profile ? (
                  <img
                    src={profile}
                    alt=""
                    className="w-14 min-w-14 h-14 mn-h-14 rounded-full"
                  />
                ) : (
                  <p className="capitalize w-14 min-w-14 h-14 mn-h-14 bg-gray-100 text-black text-3xl font-medium rounded-full flex justify-center items-center">
                    {midName?.slice(0, 1)}
                  </p>
                )}
                <span>
                  <h2 className="text-lg text-medium jost">{midName}</h2>
                  <p className="text-sm text-gray-400">
                    Join: {formattedDate(create_at)}
                  </p>
                </span>
              </div>
            </td>
            <td>{landerName}</td>
            <td>{email?.slice(0, 18)}..</td>
            <td>{domain}</td>
            <td className="capitalize">{pkgType}</td>
            <td>
              <p
                className={`${
                  status === "ACTIVATE"
                    ? "bg-green-100 w-fit px-3 py-1 rounded-md text-center text-green-500 font-medium text-sm capitalize"
                    : "bg-red-100 w-fit px-3 py-1 rounded-md text-center text-red-500 font-medium text-sm capitalize"
                }`}
              >
                {status}
              </p>
            </td>
            <td>
              <div className="flex gap-3">
                <Link
                  to={`/admin/user/${id}`}
                  className="border border-gray-300 w-8 h-8 flex justify-center items-center rounded-md"
                >
                  <i className="fa-regular fa-eye"></i>
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
            <h2 className="text-normal text-2xl md:text-3xl">Users</h2>
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
                <p className="text-normal text-sm md:text-base">User List</p>
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
                  <th>Info</th>
                  <th>Lander Name</th>
                  <th>Email</th>
                  <th>Domain</th>
                  <th>Package</th>
                  <th>Verify</th>
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
      {showTab && (
        <UpdateUser id={selectId} setShowTab={setShowTab} showTab={showTab} />
      )}
    </React.Fragment>
  );
}

export default AdminUsers;
