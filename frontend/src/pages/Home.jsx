import { useQuery } from "@tanstack/react-query";
import Hero from "../components/common/Hero";
import FeaturedCollections from "../components/products/FeaturedCollections";
import FeaturesSection from "../components/products/FeaturesSection";
import GenderCollection from "../components/products/GenderCollection";
import NewArrivals from "../components/products/NewArrivals";
import ProductDetails from "./ProductDetails";
import axiosInstance from "../axiosInstance/axiosInstance";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const { data: bestSellerProduct } = useQuery({
    queryKey: ["products", "best seller"],
    queryFn: async () => {
      const response = await axiosInstance.get("/products/bestSeller");
      return response.data.bestSeller;
    },
  });
  return (
    <>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      {bestSellerProduct && (
        <>
          <h2 className="text-3xl text-center font-bold">{t("best seller")}</h2>
          <ProductDetails product={bestSellerProduct} />
        </>
      )}

      <FeaturedCollections />
      <FeaturesSection />
    </>
  );
};

export default Home;
