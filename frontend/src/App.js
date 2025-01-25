import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import BlogSection from "./components/BlogSection";
import MyBlogs from "./components/MyBlogs";
import Form from "./components/Form";
import Blog from "./components/Blog";
import EditPage from "./components/EditPage";
import DeletePage from "./components/DeletePage";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Hero />
              {/* <BlogSection /> */}
            </>
          }
        />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/create" element={<Form />} />
        <Route path="/blog/:Title" element={<Blog />} />
        <Route path="/edit/:id" element={<EditPage />} />

        <Route path="/delete/:id" element={<DeletePage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
