import AdminDrawer from "../admin/AdminDrawer";
import AdminNavbar from "../admin/AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
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
