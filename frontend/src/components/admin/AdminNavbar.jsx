import { HiBars3BottomRight } from "react-icons/hi2";
import LacosteIcon from "/crocodile.png";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <>
      <div className="navbar bg-blue-900 text-cyan-100 shadow-md lg:hidden px-4">
        <div className="flex-none">
          <label htmlFor="admin-drawer" className="btn btn-ghost btn-circle">
            <HiBars3BottomRight size={24} />
          </label>
        </div>
        <Link
          to="/admin"
          className="text-lg font-semibold tracking-wide flex-1 flex justify-center items-center gap-2"
        >
          <img src={LacosteIcon} alt="Lacoste" className="w-7 h-7" />
          Lacoste
        </Link>
      </div>
      {/* Empty for symmetry */}
      <div className="flex-none w-10"></div>
    </>
  );
};

export default AdminNavbar;
