import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import PrivateRoute from "./route/Private.route";
import HomePage from "./pages/Home.page";
import PublicRoute from "./route/Public.route";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import Pricing from "./pages/Pricing";
import Subscription from "./dashboard/pages/Subscription";
import SingleUser from "./dashboard/pages/Single.user";
import { Toaster } from "react-hot-toast";
import ContactPage from "./pages/Contact.page";
import VerifyOtp from "./pages/auth/Verify.otp";
import { useAuth } from "./hook/useAuth";
import Spiner from "./component/Spiner";
import CreateOnboard from "./dashboard/pages/Create-onboard";
import UpdateOnboard from "./dashboard/pages/Update.onboard";
import SIngleOnboard from "./dashboard/pages/Single.onboard";
import AdminLogin from "./pages/auth/Admin.login";
import ErrorPage from "./pages/Error.page";
import ContactList from "./dashboard/pages/Contact.list";
import ScrollToTop from "./component/Scroll.toTop";
import FollowUs from "./pages/Follow.us";
import useFavicon from "./hook/useFavicon";
import CreateSlot from "./dashboard/pages/Create.slot";
import GoogleConnectsuccess from "./dashboard/pages/Google.connectsuccess";
import Echos from "./dashboard/pages/Echos";
import StripeConnectsuccess from "./dashboard/pages/Stripe.connectSuccess";
import TipPaymentSuccess from "./dashboard/pages/Tip.paymenstsuccess";
import Brandbook from "./dashboard/pages/Brandbook";
import OnboardingList from "./dashboard/pages/Onboarding-list";
import AdminOnboardList from "./dashboard/pages/admin/Admin.onboardlist";
import Setting from "./dashboard/pages/Setting";
import Profile from "./dashboard/pages/Profile";
import AdminDashboard from "./dashboard/pages/admin/Admin.dashboard";
import AdminSetting from "./dashboard/pages/admin/Admin.setting";
import AdminProfile from "./dashboard/pages/admin/Admin.profile";
import UserDashboard from "./dashboard/pages/User.dashboard";
import UserRoute from "./route/User.route";
import AdminRoute from "./route/Admin.route";
import AdminUsers from "./dashboard/pages/admin/Admin.users";
import AdminUserProfile from "./dashboard/pages/admin/Admin.user.profile";
import AdminUserSecurity from "./dashboard/pages/admin/Admin.user.security";
import AdminUserMembership from "./dashboard/pages/admin/Admin.user.membership";
import AdminSIngleUser from "./dashboard/pages/admin/Admin.sIngle.user";
import AdminEcho from "./dashboard/pages/admin/Admin.enco";
import AdminBrandbook from "./dashboard/pages/admin/Admin.brandbook";
import AdminDomain from "./dashboard/pages/admin/Admin.domain";
import AdminContact from "./dashboard/pages/admin/Admin.contact";

function App() {
  const { isLoading } = useAuth();
  useFavicon();
  if (isLoading) {
    return <Spiner />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* public route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/follow-us" element={<FollowUs />} />
        <Route element={<PublicRoute />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/login/admin" element={<AdminLogin />} />
          <Route path="/auth/reset" element={<Reset />} />
          <Route path="/auth/verify" element={<VerifyOtp />} />
        </Route>

        {/* private route */}
        <Route element={<PrivateRoute />}>
          {/* user route */}
          <Route element={<UserRoute />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/build-your-lander" element={<CreateOnboard />} />
            <Route path="/onboard/:id" element={<UpdateOnboard />} />
            <Route path="/brandbook" element={<Brandbook />} />
            <Route path="/brandbook/slot" element={<CreateSlot />} />
            <Route path="/echo" element={<Echos />} />
            <Route path="/onboard/update/:id" element={<SIngleOnboard />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/onboard" element={<OnboardingList />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/users/:id" element={<SingleUser />} />
            <Route
              path="/google/connect/success"
              element={<GoogleConnectsuccess />}
            />
            <Route
              path="/stripe/connect/success"
              element={<StripeConnectsuccess />}
            />
            <Route
              path="/stripe/tip/payment/success"
              element={<TipPaymentSuccess />}
            />
          </Route>

          {/* admin routes*/}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/user" element={<AdminUsers />} />
            <Route path="/admin/onboard" element={<AdminOnboardList />} />
            <Route
              path="/admin/onboard/update/:id"
              element={<SIngleOnboard />}
            />
            <Route path="/admin/setting" element={<AdminSetting />} />
            <Route path="/admin/echo" element={<AdminEcho />} />
            <Route path="/admin/brandbook" element={<AdminBrandbook />} />
            <Route path="/admin/domain_request" element={<AdminDomain />} />
            <Route path="/admin/contact" element={<AdminContact />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/user/:id" element={<AdminSIngleUser />}>
              <Route index element={<AdminUserProfile />} />
              <Route path="security" element={<AdminUserSecurity />} />
              <Route path="membership" element={<AdminUserMembership />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
