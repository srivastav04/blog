import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePost } from "../apiFunctions";
import { DeletionSuccess } from "./OtherComponents";

export default function DeletePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { Title, Date, Name, Image, Description, id, Tag } = location.state;

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);

      setTimeout(() => {
        navigate("/myblogs");
      }, 1300);
    },
  });

  if (isSuccess) return <DeletionSuccess />;
  if (isPending) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-screen h-fit flex justify-center items-center py-8 px-2 dark:bg-white">
      <div className="card lg:card-side bg-base-100 shadow-xl mb-6 dark:bg-white">
        <figure className="lg:w-1/3">
          <img src={Image} alt={Title} className="h-full w-full object-cover" />
        </figure>
        <div className="card-body lg:w-2/3">
          <div>
            <div className="flex items-center justify-between mb-2">
              {" "}
              <h2 className="card-title ">{Title}</h2>{" "}
              <span className="text-xs sm:text-sm font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {Tag}
              </span>
            </div>
            <p className="text-gray-600 mb-2">By:{Name}</p> <p>{Description}</p>
          </div>
          <div className="card-actions justify-end">
            <p className="text-gray-500 text-sm">{Date}</p>
            <div>
              <button
                className="btn btn-error btn-sm"
                onClick={() => mutate(id)}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
              <button
                className="btn btn-ghost btn-sm ml-2"
                onClick={() => navigate(`/myblogs/`)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}
