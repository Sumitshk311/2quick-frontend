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

      <div
        className="
    fixed z-40 flex flex-col items-end
    right-0
    bottom-[160px]
    md:right-4 md:bottom-24
  "
      >
        {/* Rotated Button */}
        {!isOpen && (
          <button
            className="
    bg-green-500 text-white font-semibold
    px-3 py-4
    rounded-l-xl
    shadow-lg
    writing-mode-vertical
    rotate-180
    text-sm
  "
          >
            Free Delivery
          </button>
        )}

        {/* Banner */}
        {isOpen && (
          <div
            ref={bannerRef}
            className="
              w-72 bg-gradient-to-br from-emerald-500 to-green-500
              text-white p-6 rounded-xl shadow-2xl
            "
            style={{ animation: "slideIn 0.3s ease-out" }}
          >
            <h2 className="text-xl font-bold mb-2 text-center">
              FREE DELIVERY
            </h2>
            <p className="text-sm text-center mb-4">on orders above ₹499</p>

            <button className="w-full bg-white text-green-600 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Shop Now
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="
                absolute -left-3 top-1/2 -translate-y-1/2
                bg-white text-green-600 px-2 py-1
                rounded-full shadow hover:bg-gray-100
              "
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
