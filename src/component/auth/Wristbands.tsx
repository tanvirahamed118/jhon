import toast from "react-hot-toast";

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
  showWrist: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  user: UserType;
}

type NumericKeys =
  | "extraRed"
  | "extraBlack"
  | "extraGreen"
  | "extraYellow"
  | "extraBlue"
  | "extraWhite"
  | "extraOrange";

const wristbandData = [
  {
    id: 1,
    name: "Black",
    key: "extraBlack",
    value: 39.99,
  },
  {
    id: 2,
    name: "Red",
    key: "extraRed",
    value: 49.99,
  },
  {
    id: 3,
    name: "Green",
    key: "extraGreen",
    value: 49.99,
  },
  {
    id: 4,
    name: "Yellow",
    key: "extraYellow",
    value: 49.99,
  },
  {
    id: 5,
    name: "Blue",
    key: "extraBlue",
    value: 49.99,
  },
  {
    id: 6,
    name: "White",
    key: "extraWhite",
    value: 49.99,
  },
  {
    id: 7,
    name: "Orange",
    key: "extraOrange",
    value: 49.99,
  },
];

function Wristbands({ showWrist, setUser, user }: Types) {
  const handleChose = (key: string, value: string, name: string) => {
    if (Number(value) < 0) return;
    if (key === "extraBlack" && Number(value) >= 6) {
      toast.error(`${name} max 5 available!`);
      return;
    }
    if (key !== "extraBlack" && Number(value) >= 3) {
      toast.error(`${name} max 2 available!`);
      return;
    }
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      className={`absolute w-full top-14 left-0 bg-white shadow-md p-5 rounded-md flex flex-col gap-5 transition-all duration-200 ease-in-out transform ${
        showWrist
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-90 -translate-y-4 pointer-events-none"
      }`}
    >
      {wristbandData?.map((item) => {
        const { id, name, value, key } = item || {};
        return (
          <div key={id} className="flex justify-between items-center">
            <label htmlFor="">
              {name} (${value})
            </label>
            <input
              type="number"
              placeholder="0"
              value={user[key as NumericKeys] || ""}
              onChange={(e) => handleChose(key, e.target.value, name)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-24 focus:outline-1 focus:outline-[#96c94b]"
            />
          </div>
        );
      })}
      <div>
        <p className="text-sm font-normal text-red-500">You Have Selected</p>
        <div className="flex gap-2 flex-wrap mt-1">
          {Number(user?.extraBlack) > 0 && (
            <p className="text-sm font-normal text-gray-500">
              <span className="font-medium">Black:</span> {user?.extraBlack}
            </p>
          )}
          {Number(user?.extraRed) > 0 && (
            <p className="text-sm font-normal text-gray-500">
              <span className="font-medium">Red:</span> {user?.extraRed}
            </p>
          )}
          {Number(user?.extraGreen) > 0 && (
            <p className="text-sm font-normal text-gray-500">
              <span className="font-medium">Green:</span> {user?.extraGreen}
            </p>
          )}
          {Number(user?.extraYellow) > 0 && (
            <p className="text-sm font-normal text-gray-500">
              <span className="font-medium">Yellow:</span> {user?.extraYellow}
            </p>
          )}
          {Number(user?.extraBlue) > 0 && (
            <p className="text-sm font-normal text-gray-500">
              <span className="font-medium">Blue:</span> {user?.extraBlue}
            </p>
          )}
          {Number(user?.extraWhite) > 0 && (
            <p className="text-sm font-normal text-gray-500">
              <span className="font-medium">White:</span> {user?.extraWhite}
            </p>
          )}
          {Number(user?.extraOrange) > 0 && (
            <p className="text-sm font-normal text-gray-500">
              <span className="font-medium">Orange:</span> {user?.extraOrange}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wristbands;
