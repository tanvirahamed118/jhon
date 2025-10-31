import type { SetStateAction } from "react";
import domainData from "../../utils/domainData";
import SelectComponent from "../ui/Select.component";

interface UserType {
  frequency: string;
  domain: string;
  packageType: string;
  planKey: string;
  planPrice: number;
  planOldPrice: number;
  email: string;
  password: string;
  landerName: string;
  midName: string;
  address: string;
  nickName: string;
  phone: string;
  secondEmail: string;
  aggreement: boolean;
  extraRed: string;
  extraBlack: string;
  extraGreen: string;
  extraYellow: string;
  extraBlue: string;
  extraWhite: string;
  extraOrange: string;
  cardNumber: string;
  discount: boolean;
  referalCode: string;
}

interface Types {
  notes: string;
  setUser: React.Dispatch<SetStateAction<UserType>>;
  user: {
    domain: string;
    packageType: string;
    frequency: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

type Frequency = {
  key: string;
  planKey: string;
  price: number;
  oldPrice: number;
};

type Package = {
  frequencies: Frequency[];
};

type Packages = {
  bronze: Package;
  silver: Package;
  gold: Package;
};

function StepOne({ notes, handleChange, user, setUser }: Types) {
  const { domain, packageType, frequency } = user || [];
  const availablePackages =
    domain && domainData[domain as keyof typeof domainData]
      ? Object.keys(domainData[domain as keyof typeof domainData].packages)
      : [];

  const availableFrequencies: Frequency[] =
    domain && packageType
      ? domainData[domain as keyof typeof domainData]?.packages?.[
          packageType as keyof Packages
        ]?.frequencies || []
      : [];

  const domainOptions = Object.keys(domainData).map((key) => ({
    key: key, // text shown in dropdown
    value: key, // value passed to handleChange
  }));
  const packageOptions = availablePackages.map((key) => ({
    key: key, // text shown in dropdown
    value: key, // value passed to handleChange
  }));

  const handleDomainSelect = (value: string) => {
    setUser((prev) => ({
      ...prev,
      domain: value,
      packageType: "",
    }));
  };
  const handlePackageSelect = (value: string) => {
    setUser((prev) => ({
      ...prev,
      packageType: value,
    }));
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 w-full">
        <label className="text-md font-medium text-black">
          Choose Your Domain <span className="text-[#cf3832]">*</span>
        </label>
        <SelectComponent
          value={user.domain}
          label="Select domain"
          handleChange={handleDomainSelect}
          datas={domainOptions}
          color="#F3F3F3"
        />
      </div>

      {domain && (
        <div className="flex flex-col gap-2 w-full">
          <label className="text-md font-medium text-black">
            Choose Your Package <span className="text-[#cf3832]">*</span>
          </label>
          <SelectComponent
            value={user.packageType}
            label="Select package"
            handleChange={handlePackageSelect}
            datas={packageOptions}
            color="#F3F3F3"
          />

          {user?.packageType !== "gold" && (
            <p className="text-sm font-normal text-gray-400 capitalize">
              upgrade to gold for the best value
            </p>
          )}
        </div>
      )}
      {packageType && availableFrequencies && (
        <div className="flex flex-col gap-2 w-full">
          <label className="text-md font-medium text-black">
            Billing Frequency <span className="text-[#cf3832]">*</span>
          </label>
          {availableFrequencies.map((freq) => (
            <span key={freq.key} className="flex gap-1 items-center">
              <input
                value={freq.key}
                onChange={handleChange}
                type="radio"
                id={freq.key}
                name="frequency"
                required
                data-plan-key={freq.planKey}
                data-plan-price={freq.price}
                data-plan-old-price={freq.oldPrice}
                checked={frequency === freq.key}
              />
              <label htmlFor={freq.key}>
                {freq.key} - ${freq.price}
              </label>
            </span>
          ))}
          <p className="text-gray-400 italic text-sm font-normal">{notes}</p>
        </div>
      )}
    </div>
  );
}

export default StepOne;
