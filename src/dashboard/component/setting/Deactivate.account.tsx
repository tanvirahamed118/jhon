import { useState } from "react";
import DeactivateWarn from "./Deactivate.warn";

function DeactivateAccount() {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="mt-10 border-t border-gray-300 pt-10">
      <div className="flex flex-col gap-5 justify-start">
        <p className="text-gray-700 text-medium text-xl">
          Deactivate Your Account?
        </p>
        <p className="bg-amber-50 text-black p-3 rounded-lg text-md font-normal w-full sm:w-8/12 lg:w-6/12 border-l-4 border-amber-300">
          Deactivating your account will also deactivate your membership and
          onboarding access. Please make sure you want to continue before
          proceeding.
        </p>
        <button
          onClick={() => setIsShow(true)}
          className="text-white bg-red-500 px-6 py-3 rounded-lg text-md font-normal w-fit cursor-pointer"
        >
          Deactivate
        </button>
      </div>
      {isShow && <DeactivateWarn isShow={isShow} setShow={setIsShow} />}
    </div>
  );
}

export default DeactivateAccount;
