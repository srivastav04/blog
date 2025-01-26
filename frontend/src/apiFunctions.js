import axios from "axios";

const API_URL = "http://192.168.29.233:8000";

export const getPosts = async (search = "") => {
  const endpoint = search ? `${API_URL}/${search}` : `${API_URL}/none`; // Adjust for all posts
  const { data } = await axios.get(endpoint);
  return data;
};

export const createPost = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, formData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
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

export const filterPosts = async (tag) => {
  const { data } = await axios.get(`${API_URL}/filter/${tag}`);
  return data;
};
