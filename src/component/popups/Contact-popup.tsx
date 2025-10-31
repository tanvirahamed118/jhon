interface TypesForm {
  conTab: boolean;
  setConTab: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContactPopup({ conTab, setConTab }: TypesForm) {
  return (
    <div className="inset-0 bg-[#00000053] flex fixed left-0 justify-center items-center w-full min-h-screen z-50 overflow-auto">
      <div
        className={`relative flex flex-col w-11/12 md:w-8/12 2xl:w-4/12 m-auto justify-center p-4 rounded-lg shadow-sm bg-[#ffffff] border border-gray-300 ${
          conTab ? "zoom-animation" : ""
        }`}
      >
        <div className="p-10 flex flex-col gap-3 items-center justify-center">
          <h2 className="text-2xl font-medium text-black">
            Contact Form Details
          </h2>
          <p className="text-md font-normal text-black text-center">
            Your Gold plan’s contact form is fully database-driven, so every
            submission is:
          </p>
          <ul className="list-disc px-5">
            <li className="text-md font-normal text-black">
              <span className="font-bold">Sent instantly</span> to your
              registered email address.
            </li>
            <li className="text-md font-normal text-black">
              <span className="font-bold">Stored securely</span> in your
              dashboard for real-time access and export.
            </li>
            <li className="text-md font-normal text-black">
              <span className="font-bold">Filterable</span> by date, location,
              and custom tags you define.
            </li>
            <li className="text-md font-normal text-black">
              <span className="font-bold">Automated notifications</span> via SMS
              or push (optional add-ons).
            </li>
          </ul>

          <p className="text-md font-normal text-black text-center">
            Plus, you get full marketing connectivity:
          </p>
          <ul className="list-disc px-5">
            <li className="text-md font-normal text-black">
              Integrate form data with your CRM or email-marketing tool of
              choice.
            </li>
            <li className="text-md font-normal text-black">
              Trigger drip-campaigns or autoresponders based on user inputs.
            </li>
            <li className="text-md font-normal text-black">
              Access analytics on open rates, click-throughs, and conversion
              metrics.
            </li>
          </ul>
        </div>

        <button
          onClick={() => setConTab(false)}
          className="bg-red-400 w-10 h-10 flex justify-center items-center rounded-full text-white absolute top-3 right-3 cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default ContactPopup;
