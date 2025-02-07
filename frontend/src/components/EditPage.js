import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../apiFunctions";
import { EditedSuccess, Loading } from "./OtherComponents";

export default function EditPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    Title,
    Name,
    Image,
    Description,
    Date: date,
    id,
    Tag,
  } = location.state;
  const queryClient = useQueryClient();
  const today = new Date();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Title: Title,
      Name: Name,
      Date: date,
      Description: Description,
      Tag: Tag,
    },
  });

  const { mutate, isLoading, isSuccess, isPending } = useMutation({
    mutationFn: (formData) => editPost(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Edit error:", error);
    },
  });
  if (isSuccess) {
    return <EditedSuccess />;
  }
  if (isLoading || isPending) {
    return <Loading />;
  }

  const onSubmit = async (data) => {
    try {
      console.log("Form data received:", data);

      const formData = new FormData();

      formData.append(
        "Title",
        data.Title.charAt(0).toUpperCase() + data.Title.slice(1) || Title
      );
      formData.append(
        "Name",
        data.Name.charAt(0).toUpperCase() + data.Name.slice(1) || Name
      );
      formData.append("Date", today.toISOString().split("T")[0]);
      formData.append(
        "Description",
        data.Description.charAt(0).toUpperCase() + data.Description.slice(1) ||
          Description
      );
      formData.append("Tag", data.Tag || Tag);
      formData.append("UpdatedAt", today.toISOString().split("T")[0]);

      if (data.Image && data.Image[0]) {
        formData.append("Image", data.Image[0]);
        console.log("New image being uploaded:", data.Image[0].name);
      } else {
        formData.append("Image", Image);
        console.log("Using existing image:", Image);
      }

      for (let pair of formData.entries()) {
        console.log("FormData entry:", pair[0], pair[1]);
      }

      console.log("ID being sent:", id);
      mutate(formData);
    } catch {
      if (errors.Title) {
        console.error("Error in Title field:", errors.Title.message);
      }
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-white h-fit py-4 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Submit Your Details
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            defaultValue={Title}
            type="text"
            capture="environment"
            {...register("Title")}
            placeholder="Enter the title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Name */}

        <div className="mb-4">
          <label htmlFor="tag" className="block text-gray-700 font-medium mb-2">
            Tag
          </label>
          <input
            defaultValue={Tag}
            placeholder="tag"
            capture="environment"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("Tag")}
          />
        </div>
        {/* Description - New Field */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            defaultValue={Description}
            capture="environment"
            {...register("Description")}
            placeholder="Enter blog description"
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="Image"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="Image"
            accept="image/*"
            {...register("Image")}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
        <button
          className="w-full bg-gray-200 text-black font-bold py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
          onClick={() => navigate("/myblogs")}
        >
          Back
        </button>
      </form>
    </div>
  );
}
