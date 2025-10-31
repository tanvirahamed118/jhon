import Image from "../../assets/YBYLYP.png";

function BusinessInfo() {
  return (
    <section className="py-10 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <img src={Image} alt="" />
          </div>
          <div>
            <h2 className="text-black text-2xl font-medium">
              More Information About My Brand Life
            </h2>
            <p className="text-black text-md font-normal mt-3">
              New features and updates are on the way, designed to make building
              your brand even easier. Sign up today and start shaping your
              presence with My Brand Life.
            </p>
            <div className="flex flex-col gap-3 my-5">
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-[#96c94b]"></i>
                <p>
                  <strong>Social Hub: </strong>Your My Brand Life landing page
                  is live today, bringing all your links and connections into
                  one place.
                </p>
              </span>
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-[#96c94b]"></i>
                <p>
                  <strong>Live AI Help Desk (Coming Soon): </strong>Direct
                  access to our AI-powered support team to guide you through
                  your brand journey.
                </p>
              </span>
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-[#96c94b]"></i>
                <p>
                  <strong>Growth Apps (Early Q3 2025): </strong>Scale your brand
                  with our core suite: <strong>Echo (Requests)</strong>,{" "}
                  <strong>BrandBook (Calendar)</strong>, and{" "}
                  <strong>PulseTrack (Link Tracking).</strong>
                </p>
              </span>
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-[#96c94b]"></i>
                <p>
                  <strong>e. Deeper Analytics (Q4 2025): </strong>Unlock
                  advanced insights into performance, engagement, and growth.
                </p>
              </span>
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-[#96c94b]"></i>
                <p>
                  <strong>f. Done-for-You Posting (Early Q4 2025): </strong>
                  Partnering with <strong>BrandPulse Social</strong> to manage
                  your posting so you stay consistent without the stress. Brand
                  pulse logo link to bradpulsesocial.com.{" "}
                </p>
              </span>
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-[#96c94b]"></i>
                <p>
                  <strong>g. More value add Apps (2026): </strong>
                  No extra cost on some and available to silver and gold
                  subscribers - Like: PulseDrive, BrandBalance, BrandGuard,
                  BrandQueue, BrandWall, PulsePass, and more. Also digital sign
                  automation with BrandPulse.
                </p>
              </span>
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-[#96c94b]"></i>
                <p>
                  <strong>h. AI Agents (2026)</strong>
                  Always-on brand assistants that handle tasks, requests, and
                  interactions for you.
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BusinessInfo;
