import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaDollarSign,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

const AdminDashboard = () => {
  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/admin/dashboard");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-primary w-12 h-12"></span>
        <p className="ml-4 text-lg text-primary">Loading dashboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-red-500 text-xl font-semibold mb-2">
          Failed to load dashboard.
        </p>
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-base-content mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Revenue */}
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm p-5 flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-2">
            <FaDollarSign className="text-success text-3xl" />
            <div>
              <h2 className="text-sm font-medium">Revenue</h2>
              <p className="text-2xl font-bold">${stats.revenue}</p>
            </div>
          </div>
          <span className="self-end text-sm text-gray-400">Updated Today</span>
        </div>

        {/* Orders */}
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm p-5 flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-2">
            <FaClipboardList className="text-primary text-3xl" />
            <div>
              <h2 className="text-sm font-medium">Total Orders</h2>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
          </div>
          <Link
            to="/admin/orders"
            className="self-end text-sm font-medium text-primary hover:text-primary/80"
          >
            Manage Orders →
          </Link>
        </div>

        {/* Products */}
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm p-5 flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-2">
            <FaBoxOpen className="text-warning text-3xl" />
            <div>
              <h2 className="text-sm font-medium">Total Products</h2>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>
          <Link
            to="/admin/products"
            className="self-end text-sm font-medium text-primary hover:text-primary/80"
          >
            Manage Products →
          </Link>
        </div>
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm p-5 flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-2">
            <FaUsers className="text-info text-3xl" />
            <div>
              <h2 className="text-sm font-medium">Total Users</h2>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
          <Link
            to="/admin/users"
            className="self-end text-sm font-medium text-primary hover:text-primary/80"
          >
            View Users →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
