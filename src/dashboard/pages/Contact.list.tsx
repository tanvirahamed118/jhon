import React, { useEffect, useState } from "react";
import Style from "../../utils/custom.module.css";
import { Link } from "react-router";
import InvoiceLoader from "../loader/User.loader";
import Pagination from "../../component/Pagination";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  useDeleteContactMutation,
  useGetAllContactQuery,
} from "../../redux/features/contact/contactApi";
import EditContact from "../component/contact/Edit.contact";
import ViewContact from "../component/contact/View.contact";

function ContactList() {
  const [page, setPage] = useState<number>(1);
  const [searchBy, setSearchBy] = useState<string>("");
  const [selectId, setSelectedId] = useState<string>("");
  const [showTab, setShowTab] = useState<boolean>(false);
  const [showViewTab, setShowViewTab] = useState<boolean>(false);
  const [verify, setVerify] = useState<string>("");
  const [deleteContact, { isLoading: delLoading }] = useDeleteContactMutation();
  const limit = 14;
  const { data, isLoading, isFetching } = useGetAllContactQuery({
    page,
    limit,
    searchBy,
    verify,
  });

  const formattedDate = (value: string) => {
    const createDate = new Date(value);
    return createDate?.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const totalItems = data?.data?.contact;

  const handlePageChange = () => {
    setPage(2);
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    deleteContact(id)
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
  if (!isLoading && !isFetching && data?.data?.contact?.length === 0) {
    content = (
      <tr>
        <td colSpan={8}>
          <p className="bg-amber-100 text-md font-normal p-3 rounded-md">
            Data not found!
          </p>
        </td>
      </tr>
    );
  }
  if (!isLoading && !isFetching && data?.data?.contact?.length > 0) {
    content = data?.data?.contact?.map(
      (item: {
        id: string;
        name: string;
        email: string;
        create_at: string;
        phone: string;
        seen: boolean;
        subject: string;
        message: string;
      }) => {
        const { id, name, email, create_at, phone, seen, subject, message } =
          item || {};

        return (
          <tr key={id}>
            <td>
              <div className="flex gap-2 items-center">
                <p className="capitalize w-14 min-w-14 h-14 mn-h-14 bg-gray-100 text-black text-3xl font-medium rounded-full flex justify-center items-center">
                  {name?.slice(0, 1)}
                </p>
                <span>
                  <h2 className="text-lg text-medium jost">{name}</h2>
                  <p className="text-sm text-gray-400">
                    Join: {formattedDate(create_at)}
                  </p>
                </span>
              </div>
            </td>
            <td>{email}</td>
            <td>{subject}</td>
            <td>{phone}</td>
            <td>{message}</td>
            <td>
              <p
                className={`${
                  seen
                    ? "bg-green-100 w-fit px-3 py-1 rounded-md text-center text-green-500 font-medium text-sm capitalize"
                    : "bg-red-100 w-fit px-3 py-1 rounded-md text-center text-red-500 font-medium text-sm capitalize"
                }`}
              >
                {seen ? "Seen" : "Pending"}
              </p>
            </td>
            <td>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowViewTab(true);
                    setSelectedId(id);
                  }}
                  className="border border-gray-300 w-8 h-8 flex justify-center items-center rounded-md cursor-pointer"
                >
                  <i className="fa-regular fa-eye"></i>
                </button>
                <Link
                  to={``}
                  onClick={() => {
                    setShowTab(true);
                    setSelectedId(id);
                  }}
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
          <div className="flex md:flex-row flex-col justify-between items-start gap-3 md:items-center">
            <div className="bg-white border border-gray-300 px-4 py-2 rounded-lg w-full md:w-96 flex gap-2 items-center">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder={"Seach by full name"}
                onChange={(e) => setSearchBy(e.target.value)}
                className="text-normal text-base w-full outline-none"
              />
            </div>

            <select
              name=""
              onChange={(e) => setVerify(e.target.value)}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg w-full md:w-52"
            >
              <option value="">Select One...</option>
              <option value="seen">Seen</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="xl:overflow-x-auto overflow-x-scroll bg-white">
            <table className={`${Style.customTable} w-full min-w-[1200px]`}>
              <thead>
                <tr className="border-y border-gray-300">
                  <th>Info</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
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
      {showTab && (
        <EditContact id={selectId} setShowTab={setShowTab} showTab={showTab} />
      )}
      {showViewTab && (
        <ViewContact
          id={selectId}
          showViewTab={showViewTab}
          setShowViewTab={setShowViewTab}
        />
      )}
    </React.Fragment>
  );
}

export default ContactList;
