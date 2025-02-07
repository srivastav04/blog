import React from "react";
import { useLocation } from "react-router-dom";
import { MyBlogCard } from "./OtherComponents";
export default function MyBlog() {
  const location = useLocation();
  const { Title, Date, Name, Image, Description, Tag, Likes, id } =
    location.state;

  return (
    <div className="w-auto h-auto   py-10 flex items-center justify-center  dark:bg-white">
      <MyBlogCard
        id={id}
        Title={Title}
        Date={Date}
        Name={Name}
        Image={Image}
        Description={Description}
        Tag={Tag}
        Likes={Likes}
      />
    </div>
  );
}
