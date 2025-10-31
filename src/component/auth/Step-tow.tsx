import { type SetStateAction } from "react";
import InputComponent from "../ui/Input.component";
import PasswordComponent from "../ui/Password.component";

interface UsetTypes {
  user: {
    email: string;
    password: string;
    landerName: string;
  };
  conPassword: string;
  setConPassword: React.Dispatch<SetStateAction<string>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

function StepTow({
  user,
  setConPassword,
  conPassword,
  handleChange,
}: UsetTypes) {
  const { email, password, landerName } = user || {};

  const handlPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConPassword(e.target.value);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 w-full">
        <label className="text-md font-medium text-black">
          Email <span className="text-[#cf3832]">*</span>
        </label>
        <InputComponent
          placeholder="Enter email"
          type="email"
          value={email}
          handleChange={handleChange}
          name="email"
          autoComplete="email"
          required={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-md font-normal text-black">
          Password <span className="text-[#cf3832]">*</span>
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
      <div className="flex flex-col gap-2">
        <label className="text-md font-normal text-black">
          Confirm Password <span className="text-[#cf3832]">*</span>
        </label>
        <PasswordComponent
          placeholder="Confirm password"
          value={conPassword}
          handleChange={handlPasswordChange}
          name="password"
          autoComplete="password"
          required={true}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-md font-medium text-black">
          Lander Name <span className="text-[#cf3832]">*</span>
        </label>
        <span>
          <InputComponent
            placeholder="Chose your name"
            type="text"
            value={landerName}
            handleChange={handleChange}
            name="landerName"
            autoComplete="landerName"
            required={true}
          />
          <p className="text-sm font-normal text-gray-400 mt-1">
            Name will need to be verified in real time.
          </p>
        </span>
      </div>
    </div>
  );
}

export default StepTow;
