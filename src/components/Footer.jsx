import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const AppFooter = () => {
  return (
    <footer className="relative bg-[#0b0f14] text-gray-300 pt-20 pb-10 border-t border-green-500/20 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">

        {/* BRAND */}
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text tracking-wide">
            2Quick
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Fresh groceries, lightning-fast delivery.  
            Quality products delivered straight to your doorstep.
          </p>

          <div className="flex justify-center md:justify-start gap-4 pt-3">
            <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
              🥬 Fresh
            </span>
            <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
              ⚡ Fast Delivery
            </span>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {["/", "/products", "/aboutus", "/contactus"].map((path, i) => (
              <li key={i}>
                <Link
                  to={path}
                  className="hover:text-green-400 transition-all hover:translate-x-1 inline-block"
                >
                  {["Home", "Products", "About Us", "Contact Us"][i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <FaMapMarkerAlt className="text-green-400" /> Ballia, UP
            </li>
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <FaPhoneAlt className="text-green-400" /> +91 7376098107
            </li>
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <FaEnvelope className="text-green-400" /> support@2quick.com
            </li>
          </ul>
        </div>

        {/* SOCIAL + NEWSLETTER */}
        <div className="space-y-6 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Follow Us</h3>

          <div className="flex justify-center md:justify-start gap-5">
            {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-green-400 hover:border-green-500 transition-all hover:scale-110 shadow-lg"
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-sm text-gray-400 mb-2">Subscribe for offers 🔥</p>
            <div className="flex bg-white/5 border border-white/10 rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-4 py-2 text-sm outline-none flex-1 text-white placeholder-gray-500"
              />
              <button className="bg-green-600 px-5 text-sm font-bold hover:bg-green-700 transition">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 mt-16 pt-6 text-sm text-gray-500">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} 2Quick. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <span className="text-white font-medium">We Accept:</span>
            <img
              src="https://th.bing.com/th/id/OIP.76Qx33h4NpLAYCm2DopELwHaHa?w=161&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              alt="UPI"
              className="h-7 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
