import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StorContext";

function AdminLayout() {
  const { user, setUser } = useContext(StoreContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-500 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>

        <nav className="flex flex-col space-y-3 mt-6">
          <Link
            to="/admin/dashboard"
            className="hover:bg-orange-700 p-2 rounded-md transition"
          >
            🏠 Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="hover:bg-orange-700 p-2 rounded-md transition"
          >
            👥 Manage Users
          </Link>
          <Link
            to="/admin/products"
            className="hover:bg-orange-700 p-2 rounded-md transition"
          >
            🛒 Manage Products
          </Link>
          <Link
            to="/admin/orders"
            className="hover:bg-orange-700 p-2 rounded-md transition"
          >
            📦 Orders
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome, <span className="text-orange-500">{user?.name || "Admin"}</span>
          </h1>
          <button
            onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </header>

        {/* Outlet (main content inside routes) */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
