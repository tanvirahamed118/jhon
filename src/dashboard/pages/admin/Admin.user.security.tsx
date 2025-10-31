import { useParams } from "react-router";
import { useDeleteUserMutation } from "../../../redux/features/auth/authApi";
import AdminUserpassUpdate from "./Admin.userpass.update";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function AdminUserSecurity() {
  const params = useParams();
  const id = params.id;
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleSubmit = () => {
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

  return (
    <section>
      <AdminUserpassUpdate />
      <div className="mt-10 border-t border-gray-300 py-10">
        <div className="flex flex-col gap-5 justify-start">
          <p className="text-gray-700 text-medium text-xl">
            Deactivate Your Account?
          </p>
          <p className="bg-amber-50 text-black p-3 rounded-lg text-md font-normal w-full md:w-8/12 border-l-4 border-amber-300">
            Delect account will also delete user membership and onboarding
            access. Please make sure you want to continue before proceeding.
          </p>
          <button
            onClick={handleSubmit}
            className="text-white bg-red-500 px-6 py-3 rounded-lg text-md font-normal w-fit cursor-pointer flex gap-2 items-center"
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
              "Delete Account"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default AdminUserSecurity;
