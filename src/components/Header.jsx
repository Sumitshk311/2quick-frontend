// src/components/Header.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

import { CartContext } from "../context/CartContext"; // Adjust path if needed

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(CartContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const totalCartItems = getTotalCartItems();

  return (
    <header className="bg-gradient-to-br from-green-800 via-green-600 to-lime-500 text-white p-4 shadow-lg relative z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        {" "}
        {/* Added relative for mobile logo positioning */}
        {/* Mobile Menu Button (Hamburger) - Stays on Left for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl focus:outline-none mr-4 transform active:scale-95 transition-transform duration-150"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {/* Logo/Title */}
        <h1
          className="text-2xl md:text-3xl font-extrabold tracking-wide text-white
                                flex-grow md:flex-grow-0 text-center md:text-left
                                absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          {" "}
          {/* Adjusted for mobile centering */}
          <Link
            to="/"
            className="hover:text-green-200 transition-colors duration-200"
          >
            2Quick
          </Link>
        </h1>
        {/* Desktop Navigation - Centered on Desktop */}
        <nav className="hidden md:flex flex-grow justify-center space-x-8 items-center">
          <Link
            to="/"
            className="text-white hover:text-green-200 transition-colors duration-200 text-lg font-medium relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            to="/products"
            className="text-white hover:text-green-200 transition-colors duration-200 text-lg font-medium relative group"
          >
            Products
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-green-200 transition-colors duration-200 text-lg font-medium relative group"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-green-200 transition-colors duration-200 text-lg font-medium relative group"
          >
            Contact Us
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </nav>
        {/* Mobile Cart Icon & Desktop Cart Icon - Stays on Right */}
        <div className="flex items-center ml-auto">
          <Link
            to="/cart"
            className="relative text-white hover:text-green-200 transition-colors duration-200 text-2xl transform active:scale-95"
            aria-label="View Cart"
          >
            <FaShoppingCart />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Slides from left) */}
      <div
        className={`fixed top-0 left-0 h-full text-white w-64 bg-gradient-to-br from-green-700 via-green-600 to-lime-500 shadow-xl p-6 transform transition-transform duration-300 ease-in-out z-50
    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-3xl focus:outline-none transform active:scale-95 transition-transform duration-150"
            aria-label="Close mobile menu"
          >
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            onClick={toggleMobileMenu}
            className="text-white text-xl hover:text-lime-300 transition-colors duration-200 font-semibold py-3 border-b border-white last:border-b-0 px-2 rounded-md hover:bg-green-700/50"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={toggleMobileMenu}
            className="text-white text-xl hover:text-lime-300 transition-colors duration-200 font-semibold py-3 border-b border-white last:border-b-0 px-2 rounded-md hover:bg-green-700/50"
          >
            Products
          </Link>
          <Link
            to="/about"
            onClick={toggleMobileMenu}
            className="text-white text-xl hover:text-lime-300 transition-colors duration-200 font-semibold py-3 border-b border-white last:border-b-0 px-2 rounded-md hover:bg-green-700/50"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={toggleMobileMenu}
            className="text-white text-xl hover:text-lime-300 transition-colors duration-200 font-semibold py-3 last:border-b-2 px-2 rounded-md hover:bg-green-700/50"
          >
            Contact Us
          </Link>
        </nav>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>
      )}
    </header>
  );
};

export default Header;
