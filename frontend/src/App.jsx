import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect, lazy, Suspense } from "react";
import axiosInstance from "./axiosInstance/axiosInstance";
import UserLayout from "./components/layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Collection from "./pages/Collection";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrdersPage from "./pages/OrdersPage";
import OrderDetails from "./pages/OrderDetails";
import NotFoundPage from "./pages/NotFound";
const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminMakeProduct = lazy(() =>
  import("./pages/admin/AdminMakeProduct.jsx")
);
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminProductDetails = lazy(() =>
  import("./pages/admin/AdminProductDetails")
);
const AdminOrderDetails = lazy(() => import("./pages/admin/AdminOrderDetails"));

function App() {
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const res = await axiosInstance.get("/csrf-token");
        // Optional: store token in memory (or just rely on axios interceptor)
        axiosInstance.defaults.headers.common["X-CSRF-Token"] =
          res.data.csrfToken;
      } catch (err) {
        console.error("Failed to fetch CSRF token", err);
      }
    };

    getCsrfToken();
  }, []);

  return (
    <BrowserRouter>
      <Toaster
        richColors
        position="top-center"
        expand={true}
        toastOptions={{
          duration: 2500,
          style: {
            fontSize: "1rem",
          },
        }}
      />
      <Suspense
        fallback={<p className="p-10 text-center">Loading admin panel...</p>}
      >
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="collections" element={<Collection />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="orderConfirmation/:id"
              element={<OrderConfirmation />}
            />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderDetails />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="makeProduct" element={<AdminMakeProduct />} />
            <Route path="products/:id" element={<AdminProductDetails />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:id" element={<AdminOrderDetails />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
