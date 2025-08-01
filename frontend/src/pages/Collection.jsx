import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/products/FilterSideBar";
import SortOptions from "../components/products/SortOptions";
import ProductsGrid from "../components/products/ProductsGrid";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance/axiosInstance";
import { useLocation } from "react-router-dom";
import CollectionSkeleton from "../components/skeletons/CollectionSkeleton";
import { useEffect } from "react";

const Collection = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const location = useLocation();
  const {
    data: products,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["products", location.search],
    queryFn: async () => {
      const response = await axiosInstance.get("/products/" + location.search);
      return response.data.products;
    },
  });

  if (isFetching) return <CollectionSkeleton />;

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load products: {error.message}
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      {/* Controls drawer toggle in mobile */}
      <input id="filter-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content area */}
      <div className="drawer-content flex flex-col">
        {/* Mobile filter toggle button */}
        <div className="lg:hidden bg-base-100 py-3 px-4 flex justify-center shadow-sm border-b border-base-300">
          <label
            htmlFor="filter-drawer"
            className="btn btn-sm btn-primary gap-2"
          >
            <FaFilter />
            Filters
          </label>
        </div>

        {/* Right Section */}
        <div className="flex-grow p-4">
          <h2 className="text-2xl uppercase mb-4">All Collection</h2>
          {/** Sort Options */}
          <SortOptions />
          {/** Product Grid */}
          {products.length === 0 ? (
            <div className="text-center text-gray-500 text-lg mt-10">
              No products found.
            </div>
          ) : (
            <ProductsGrid products={products} />
          )}
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div className="drawer-side lg:bg-base-200 lg:p-4 lg:overflow-y-auto lg:shadow-lg lg:border-r lg:border-base-300 lg:min-w-[250px]">
        <label htmlFor="filter-drawer" className="drawer-overlay"></label>
        <FilterSideBar />
      </div>
    </div>
  );
};

export default Collection;
