import React from "react";
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
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignUpOrSignIn } from "./components/OtherComponents";

const App = () => {
  const location = useLocation();
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/myblogs"
          element={
            <>
              <SignedIn>
                <MyBlogSection />
              </SignedIn>
              <SignedOut>
                <SignUpOrSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <SignedIn>
                <Form />
              </SignedIn>
              <SignedOut>
                <SignUpOrSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/blog/:Title"
          element={
            <>
              <SignedIn>
                <Blog />
              </SignedIn>
              <SignedOut>
                <SignUpOrSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/myblog/:id"
          element={
            <>
              <SignedIn>
                <MyBlog />
              </SignedIn>
              <SignedOut>
                <SignUpOrSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <>
              <SignedIn>
                <EditPage />
              </SignedIn>
              <SignedOut>
                <SignUpOrSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/delete/:id"
          element={
            <>
              <SignedIn>
                <DeletePage />
              </SignedIn>
              <SignedOut>
                <SignUpOrSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
      {location.pathname.startsWith("/myblog/") ||
      location.pathname.startsWith("/delete/") ? null : (
        <Footer />
      )}
    </div>
  );
};

export default App;
