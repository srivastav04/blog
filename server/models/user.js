import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  Name: String,
  Title: String,
  Image: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDpYgKX6Na9EAfhKgjLD4iyPugeNE0wggdkw&s",
  },
  Date: String,
  Tag: String,
  UpdatedAt: { type: String, default: null },
  Description: String,
});

const users = new mongoose.model("users", userSchema);

export default users;
