import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-[#121216] pt-10">
      <div className="container flex md:flex-row flex-col gap-10 md:gap-0 justify-between pb-5">
        <div>
          <h2 className="text-xl font-medium text-white">Important Links</h2>
          <ul className="mt-5 flex flex-col gap-2">
            <li>
              <Link
                to="/pricing"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Tearms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-medium text-white">Saas Links</h2>
          <ul className="mt-5 flex flex-col gap-2">
            <li>
              <Link
                to="/pricing"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/auth/login"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Follow Us
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Share
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-medium text-white">Help Links</h2>
          <ul className="mt-5 flex flex-col gap-2">
            <li>
              <Link
                to="/contact"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Questions
              </Link>
            </li>
            <li>
              <Link
                to="/auth/register"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                MBL Chat
              </Link>
            </li>
            <li>
              <Link
                to="/auth/reset"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Forum
              </Link>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@MyBrandLife"
                target="_blank"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Videos
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-medium text-white">Follow Us</h2>
          <ul className="mt-5 flex flex-col gap-2">
            <li>
              <a
                href="https://www.facebook.com/MyBrandLife"
                target="_blank"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@MyBrandLife"
                target="_blank"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/mybrandlife/"
                target="_blank"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/mybrandlife.me/"
                target="_blank"
                className="text-gray-300 text-sm font-normal hover:underline"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container flex justify-between items-center py-5 border-t border-gray-800">
        <p className="text-gray-400 text-xs md:text-sm font-normal">
          ©{new Date().getFullYear()} MyBrandLife.me. All rights reserved.
        </p>
        <div className="flex gap-3 items-center">
          <a
            href="https://www.facebook.com/MyBrandLife"
            target="_blank"
            className="text-gray-300 text-sm font-normal hover:underline"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/mybrandlife.me/"
            target="_blank"
            className="text-gray-300 text-sm font-normal hover:underline"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/mybrandlife/"
            target="_blank"
            className="text-gray-300 text-sm font-normal hover:underline"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="https://www.youtube.com/@MyBrandLife"
            target="_blank"
            className="text-gray-300 text-sm font-normal hover:underline"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
