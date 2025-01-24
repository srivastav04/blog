import React from "react";

const Hero = () => {
  return (
    <div className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to Traveler</h1>
          <p className="py-6">Start your journey with us today</p>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
