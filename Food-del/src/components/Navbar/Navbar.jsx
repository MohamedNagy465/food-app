  import React, { useState, useContext, useMemo } from "react";
  import { Menu, X, Search, ShoppingBag } from "lucide-react";
  import { assets } from "../../assets/frontend_assets/assets";
  import { Link, useNavigate } from "react-router-dom";
  import { StoreContext } from "../../Context/StorContext";
  import LoginPopup from "../../pages/loginPopup/LoginPopup";

  function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const { getCartCount, user, logout } = useContext(StoreContext);
    const cartCount = useMemo(() => getCartCount(), [getCartCount]);
    const navigate = useNavigate();

    const handleCartClick = () => {
      if (user) {
        navigate("/cart");
      } else {
        setShowLogin(true);
      }
    };

    return (
      <>
        <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
          <div className="container mx-auto p-4 flex items-center justify-between relative">
            {/* Logo */}
            <Link to="/">
              <img
                src={assets.logo}
                alt="Logo"
                className="w-28 cursor-pointer select-none"
              />
            </Link>

            {/* Center Menu (Desktop only) */}
            <ul className="hidden md:flex flex-row items-center gap-8 text-gray-700 font-medium">
              <Link to="/" className="hover:text-orange-500 transition">
                Home
              </Link>
              <Link to="/menu" className="hover:text-orange-500 transition">
                Menu
              </Link>
              <Link to="/mobileApp" className="hover:text-orange-500 transition">
                Mobile App
              </Link>
              <Link to="/trackOrders" className="hover:text-orange-500 transition">
                TrackOrders
              </Link>

              {/* ✅ زر الأدمن يظهر فقط لو المستخدم أدمن */}
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Admin Dashboard
                </button>
              )}
            </ul>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <Search
                size={22}
                className="cursor-pointer hover:text-orange-500 transition"
              />

              {/* Cart */}
              <div
                className="relative cursor-pointer hover:text-orange-500 transition"
                onClick={handleCartClick}
              >
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-semibold px-[6px] rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* Sign In / Sign Out */}
              {user ? (
                <button
                  className="hidden md:block bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition"
                  onClick={logout}
                >
                  Sign Out
                </button>
              ) : (
                <button
                  className="hidden md:block bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600 transition"
                  onClick={() => setShowLogin(true)}
                >
                  Sign In
                </button>
              )}

              {/* Hamburger (Mobile only) */}
              <button
                className="md:hidden flex cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X size={28} className="text-gray-700" />
                ) : (
                  <Menu size={28} className="text-gray-700" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            <ul
              className={`flex flex-col md:hidden items-center gap-5 text-gray-700 font-medium absolute bg-white left-0 w-full top-full p-6 shadow-md transition-all duration-300 ease-in-out ${
                menuOpen
                  ? "opacity-100 visible translate-y-0 scale-100"
                  : "opacity-0 invisible -translate-y-3 scale-95"
              }`}
            >
              <Link
                to="/"
                className="hover:text-orange-500 transition"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="hover:text-orange-500 transition"
                onClick={() => setMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                to="/trackOrders"
                className="hover:text-orange-500 transition"
                onClick={() => setMenuOpen(false)}
              >
                Track Orders
              </Link>
              <Link
                to="/contact"
                className="hover:text-orange-500 transition"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* ✅ Dashboard للموبايل */}
              {user?.role === "admin" && (
                <button
                  onClick={() => {
                    navigate("/admin");
                    setMenuOpen(false);
                  }}
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Admin Dashboard
                </button>
              )}

              <li>
                {user ? (
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    className="bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600 transition"
                    onClick={() => {
                      setShowLogin(true);
                      setMenuOpen(false);
                    }}
                  >
                    Sign In
                  </button>
                )}
              </li>
            </ul>
          </div>
        </nav>

        {/* ✅ Login Popup */}
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      </>
    );
  }

  export default Navbar;
