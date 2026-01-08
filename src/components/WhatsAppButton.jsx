import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = ({ phoneNumber }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <div
      className="
        fixed z-50
        bottom-[120px]
        left-1/2 -translate-x-1/2
        md:left-auto md:translate-x-0 md:right-6 md:bottom-6
      "
    >
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp"
        className="
          relative flex items-center justify-center
          w-16 h-16 rounded-full
          bg-gradient-to-br from-green-500 to-green-600
          shadow-xl hover:shadow-green-400/50
          transform transition-all duration-300 hover:scale-110
        "
      >
        {/* Pulse Ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-30 animate-ping"></span>

        {/* Icon */}
        <FaWhatsapp className="text-white text-3xl relative z-10" />
      </a>
    </div>
  );
};

export default WhatsappButton;
