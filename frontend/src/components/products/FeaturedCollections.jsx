import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FeaturedCollections = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="py-16 px-4 mx-4 md:mx-10 lg:px-0">
      <div
        className={`container mx-auto flex flex-col-reverse items-center rounded-3xl bg-cyan-100 transition-colors duration-300 ${
          isRTL ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Text Section */}
        <div
          className={`lg:w-1/2 p-8 ${
            isRTL ? "text-right lg:text-right" : "text-left lg:text-left"
          }`}
        >
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            {t("featuredCollection.subtitle")}
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-black space-y-2 leading-tight">
            {t("featuredCollection.title")}
          </h2>
          <p className="text-lg text-gray-500 mb-6 leading-tight">
            {t("featuredCollection.description")}
          </p>
          <Link to="/collections" className="btn btn-info">
            {t("featuredCollection.button")}
          </Link>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2">
          <div className="w-full overflow-hidden aspect-[4/3] sm:aspect-[5/4] lg:h-[500px]">
            <img
              src="https://res.cloudinary.com/dgzqfkqua/image/upload/f_auto,q_auto,w_1000,dpr_auto/v1754111616/featured_mqm1l7.jpg"
              alt={t("featuredCollection.imageAlt")}
              className={`w-full h-full object-cover sm:rounded-t-lg ${
                isRTL
                  ? "lg:rounded-l-3xl lg:rounded-bl-3xl"
                  : "lg:rounded-r-3xl lg:rounded-br-3xl"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
