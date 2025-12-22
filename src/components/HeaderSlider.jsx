import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'; // Font Awesome 6 icons

// Import your banner images
import bannerImg1 from "../assets/banner1.jpg";
import bannerImg2 from "../assets/banner2.jpg";
import bannerImg3 from "../assets/banner3.jpg";

const bannerSlides = [
  {
    id: 1,
    image: bannerImg1,
    title: "Fresh & Affordable Groceries",
    subtitle: "Delivered to your doorstep with care",
    link: "/products",
    linkText: "Shop Now",
  },
  {
    id: 2,
    image: bannerImg2,
    title: "Organic Goodness, Naturally Fresh",
    subtitle: "Sourced directly from local farms",
    link: "/products",
    linkText: "Explore Organic",
  },
  {
    id: 3,
    image: bannerImg3,
    title: "Daily Deals & Exclusive Offers",
    subtitle: "Save big on your favorite essentials",
    link: "/products",
    linkText: "View Deals",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, []);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  return (
    <div className="relative h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden">
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.image} alt={`Grocery Banner ${slide.id}`} className="w-full h-full object-cover brightness-[0.7] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg animate-slideInUp">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl drop-shadow-md animate-fadeIn delay-300">
              {slide.subtitle}
            </p>
            <Link
              to={slide.link}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 flex items-center group animate-fadeIn delay-500"
            >
              {slide.linkText} <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      ))}

      {/* Slider Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full focus:outline-none transition-colors duration-300 z-10"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full focus:outline-none transition-colors duration-300 z-10"
        aria-label="Next slide"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Slider Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;