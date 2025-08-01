import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useAuthUser from "../store/useAuthUser";

const Signup = () => {
  const navigate = useNavigate();
  const isSigningup = useAuthUser((state) => state.isSigningup);
  const signup = useAuthUser((state) => state.signup);
  const isAuth = useAuthUser((state) => state.isAuth);

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
    const { success } = await signup({ name, email, password });
    console.log(success);
    if (success) {
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
          <h1 className="text-5xl font-bold mb-6">Join Us Today!</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Explore exclusive styles, fresh arrivals, and unbeatable offers. Our
            shop brings the latest trends right to your screen.
            <br />
            <span className="font-semibold text-gray-800">
              Create an account and redefine your wardrobe.
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
            <h2 className="text-2xl font-bold mb-4">Create an account</h2>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label className="label font-semibold">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="label font-semibold">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
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

              <div className="mb-2 text-right">
                <Link
                  to="/login"
                  className="link link-hover text-sm text-blue-500"
                >
                  Already have an account?
                </Link>
              </div>
              <button
                className="btn btn-neutral w-full mt-4"
                disabled={isSigningup}
              >
                Sign Up
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
