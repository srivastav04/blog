import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { BlogCard, ErrorPage, Loading, NoPosts } from "./OtherComponents";
import { getUserPosts } from "../apiFunctions";
import { Link } from "react-router-dom";
import SearchContext from "../context/SearchContext";
import { useUser } from "@clerk/clerk-react";

const MyBlogs = () => {
  const { user } = useUser();
  const { searchQuery } = useContext(SearchContext);
  console.log("search_query in myBlogs", searchQuery);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getUserPosts(user.fullName),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  if (isError) return <ErrorPage error={error.message} />;
  if (!data || data.length === 0) return <NoPosts />;

  return (
    <div className="min-h-screen bg-base-200 mb-1">
      <div className="bg-gray-100 text-gray-800 py-8">
        <div className="container  px-4">
          <h1 className="text-3xl font-bold ">{user.fullName} Blogs</h1>
          <p className="mt-2">Manage your stories</p>
        </div>
      </div>

      <div className="dark:bg-white grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 py-4 px-4">
        {data &&
          data.map((blog) => {
            const {
              Title,
              Date,
              Name,
              Image,
              Description,
              Tag,
              Likes,
              _id: id,
            } = blog;
            return (
              <Link
                to={`/myblog/${id}`}
                state={{
                  Title,
                  Date,
                  Name,
                  Image,
                  Description,
                  Tag,
                  Likes,
                  id,
                }}
                className="block hover:shadow-lg transition-shadow duration-300"
              >
                <BlogCard
                  key={id}
                  Title={Title}
                  Date={Date}
                  Name={Name}
                  Image={Image}
                  Description={Description}
                  Tag={Tag}
                  Likes={Likes}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default MyBlogs;
