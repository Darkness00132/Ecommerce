import { useState } from "react";
import { FaSearch, FaFilter, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axiosInstance/axiosInstance";

const AdminOrders = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const { data: orders, isLoading } = useQuery({
    queryKey: ["order", "admin"],
    queryFn: async () => {
      const response = await axiosInstance.get("/orders/all ");
      return response.data.orders;
    },
  });
  console.log(orders);

  if (isLoading) return <p>Loading...</p>;

  const filteredOrders = orders.filter((order) =>
    order.user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-base-content">
        Order Management
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pr-10"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>
        <button
          onClick={() => setFilterOpen(true)}
          className="btn btn-outline w-full sm:w-auto"
        >
          <FaFilter className="mr-2" />
          Filters
        </button>
      </div>

      {/* Filter Modal */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[300px]">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            <p className="text-sm text-gray-500">Add filters here.</p>
            <button
              onClick={() => setFilterOpen(false)}
              className="btn btn-sm mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-x-auto border border-base-300 rounded-xl shadow">
        <table className="table table-fixed w-full text-sm">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th className="w-1/4">Customer</th>
              <th className="w-1/4">Email</th>
              <th className="w-1/6">Total</th>
              <th className="w-1/6">Status</th>
              <th className="w-1/6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length ? (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-base-100/50"
                  onClick={() => navigate(`${order._id}`)}
                >
                  <td className="truncate">{order.user.name}</td>
                  <td className="truncate">{order.user.email}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>{order.status}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-primary btn-outline">
                      <FaEdit className="mr-1" /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
