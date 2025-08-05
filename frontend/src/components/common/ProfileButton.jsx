import { Link } from "react-router-dom";
import useAuthUser from "../../store/useAuthUser";
import useCart from "../../store/useCart";
import { HiOutlineUser } from "react-icons/hi";

const ProfileButton = () => {
  const isAuth = useAuthUser((state) => state.isAuth);
  const isAdmin = useAuthUser((state) => state.isAdmin);
  const isLoggingOut = useAuthUser((state) => state.isLoggingOut);
  const logout = useAuthUser((state) => state.logout);
  const clearCart = useCart((state) => state.clearCart);
  return (
    <>
      {!isAuth ? (
        <Link
          to="/login"
          className="btn btn-ghost btn-circle"
          aria-label="Login"
        >
          <HiOutlineUser size={24} />
        </Link>
      ) : isAdmin ? (
        <Link
          to="/admin"
          className="btn btn-ghost btn-circle"
          aria-label="Admin Dashboard"
        >
          <HiOutlineUser size={24} />
        </Link>
      ) : (
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar"
            aria-label="User menu"
          >
            <HiOutlineUser size={24} />
          </button>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-white rounded-box w-48"
            aria-label="User account menu"
          >
            <li>
              <button
                onClick={async () => {
                  await logout();
                  clearCart();
                }}
                disabled={isLoggingOut}
                className="text-sm py-2 px-4 hover:bg-gray-100 rounded-md text-red-500 transition disabled:opacity-50"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ProfileButton;
