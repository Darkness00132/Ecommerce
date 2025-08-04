import { useEffect } from "react";
import AdminDrawer from "../admin/AdminDrawer";
import AdminNavbar from "../admin/AdminNavbar";
import useAuthUser from "../../store/useAuthUser";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminLayout = () => {
  const navigate = useNavigate();
  const isAuth = useAuthUser((state) => state.isAuth);
  const clearUser = useAuthUser((state) => state.clearUser);
  useEffect(() => {
    if (!isAuth) {
      toast.info("Token expired login again");
      clearUser();
      navigate("/");
    }
  }, [isAuth]);
  return (
    <>
      <header>
        <AdminNavbar />
      </header>
      <AdminDrawer>
        <main>
          <Outlet />
        </main>
      </AdminDrawer>
    </>
  );
};

export default AdminLayout;
