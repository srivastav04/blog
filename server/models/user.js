import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  Name: String,
  Title: String,
  Image: String,
  Date: String,
  Tag: { type: String, default: "Untitled" },
  Likes: { type: Number, default: 0 },
  Description: String,
});

const users = new mongoose.model("users", userSchema);

export default users;
