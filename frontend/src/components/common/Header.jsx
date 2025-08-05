import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { BiHistory } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import SearchBar from "./SearchBar";
import CartDrawer from "../cart/CartDrawer";
import useCart from "../../store/useCart";
import MobileMenu from "./MobileMenu";
import ProfileButton from "./ProfileButton";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const cart = useCart((state) => state.cart);
  const numberOfProducts = cart?.products?.length || 0;

  return (
    <header className="border-b border-gray-200">
      <div
        className="navbar bg-base-200 shadow-md px-4"
        role="navigation"
        aria-label="Main Navigation"
      >
        <MobileMenu />

        {/* Center Navigation (desktop only) */}
        <div className="navbar-center hidden md:flex">
          <ul
            className="menu menu-horizontal px-1 gap-2"
            aria-label="Desktop navigation links"
          >
            <li>
              <Link
                to="/collections?collenction=all&gender=Men"
                className="uppercase font-semibold"
              >
                {t("menu.section1")}
              </Link>
            </li>
            <li>
              <Link
                to="/collections?collenction=all&gender=Woman"
                className="uppercase font-semibold"
              >
                {t("menu.section2")}
              </Link>
            </li>
            <li>
              <Link
                to="/collections?collenction=all&category=Top Wear"
                className="uppercase font-semibold"
              >
                {t("menu.section3")}
              </Link>
            </li>
            <li>
              <Link
                to="/collections?collenction=all&category=Bottom Wear"
                className="uppercase font-semibold"
              >
                {t("menu.section4")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {/* Language Toggle Button */}
          <LanguageSwitcher />

          {/* SearchBar only for large screens and up */}
          <div className="hidden lg:block">
            <SearchBar />
          </div>

          {/* Login or Profile */}
          <ProfileButton />

          {/* Orders */}
          <Link
            to="/orders"
            className="btn btn-ghost btn-circle"
            aria-label="Your Orders"
          >
            <BiHistory size={24} />
          </Link>

          {/* Cart (drawer trigger) */}
          <label
            htmlFor="cart-drawer"
            className="btn btn-ghost btn-circle relative"
            aria-label="Cart"
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
    </header>
  );
};

export default Header;
