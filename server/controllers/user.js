import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import users from "../models/user.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "uploads",
    public_id: (req, file) => {
      const originalNameWithoutExt = path.parse(file.originalname).name;
      return Date.now() + "_" + originalNameWithoutExt;
    },
  },
});

const upload = multer({ storage });

async function getUserdata(req, res) {
  const { Title, Name, Date, Description, Tag } = req.body;

  let Image = req.file ? req.file.path : undefined;
  try {
    const newPost = new users({
      Title,
      Name,
      Date,
      Description,
      Tag: Tag != "" ? Tag : "Untitled",
      Image: Image && Image.toString(),
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error deleting data", error });
  }
}

async function sendUserData(req, res) {
  try {
    const search = req.params.search;
    if (search !== "none") {
      const data = await users.find({
        Tag: { $regex: search, $options: "i" },
      });
      return res.json(data);
    } else {
      console.log("Returning all data...");
      const data = await users.find({});
      return res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
}

async function editUserData(req, res) {
  const { id } = req.params;
  const { Title, Name, Date, Description, Tag } = req.body;

  try {
    const post = await users.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let imageUrl = post.Image;
    if (req.file) {
      const publicId = post.Image.split("/")
        .slice(-2)
        .join("/")
        .replace(/\.[^/.]+$/, "");

      await cloudinary.v2.uploader.destroy(publicId);
      imageUrl = req.file.path;
    }
    const updatedPost = await users.findByIdAndUpdate(
      id,
      {
        Tag,
        Title,
        Name,
        Date,
        UpdatedAt: Date,
        Description,
        Image: imageUrl,
      },
      { new: true }
    );

    return res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error editing data", error });
  }
}

async function deleteUserData(req, res) {
  const { id } = req.params;

  try {
    const post = await users.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const publicId = post.Image.split("/")
      .slice(-2)
      .join("/")
      .replace(/\.[^/.]+$/, "");

    await cloudinary.v2.uploader.destroy(publicId);
    await users.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data", error });
  }
}

async function getUserPosts(req, res) {
  const { userName } = req.params;

  try {
    if (userName == "Sri Vasthav") {
      const allBlogs = await users.find({});
      res.status(200).json(allBlogs);
    } else {
      const allBlogs = await users.find({ Name: userName });
      res.status(200).json(allBlogs);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
}

export {
  getUserdata,
  sendUserData,
  upload,
  editUserData,
  deleteUserData,
  getUserPosts,
};
