import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePost } from "../apiFunctions";

export default function DeletePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { Title, Date, Name, Image, Description, id } = location.state;

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);

      setTimeout(() => {
        navigate("/myblogs");
      }, 1300);
    },
  });

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-green-600 mb-4">
          Post Deleted Successfully!
        </div>
        <div className="text-gray-600">Redirecting to My Blogs...</div>
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  // Normal render state
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
          <button
            className="btn btn-error btn-sm"
            onClick={() => mutate(id)}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate("/my-blogs")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
