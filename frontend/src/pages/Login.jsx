import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useAuthUser from "../store/useAuthUser";
import useCart from "../store/useCart";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLogging = useAuthUser((state) => state.isLogging);
  const login = useAuthUser((state) => state.login);
  const isAuth = useAuthUser((state) => state.isAuth);
  const mergeCart = useCart((state) => state.mergeCart);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
    }
  }, [isAuth]);

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      await mergeCart();
      navigate("/");
    }
  }

  return (
    <div className="hero bg-cyan-50 min-h-screen px-4 border-b-2 border-gray-300">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12 w-full max-w-6xl">
        {/* Left Side Text */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="text-5xl font-bold mb-6">{t("login.title")}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("login.subtitle1")}
            <br />
            <span className="font-semibold text-gray-800">
              {t("login.subtitle2")}
            </span>
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card bg-base-100 w-full lg:w-1/2 shadow-2xl"
        >
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">{t("login.formTitle")}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="label font-semibold">
                  {t("login.email")}
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
              <div className="mb-4">
                <label className="label font-semibold">
                  {t("login.password")}
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder={t("login.passwordPlaceholder")}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-4 text-center text-sm text-gray-600 flex items-center justify-center gap-1">
                <span>
                  {t("login.noAccount")}{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {t("login.signUp")}
                  </Link>
                </span>
              </div>

              <button
                className={`btn btn-neutral w-full mt-4 ${
                  isLogging && "disabled"
                }`}
                disabled={isLogging}
              >
                {t("login.loginButton")}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
