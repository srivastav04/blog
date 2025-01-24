import { Link } from "react-router-dom";

import React, { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              Logo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/myblogs" className="text-gray-800 hover:text-gray-400">
              My Blogs
            </Link>
            <Link to="/create" className="text-gray-800 hover:text-gray-400">
              Create Blog
            </Link>

            <Link to="/sign-in" className="text-gray-800 hover:text-gray-400">
              Sign-In
            </Link>
            <Link to="/sign-up" className="text-gray-800 hover:text-gray-400">
              Sign-Up
            </Link>
            {/* <div className="relative group"></div> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <Link
              to="/myblogs"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              <p onClick={() => setIsOpen(!isOpen)}> My Blogs</p>
            </Link>
            <Link
              to="/create"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              <p onClick={() => setIsOpen(!isOpen)}>Create Blog</p>
            </Link>
            <Link
              to="/sign-up"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              <p onClick={() => setIsOpen(!isOpen)}> Sign-Up</p>
            </Link>
            <Link
              to="/sign-in"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              <p onClick={() => setIsOpen(!isOpen)}>Sign_In</p>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
