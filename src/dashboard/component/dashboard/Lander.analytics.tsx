import React from "react";

interface LanderAnalyticsProps {
  lander: string;
  siteId: string;
}

const LanderAnalytics: React.FC<LanderAnalyticsProps> = ({
  lander,
  siteId,
}) => {
  if (!lander || !siteId) return <p>No analytics available for this lander.</p>;

  const pageFilter = encodeURIComponent(`/${lander}`);
  const embedUrl = `https://plausible.io/share/${siteId}/pageviews?embed=true&filters=page%3D${pageFilter}`;

  return (
    <div>
      <iframe
        plausible-embed
        src={embedUrl}
        loading="lazy"
        style={{ width: "100%", height: "600px", colorScheme: "auto" }}
      ></iframe>
      <div style={{ fontSize: "14px", paddingBottom: "14px" }}>
        Stats powered by{" "}
        <a
          target="_blank"
          style={{ color: "#4F46E5", textDecoration: "underline" }}
          href="https://plausible.io"
          rel="noreferrer"
        >
          Plausible Analytics
        </a>
      </div>
      <script async src="https://plausible.io/js/embed.host.js"></script>
    </div>
  );
};

export default LanderAnalytics;
