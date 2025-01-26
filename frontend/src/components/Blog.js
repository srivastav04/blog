import React from "react";
import { useLocation } from "react-router-dom";

export default function Blog() {
  const location = useLocation();
  const { Title, Name, Image, Description, Date, Tag, UpdatedAt } =
    location.state;

  return (
    <div className="w-auto h-auto   py-10 flex items-center justify-center  dark:bg-white">
      <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-5xl mx-3">
        <figure className="w-full lg:w-1/2">
          <img src={Image} alt={Image} className="w-full h-full object-cover" />
        </figure>

        <div className="card-body w-full lg:w-1/2 bg-white">
          <div className="flex items-center justify-between mb-2">
            {" "}
            <h2 className="card-title text-2xl font-bold">{Title}</h2>
            <span className="text-xs sm:text-sm font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {Tag}
            </span>
          </div>
          <h4 className="text-gray-700">
            By:<span>{Name}</span>
          </h4>
          <p className="text-gray-900 font-sans">{Description}</p>
          <div className="card-actions justify-between items-center mt-3">
            <span className="text-sm sm:text-base font-medium text-gray-700">
              {Date}
            </span>
            <span className="text-sm sm:text-base font-medium text-gray-700">
              {UpdatedAt ? <p>Updated at: {UpdatedAt}</p> : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
