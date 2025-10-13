import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import headerImg from "../../assets/frontend_assets/header_img.png";

function Header() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleScroll = () => {
    const menuSection = document.getElementById("menu-section");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative rounded-2xl h-[34vw] min-h-[400px] bg-cover bg-center my-[40px]
        flex flex-col justify-center items-start text-white px-8 md:px-16"
      style={{ backgroundImage: `url(${headerImg})` }}
    >
      {/* النصوص */}
      <div className="relative z-10 max-w-2xl" data-aos="fade-up">
        <h2
          className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Order your favourite food here
        </h2>
        <p
          className="mb-6 text-gray-100 text-base md:text-lg leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Choose from a diverse menu featuring a delectable array of dishes crafted
          with the finest ingredients and culinary expertise. Our mission is to satisfy
          your cravings and elevate your dining experience, one delicious meal at a
          time.
        </p>
        <button
          onClick={handleScroll}
          className="bg-orange-500 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-orange-600 transition"
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          View Menu
        </button>
      </div>
    </div>
  );
}

export default Header;
