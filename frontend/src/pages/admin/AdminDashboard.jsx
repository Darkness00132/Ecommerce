const mockOrders = [
  {
    id: 1,
    user: {
      name: "john",
      email: "example@gmail.com",
    },
    totalPrice: 110,
    status: "Processing",
  },
];
import { Link } from "react-router-dom";
import { FaBoxOpen, FaDollarSign, FaClipboardList } from "react-icons/fa";

const AdminDashboard = () => {
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
              <p className="text-2xl font-bold">$1,000</p>
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
              <p className="text-2xl font-bold">200</p>
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
              <p className="text-2xl font-bold">200</p>
            </div>
          </div>
          <Link
            to="/admin/products"
            className="self-end text-sm font-medium text-primary hover:text-primary/80"
          >
            Manage Products →
          </Link>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto border border-base-300 rounded-xl shadow">
        <table className="table w-full text-sm min-w-[700px]">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.length > 0 ? (
              mockOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-base-100/50 cursor-pointer"
                  onClick={() => navigate(`/order/${order.id}`)}
                >
                  <td className="font-medium whitespace-nowrap">#{order.id}</td>
                  <td>
                    <p className="font-semibold">{order.user.name}</p>
                    <p className="text-sm text-gray-500">{order.user.email}</p>
                  </td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    <span
                      className={`badge font-medium ${
                        order.status === "Processing"
                          ? "badge-warning"
                          : order.status === "Completed"
                          ? "badge-success"
                          : "badge-ghost"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
