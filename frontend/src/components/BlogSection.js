import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../apiFunctions";
import { BlogCard, ErrorPage, NoPosts } from "./OtherComponents";
import { Link } from "react-router-dom";

const BlogSection = ({ searchQuery }) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["posts", searchQuery || "all"],
    queryFn: () => getPosts(searchQuery),
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <span className="loading loading-dots loading-lg text-primary"></span>
    );

  if (isError) return <ErrorPage error={error.message} />;
  if (!data || data.length === 0) return <NoPosts />;

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-6 lg:gap-4 xl:gap-14">
        {Array.isArray(data) &&
          data.map((blog) => {
            const {
              Title,
              Date,
              Name,
              Image,
              Description,
              Tag,
              UpdatedAt,
              _id: id,
            } = blog;
            return (
              <Link
                to={`/blog/${id}`}
                state={{
                  Title,
                  Date,
                  Name,
                  Image,
                  Description,
                  Tag,
                  UpdatedAt,
                  id,
                }}
                className="block hover:shadow-lg transition-shadow duration-300"
                key={id}
              >
                <BlogCard
                  Title={Title}
                  Date={Date}
                  Name={Name}
                  Image={Image}
                  Description={Description}
                  Tag={Tag}
                  UpdatedAt={UpdatedAt}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default BlogSection;
