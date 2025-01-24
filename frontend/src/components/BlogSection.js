import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../apiFunctions";

const BlogCard = ({ Title, Date, Name, Image, Description, key }) => {
  return (
    <Link
      to={`/blog/${key}`}
      state={{ Title, Date, Name, Image, Description }}
      className="block hover:shadow-lg transition-shadow duration-300"
    >
      <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 h-full">
        <figure className="relative w-full pt-[56.25%]">
          {" "}
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

          <p className="text-sm text-gray-600 mb-2">By {Name}</p>

          <p className="text-sm sm:text-base text-gray-700 line-clamp-3 mb-4">
            {Description}
          </p>

          <div className="card-actions justify-between items-center mt-auto">
            <p className="text-xs sm:text-sm text-gray-500">{Date}</p>
            <button className="btn btn-primary btn-sm sm:btn-md">
              Read More
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const BlogSection = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  console.log(data);

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;
  if (!data || data.length == 0) return <div>No posts found</div>;

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Blog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array.isArray(data) &&
          data.map((blog) => (
            <BlogCard
              key={blog._id}
              Title={blog.Title}
              Date={blog.Date}
              Name={blog.Name}
              Image={blog.Image}
              Description={blog.Description}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogSection;
