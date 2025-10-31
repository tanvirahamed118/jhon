import { useState } from "react";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import InputComponent from "../../component/ui/Input.component";
import PasswordComponent from "../../component/ui/Password.component";

interface TypesOf {
  email: string;
  password: string;
}

function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const [user, setUser] = useState<TypesOf>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { email, password } = user || {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(user)
      .unwrap()
      .then((res) => {
        setUser({
          email: "",
          password: "",
        });
        toast.success(res.message);
        navigate(res.url);
      })
      .catch((error) => {
        const err = error as FetchBaseQueryError;
        const errorMessage = (err.data as { message: string }).message;
        toast.error(errorMessage);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section>
      <div className="flex lg:flex-row flex-col w-full h-full lg:h-screen min-h-screen">
        <div className="bg-[#F2FAFF] w-full lg:w-6/12 h-full flex flex-col gap-5 items-center justify-center p-10 lg:p-20">
          <Link to="/">
            <img src={Logo} alt="" className="w-32" />
          </Link>
          <h2 className="text-2xl font-bold text-black text-center">
            Your DJ Brand, Your Life, Your Way.
          </h2>
          <div className="flex flex-col gap-3">
            <span className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-[#cf3832]"></i>
              <p>Custom landing page templates for different industries</p>
            </span>
            <span className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-[#cf3832]"></i>
              <p>Realtime chat, Live Requests</p>
            </span>
            <span className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-[#cf3832]"></i>
              <p>Social media integration tools</p>
            </span>
            <span className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-[#cf3832]"></i>
              <p>Analytics dashboard to track your brand's performance</p>
            </span>
            <span className="flex gap-2 items-center">
              <i className="fa-solid fa-check text-[#cf3832]"></i>
              <p>SEO optimization guides tailored to your niche</p>
            </span>
          </div>
        </div>
        <div className="w-full lg:w-6/12 h-full flex flex-col gap-5 items-start justify-center p-10 lg:p-20">
          <h2 className="text-3xl font-xl font-medium capitalize">
            Login your account
          </h2>
          <p className="bg-[#96c94b] w-24 h-2 rounded-full"></p>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="text-md font-normal text-black">
                Email
              </label>
              <InputComponent
                placeholder="Chose your name"
                type="email"
                value={email}
                handleChange={handleChange}
                name="email"
                autoComplete="email"
                required={true}
              />
            </div>
            <div className="flex flex-col gap-2 w-full mt-5">
              <label htmlFor="" className="text-md font-normal text-black">
                Password
              </label>
              <PasswordComponent
                placeholder="Enter password"
                value={password}
                handleChange={handleChange}
                name="password"
                autoComplete="password"
                required={true}
              />
            </div>
            <Link
              to="/auth/reset"
              className="underline text-sm font-normal text-gray-400 inline-block mt-3 "
            >
              Forget password
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="primary-btn mt-5 !px-20 flex gap-2 items-center"
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
                <>
                  <i className="fa-regular fa-paper-plane"></i>
                  <p>Login</p>
                </>
              )}
            </button>
            <p className="text-md font-normal text-black mt-5">
              Do not have a account?{" "}
              <Link to="/auth/register" className="hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
