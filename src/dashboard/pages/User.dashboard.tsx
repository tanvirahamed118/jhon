import { useAuth } from "../../hook/useAuth";
import DashHead from "../component/dashboard/Dash.head";
import DashTabs from "../component/dashboard/Dash.tabs";
import LanderAnalytics from "../component/dashboard/Lander.analytics";
import DashHeaderLoader from "../loader/Dash.header.loader";
import DashTabsLoader from "../loader/Dash.tabs.loader";

interface AuthType {
  user: ItemType | null;
  isLoading: boolean;
}

interface ItemType {
  midName: string;
  landerName: string;
}

function UserDashboard() {
  const { user, isLoading } = useAuth() as AuthType;

  const lander = user?.midName || "";
  return (
    <div>
      <div className="w-full p-5">
        {isLoading ? <DashHeaderLoader /> : <DashHead user={user} />}
        {isLoading ? <DashTabsLoader /> : <DashTabs />}
        <LanderAnalytics lander={lander || ""} siteId="mybrandlife.me" />
      </div>
    </div>
  );
}

export default UserDashboard;
