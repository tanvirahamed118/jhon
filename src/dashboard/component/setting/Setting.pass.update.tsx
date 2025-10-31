import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { useUpdatePasswordMutation } from "../../../redux/features/auth/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import PasswordComponent from "../../../component/ui/Password.component";

function SettingPassUpdate({ id }: { id: string | null }) {
  const [password, setPassword] = useState<string>("");
  const [conPassword, setConPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== conPassword) {
      toast.error("Password not match");
    } else if (password?.length <= 8) {
      toast.error("Password lenth more then 8 character");
    }
    const user = { password, oldPassword };
    updatePassword({ user, id })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setPassword("");
        setConPassword("");
        setOldPassword("");
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <div className="flex flex-col gap-2 w-full">
          <label>Old Password</label>
          <PasswordComponent
            placeholder="Enter password"
            value={oldPassword}
            handleChange={(e) => setOldPassword(e.target.value)}
            name="password"
            autoComplete="password"
            required={true}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>New Password</label>
          <PasswordComponent
            placeholder="Enter password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            name="password"
            autoComplete="password"
            required={true}
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:col-span-2">
          <label>Confirm Password</label>
          <PasswordComponent
            placeholder="Enter password"
            value={conPassword}
            handleChange={(e) => setConPassword(e.target.value)}
            name="password"
            autoComplete="password"
            required={true}
          />
        </div>
      </div>

      <button
        className="primary-btn max-w-fit flex gap-2 items-center"
        type="submit"
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
          "Save Setting"
        )}
      </button>
      <Toaster />
    </form>
  );
}

export default SettingPassUpdate;
