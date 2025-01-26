import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../apiFunctions";
import { useNavigate } from "react-router-dom";
import { CreationSuccess, Loading } from "./OtherComponents";

const Form = () => {
  const today = new Date();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: createPost,
  });

  if (isSuccess) return <CreationSuccess />;
  if (isPending) return <Loading />;

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);

      const formData = new FormData();
      formData.append("Title", data.Title);
      formData.append("Name", data.Name);
      formData.append("Date", today.toISOString().split("T")[0]);
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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 sm:px-6 lg:px-8">
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
          {errors.Title && (
            <p className="text-red-500">{errors.Title.message}</p>
          )}
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
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Tag
          </label>
          <input
            placeholder="recommended to keep it short"
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
        <button
          className="w-full bg-gray-200 text-black font-bold py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default Form;
