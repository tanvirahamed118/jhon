import React, { useState } from "react";
import { Link } from "react-router";
import Pagination from "../../../component/Pagination";
import SelectComponent from "../../../component/ui/Select.component";
import SearchComponent from "../../../component/ui/Search.component";
import { RiDeleteBin5Line } from "react-icons/ri";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import {
  useDeleteContactMutation,
  useGetAllContactQuery,
} from "../../../redux/features/contact/contactApi";
import ViewContact from "./Admin.view.contact";
import ContactLoader from "../../loader/Contact.loader";

function AdminContact() {
  const [page, setPage] = useState<number>(1);
  const [viewContact, setViewContact] = useState(false);
  const [selected, setSelected] = useState("");
  const [searchBy, setSearchBy] = useState<string>("");
  const [statusBy, setStatusBy] = useState<string>("");
  const limit = 14;
  const [deleteContact, { isLoading: delLoad }] = useDeleteContactMutation();
  const { data, isLoading, isFetching } = useGetAllContactQuery({
    page: page,
    limit: limit,
    searchBy,
    statusBy,
  });
  const contacts = data?.data?.contact;
  const totalItems = data?.data?.totalContact;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleChange = (value: string) => {
    setStatusBy(value);
  };

  const handleDelete = (id: string) => {
    setSelected(id);
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

  // decide what to render
  let content;
  if (isLoading || isFetching) {
    content = [...Array(8)].map((_, i) => <ContactLoader key={i} />);
  }
  if (!isLoading && !isFetching && contacts?.length === 0) {
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
  if (!isLoading && !isFetching && contacts?.length > 0) {
    content = contacts?.map(
      (item: {
        id: string;
        firstname: string;
        lastname: string;
        niche: string;
        email: string;
        message: string;
        phone: string;
        subject: string;
      }) => {
        const {
          id,
          firstname,
          lastname,
          email,
          niche,
          message,
          phone,
          subject,
        } = item || {};
        return (
          <tr key={id}>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{email}</td>
            <td>{niche}</td>
            <td>{message?.slice(0, 50)}</td>
            <td>{phone}</td>
            <td>{subject}</td>

            <td>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelected(id);
                    setViewContact(true);
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
            <h2 className="text-normal text-2xl md:text-3xl">Contact</h2>
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
                <p className="text-normal text-sm md:text-base">Contact List</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="w-full 2xl:flex-row flex-col gap-5 flex justify-between items-center">
            <div className="flex w-full md:flex-row flex-col justify-between items-start gap-3">
              <div className="w-full md:w-96">
                <SearchComponent
                  name="search"
                  color="white"
                  placeholder="Seach by firstname"
                  required={false}
                  autoComplete="text"
                  handleChange={(e) => setSearchBy(e.target.value)}
                />
              </div>
              <div className="w-full md:w-52">
                <SelectComponent
                  value={statusBy}
                  color="white"
                  handleChange={handleChange}
                  datas={[
                    { key: "Pending", value: "Pending" },
                    { key: "Seen", value: "seen" },
                  ]}
                  label="Select Status"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="my-table table-auto w-full min-w-[1200px]">
              <thead>
                <tr className="border-y border-gray-300">
                  <th className="min-w-44">First Name</th>
                  <th className="min-w-44">Last Name</th>
                  <th>Email</th>
                  <th>niche</th>
                  <th>message</th>
                  <th>phone</th>
                  <th>subject</th>
                  <th>Action</th>
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
        {viewContact && selected ? (
          <ViewContact
            isShow={viewContact}
            setShow={setViewContact}
            id={selected}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default AdminContact;
