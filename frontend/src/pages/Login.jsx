import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import useAuthUser from "../store/useAuthUser";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const isLogging = useAuthUser((state) => state.isLogging);
  const login = useAuthUser((state) => state.login);
  const isAuth = useAuthUser((state) => state.isAuth);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
    }
  }, [isAuth]);

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) navigate("/");
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
          <h1 className="text-5xl font-bold mb-6">Welcome Back! 👋</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Step into a world of style and comfort. Whether you're dressing for
            a night out or a cozy evening in, our handpicked collection brings
            the best of fashion to your doorstep.
            <br />
            <span className="font-semibold text-gray-800">
              Sign in and make your wardrobe shine.
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
            <h2 className="text-2xl font-bold mb-4">Login to your account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="label font-semibold">Email</label>
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
                <label className="label font-semibold">Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-4 text-center text-sm text-gray-600 flex items-center justify-center gap-1">
                <span>
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </span>
              </div>

              <button
                className={`btn btn-neutral w-full mt-4 ${
                  isLogging && "disabled"
                }`}
                disabled={isLogging}
              >
                Login
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
