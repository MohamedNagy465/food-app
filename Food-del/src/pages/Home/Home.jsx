import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className='py-3'>
      <div data-aos="fade-down">
        <Header />
      </div>

      <div data-aos="fade-up" data-aos-delay="200">
        <ExploreMenu />
      </div>

      <div data-aos="zoom-in" data-aos-delay="400">
        <FoodDisplay />
      </div>
    </div>
  );
}

export default Home;
