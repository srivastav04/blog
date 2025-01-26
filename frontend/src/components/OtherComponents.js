import React from "react";
import { Link } from "react-router-dom";

export const BlogCard = ({
  Title,
  Date,
  Name,
  Image,
  Description,
  key,
  Tag,
  UpdatedAt,
}) => {
  return (
    <div className=" dark:bg-white card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 h-full">
      <figure className="relative w-full pt-[56.25%]">
        <img
          src={Image}
          alt={Title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl"
        />
      </figure>

      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title text-lg sm:text-xl font-bold line-clamp-2 mb-2">
          {Title}
        </h2>

        <div className="flex items-center mb-2">
          {" "}
          <p className="text-md text-gray-600 mb-2">By {Name}</p>{" "}
          {Tag && (
            <span className="text-xs sm:text-sm font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {Tag}
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base text-gray-700 line-clamp-3 mb-4">
          {Description}
        </p>

        <div className="card-actions justify-between items-center mt-auto">
          <span className="text-sm sm:text-base font-medium text-gray-700">
            Published:{Date}
          </span>

          <div className="flex items-center space-x-2">
            <button className="btn btn-primary btn-sm sm:btn-md">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MyBlogCard = ({
  Title,
  Date,
  Name,
  Image,
  Description,
  id,
  Tag,
  UpdatedAt,
}) => {
  return (
    <div className="dark:bg-white card lg:card-side bg-base-100 shadow-xl mb-6">
      <figure className="lg:w-1/3">
        <img src={Image} alt={Title} className="h-full w-full object-cover" />
      </figure>
      <div className="card-body lg:w-2/3">
        <div>
          <div className="flex items-center justify-between mb-2">
            {" "}
            <h2 className="card-title ">{Title}</h2>{" "}
            <span className="text-xs sm:text-sm font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {Tag}
            </span>
          </div>
          <p className="text-gray-600 mb-2">By:{Name}</p> <p>{Description}</p>
        </div>
        <div className="card-actions justify-end">
          <p className="text-gray-500 text-sm">{Date}</p>
          <div>
            {" "}
            <Link
              to={`/edit/${id}`}
              state={{ Title, Date, Name, Image, Description, id, Tag }}
            >
              <button className="btn btn-primary btn-sm">Edit</button>
            </Link>
            <Link
              to={`/delete/${id}`}
              state={{ Title, Date, Name, Image, Description, id, Tag }}
            >
              <button className="btn btn-error btn-sm ml-2">Delete</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
