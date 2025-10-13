import React, {  } from "react";
import { Outlet,  } from "react-router-dom";
import Sidebar from "../../components/dishborad/SideBar/Sidebar";
import Navber from "../../components/dishborad/SideBar/Navber/Navber";


function AdminLayout() {
  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
    { to: "/admin/users", label: "Manage Users", icon: "👥" },
    { to: "/admin/products", label: "Manage Products", icon: "🛒" },
    { to: "/admin/orders", label: "Orders", icon: "📦" },
  ];

 

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar links={links} title="Admin Panel" />

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}

        <Navber />

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
