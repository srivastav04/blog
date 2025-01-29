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
  let Image = req.file
    ? req.file.path
    : "https://images.unsplash.com/photo-1656489782764-443559c29211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  try {
    const newPost = new users({
      Title,
      Name,
      Date,
      Description,
      Tag,
      Image,
      UpdatedAt: Date.now(),
    });
    await newPost.save();
    console.log("Data saved successfully", Image);

    res.status(201).json(newPost);
  } catch (error) {
    console.log("Error saving data:", error);
    res.status(500).json({ message: "Error saving data" });
  }
}

async function sendUserData(req, res) {
  try {
    const search = req.params.search;

    if (search !== "none") {
      console.log("Performing search...");
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
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs" });
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

      console.log("Deleting image with public_id:", publicId);

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
    console.error("Error updating data:", error); // Fixing the error logging
    res.status(500).json({ message: "Error updating data" });
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

    console.log("Deleting image with public_id:", publicId);

    await cloudinary.v2.uploader.destroy(publicId);

    await users.findByIdAndDelete(id);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Error deleting data" });
  }
}

async function filterUserData(req, res) {
  const { tag } = req.params;

  try {
    const data = await users.find({ Tag: tag });
    res.json(data);
  } catch (error) {
    console.error("Error filtering data:", error);
    res.status(500).json({ message: "Error filtering data" });
  }
}

export {
  getUserdata,
  sendUserData,
  upload,
  editUserData,
  deleteUserData,
  filterUserData,
};
// uploads/1738068759069_133589529143455583
