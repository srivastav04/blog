import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../apiFunctions";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isSuccess, isPending, i } = useMutation({
    mutationFn: createPost,
  });

  if (isSuccess) {
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
              <button className="btn btn-primary w-full">Back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);

      const formData = new FormData();
      formData.append("Title", data.Title);
      formData.append("Name", data.Name);
      formData.append("Date", data.Date);
      formData.append("Description", data.Description);

      if (data.Image && data.Image[0]) {
        formData.append("Image", data.Image[0]);
        console.log("File being uploaded:", data.Image[0].name);
      }
      mutate(formData);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Submit Your Details
        </h2>
        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            capture="environment"
            {...register("Title", {
              required: { value: true, message: "required" },
            })}
            placeholder="Enter the title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.Title && <p>{errors.Title.message}</p>}
        </div>
        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            placeholder="Enter your name"
            capture="environment"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("Name", {
              required: { value: true, message: "required" },
              minLength: { value: 5, message: "min_len 5" },
            })}
          />
          {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
        </div>
        {/* Date */}
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 font-medium mb-2"
          >
            Date
          </label>
          <input
            type="date"
            capture="environment"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("Date", {
              required: { value: true, message: "enter date" },
            })}
          />
          {errors.Date && <p className="text-red-500">{errors.Date.message}</p>}
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
            capture="environment"
            {...register("Description", {
              required: { value: true, message: "Description is required" },
              minLength: {
                value: 10,
                message: "Minimum 10 characters required",
              },
            })}
            placeholder="Enter blog description"
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.Description && (
            <p className="text-red-500">{errors.Description.message}</p>
          )}
        </div>
        {/* Mobile-friendly file input */}
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
            {...register("Image", {
              required: "Image is required",
            })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.Image && (
            <p className="text-red-500 text-sm mt-1">{errors.Image.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
