import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  Name: String,
  Title: String,
  Image: String,
  Date: String,
  Tag: { type: String, default: "Untitled" },
  UpdatedAt: { type: String, default: null },
  Description: String,
});

const users = new mongoose.model("users", userSchema);

export default users;
