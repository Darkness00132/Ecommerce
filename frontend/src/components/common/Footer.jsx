import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <form aria-label="Newsletter Subscription">
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="w-80">
            <label className="block mb-2">
              Be the first to hear about new products, exclusive events, and
              online offers.
            </label>
            <div className="join">
              <input
                type="email"
                placeholder="username@site.com"
                className="input input-bordered join-item focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                aria-label="Email address"
              />
              <button
                className="btn btn-primary join-item"
                type="submit"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>

        <nav aria-label="Shop Links">
          <h6 className="footer-title">Shop</h6>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            Men's Top Wear
          </Link>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            Women's Top Wear
          </Link>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            Men's Bottom Wear
          </Link>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            Women's Bottom Wear
          </Link>
        </nav>

        <nav aria-label="Support Links">
          <h6 className="footer-title">Support</h6>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            About us
          </Link>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            Contact us
          </Link>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            FAQs
          </Link>
          <Link className="hover:text-gray-500 transition-colors" to="#">
            Features
          </Link>
        </nav>

        <nav aria-label="Follow us on social media">
          <h6 className="footer-title">Follow us</h6>
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
          <p className="text-gray-500">Call Us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" aria-hidden="true" />
            <a
              href="tel:+2010111213014"
              className="hover:text-gray-300"
              aria-label="Call us on 010111213014"
            >
              010111213014
            </a>
          </p>
        </nav>
      </footer>

      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
