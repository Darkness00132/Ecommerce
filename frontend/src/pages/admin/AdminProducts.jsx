import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axiosInstance/axiosInstance";

const AdminProducts = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data: products } = useQuery({
    queryKey: ["products", "admin", filter, search],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/products/?sortBy=${filter}&search=${search}`
      );
      return response.data.products;
    },
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-base-content">
        Product Management
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative w-full sm:w-1/2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              setSearch(formData.get("search"));
            }}
          >
            <input
              type="text"
              name="search"
              placeholder="Search products by SKU or name"
              className="input input-bordered w-full pr-10"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </form>
        </div>

        <select
          className="select select-bordered w-full sm:w-auto"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">default</option>
          <option value="stockASC">Stock: Low to High</option>
          <option value="stockDESC">Stock: High to Low</option>
          <option value="popularity">popularity</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-base-300 rounded-xl shadow">
        <table className="table w-full min-w-[700px] text-sm block overflow-x-auto whitespace-nowrap">
          <thead className="bg-base-200 text-base-content">
            <tr className="flex w-full">
              <th className="flex-1 px-4 py-2">Name</th>
              <th className="flex-1 px-4 py-2">Price</th>
              <th className="flex-1 px-4 py-2">SKU</th>
              <th className="flex-1 px-4 py-2">Stock</th>
              <th className="flex-1 px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {products?.length ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="flex w-full hover:bg-base-100/50 cursor-pointer"
                  onClick={() => navigate(`${product._id}`)}
                >
                  <td className="flex-1 truncate">{product.name}</td>
                  <td className="flex-1">${product.price}</td>
                  <td className="flex-1">{product.sku}</td>
                  <td className="flex-1">{product.countInStock}</td>
                  <td className="flex-1">
                    {format(new Date(product.createdAt), "yyyy-MM-dd hh:mm a")}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="flex w-full">
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 w-full"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
