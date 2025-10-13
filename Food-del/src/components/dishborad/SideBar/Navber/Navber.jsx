import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { StoreContext } from '../../../../Context/StorContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Navber() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(StoreContext);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  function handleLogout() {
    if (window.confirm("هل أنت متأكد أنك تريد تسجيل الخروج؟")) {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    }
  }

  return (
    <header 
      className="bg-white shadow-md p-4 flex justify-between items-center"
      data-aos="fade-down"
    >
      <h1 className="text-xl font-semibold text-gray-800">
        Welcome, <span className="text-orange-500">{user?.name || "Admin"}</span>
      </h1>
      <div className="flex items-center">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition mr-4"
        >
          ← Go to Website
        </button>
        <button
          onClick={handleLogout}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navber;
