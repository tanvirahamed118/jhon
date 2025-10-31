import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../../hook/useAuth";

function ConnectGoogle() {
  const { user } = useAuth();

  const handleConnect = () => {
    window.location.href = `${
      import.meta.env.VITE_APP_API_URL
    }/api/event/google`;
  };

  return (
    <>
      <button
        onClick={handleConnect}
        disabled={user?.calendarId ? true : false}
        className={`cursor-pointer min-w-56 w-full px-6 py-3 rounded-lg flex gap-2 items-center justify-center ${
          user?.calendarId ? "bg-gray-300" : "bg-[#cbf38b]"
        }`}
      >
        <FaGoogle size={20} />
        <p>{user?.calendarId ? "Connected" : "Connect Calendar"}</p>
      </button>
    </>
  );
}

export default ConnectGoogle;
