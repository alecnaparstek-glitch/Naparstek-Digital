import { Helmet } from "react-helmet-async";

const SITE_NAME = "Naparstek Digital";
const OG_IMAGE =
  "https://static.prod-images.emergentagent.com/jobs/1593ccdb-bfea-4f5e-a3b6-be40b8d40236/images/f638cae7ef8d82c28ada8e086d51b9522ce69fdde37d31a0599c208d8082e771.jpeg";

export const Seo = ({ title, description, path = "" }) => {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${origin}${path}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
};
