import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className=" shadow-md w-full z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold">
                Logo
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 font-sans">
              <Link
                to="/"
                className={` text-gray-400 font-medium transition-colors ${
                  location.pathname === "/" ? "font-bold text-gray-800" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/myblogs"
                className={` text-gray-400 font-medium transition-colors ${
                  location.pathname === "/myblogs"
                    ? "font-bold text-gray-800"
                    : ""
                }`}
              >
                My Blogs
              </Link>
              <Link
                to="/create"
                className={` text-gray-400 font-medium transition-colors ${
                  location.pathname === "/create"
                    ? "font-bold text-gray-800"
                    : ""
                }`}
              >
                Create Blog
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-800 hover:text-gray-400 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="white"
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
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-100 dark:bg-base-200 shadow-lg z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="pt-20 px-6 space-y-4">
          <Link
            to="/"
            className="block py-2 px-4 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white rounded-md transition-colors"
          >
            Home
          </Link>
          <Link
            to="/myblogs"
            className="block py-2 px-4 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white rounded-md transition-colors"
          >
            My Blogs
          </Link>
          <Link
            to="/create"
            className="block py-2 px-4 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white rounded-md transition-colors"
          >
            Create Blog
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;
