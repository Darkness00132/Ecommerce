import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
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
        <table className="table table-fixed w-full text-sm">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th className="w-1/5">Name</th>
              <th className="w-1/5">Price</th>
              <th className="w-1/5">SKU</th>
              <th className="w-1/5">Count in Stock</th>
              <th className="w-1/5">Created At</th>
            </tr>
          </thead>
          <tbody>
            {products?.length ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-base-100/50 cursor-pointer"
                  onClick={() => navigate(`${product._id}`)}
                >
                  <td className="truncate">{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.sku}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    {format(new Date(product.createdAt), "yyyy-MM-dd hh:mm a")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
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
