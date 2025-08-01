import { useQuery } from "@tanstack/react-query";
import Hero from "../components/layout/Hero";
import FeaturedCollections from "../components/products/FeaturedCollections";
import FeaturesSection from "../components/products/FeaturesSection";
import GenderCollection from "../components/products/GenderCollection";
import NewArrivals from "../components/products/NewArrivals";
import ProductDetails from "../components/products/ProductDetails";
import axiosInstance from "../axiosInstance/axiosInstance";

const Home = () => {
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
          <h2 className="text-3xl text-center font-bold">Best Seller</h2>
          <ProductDetails product={bestSellerProduct} />
        </>
      )}

      <FeaturedCollections />
      <FeaturesSection />
    </>
  );
};

export default Home;
