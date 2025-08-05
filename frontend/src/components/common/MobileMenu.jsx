import { HiBars3BottomRight, HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BiHistory } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import LanguageSwitcher from "./LanguageSwitcher";
import useAuthUser from "../../store/useAuthUser";
import useCart from "../../store/useCart";
import { FaSignOutAlt } from "react-icons/fa";

const MobileMenu = ({ numberOfProducts }) => {
  const { t } = useTranslation();

  const isAuth = useAuthUser((state) => state.isAuth);
  const isAdmin = useAuthUser((state) => state.isAdmin);
  const isLoggingOut = useAuthUser((state) => state.isLoggingOut);
  const logout = useAuthUser((state) => state.logout);
  const clearCart = useCart((state) => state.clearCart);

  return (
    <div className={`flex drawer drawer-end md:hidden`}>
      {/* Drawer toggle input */}
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content (navbar item with toggle button) */}
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 text-xl font-bold">
          <img
            src="https://res.cloudinary.com/dgzqfkqua/image/upload/f_auto,q_auto,w_100,dpr_auto/v1754112822/My%20Brand/crocodile_rgzngx.png"
            alt="Lacoste Logo"
            className="w-7 h-7"
          />
          <span>Lacoste</span>
        </Link>

        {/* Buttons (Cart + Menu) */}
        <div className="flex items-center gap-1">
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

          <label htmlFor="mobile-drawer" className="btn btn-ghost btn-circle">
            <HiBars3BottomRight size={24} />
          </label>
        </div>
      </div>

      {/* Drawer content (menu from right) */}
      <div className="drawer-side z-50">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content">
          <li className="pointer-events-none select-none">
            <h2 className="text-xl font-bold mb-4">{t("menu.user")}</h2>
          </li>

          <li>
            <Link
              to="/orders"
              className="btn btn-ghost justify-start"
              aria-label="Your Orders"
            >
              <BiHistory size={24} />
              <span>{t("menu.orders")}</span>
            </Link>
          </li>

          <li>
            {!isAuth ? (
              <Link
                to="/login"
                className="btn btn-ghost justify-start"
                aria-label="Login"
              >
                <HiOutlineUser size={24} />
                <span>{t("menu.profile")}</span>
              </Link>
            ) : isAdmin ? (
              <Link
                to="/admin"
                className="btn btn-ghost justify-start"
                aria-label="Admin Dashboard"
              >
                <HiOutlineUser size={24} />
                <span>{t("menu.profile")}</span>
              </Link>
            ) : (
              <button
                className={`btn btn-ghost text-red-500 justify-start ${
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
                <span>{t("menu.logout")}</span>
              </button>
            )}
          </li>

          <li className="pointer-events-none select-none">
            <h2 className="text-xl font-bold my-4">{t("menu.shop")}</h2>
          </li>

          <li>
            <Link to="/collections?collenction=all&gender=Men">
              {t("menu.section1")}
            </Link>
          </li>
          <li>
            <Link to="/collections?collenction=all&gender=Woman">
              {t("menu.section2")}
            </Link>
          </li>
          <li>
            <Link to="/collections?collenction=all&category=Top Wear">
              {t("menu.section3")}
            </Link>
          </li>
          <li>
            <Link to="/collections?collenction=all&category=Bottom Wear">
              {t("menu.section4")}
            </Link>
          </li>
          <li className="pointer-events-none select-none">
            <h2 className="text-lg font-bold my-4">{t("menu.language")}</h2>
          </li>
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
