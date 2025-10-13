import React, { useEffect } from "react";
import appStore from "../../assets/frontend_assets/app_store.png";
import playStore from "../../assets/frontend_assets/play_store.png";
import phoneImg from "../../assets/frontend_assets/phone.png";
import AOS from "aos";
import "aos/dist/aos.css";

function MobileApp() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 gap-10">
        
        {/* النص */}
        <div className="text-center lg:text-left max-w-lg" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-orange-500 mb-4">
            Get Our Mobile App
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Enjoy your favorite meals anytime, anywhere!  
            Order quickly and track your delivery in real-time with our app.
          </p>

          {/* أزرار المتاجر */}
          <div className="flex justify-center lg:justify-start gap-4 flex-wrap">
            <a
              href="#"
              className="bg-black text-white flex items-center gap-3 px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition-transform"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img src={appStore} alt="App Store" className="h-7" />
              <div className="text-left leading-tight">
                <small className="text-gray-300 text-xs">Download on the</small>
                <p className="font-semibold text-sm">App Store</p>
              </div>
            </a>

            <a
              href="#"
              className="bg-black text-white flex items-center gap-3 px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition-transform"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img src={playStore} alt="Play Store" className="h-7" />
              <div className="text-left leading-tight">
                <small className="text-gray-300 text-xs">GET IT ON</small>
                <p className="font-semibold text-sm">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* صورة الموبايل */}
        <div className="flex justify-center lg:justify-end" data-aos="zoom-in">
          <img
            src={phoneImg}
            alt="Mobile App Preview"
            className="w-64 md:w-80 lg:w-96 drop-shadow-2xl transition-transform hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}

export default MobileApp;
