import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/cart/Cart";
import StoreContextProvider from "./Context/StorContext";
import { Toaster } from "react-hot-toast";
import MobileApp from "./pages/Mobile/MobileApp";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
// 
import Users from "./pages/Admin/User";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";
import DishBoard from "./pages/Admin/DishBoard";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
    useEffect(() => {
    AOS.init({
      duration: 1000, // مدة الحركة بالملي ثانية
      once: true, // تشغل التأثير مرة واحدة فقط
    });
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "menu", element: <Menu /> },
        { path: "cart", element: <Cart /> },
        { path: "placeOrder", element: <PlaceOrder />},
        { path: "mobileApp", element: <MobileApp /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "users", element: <Users /> },
        { path: "products", element: <Products /> },
        { path: "orders", element: <Orders /> },
        { path: "dashboard", element: <DishBoard /> },
      ],
    },
  ]);

  return (
    <StoreContextProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            borderRadius: "10px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
        }}
      />
    </StoreContextProvider>
  );
}

export default App;
