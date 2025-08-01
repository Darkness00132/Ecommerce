import { Link, NavLink, useNavigate } from "react-router-dom";
import LacosteIcon from "/crocodile.png";
import {
  FaBoxOpen,
  FaClipboardList,
  FaStore,
  FaSignOutAlt,
  FaPlusCircle,
} from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import useAuthUser from "../../store/useAuthUser";
import useCart from "../../store/useCart";

const AdminDrawer = ({ children }) => {
  const navigate = useNavigate();
  const isLoggingOut = useAuthUser((state) => state.isLoggingOut);
  const logout = useAuthUser((state) => state.logout);
  const clearCart = useCart((state) => state.clearCart);

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-100">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor="admin-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-blue-900 text-cyan-100 min-h-full w-80 p-4 lg:w-60">
          <li className="hidden lg:block my-8 bg-transparent hover:bg-transparent">
            <Link
              to="/admin"
              className="mx-auto cursor-pointer hover:bg-transparent focus:bg-transparent"
            >
              <img src={LacosteIcon} alt="Lacoste" className="w-8 h-7" />
              <span className="text-3xl font-extrabold tracking-tight">
                Lacoste
              </span>
            </Link>
          </li>
          <li className="menu-disabled">
            <h2 className="text-xl text-cyan-100 font-bold mb-4">
              Admin Dashboard
            </h2>
          </li>

          <li className="mb-3 hover:bg-cyan-600 rounded-lg">
            <NavLink
              to="/admin/users"
              className={({ isActive }) => (isActive ? "bg-cyan-400" : "")}
            >
              <HiOutlineUserGroup size={24} />
              <span className="text-lg">Users</span>
            </NavLink>
          </li>

          <li className="mb-3 hover:bg-cyan-600 rounded-lg">
            <NavLink
              to="/admin/products"
              className={({ isActive }) => (isActive ? "bg-cyan-400" : "")}
            >
              <FaBoxOpen size={24} />
              <span className="text-lg">Products</span>
            </NavLink>
          </li>

          <li className="mb-3 hover:bg-cyan-600 rounded-lg">
            <NavLink
              to="/admin/makeProduct"
              className={({ isActive }) => (isActive ? "bg-cyan-400" : "")}
            >
              <FaPlusCircle size={24} />
              <span className="text-lg">Add Product</span>
            </NavLink>
          </li>

          <li className="mb-3 hover:bg-cyan-600 rounded-lg">
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => (isActive ? "bg-cyan-400" : "")}
            >
              <FaClipboardList size={24} />
              <span className="text-lg">Orders</span>
            </NavLink>
          </li>

          <li className="mb-3 hover:bg-cyan-600 rounded-lg">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "bg-cyan-400" : "")}
            >
              <FaStore size={24} />
              <span className="text-lg">Back to Store</span>
            </NavLink>
          </li>

          <li className="mt-4">
            <button
              className={`bg-red-600 hover:bg-red-700 flex justify-center w-full py-2 rounded-lg gap-2 ${
                isLoggingOut ? "btn-disabled" : ""
              }`}
              disabled={isLoggingOut}
              onClick={async () => {
                await logout();
                clearCart();
                navigate("/");
              }}
            >
              <FaSignOutAlt size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDrawer;
