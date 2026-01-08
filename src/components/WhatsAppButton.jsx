import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = ({ phoneNumber }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <div
      className="
        fixed z-50
        right-4
        bottom-[96px]
        md:bottom-6
      "
    >
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp"
        className="
          relative flex items-center justify-center
          w-14 h-14 md:w-16 md:h-16
          rounded-full
          bg-gradient-to-br from-green-500 to-green-600
          shadow-xl
          transition-transform duration-300 hover:scale-110
        "
      >
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-25 animate-ping"></span>
        <FaWhatsapp className="relative z-10 text-white text-2xl md:text-3xl" />
      </a>
    </div>
  );
};

export default WhatsappButton;
