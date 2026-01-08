// src/components/Header.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(CartContext);

  const totalCartItems = getTotalCartItems();

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-br from-green-800 via-green-600 to-lime-500 text-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-2xl"
          >
            <FaBars />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="2Quick Logo"
              className="h-16 md:h-17 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 font-medium">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
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
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-700 p-6 transition-transform duration-300 z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-2xl mb-6"
        >
          <FaTimes />
        </button>

        <nav className="flex flex-col space-y-4 text-lg">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>
            Products
          </Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
