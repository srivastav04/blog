import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";

const NavBar = ({ searchQuery, setSearchQuery }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="shadow-md w-full z-20 dark:bg-white dark:text-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <h1>
              <b>LOGO</b>
            </h1>

            {/* Search Bar */}
            <div className="w-auto flex items-center justify-around sm:w-[200px]">
              <label className="input input-bordered flex items-center gap-2 dark:bg-white text-gray-800">
                <input
                  type="text"
                  className="grow lg:w-64"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 font-sans">
              <Link
                to="/"
                className={`text-gray-400 font-medium transition-colors ${
                  location.pathname === "/" ? "font-bold text-gray-800" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/myblogs"
                className={`text-gray-400 font-medium transition-colors flex ${
                  location.pathname === "/myblogs"
                    ? "font-bold text-gray-800"
                    : ""
                }`}
              >
                My Blogs
              </Link>
              <Link
                to="/create"
                className={`text-gray-400 font-medium transition-colors ${
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
                  className="w-6 h-6 dark:text-white"
                  fill="none"
                  stroke="grey"
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
        className={`dark:bg-white fixed top-0 left-0 h-full w-64 bg-base-100 shadow-lg z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="pt-20 px-6 space-y-4">
          <Link
            to="/"
            onClick={() => setIsSidebarOpen(false)}
            className="block py-2 px-4 text-lg font-medium text-gray-800 dark:text-gray-950 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white rounded-md transition-colors"
          >
            Home
          </Link>
          <Link
            onClick={() => setIsSidebarOpen(false)}
            to="/myblogs"
            className="block py-2 px-4 text-lg font-medium text-gray-800 dark:text-gray-950 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white rounded-md transition-colors"
          >
            My Blogs
          </Link>
          <Link
            to="/create"
            onClick={() => setIsSidebarOpen(false)}
            className="block py-2 px-4 text-lg font-medium text-gray-800 dark:text-gray-950 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white rounded-md transition-colors"
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
