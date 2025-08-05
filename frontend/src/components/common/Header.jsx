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
  const { t, i18n } = useTranslation();
  const cart = useCart((state) => state.cart);
  const numberOfProducts = cart?.products?.length || 0;

  return (
    <header className="border-b border-gray-200">
      <div
        className="navbar bg-base-200 shadow-md px-4"
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Mobile Navbar */}
        <MobileMenu key={i18n.language} numberOfProducts={numberOfProducts} />

        {/* LEFT SIDE */}
        <div className="hidden md:flex navbar-start gap-2">
          {/* Logo (visible on md and up) */}
          <div className="hidden md:flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <img
                src="https://res.cloudinary.com/dgzqfkqua/image/upload/f_auto,q_auto,w_100,dpr_auto/v1754112822/My%20Brand/crocodile_rgzngx.png"
                alt="Lacoste Logo"
                className="w-7 h-7"
              />
              <span>Lacoste</span>
            </Link>
          </div>
        </div>

        {/* CENTER (navbar-center): Desktop nav links */}
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

        {/* RIGHT SIDE (navbar-end) */}
        <div className="hidden md:flex navbar-end gap-2">
          <LanguageSwitcher />

          <div className="hidden lg:block">
            <SearchBar />
          </div>

          <ProfileButton />

          <Link
            to="/orders"
            className="btn btn-ghost btn-circle"
            aria-label="Your Orders"
          >
            <BiHistory size={24} />
          </Link>

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
