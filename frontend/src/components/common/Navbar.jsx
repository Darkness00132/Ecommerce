import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { BiHistory } from "react-icons/bi";
import SearchBar from "./SearchBar";
import CartDrawer from "../layout/CartDrawer";
import LacosteIcon from "/crocodile.png";
import useAuthUser from "../../store/useAuthUser";
import useCart from "../../store/useCart";

const Navbar = () => {
  const isAuth = useAuthUser((state) => state.isAuth);
  const isAdmin = useAuthUser((state) => state.isAdmin);
  const isLoggingOut = useAuthUser((state) => state.isLoggingOut);
  const logout = useAuthUser((state) => state.logout);

  const cart = useCart((state) => state.cart);

  const numberOfProducts = cart?.products?.length || 0;

  return (
    <>
      <div className="navbar bg-base-200 shadow-md px-4">
        {/* Start (Logo + Mobile Menu) */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown md:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-circle">
              <HiBars3BottomRight size={24} />
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  to="/collections?collenction=all&gender=Men"
                  className="uppercase font-semibold"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  to="/collections?collenction=all&gender=Woman"
                  className="uppercase font-semibold"
                >
                  Woman
                </Link>
              </li>
              <li>
                <Link
                  to="/collections?collenction=all&category=Top Wear"
                  className="uppercase font-semibold"
                >
                  Top Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/collections?collenction=all&category=Bottom Wear"
                  className="uppercase font-semibold"
                >
                  Bottom Wear
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src={LacosteIcon} alt="Lacoste Logo" className="w-7 h-7" />
            <span>Lacoste</span>
          </Link>
        </div>

        {/* Center Navigation (desktop only) */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Link
                to="/collections?collenction=all&gender=Men"
                className="uppercase font-semibold"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                to="/collections?collenction=all&gender=Woman"
                className="uppercase font-semibold"
              >
                Woman
              </Link>
            </li>
            <li>
              <Link
                to="/collections?collenction=all&category=Top Wear"
                className="uppercase font-semibold"
              >
                Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="/collections?collenction=all&category=Bottom Wear"
                className="uppercase font-semibold"
              >
                Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {/* SearchBar only for large screens and up */}
          <div className="hidden lg:block">
            <SearchBar />
          </div>

          {/* Login */}
          {!isAuth ? (
            <Link to="/login" className="btn btn-ghost btn-circle">
              <HiOutlineUser size={24} />
            </Link>
          ) : isAdmin ? (
            <Link to="/admin" className="btn btn-ghost btn-circle">
              <HiOutlineUser size={24} />
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <HiOutlineUser size={24} />
              </button>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-white rounded-box w-48"
              >
                <li>
                  <Link
                    to="/change-password"
                    className="text-sm py-2 px-4 hover:bg-gray-100 rounded-md transition"
                  >
                    Change Password
                  </Link>
                </li>
                <li>
                  <button
                    onClick={async () => await logout()}
                    disabled={isLoggingOut}
                    className="text-sm py-2 px-4 hover:bg-gray-100 rounded-md text-red-500 transition disabled:opacity-50"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Orders */}
          <Link to="/orders" className="btn btn-ghost btn-circle">
            <BiHistory size={24} />
          </Link>

          {/* Cart (cart drawer trigger) */}
          <label
            htmlFor="cart-drawer"
            className="btn btn-ghost btn-circle relative"
          >
            <HiOutlineShoppingBag size={24} />
            {numberOfProducts !== 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-1 py-0.5 rounded-full">
                {numberOfProducts}
              </span>
            )}
          </label>
        </div>
      </div>

      <CartDrawer />
    </>
  );
};

export default Navbar;
