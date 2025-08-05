import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { useTranslation } from "react-i18next";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const NewArrivals = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const {
    data: newArrivals,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", "new Arrivals"],
    queryFn: async () => {
      const response = await axiosInstance.get("/products/?limit=8");
      return response.data.products;
    },
    onError: (error) => {
      console.error("new arrivals error:", error);
    },
  });

  if (isLoading)
    return <p className="text-center my-10">{t("newArrivals.loading")}</p>;

  if (isError || !newArrivals || newArrivals.length === 0) return null;

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">{t("newArrivals.title")}</h2>
        <p className="text-gray-500">{t("newArrivals.subtitle")}</p>
      </div>

      <Swiper
        key={i18n.language}
        modules={[Autoplay]}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={2000}
        loop={true}
        grabCursor={true}
        spaceBetween={16}
        slidesPerGroup={1}
        style={{ direction: isRTL ? "rtl" : "ltr" }}
        breakpoints={{
          0: {
            slidesPerView: 1, // small screens
          },
          768: {
            slidesPerView: 3, // medium screens
          },
          1024: {
            slidesPerView: 4, // large screens
          },
        }}
      >
        {newArrivals.map((product) => (
          <SwiperSlide
            key={product._id}
            style={{ width: "280px", flexShrink: 0 }}
          >
            <Link to={`/product/${product._id}`}>
              <div className="relative rounded-xl overflow-hidden shadow-md group">
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-lg text-white p-4">
                  <h4 className="font-semibold text-lg">{product.name}</h4>
                  {product.discountPrice &&
                  product.discountPrice < product.price ? (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="line-through text-sm text-gray-400">
                        ${product.price}
                      </span>
                      <span className="text-lg font-bold">
                        ${product.discountPrice}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-1 text-white">${product.price}</p>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewArrivals;
