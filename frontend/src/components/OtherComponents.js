import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="dark:bg-white card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 h-full">
      <figure className="relative w-full pt-[56.25%]">
        <img
          src={Image}
          alt={Title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl"
        />
      </figure>

      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title text-lg sm:text-xl font-bold line-clamp-2 mb-2 text-gray-900 dark:text-gray-800">
          {Title}
        </h2>

        <div className="flex items-center mb-2">
          <p className="text-md text-gray-600 dark:text-gray-500 mb-2">
            By {Name}
          </p>
          {Tag && (
            <span className="text-xs sm:text-sm font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {Tag}
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-700 line-clamp-3 mb-4">
          {Description}
        </p>

        <div className="card-actions justify-between items-center mt-auto">
          <span className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-600">
            Published: {Date}
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
            <h2 className="card-title text-black">{Title}</h2>
            <span className="text-xs sm:text-sm font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {Tag}
            </span>
          </div>
          <p className="text-gray-900 dark:text-gray-500 mb-2">By: {Name}</p>
          <p className="text-gray-700 dark:text-gray-700">{Description}</p>
        </div>
        <div className="card-actions justify-end">
          <p className="text-gray-600 dark:text-gray-500 text-sm">{Date}</p>
          <div>
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

export const NoPosts = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="alert bg-slate-300 text-slate-900 shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z"
            />
          </svg>
          <span>No posts available. Check back later!</span>
        </div>
      </div>
    </div>
  );
};

export const ErrorPage = ({ error }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-6">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-lg text-gray-600">{error}</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Go Back to Home
      </button>
    </div>
  );
};

export const CreationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="card w-full max-w-sm bg-white shadow-lg rounded-lg">
        <div className="card-body items-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-16 h-16 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="card-title text-xl font-bold mt-4">
            Upload Successful!
          </h2>
          <p className="text-gray-600 mt-2">
            Your file has been uploaded successfully.
          </p>
          <div className="card-actions mt-4">
            <button
              className="btn btn-primary w-full"
              onClick={() => window.location.reload()}
            >
              Create +
            </button>
            <button
              className="btn btn-primary w-full"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditedSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="card w-full max-w-sm bg-white shadow-lg rounded-lg">
        <div className="card-body items-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-16 h-16 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="card-title text-xl font-bold mt-4">
            Upload Successful!
          </h2>
          <p className="text-gray-600 mt-2">
            Your file has been uploaded successfully.
          </p>
          <div className="card-actions mt-4">
            <button
              className="btn btn-primary w-full"
              onClick={() => {
                navigate("/myblogs");
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DeletionSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  dark:bg-white">
      <div className="text-2xl font-bold text-green-600 mb-4">
        Post Deleted Successfully!
      </div>
      <div className="text-gray-600">Redirecting to My Blogs...</div>
    </div>
  );
};

export const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <span className="loading loading-dots loading-lg text-primary"></span>
    </div>
  );
};
