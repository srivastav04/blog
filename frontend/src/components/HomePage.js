import React, { useState, useRef } from "react";
import Hero from "./Hero";
import BlogSection from "./BlogSection";

export default function HomePage({ searchQuery, setSearchQuery }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center dark:bg-white">
      <Hero />
      <BlogSection searchQuery={searchQuery} />
    </div>
  );
}
