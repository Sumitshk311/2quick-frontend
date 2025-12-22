import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const AppFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-700 shadow-inner backdrop-blur-md">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

        {/* Column 1: Brand */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text mb-4 tracking-wide">2Quick</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Fresh groceries, fast delivery. We bring quality and convenience to your doorstep with a smile.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 border-b-2 border-green-500 pb-2 inline-block">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-green-400 transition duration-200">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-green-400 transition duration-200">Products</Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-green-400 transition duration-200">About Us</Link>
            </li>
            <li>
              <Link to="/contactus" className="hover:text-green-400 transition duration-200">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 border-b-2 border-green-500 pb-2 inline-block">Get In Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="mr-3 text-green-400" /> Ballia, UP
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="mr-3 text-green-400" /> +91 7376098107
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FaEnvelope className="mr-3 text-green-400" /> support@2quick.com
            </li>
          </ul>
        </div>

        {/* Column 4: Social + Newsletter */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold text-white mb-4 border-b-2 border-green-500 pb-2 inline-block">Follow Us</h3>
          <div className="flex space-x-5 mb-6">
            {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-transform transform hover:scale-110 text-2xl"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} 2Quick. All rights reserved.</p>
          <div className="flex items-center space-x-3">
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
