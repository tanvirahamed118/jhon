import InputComponent from "../ui/Input.component";

interface UsetTypes {
  user: {
    midName: string;
    address: string;
    nickName: string;
    phone: string;
    secondEmail: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

function StepThree({ user, handleChange }: UsetTypes) {
  const { address, midName, nickName, phone, secondEmail } = user || {};

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-md font-medium text-black">
          Middle Name <span className="text-[#cf3832]">*</span>
        </label>
        <InputComponent
          placeholder="Chose your midname"
          type="text"
          value={midName}
          handleChange={handleChange}
          name="midName"
          autoComplete="midName"
          required={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-md font-medium text-black">
          Address <span className="text-[#cf3832]">*</span>
        </label>
        <InputComponent
          placeholder="Enter your address"
          type="text"
          value={address}
          handleChange={handleChange}
          name="address"
          autoComplete="address"
          required={true}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-md font-medium text-black">
          Phone <span className="text-[#cf3832]">*</span>
        </label>
        <InputComponent
          placeholder="Enter your address"
          type="number"
          value={phone}
          handleChange={handleChange}
          name="phone"
          autoComplete="phone"
          required={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-md font-medium text-black">
          Nickname (optional)
        </label>
        <InputComponent
          placeholder="Chose your nickname"
          type="text"
          value={nickName}
          handleChange={handleChange}
          name="nickName"
          autoComplete="nickName"
          required={false}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-md font-medium text-black">
          Second Email (Optional)
        </label>
        <InputComponent
          placeholder="Enter second email"
          type="email"
          value={secondEmail}
          handleChange={handleChange}
          name="secondEmail"
          autoComplete="secondEmail"
          required={false}
        />
      </div>
    </div>
  );
}

export default StepThree;
