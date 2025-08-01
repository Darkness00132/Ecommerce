import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance/axiosInstance";
import useAuthUser from "./store/useAuthUser";

import UserLayout from "./components/layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Collection from "./pages/Collection";
import ProductDetails from "./components/products/ProductDetails";
import Checkout from "./components/cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrdersPage from "./pages/OrdersPage";
import OrderDetails from "./pages/OrderDetails";
import AdminLayout from "./components/layout/AdminLayout";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminMakeProduct from "./pages/admin/AdminMakeProduct.jsx";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductDetails from "./pages/admin/AdminProductDetails";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import NotFoundPage from "./pages/NotFound";

function App() {
  useEffect(() => {
    const initCsrf = async () => {
      const res = await axiosInstance.get("/csrf-token");
      Cookies.set("csrfToken", res.data.csrfToken);
    };
    initCsrf();
  }, []);
  const setCheck = useAuthUser((state) => state.setCheck);
  const isAuth = useAuthUser((state) => state.isAuth);
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users/profile");
      setCheck(response.data?.user);
      return response.data?.user;
    },
    enabled: !isAuth,
  });

  return (
    <BrowserRouter>
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            fontSize: "1rem",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="collections" element={<Collection />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orderConfirmation/:id" element={<OrderConfirmation />} />
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
    </BrowserRouter>
  );
}

export default App;
