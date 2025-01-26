import React, { useState } from "react";
import Hero from "./Hero";
import BlogSection from "./BlogSection";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full flex items-center justify-around mt-6 sm:mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold font-sans">Blog</h2>
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
  );
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState(undefined);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center dark:bg-white">
      <Hero />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BlogSection searchQuery={searchQuery} />
    </div>
  );
}
