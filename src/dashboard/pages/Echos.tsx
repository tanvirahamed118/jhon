import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Pagination from "../../component/Pagination";
import { useAuth } from "../../hook/useAuth";

import { useDispatch, useSelector } from "react-redux";
import {
  searchByOnboard,
  verifyOnboard,
} from "../../redux/features/onboard/onboardSlice";
import type store from "../../redux/app/store";
import SelectComponent from "../../component/ui/Select.component";
import SearchComponent from "../../component/ui/Search.component";
import { RiDeleteBin5Line } from "react-icons/ri";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import {
  useDeleteEchoMutation,
  useGetAllEchoQuery,
} from "../../redux/features/echo/echoApi";
import EchoAgreement from "../component/echo/Echo.agreement";
import ConnectStripe from "../component/echo/Connect.stripe";
import ViewEcho from "../component/echo/View.echo";
import UpdateEchoStatus from "../component/echo/Update.echo.status";
import EchoLoader from "../loader/Echo.loader";

interface UserType {
  package?: string;
  id: string;
  userTemplete: { enableEcho: boolean }[];
  membership: { status: string }[];
}

type RootState = ReturnType<typeof store.getState>;

function Echos() {
  const { user } = useAuth() as { user: UserType | null };
  const templete = user?.userTemplete?.[0];
  const { enableEcho } = templete || {};
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [isShow, setIsShow] = useState(false);
  const [viewEcho, setViewEcho] = useState(false);
  const [updateEcho, setUpdateEcho] = useState(false);
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.onboard);
  const { searchBy, statusBy } = state || {};
  const limit = 14;
  const [deleteEcho, { isLoading: delLoad }] = useDeleteEchoMutation();
  const { data, isLoading, isFetching } = useGetAllEchoQuery({
    page: page,
    limit: limit,
    searchBy,
    statusBy,
    userId: user?.id,
  });
  const echos = data?.data?.echo;
  const totalItems = data?.data?.totalEcho;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleChange = (value: string) => {
    dispatch(verifyOnboard(value));
  };

  const handleDelete = (id: string) => {
    setSelected(id);
    deleteEcho(id)
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
    if (user?.package !== "gold") {
      navigate("/");
    }
  }, [user, navigate]);

  // decide what to render
  let content;
  if (isLoading || isFetching) {
    content = [...Array(8)].map((_, i) => <EchoLoader key={i} />);
  }
  if (!isLoading && !isFetching && echos?.length === 0) {
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
  if (!isLoading && !isFetching && echos?.length > 0) {
    content = echos?.map(
      (item: {
        id: string;
        name: string;
        email: string;
        message: string;
        tip: string;
        status: string;
        shoutOut: string;
        city: string;
      }) => {
        const { id, name, email, tip, status, shoutOut } = item || {};

        return (
          <tr key={id}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{shoutOut}</td>
            <td>${tip}</td>
            <td>
              <p
                className={`w-fit px-3 py-1 rounded-md text-center font-medium text-sm capitalize ${
                  status === "PENDING" ||
                  status === "REJECTED" ||
                  status === "CANCELED"
                    ? "bg-red-100 text-red-500"
                    : "bg-green-100 text-green-500"
                }`}
              >
                {status}
              </p>
            </td>
            <td>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelected(id);
                    setViewEcho(true);
                  }}
                  className="border border-gray-300 min-w-8 w-8 h-8 flex justify-center items-center rounded-md cursor-pointer"
                >
                  <i className="fa-regular fa-eye"></i>
                </button>
                <button
                  onClick={() => {
                    setSelected(id);
                    setUpdateEcho(true);
                    setStatus(status);
                  }}
                  className="border border-gray-300 min-w-8 w-8 h-8 flex justify-center items-center rounded-md cursor-pointer"
                >
                  <i className="fa-regular fa-pen-to-square"></i>
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
            <h2 className="text-normal text-2xl md:text-3xl">Echo</h2>
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
                <p className="text-normal text-sm md:text-base">Echo List</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="w-full 2xl:flex-row flex-col gap-5 flex justify-between items-center">
            <div className="flex md:w-auto w-full sm:flex-row flex-col justify-between items-start gap-3 md:items-center">
              <div className="w-full md:w-96">
                <SearchComponent
                  name="search"
                  color="white"
                  placeholder="Seach by name"
                  required={false}
                  autoComplete="text"
                  handleChange={(e) =>
                    dispatch(searchByOnboard(e.target.value))
                  }
                />
              </div>
              <div className="w-full md:w-52">
                <SelectComponent
                  value={statusBy}
                  color="white"
                  handleChange={handleChange}
                  datas={[
                    { key: "Pending", value: "PENDING" },
                    { key: "Confirmed", value: "CONFIRMED" },
                    { key: "Rejected", value: "REJECTED" },
                    { key: "Canceled", value: "CANCELED" },
                    { key: "Expired", value: "EXPIRED" },
                  ]}
                  label="Select Status"
                />
              </div>
            </div>
            <div className="flex w-full sm:w-auto sm:flex-row flex-col gap-5 items-center">
              {enableEcho ? (
                <button
                  onClick={() => setIsShow(true)}
                  className="bg-gray-300 w-full px-6 py-3 cursor-pointer rounded-lg flex gap-2 items-center justify-center"
                >
                  Disable Echo
                </button>
              ) : (
                <button
                  onClick={() => setIsShow(true)}
                  className="bg-[#cbf38b] w-full px-6 py-3 cursor-pointer rounded-lg flex gap-2 items-center justify-center"
                >
                  Enable Echo
                </button>
              )}
              {user && <ConnectStripe id={user?.id} />}
            </div>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="my-table table-auto w-full min-w-[1200px]">
              <thead>
                <tr className="border-y border-gray-300">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Shoutout</th>
                  <th>Tip</th>
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
        {isShow && enableEcho && (
          <EchoAgreement
            setShow={setIsShow}
            isShow={isShow}
            body="Are you sure you want to disable the echo feature? You will stop receiving all upcoming echo."
            status={false}
          />
        )}
        {isShow && !enableEcho && (
          <EchoAgreement
            setShow={setIsShow}
            isShow={isShow}
            body="Are you sure you want to enable the echo feature? You'll start receiving new echo requests from customers."
            status={true}
          />
        )}
        {viewEcho && selected ? (
          <ViewEcho isShow={viewEcho} setShow={setViewEcho} id={selected} />
        ) : null}
        {updateEcho && selected ? (
          <UpdateEchoStatus
            isShow={updateEcho}
            setShow={setUpdateEcho}
            id={selected}
            status={status}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default Echos;
