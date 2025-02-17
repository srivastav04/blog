import { Link, useLocation } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import SearchContext from "../context/SearchContext";
import { useQueryClient } from "@tanstack/react-query";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setSearchQuery, searchQuery } = useContext(SearchContext);
  const location = useLocation();
  const queryClient = useQueryClient();
  const { user } = useUser();

  useEffect(() => {
    if (searchQuery === "") {
      queryClient.invalidateQueries(["posts"]);
    }
  }, [searchQuery, queryClient]);

  return (
    <>
      <nav className="shadow-md w-full z-20 dark:bg-white dark:text-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 ">
            {/* Logo (Hidden on smaller screens) */}
            <h1 className="hidden md:block">
              <b className="font-LavishlyYours text-2xl">Bloog</b>
            </h1>
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
                className={`text-gray-400 font-medium transition-colors ${
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
              {user ? (
                <SignOutButton
                  redirectUrl="/"
                  className="text-gray-400 font-medium transition-colors  "
                />
              ) : (
                <SignInButton
                  redirectUrl="/"
                  className="text-gray-400 font-medium transition-colors  "
                />
              )}
            </div>

            {/* Search Bar */}
            <div className="w-auto flex sm:w-[300px]">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered rounded-r-none   w-full max-w-xs dark:bg-white dark:text-gray-800"
              />
              <button
                className="btn btn-primary rounded-l-none"
                onClick={() => {
                  console.log("he");
                  queryClient.invalidateQueries(["posts"]);
                }}
              >
                <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
              </button>
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
          <h1 className="md:hidden mb-4">
            <b className="font-LavishlyYours text-2xl text-black ">Bloog</b>
          </h1>

          <div className="px-2 py-2 text-lg font-medium text-gray-800 dark:text-gray-950 flex justify-start ">
            <UserButton />
            <h1 className="ml-2">{user && user.fullName}</h1>
          </div>
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
          {user ? (
            <SignOutButton
              redirectUrl="/"
              className="block py-2 px-4 text-lg font-medium text-gray-800 dark:text-gray-950 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white rounded-md transition-colors"
            />
          ) : (
            <SignInButton
              redirectUrl="/"
              className="block py-2 px-4 text-lg font-medium text-gray-800 dark:text-gray-950 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white rounded-md transition-colors"
            />
          )}
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
