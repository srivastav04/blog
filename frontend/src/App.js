import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import MyBlogSection from "./components/MyBlogSection";
import Form from "./components/Form";
import Blog from "./components/Blog";
import EditPage from "./components/EditPage";
import DeletePage from "./components/DeletePage";
import HomePage from "./components/HomePage";
import MyBlog from "./components/MyBlog";

const App = () => {
  const location = useLocation();
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/myblogs" element={<MyBlogSection />} />
        <Route path="/create" element={<Form />} />
        <Route path="/blog/:Title" element={<Blog />} />
        <Route path="/myblog/:id" element={<MyBlog />} />
        <Route path="/edit/:id" element={<EditPage />} />

        <Route path="/delete/:id" element={<DeletePage />} />
      </Routes>
      {location.pathname.startsWith("/myblog/") ||
      location.pathname.startsWith("/delete/") ? null : (
        <Footer />
      )}
    </div>
  );
};

export default App;
