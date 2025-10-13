import React, { useEffect } from "react";
import { menu_list } from "../../assets/frontend_assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { FreeMode, Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";

function ExploreMenu() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="container my-20 text-center" id="menu-section">
      {/* العنوان */}
      <h1
        className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
        data-aos="fade-down"
      >
        Explore Our Menu
      </h1>

      {/* الوصف */}
      <p
        className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Choose from a diverse menu featuring a delectable array of dishes crafted
        with the finest ingredients and culinary expertise. Our mission is to satisfy
        your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      {/* السلايدر */}
      <Swiper
        slidesPerView={2}
        spaceBetween={25}
        freeMode={true}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 30 },
          768: { slidesPerView: 4, spaceBetween: 35 },
          1024: { slidesPerView: 5, spaceBetween: 40 },
        }}
        modules={[FreeMode, Autoplay]}
        className="w-full max-w-6xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {menu_list.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300">
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className="w-24 h-24 object-cover rounded-full mb-3 shadow-md border-2 border-orange-400 hover:border-orange-500 transition"
              />
              <p className="font-semibold text-gray-700">{item.menu_name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ExploreMenu;
