interface UrlsTypes {
  [key: string]: string;
}

interface OnboardTypes {
  referalCode: string;
  bio: string;
  tagLine: string;
  offerings: string;
  services: string[];
  funnySaying: string;
  userId: string | null;
  vfrCreate: string | null;
  socialLinks: UrlsTypes;
  portrait?: File | null;
  logo?: File | null;
  banner?: File | null;
  background?: File | null;
  epkFile?: File | null;
  merchendiseUrl: string | null;
}

interface DataTypes {
  onboard: OnboardTypes;
}

function OnboardFour({ onboard }: DataTypes) {
  const {
    referalCode,
    bio,
    tagLine,
    offerings,
    funnySaying,
    socialLinks,
    portrait,
    logo,
    banner,
    background,
    epkFile,
    services,
    merchendiseUrl,
    vfrCreate,
  } = onboard || {};
  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <span>
          <p className="text-2xl font-medium text-black mt-5">
            Step 4: Your selected values
          </p>
          <p className="text-xl font-normal text-black mt-2">
            Please check carefully before submission
          </p>
        </span>
      </div>
      <div className="rounded-md shadow overflow-hidden my-5">
        <table className="table-auto border-collapse w-full oboardTable">
          <thead>
            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">Key</td>
              <td className="text-left p-3">Value</td>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">Your affiliate code</td>
              <td className="text-left p-3">{referalCode}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">Short Bio</td>
              <td className="text-left p-3">{bio}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">Tag Line / Mission</td>
              <td className="text-left p-3">{tagLine}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">Offerings</td>
              <td className="text-left p-3">
                {offerings ? offerings : "not-available"}
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">
                Business / Areas Services
              </td>
              <td className="text-left p-3">
                <ul>
                  {services?.length > 0
                    ? services?.map((item, index) => (
                        <p className="" key={index}>
                          {item}
                        </p>
                      ))
                    : "not-available"}
                </ul>
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">Funny Saying</td>
              <td className="text-left p-3">
                {funnySaying ? funnySaying : "not-available"}
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">Portrait Upload</td>
              <td className="text-left p-3">
                {portrait?.name ? portrait?.name : "not-available"}
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">Logo Upload</td>
              <td className="text-left p-3">
                {logo?.name ? logo?.name : "not-available"}
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">Merchandise URL</td>
              <td className="text-left p-3">
                {merchendiseUrl ? merchendiseUrl : "not-available"}
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">VFC File Create</td>
              <td className="text-left p-3">
                {vfrCreate ? vfrCreate : "not-available"}
              </td>
            </tr>

            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">Banner Image</td>
              <td className="text-left p-3">
                {banner?.name ? banner?.name : "not-available"}
              </td>
            </tr>

            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">Background Image</td>
              <td className="text-left p-3">
                {background?.name ? background?.name : "not-available"}
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="text-left p-3 font-medium">EPK.zip File Upload</td>
              <td className="text-left p-3">
                {epkFile?.name ? epkFile?.name : "not-available"}
              </td>
            </tr>
            {Object.entries(socialLinks).map(([key, value]) => (
              <tr key={key} className="border border-gray-300">
                <td className="text-left p-3 font-medium">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </td>
                <td className="text-left p-3">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OnboardFour;
