import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useAuthUser from "../store/useAuthUser";
import useCart from "../store/useCart";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isSigningup = useAuthUser((state) => state.isSigningup);
  const signup = useAuthUser((state) => state.signup);
  const isAuth = useAuthUser((state) => state.isAuth);
  const mergeCart = useCart((state) => state.mergeCart);

  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
    }
  }, [isAuth]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await signup({ name, email, password });
    if (success) {
      await mergeCart();
      navigate("/");
    }
  }

  return (
    <div className="hero bg-cyan-50 min-h-screen px-4 border-b-2 border-gray-300">
      <div className="hero-content flex-col lg:flex-row gap-12 w-full max-w-6xl">
        {/* Left Side Text */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="text-5xl font-bold mb-6">{t("signup.title")}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("signup.subtitle1")}
            <br />
            <span className="font-semibold text-gray-800">
              {t("signup.subtitle2")}
            </span>
          </p>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card bg-base-100 w-full lg:w-1/2 shadow-2xl"
        >
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">{t("signup.formTitle")}</h2>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label className="label font-semibold">
                  {t("signup.name")}
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder={t("signup.namePlaceholder")}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="label font-semibold">
                  {t("signup.email")}
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="example@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="label font-semibold">
                  {t("signup.password")}
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder={t("signup.passwordPlaceholder")}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-2 text-right">
                <Link
                  to="/login"
                  className="link link-hover text-sm text-blue-500"
                >
                  {t("signup.haveAccount")}
                </Link>
              </div>
              <button
                className="btn btn-neutral w-full mt-4"
                disabled={isSigningup}
              >
                {t("signup.signupButton")}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
