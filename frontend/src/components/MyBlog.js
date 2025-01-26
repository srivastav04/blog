import React from "react";
import { useLocation } from "react-router-dom";
import { MyBlogCard } from "./OtherComponents";
export default function MyBlog() {
  const location = useLocation();
  const { Title, Date, Name, Image, Description, Tag, Likes, id } =
    location.state;
  console.log(Title, Date, Name, Image, Description, Tag, Likes, id);

  return (
    <div className="w-auto h-auto flex items-center justify-center px-2 py-8 dark:bg-white">
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
