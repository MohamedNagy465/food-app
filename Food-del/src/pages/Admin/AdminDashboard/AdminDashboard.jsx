import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../Context/StorContext";

function AdminDashboard() {
  const { user } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/"); // حماية الصفحة
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-orange-500 mb-4 flex items-center gap-2">
        👑 Admin Dashboard
      </h1>
      <p className="text-gray-700 mb-8">
        Welcome back, <span className="font-semibold">{user.email || "Admin"}</span> 🎉
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
        <button
          onClick={() => navigate("/admin/users")}
          className="bg-white border-2 border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-semibold py-4 px-8 rounded-xl shadow-md transition-all duration-300"
        >
          👥 Manage Users
        </button>

        <button
          onClick={() => navigate("/admin/products")}
          className="bg-white border-2 border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-semibold py-4 px-8 rounded-xl shadow-md transition-all duration-300"
        >
          🛒 Manage Products
        </button>

        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-white border-2 border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-semibold py-4 px-8 rounded-xl shadow-md transition-all duration-300"
        >
          📦 View Orders
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
