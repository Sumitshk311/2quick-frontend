import React from 'react';

// Import the new components
import HeroSlider from '../components/HeaderSlider';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import ScrollToTopButton from '../components/ScrollToTopButton';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import NewThings from './NewThings';
import WhyChoose from '../components/WhyChoose';
import OfferSlider from '../components/OfferSlider';
import DesignerCredit from '../components/DesignerCredit';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <NewThings/>
      {/* <HeroSlider /> */}
      <WhyChoose/>
      <CategorySection />
      <FeaturedProducts />
      <HowItWorks/>
      <OfferSlider/>
      <WhyChooseUs />
      <DesignerCredit />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;