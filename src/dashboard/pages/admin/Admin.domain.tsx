import React, { useState } from "react";
import { Link } from "react-router";
import Pagination from "../../../component/Pagination";
import SearchComponent from "../../../component/ui/Search.component";
import { RiDeleteBin5Line } from "react-icons/ri";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import {
  useDeleteDomainMutation,
  useGetAllDomainQuery,
} from "../../../redux/features/domain/domainApi";
import AdminViewDomain from "./Admin.view.domain";
import DomainLoader from "../../loader/Domain.loader";

function AdminDomain() {
  const [page, setPage] = useState<number>(1);
  const [viewDomain, setViewDomain] = useState(false);
  const [selected, setSelected] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const limit = 14;
  const [deleteDomain, { isLoading: delLoad }] = useDeleteDomainMutation();
  const { data, isLoading, isFetching } = useGetAllDomainQuery({
    page: page,
    limit: limit,
    searchBy: searchBy,
  });
  const domains = data?.data?.domain;
  const totalItems = data?.data?.totalDomain;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDelete = (id: string) => {
    setSelected(id);
    deleteDomain(id)
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
  if (isLoading || isFetching) {
    content = [...Array(8)].map((_, i) => <DomainLoader key={i} />);
  }
  if (!isLoading && !isFetching && domains?.length === 0) {
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
  if (!isLoading && !isFetching && domains?.length > 0) {
    content = domains?.map(
      (item: {
        id: string;
        domain: string;
        email: string;
        create_at: string;
      }) => {
        const { id, domain, email, create_at } = item || {};
        const formattedDate = (value: string) => {
          const createDate = new Date(value);
          return createDate?.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        };
        return (
          <tr key={id}>
            <td>{domain}</td>
            <td>{email}</td>
            <td>{formattedDate(create_at)}</td>

            <td>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelected(id);
                    setViewDomain(true);
                  }}
                  className="border border-gray-300 min-w-8 w-8 h-8 flex justify-center items-center rounded-md cursor-pointer"
                >
                  <i className="fa-regular fa-eye"></i>
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="border border-gray-300 min-w-8 w-8 h-8 flex justify-center items-center rounded-md cursor-pointer"
                >
                  {selected === id && delLoad ? (
                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                  ) : (
                    <RiDeleteBin5Line size={20} />
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
            <h2 className="text-normal text-2xl md:text-3xl">Domains</h2>
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
                <p className="text-normal text-sm md:text-base">Domain List</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="w-full 2xl:flex-row flex-col gap-5 flex justify-between items-center">
            <div className="w-full md:w-96">
              <SearchComponent
                name="search"
                color="white"
                placeholder="Seach by domain"
                required={false}
                autoComplete="text"
                handleChange={(e) => setSearchBy(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="my-table table-fixed w-full min-w-[1200px]">
              <thead>
                <tr className="border-y border-gray-300">
                  <th>Domain</th>
                  <th>Email</th>
                  <th>Create At</th>
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

        {viewDomain && selected && (
          <AdminViewDomain
            setShow={setViewDomain}
            isShow={viewDomain}
            id={selected}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default AdminDomain;
