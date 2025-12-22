import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6'; // From 'fa6'

const ScrollToTopButton = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScrollToTop) {
    return null; // Don't render if not visible
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 focus:outline-none z-50 animate-bounceIn"
      aria-label="Scroll to top"
    >
      <FaArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;