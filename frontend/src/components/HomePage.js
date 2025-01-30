import React, { useState, useRef } from "react";
import Hero from "./Hero";
import BlogSection from "./BlogSection";

export default function HomePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center dark:bg-white">
      <Hero />
      <BlogSection />
    </div>
  );
}
