import { HiBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileMenu = () => {
  const { t } = useTranslation();
  return (
    <div className="navbar-start">
      {/* Mobile dropdown */}
      <div className="dropdown md:hidden">
        <button
          tabIndex={0}
          className="btn btn-ghost btn-circle"
          aria-label="Open menu"
        >
          <HiBars3BottomRight size={24} />
        </button>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          aria-label="Mobile navigation links"
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

      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold"
        aria-label="Lacoste Home Page"
      >
        <img
          src="https://res.cloudinary.com/dgzqfkqua/image/upload/f_auto,q_auto,w_100,dpr_auto/v1754112822/My%20Brand/crocodile_rgzngx.png"
          fetchpriority="high"
          alt="Lacoste Logo"
          className="w-7 h-7"
        />
        <span>Lacoste</span>
      </Link>
    </div>
  );
};

export default MobileMenu;
