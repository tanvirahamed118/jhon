import { Link } from "react-router";
import HeaderBoxLoader from "../loader/Header.box.loader";
import { useGetAllOnboardByAdminQuery } from "../../redux/features/onboard/onboardApi";
import { useEffect, type SetStateAction } from "react";

interface Types {
  isNotify: boolean;
  setExistonboard: React.Dispatch<SetStateAction<number>>;
}

function HeaderOnboards({ isNotify, setExistonboard }: Types) {
  const { data, isLoading } = useGetAllOnboardByAdminQuery({
    page: 1,
    limit: 10,
    searchBy: "",
    status: "",
  });
  const notifications = data?.data?.onboard;

  const formattedDate = (value: string) => {
    const createDate = new Date(value);
    return createDate?.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const total = notifications?.length ? notifications?.length : 0;
    setExistonboard(total);
  }, [notifications, setExistonboard]);

  // decide what to render
  let content;
  if (isLoading) {
    content = (
      <>
        <HeaderBoxLoader />
        <HeaderBoxLoader />
        <HeaderBoxLoader />
        <HeaderBoxLoader />
        <HeaderBoxLoader />
      </>
    );
  }
  if (notifications?.length === 0) {
    content = (
      <li>
        <p>Data not found!</p>
      </li>
    );
  }
  if (notifications?.length > 0) {
    content = notifications?.map(
      (item: { id: string; create_at: string; tagLine: string }) => {
        const { id, create_at, tagLine } = item || {};

        return (
          <li key={id} className="flex gap-2 items-center cursor-pointer">
            <div className="w-12 h-12">
              <p className="bg-[#2B7F75] w-12 h-12 flex justify-center items-center rounded-md">
                <i className="fa-regular fa-bell text-white text-2xl"></i>
              </p>
            </div>
            <Link to={`/create-business/${id}`}>
              <h2 className={`text-normal text-sm capitalize font-normal}`}>
                {tagLine}
              </h2>

              <p className="text-sm text-gray-400 font-normal">
                {formattedDate(create_at)}
              </p>
            </Link>
          </li>
        );
      }
    );
  }
  return (
    <div
      className={`absolute bg-white p-5 rounded-md shadow-sm border border-gray-100 md:w-80 w-[320px] top-10 right-[-50px] md:right-0 transition-all duration-200 ease-in-out transform origin-top-right ${
        isNotify
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-90 -translate-y-4 pointer-events-none"
      }`}
    >
      <h2 className="text-[#2B7F75] text-lg font-medium">Recent Onboards</h2>
      <ul className="flex flex-col gap-4 mt-5 overflow-y-auto max-h-[calc(60vh-150px)] pr-2 message-scrollbar">
        {content}
      </ul>
    </div>
  );
}

export default HeaderOnboards;
