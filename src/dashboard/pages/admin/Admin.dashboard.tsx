import { useGetAllUserByAdminQuery } from "../../../redux/features/auth/authApi";
import AdminDashHead from "../../component/dashboard/Admin.dash.head";
import AdminDashTabs from "../../component/dashboard/Admin.dash.tabs";
import DashChart from "../../component/dashboard/Dash.chart";
import DashMembers from "../../component/dashboard/Dash.members";
import DashTemplates from "../../component/dashboard/Dash.templates";
import DashHeaderLoader from "../../loader/Dash.header.loader";
import DashTabsLoader from "../../loader/Dash.tabs.loader";

interface DataTypes {
  data: {
    users: UserDataType[];
    templates: TemplateType[];
  };
  isLoading: boolean;
}

interface UserDataType {
  id: string | null;
  email: string | null;
  create_at: string | null;
  landerName: string | null;
  planPrice: number | null;
  profile: string | null;
  userTemplete: string[];
}

interface TemplateType {
  id: string | null;
  logo: string | null;
  create_at: string | null;
  tagLine: string | null;
  offerings: string | null;
}

function AdminDashboard() {
  const role = "USER";

  const { data, isLoading } = useGetAllUserByAdminQuery(role) as DataTypes;

  return (
    <div className="p-5">
      <div className="w-ful flex flex-col gap-5">
        {isLoading ? <DashHeaderLoader /> : <AdminDashHead />}
        {isLoading ? (
          <DashTabsLoader />
        ) : (
          <AdminDashTabs isLoading={isLoading} data={data} />
        )}
      </div>
      <div className="my-5">
        <DashChart data={data} />
      </div>
      <div className="flex lg:flex-row flex-col gap-5">
        <DashTemplates data={data} isLoading={isLoading} />
        <DashMembers data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default AdminDashboard;
