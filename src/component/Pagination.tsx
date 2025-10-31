interface Type {
  page: number;
  totalItems: number;
  itemsPerPage: number;
  handlePageChange: (newPage: number) => void;
}

function Pagination({
  handlePageChange,
  page,
  totalItems,
  itemsPerPage,
}: Type) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex gap-2 flex-wrap mt-5">
      <button
        className="text-normal text-base border border-gray-200 bg-[#fff] px-3 py-1 rounded-md cursor-pointer"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      {[...Array(totalPages).keys()].map((index) => (
        <button
          key={index}
          className={`text-normal text-base border border-gray-200 w-10 h-10 rounded-md  cursor-pointer ${
            page === index + 1 ? "bg-[#96c94b] font-bold" : "bg-white"
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="text-normal text-base border border-gray-200 bg-white px-3 py-1 rounded-md cursor-pointer"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages || page * itemsPerPage >= totalItems}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
