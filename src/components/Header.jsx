// src/components/Header.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(CartContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const totalCartItems = getTotalCartItems();

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-br from-green-800 via-green-600 to-lime-500 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl mr-4"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Logo */}
        <h1 className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <Link to="/">
            <img src={logo} alt="2Quick Logo" className="h-10 w-auto" />
          </Link>
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>

        {/* Cart */}
        <Link to="/cart" className="relative text-2xl">
          <FaShoppingCart />
          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs h-5 w-5 flex items-center justify-center rounded-full">
              {totalCartItems}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-700 p-6 transition-transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-50`}
      >
        <button onClick={toggleMobileMenu} className="text-2xl mb-6">
          <FaTimes />
        </button>
        <nav className="flex flex-col space-y-4">
          <Link to="/" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/products" onClick={toggleMobileMenu}>Products</Link>
          <Link to="/about" onClick={toggleMobileMenu}>About</Link>
          <Link to="/contact" onClick={toggleMobileMenu}>Contact</Link>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </header>
  );
};

export default Header;
