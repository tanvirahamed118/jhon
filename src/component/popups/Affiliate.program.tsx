interface TypesForm {
  affTab: boolean;
  setAffTab: React.Dispatch<React.SetStateAction<boolean>>;
}

function AffiliateProgram({ affTab, setAffTab }: TypesForm) {
  const salesData = [
    {
      id: "1",
      amount: "10-49",
      percent: "1%",
    },
    {
      id: "2",
      amount: "50-99",
      percent: "5%",
    },
    {
      id: "3",
      amount: "100-199",
      percent: "10%",
    },
    {
      id: "4",
      amount: "200+",
      percent: "20%",
    },
  ];

  return (
    <div className="inset-0 bg-[#00000053] flex fixed left-0 justify-center items-center w-full min-h-screen z-50 overflow-auto">
      <div
        className={`relative flex flex-col w-11/12 md:w-8/12 2xl:w-4/12 m-auto justify-center p-4 rounded-lg shadow-sm bg-[#ffffff] border border-gray-300 ${
          affTab ? "zoom-animation" : ""
        }`}
      >
        <div className="p-10 flex flex-col gap-3 items-center justify-center">
          <h2 className="text-2xl font-medium text-black">
            Affiliate Program Terms
          </h2>
          <p className="text-md font-normal text-gray-500 text-center">
            As an affiliate, you can get free services and cash back. Payments
            are made on the fourth month after each quarter.
          </p>
          <p className="text-sm font-normal text-gray-500 text-center bg-[#FCF2C9] px-4 py-2 border-l-3 border-[#E2A74E] rounded-md">
            Important: You will receive a 1099 based on tax laws. Affiliate
            program is only available on yearly subscriptions paid in full.
            Subscribers must pay for a full year in advance.
          </p>
          <div className="bg-[#F7F8F9] px-4 py-2 border-l-3 border-[#429C65] rounded-md">
            <div className="flex flex-col gap-5">
              <p className="text-xl font-medium text-black text-center">
                Free Services:
              </p>
              <p className="text-md font-normal text-gray-500 text-center">
                Free renewal after 20 referrals. your affliate code will only
                work for yearly subscriptions and does not include renewals
              </p>
              <h3 className="text-xl font-medium text-black text-center">
                Cash Back Structure:
              </h3>
            </div>
            <table className="table my-table mt-10">
              <thead>
                <tr>
                  <th>Referrals (Quarterly)</th>
                  <th>Cash Back Rate</th>
                </tr>
              </thead>
              <tbody>
                {salesData?.map((item) => (
                  <tr key={item?.id}>
                    <td>{item?.amount}</td>
                    <td>{item?.percent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-md font-normal text-gray-500 text-center">
            Note: You must maintain your subscription through a whole quarter to
            qualify for these benefits.
          </p>
        </div>

        <button
          onClick={() => setAffTab(false)}
          className="bg-red-400 w-10 h-10 flex justify-center items-center rounded-full text-white absolute top-3 right-3 cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default AffiliateProgram;
