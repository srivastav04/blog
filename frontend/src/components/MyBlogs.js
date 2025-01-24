import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../apiFunctions";

const BlogCard = ({ Title, Date, Name, Image, Description, id }) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl mb-6">
      <figure className="lg:w-1/3">
        <img src={Image} alt={Title} className="h-full w-full object-cover" />
      </figure>
      <div className="card-body lg:w-2/3">
        <h2 className="card-title">{Title}</h2>
        <p className="text-gray-600">By {Name}</p>
        <p>{Description}</p>
        <p className="text-gray-500 text-sm">{Date}</p>
        <div className="card-actions justify-end">
          <Link
            to={`/edit/${id}`}
            state={{ Title, Date, Name, Image, Description, id }}
          >
            <button className="btn btn-primary btn-sm">Edit</button>
          </Link>

          <Link
            to={`/delete/${id}`}
            state={{ Title, Date, Name, Image, Description, id }}
          >
            <button
              className="btn btn-error btn-sm"
              onClick={() => console.log("hello")}
            >
              Delete
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

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
              <BlogCard
                key={blog._id}
                Title={blog.Title}
                Image={blog.Image}
                Date={blog.Date}
                Description={blog.Description}
                Name={blog.Name}
                id={blog._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
