import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const MetaHelmet = ({ item }) => {
  const location = useLocation();
  return (
    <Helmet>
      <link
        rel="canonical"
        href={`${window.location.origin}${location.pathname}`}
      />
      <title>{item?.metaTitle || item.name}</title>
      <meta
        name="description"
        content={item?.metaDescription || item.description.slice(0, 150)}
      />
      <meta property="og:title" content={item?.metaTitle || item.name} />
      <meta
        property="og:description"
        content={item?.metaDescription || item.description.slice(0, 150)}
      />
      <meta property="og:image" content={item.images[0]?.url} />
      <meta property="og:type" content="product" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content="Lacoste E-commerce" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={item?.metaTitle || item.name} />
      <meta
        name="twitter:description"
        content={item?.metaDescription || item.description.slice(0, 150)}
      />
      <meta name="twitter:image" content={item.images[0]?.url} />
      <meta name="twitter:url" content={window.location.href} />
    </Helmet>
  );
};

export default MetaHelmet;
