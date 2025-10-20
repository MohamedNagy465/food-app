import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { assets } from "../../assets/frontend_assets/assets";

function Footer() {
  return (
    <footer className="bg-[#181818] text-gray-300 py-14 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* 🧡 الشعار والوصف */}
        <div>
          <img
            src={assets.logo}
            alt="Logo"
            className="w-36 mb-4 brightness-150"
          />
          <p className="text-sm leading-relaxed text-gray-400">
            Delicious meals crafted with passion and fresh ingredients.  
            Order easily and enjoy your favorite dishes anytime.
          </p>
        </div>

        {/* 🧭 روابط سريعة */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg relative before:absolute before:-bottom-1 before:left-0 before:w-10 before:h-[2px] before:bg-orange-500">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="/menu" className="hover:text-orange-500 transition">Menu</a></li>
            <li><a href="/mobile-app" className="hover:text-orange-500 transition">Mobile App</a></li>
            <li><a href="/contact" className="hover:text-orange-500 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* 📞 تواصل معنا */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg relative before:absolute before:-bottom-1 before:left-0 before:w-10 before:h-[2px] before:bg-orange-500">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: <span className="text-orange-400">info@foodapp.com</span></li>
            <li>Phone: +20 100 234 5678</li>
            <li>Address: Cairo, Egypt</li>
          </ul>
        </div>

        {/* 🌐 السوشيال ميديا + تحميل التطبيق */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg relative before:absolute before:-bottom-1 before:left-0 before:w-10 before:h-[2px] before:bg-orange-500">
            Follow Us
          </h3>
          <div className="flex gap-5 mt-2 mb-6">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 transition"
            >
              <Twitter size={20} />
            </a>
          </div>

          {/* 📱 تحميل تطبيق الموبايل */}
        
        </div>
          <div className="">
            <h4 className="text-white font-semibold mb-3 text-sm">Get Our App</h4>
          <div className="flex gap-3">
            <img
              src={assets.play_store}
              alt="Play Store"
              className="h-10 cursor-pointer hover:scale-105 transition"
            />
            <img
              src={assets.app_store}
              alt="App Store"
              className="h-10 cursor-pointer hover:scale-105 transition"
            />
          </div>
          </div>
      </div>

      {/* 🔸 حقوق النشر */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-orange-500 font-semibold">Food Del</span> — All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
