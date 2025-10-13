  import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Sidebar({ links = [], title = "Admin Panel" }) {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <aside
      className="w-64 bg-orange-500 text-white p-6 space-y-6"
      data-aos="fade-right"
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <nav className="flex flex-col space-y-3 mt-6">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`p-2 rounded-md transition flex items-center gap-2 ${
                isActive ? "bg-orange-700 font-semibold" : "hover:bg-orange-600"
              }`}
            >
              {link.icon} {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
