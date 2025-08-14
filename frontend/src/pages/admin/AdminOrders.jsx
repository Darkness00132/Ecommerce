import { useState } from "react";
import { FaSearch, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", search, statusFilter],
    queryFn: async () => {
      const response = await axiosInstance.get("/orders/all", {
        params: {
          search,
          status: statusFilter,
        },
      });
      return response.data.orders;
    },
    onError: () => {
      toast.error("Failed to load orders. Please try again.");
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-base-200 rounded w-1/3" />
          <div className="h-10 bg-base-200 rounded" />
          <div className="h-60 bg-base-200 rounded" />
        </div>
      </div>
    );
  }

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
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pr-10"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered w-full sm:w-40"
        >
          <option value="">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

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
            {orders?.length ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-base-100/50 cursor-pointer"
                  onClick={() => navigate(`${order._id}`)}
                >
                  <td className="truncate">{order.user.name}</td>
                  <td className="truncate">{order.user.email}</td>
                  <td>${order.totalPrice}</td>
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
