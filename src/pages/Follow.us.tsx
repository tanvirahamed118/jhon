import { Link } from "react-router";
import Logo from "../assets/logo.png";

function FollowUs() {
  return (
    <section>
      <div>
        <div className="bg-[#F2FAFF] py-5">
          <div className="flex justify-between items-center container m-auto">
            <Link to="/">
              <img
                src={Logo}
                alt=""
                className="w-32 md:w-40 active:scale-102 duration-300 transition-all"
              />
            </Link>
            <div>
              <h2 className="text-black text-3xl font-medium text-right">
                Service offerd
              </h2>
              <ul className="mt-1 flex flex-col items-end">
                <li className="text-md font-normal text-black">
                  Club Performances
                </li>
                <li className="text-md font-normal text-black">
                  Weddings & Private Events
                </li>
                <li className="text-md font-normal text-black">
                  Corporate Parties
                </li>
                <li className="text-md font-normal text-black">
                  Audio, Lighting, and
                </li>
                <li className="text-md font-normal text-black">
                  Visual Installations
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white w-full py-10">
          <div className="container">
            <div className="flex gap-5 items-center">
              <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                <i className="fa-solid fa-upload text-2xl"></i>
                <p>Submit your infor</p>
              </button>
              <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                <i className="fa-solid fa-download text-2xl"></i>
                <p>Download My Info</p>
              </button>
            </div>
            <div className="my-5 md:my-10">
              <h2 className="text-black text-3xl font-medium text-center">
                CONNECT WITH VAMP
              </h2>
              <p className="text-md font-normal text-black text-center">
                Vamp is a world-renowned music produce
              </p>
            </div>
            <div className="my-3 md:my-5">
              <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                <i className="fa-solid fa-link text-2xl"></i>
                <p>🎤Song Requests🎧</p>
              </button>
              <div className="grid grid-cols-2 gap-2 md:gap-5 mt-2 md:mt-5">
                <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                  <i className="fa-solid fa-basket-shopping text-2xl"></i>
                  <p>👕MERCH👚</p>
                </button>
                <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                  <i className="fa-solid fa-file-lines text-2xl"></i>
                  <p>EPK/MEDIA</p>
                </button>
                <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                  <i className="fa-brands fa-instagram text-2xl"></i>
                  <p>INSTAGRAM</p>
                </button>
                <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                  <i className="fa-brands fa-facebook text-2xl"></i>
                  <p>FACEBOOK</p>
                </button>
                <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                  <i className="fa-brands fa-twitch text-2xl"></i>
                  <p>TWITCH</p>
                </button>
                <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                  <i className="fa-brands fa-snapchat text-2xl"></i>
                  <p>SNAPCHAT</p>
                </button>
                <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                  <i className="fa-solid fa-phone text-2xl"></i>
                  <p>CALL</p>
                </button>
                <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                  <i className="fa-solid fa-envelope text-2xl"></i>
                  <p>Email</p>
                </button>
                <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                  <img src="../images/venmo.svg" alt="" className="w-10" />
                  <p>VENMO</p>
                </button>
                <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                  <i className="fa-brands fa-paypal text-2xl"></i>
                  <p>Paypal</p>
                </button>
                <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                  <i className="fa-solid fa-gift text-2xl"></i>
                  <p>WIDDINGS</p>
                </button>
                <button className="bg-linear-to-r from-[#96c94b] to-[#cf3832] flex justify-center gap-2 items-center w-full h-12 rounded-lg active:scale-102 duration-300 transition-all cursor-pointer">
                  <img
                    src="../images/slot-machine.png"
                    alt=""
                    className="w-5"
                  />
                  <p>Random fun?</p>
                </button>
              </div>
            </div>
            <div className="my-0 md:mt-0 mt-5 md:my-10">
              <h2 className="text-xl font-medium text-black text-center">
                About Vamp
              </h2>
              <p className="text-black text-md font-normal text-center w-full md:w-3/12 m-auto">
                Vamp is a world-renowned music producer and event DJ known for
                his high-energy performances and seamless mixes across multiple
                genres.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-black py-10">
          <div className="container">
            <p className="text-white text-md font-normal text-center">
              © 2025 Vamp | All Rights Reserved.
            </p>
            <ul className="flex gap-5 justify-center items-center mt-3">
              <li>
                <a href="" className="text-white text-sm font-normal underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="" className="text-white text-sm font-normal underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FollowUs;
