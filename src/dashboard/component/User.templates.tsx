import React, { useState } from "react";
import Style from "../../utils/custom.module.css";
import { Link } from "react-router";
import InvoiceLoader from "../loader/User.loader";
import Pagination from "../../component/Pagination";

function UserTemplates() {
  //   const auth = localStorage.getItem("auth");
  //   const user = auth ? JSON.parse(auth) : null;
  //   const id = user?.user?.id;
  const [page, setPage] = useState<number>(1);

  const isLoading = false;

  const data = [
    {
      id: "asdasd",
      name: "tanvir",
      sector: "asdasd",
      description: "sad",
      createdAt: "Fri Mar 25 2022 06:00:00 GMT+0600",
      user: { username: "tanvir" },
    },
    {
      id: "asdasd",
      name: "tanvir",
      sector: "asdasd",
      description: "sad",
      createdAt: "Fri Mar 25 2022 06:00:00 GMT+0600",
      user: { username: "tanvir" },
    },
    {
      id: "asdasd",
      name: "jony",
      sector: "asdasd",
      description: "sad",
      createdAt: "Fri Mar 25 2022 06:00:00 GMT+0600",
      user: { username: "tanvir" },
    },
    {
      id: "asdasd",
      name: "akash",
      sector: "asdasd",
      description: "sad",
      createdAt: "Fri Mar 25 2022 06:00:00 GMT+0600",
      user: { username: "tanvir" },
    },
    {
      id: "asdasd",
      name: "suraj",
      sector: "asdasd",
      description: "sad",
      createdAt: "Fri Mar 25 2022 06:00:00 GMT+0600",
      user: { username: "tanvir" },
    },
    {
      id: "asdasd",
      name: "suraj",
      sector: "asdasd",
      description: "sad",
      createdAt: "Fri Mar 25 2022 06:00:00 GMT+0600",
      user: { username: "tanvir" },
    },
    {
      id: "asdasd",
      name: "suraj",
      sector: "asdasd",
      description: "sad",
      createdAt: "Fri Mar 25 2022 06:00:00 GMT+0600",
      user: { username: "tanvir" },
    },
    {
      id: "asdasd",
      name: "suraj",
      sector: "asdasd",
      description: "sad",
      createdAt: "Fri Mar 25 2022 06:00:00 GMT+0600",
      user: { username: "tanvir" },
    },
  ];
  const [selectId, setSelectedId] = useState("");
  const delLoading = false;

  const formattedDate = (value: string) => {
    const createDate = new Date(value);
    return createDate?.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handlePageChange = () => {
    setPage(2);
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
  };

  // decide what to render
  let content;
  if (isLoading) {
    content = (
      <>
        <InvoiceLoader />
        <InvoiceLoader />
        <InvoiceLoader />
        <InvoiceLoader />
        <InvoiceLoader />
        <InvoiceLoader />
        <InvoiceLoader />
        <InvoiceLoader />
      </>
    );
  }
  if (!isLoading && data?.length === 0) {
    content = (
      <tr>
        <td>
          <p className="bg-amber-100 text-md font-normal p-3 rounded-md">
            Data not found!
          </p>
        </td>
      </tr>
    );
  }
  if (!isLoading && data?.length > 0) {
    content = data?.map(
      (item: {
        id: string;
        name: string;
        sector: string;
        description: string;
        createdAt: string;
        user: { username: string };
      }) => {
        const { id, name, sector, description, createdAt, user } = item || {};
        const { username } = user || {};
        return (
          <tr key={id}>
            <td className="w-80">
              <span>
                <h2 className="text-lg text-medium jost">{name}</h2>
                <p className="text-sm text-gray-400">
                  {formattedDate(createdAt)}
                </p>
              </span>
            </td>
            <td>#{id}</td>
            <td>{sector}</td>
            <td>{description?.slice(0, 100)}</td>
            <td className="w-52">
              <p className="bg-green-100 w-fit px-3 py-1 rounded-md text-center text-green-500 font-medium text-sm capitalize">
                {username}
              </p>
            </td>
            <td>
              <div className="flex gap-3">
                <Link
                  to={`/create-business/${id}`}
                  className="border border-gray-300 w-8 h-8 flex justify-center items-center rounded-md"
                >
                  <i className="fa-solid fa-download"></i>
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
      <div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="xl:overflow-x-auto overflow-x-scroll bg-white">
            <table className={`${Style.customTable} w-full min-w-[1200px]`}>
              <thead>
                <tr className="border-y border-gray-300">
                  <th>Template ID</th>
                  <th>Template Owner</th>
                  <th>Template Create At</th>
                  <th>Template Plan</th>
                  <th>Template Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{content}</tbody>
            </table>
          </div>
        </div>
        <Pagination
          handlePageChange={handlePageChange}
          page={page}
          totalItems={20}
          itemsPerPage={10}
        />
      </div>
    </React.Fragment>
  );
}

export default UserTemplates;
