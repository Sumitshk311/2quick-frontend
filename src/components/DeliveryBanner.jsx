import React, { useState, useEffect, useRef } from "react";

const OfferToggleBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const bannerRef = useRef(null);

  // Close banner on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bannerRef.current && !bannerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            0% { transform: translateX(120%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>

      <div className="fixed bottom-1/4 right-4 z-50 flex flex-col items-end">

        {/* Rotated Offer Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-5 py-3 rounded-tl-lg rounded-bl-lg shadow-lg font-semibold hover:opacity-90 transition-all origin-right transform rotate-90"
          >
            Free Delivery
          </button>
        )}

        {/* Offer Banner */}
        {isOpen && (
          <div
            ref={bannerRef}
            className="w-72 bg-gradient-to-br from-emerald-500 to-green-500 text-white p-6 rounded-xl shadow-2xl relative animate-slideIn"
            style={{ animation: "slideIn 0.3s ease-out" }}
          >
            <h2 className="text-xl font-bold mb-2 text-center tracking-wide">FREE DELIVERY</h2>
            <p className="text-sm text-center mb-4">on orders above ₹499</p>

            <button className="w-full bg-white text-green-600 hover:bg-gray-100 py-2 rounded-md font-semibold transition-colors">
              Shop Now
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white text-green-600 px-2 py-1 rounded-full shadow hover:bg-gray-100"
              aria-label="Close banner"
            >
              &lt;
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default OfferToggleBanner;
