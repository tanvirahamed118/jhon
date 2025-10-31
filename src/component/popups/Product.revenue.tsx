interface TypesForm {
  showTab: boolean;
  setShowTab: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProductRevenue({ showTab, setShowTab }: TypesForm) {
  const salesData = [
    {
      id: "1",
      amount: "$0 to $999",
      percent: "50%",
    },
    {
      id: "2",
      amount: "$1,000 to $3,999",
      percent: "60%",
    },
    {
      id: "3",
      amount: "$4,000 to $9,999",
      percent: "75%",
    },
    {
      id: "4",
      amount: "$10,000 and above",
      percent: "90%",
    },
  ];

  return (
    <div className="inset-0 bg-[#00000053] flex fixed left-0 justify-center items-center w-full min-h-screen z-50 overflow-auto">
      <div
        className={`relative flex flex-col w-11/12 md:w-8/12 2xl:w-4/12 m-auto justify-center p-4 rounded-lg shadow-sm bg-[#ffffff] border border-gray-300 ${
          showTab ? "zoom-animation" : ""
        }`}
      >
        <div className="p-10 flex flex-col gap-3 items-center justify-center">
          <h2 className="text-2xl font-medium text-black">
            Product Revenue Sharing Terms
          </h2>
          <p className="text-md font-normal text-gray-500 text-center">
            This note explains the terms of profit sharing for products posted
            through our platform. Product sales net share based on total net
            sales will be paid in the fourth month of every quarter.
          </p>
          <p className="text-md font-normal text-gray-500 text-center">
            Important: You will receive a 1099 based on tax laws. Revenue
            sharing is subject to applicable taxes and regulations.
          </p>
          <table className="table my-table">
            <thead>
              <tr>
                <th>Quarterly Sales</th>
                <th>Your Share</th>
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
          <p className="text-md font-normal text-gray-500 text-center">
            All payments will be processed automatically to your registered
            payment method.
          </p>
        </div>

        <button
          onClick={() => setShowTab(false)}
          className="bg-red-400 w-10 h-10 flex justify-center items-center rounded-full text-white absolute top-3 right-3 cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default ProductRevenue;
