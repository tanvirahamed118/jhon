import { Link } from "react-router";
import { useAuth } from "../../hook/useAuth";

function CallOfAction() {
  const { user } = useAuth();
  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center mt-5">
          <h2 className="text-black text-4xl font-bold text-center">
            Your Brand, Your Life, Your Way
          </h2>

          <p className="text-black text-md font-normal text-center my-5 w-10/12">
            At MyBrandLife, our mission is to empower individuals and businesses
            by providing tailored, industry-specific landing pages that enhance
            their online presence and engagement. We strive to simplify the
            digital experience, enabling our users to showcase their unique
            brands effectively and effortlessly.
          </p>
          <p className="text-black text-md font-normal text-center my-5 w-10/12">
            My Brand Life delivers tailored brand landers for every
            niche—empowering you to build a cohesive identity that connects with
            your audience. Whether you're a creative, coach, entrepreneur,
            entertainer, restaurant, or service provider, we make branding
            simple and impactful. With built-in tools like QR codes, NFC, and
            more, your brand connects seamlessly online and offline - unlocking
            endless ways to engage your world.
          </p>
          {!user && (
            <div className="flex gap-3 items-center mb-5">
              <Link
                to="/pricing"
                className="primary-btn flex gap-2 items-center text-md text-black"
              >
                <i className="fa-regular fa-gem"></i>
                <p>Register Your Brand</p>
              </Link>
            </div>
          )}
          {!user && (
            <p className="text-sm text-black font-normal">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-[#bb2d28] font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CallOfAction;
