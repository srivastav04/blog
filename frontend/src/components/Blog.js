import React from "react";
import { useLocation } from "react-router-dom";

export default function Blog() {
  const location = useLocation();
  const { Title, Name, Image, Description, Date } = location.state;

  return (
    <div className="container mt-10 mb-10 p-4 bg-white">
      <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-5xl mx-auto">
        <figure className="w-full lg:w-1/2">
          <img src={Image} alt={Image} className="w-full h-full object-cover" />
        </figure>

        <div className="card-body w-full lg:w-1/2 bg-white">
          <h2 className="card-title text-2xl font-bold">{Title}</h2>
          <h4 className="text-gray-700">
            By:<span>{Name}</span>
          </h4>
          <p className="text-gray-900 font-serif">{Description}</p>
          {/* <p className="text-sm text-gray-500 overflow-hidden max-h-40 mb-4">
            {" "}
          </p> */}
          <div className="card-actions justify-between items-center">
            <p className="text-xs text-gray-400">Published on: {Date}</p>
            <button className="btn btn-primary btn-sm">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
