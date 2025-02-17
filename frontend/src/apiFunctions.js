import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getPosts = async (search) => {
  if (search.length <= 1) {
    search = "";
  }
  const endpoint = search ? `${API_URL}/${search}` : `${API_URL}/none`; // Adjust for all posts
  const { data } = await axios.get(endpoint);
  return data;
};

export const createPost = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, formData);
    return response.data;
  } catch (error) {
    console.log("Error creating post:", error);
  }
};

export const editPost = async (formData, id) => {
  try {
    const { status } = await axios.patch(`${API_URL}/edit/${id}`, formData);
    return status;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.status;
};

export const getUserPosts = async (userName) => {
  const response = await axios.get(`${API_URL}/user/${userName}`);
  return response.data;
};
