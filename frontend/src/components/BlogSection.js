import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../apiFunctions";
import { BlogCard } from "./OtherComponents";

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
              Tag={blog.Tag}
              Likes={blog.Likes}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogSection;
