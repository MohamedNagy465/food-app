import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../../Context/StorContext";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

function NavberDish() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(StoreContext);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleLogout = async () => {
    const confirm = await new Promise((resolve) => {
      toast.custom(
        (t) => (
          <div className="bg-white p-4 rounded shadow flex flex-col gap-2">
            <p className="font-semibold">Are you sure you want to log out?</p>
            <div className="flex gap-2 justify-end mt-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        ),
        { duration: Infinity }
      );
    });

    if (!confirm) return;

    localStorage.removeItem("token");
    setUser(null);
    toast.success("✅ Logged out successfully!");
    navigate("/");
  };

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

export default NavberDish;
