import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MyBlogCard } from "./OtherComponents";
import { getPosts } from "../apiFunctions";

const MyBlogs = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;
  if (!data || data.length == 0) return <div>No posts found</div>;

  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-gray-100 text-gray-800 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">My Blogs</h1>
          <p className="mt-2">Manage your travel stories</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {data &&
            data.map((blog) => (
              <MyBlogCard
                key={blog._id}
                Title={blog.Title}
                Image={blog.Image}
                Date={blog.Date}
                Description={blog.Description}
                Name={blog.Name}
                Tag={blog.Tag}
                Likes={blog.Likes}
                id={blog._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
