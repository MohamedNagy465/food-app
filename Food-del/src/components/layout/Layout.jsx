import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import LoginPopup from '../../pages/loginPopup/LoginPopup'


function Layout() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* ⚠️ مرر setShowLogin للـ LoginPopup */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      
      <Navbar setShowLogin={setShowLogin} />

      <div className="container mt-20"> {/* mt-20 لو Navbar fixed */}
        <Outlet />
      </div>

      <Footer />
    </>
  );
}


export default Layout
