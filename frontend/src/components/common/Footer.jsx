import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <form aria-label={t("footer.newsletter.ariaLabel")}>
          <h6 className="footer-title">{t("footer.newsletter.title")}</h6>
          <fieldset className="w-80">
            <label className="block mb-2">
              {t("footer.newsletter.description")}
            </label>
            <div className="join">
              <input
                type="email"
                placeholder="example@gmail.com"
                className="input input-bordered join-item focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                aria-label={t("footer.newsletter.emailAria")}
              />
              <button
                className="btn btn-primary join-item"
                type="submit"
                aria-label={t("footer.newsletter.subscribeAria")}
              >
                {t("footer.newsletter.subscribe")}
              </button>
            </div>
          </fieldset>
        </form>

        <nav aria-label={t("footer.shop.ariaLabel")}>
          <h6 className="footer-title">{t("footer.shop.title")}</h6>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            {t("footer.shop.menTop")}
          </Link>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            {t("footer.shop.womenTop")}
          </Link>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            {t("footer.shop.menBottom")}
          </Link>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            {t("footer.shop.womenBottom")}
          </Link>
        </nav>

        <nav aria-label={t("footer.support.ariaLabel")}>
          <h6 className="footer-title">{t("footer.support.title")}</h6>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            {t("footer.support.about")}
          </Link>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            {t("footer.support.contact")}
          </Link>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            {t("footer.support.faqs")}
          </Link>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            {t("footer.support.features")}
          </Link>
        </nav>

        <nav aria-label={t("footer.follow.ariaLabel")}>
          <h6 className="footer-title">{t("footer.follow.title")}</h6>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
              aria-label="Facebook"
            >
              <FaFacebook size={28} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
              aria-label="Instagram"
            >
              <IoLogoInstagram size={28} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
              aria-label="Twitter / X"
            >
              <RiTwitterXLine size={28} />
            </a>
          </div>
          <p className="text-gray-500">{t("footer.follow.callUs")}</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" aria-hidden="true" />
            <a
              href="tel:+2010111213014"
              className="hover:text-gray-300"
              aria-label={t("footer.follow.callNumberAria", {
                number: "010111213014",
              })}
            >
              010111213014
            </a>
          </p>
        </nav>
      </footer>

      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
