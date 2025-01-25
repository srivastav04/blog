import { Link } from "react-router-dom";

import React, { useState } from "react";

const NavBar = () => {
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
            <Link to="/" className="text-gray-800 hover:text-gray-400">
              Home
            </Link>
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

          <div className="drawer md:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn btn-primary drawer-button"
              >
                Open drawer
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
