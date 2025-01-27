import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import users from "../models/user.js";
import dotenv from "dotenv";

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
    format: async (req, file) => "jpg",
    public_id: (req, file) => Date.now() + "_" + file.originalname,
  },
});

const upload = multer({ storage });

async function getUserdata(req, res) {
  try {
    const { Title, Name, Date, Description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Uploaded file details:", req.file);

    const imageUrl = req.file.path; // Cloudinary URL
    console.log("Image URL:", imageUrl);

    const newUser = new users({
      Title,
      Name,
      Date,
      Description,
      Image: imageUrl,
    });

    await newUser.save();
    console.log("New user saved:", newUser);

    res.json(newUser);
  } catch (error) {
    console.error("Error in getUserdata:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function sendUserData(req, res) {
  try {
    const search = req.params.search;

    // Perform case-insensitive search on `Title` or other relevant fields
    if (search !== "none") {
      console.log("something search");
      const data = await users.find({
        Tag: { $regex: search, $options: "i" },
      });
      return res.json(data);
    } else {
      console.log("empty search");

      const data = await users.find({});
      return res.json(data).status(200);
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
}

async function editUserData(req, res) {
  var { Image, Description, Name, Title, Date, UpdatedAt, Tag } = req.body;
  const { id } = req.params;

  if (req.file) {
    Image = req.file.path; // Use Cloudinary URL
  }

  const updatedData = await users.findOneAndUpdate(
    { _id: id },
    {
      Title,
      Name,
      Date,
      Description,
      Image,
      UpdatedAt,
      Tag,
    }
  );
  await updatedData.save();
  const data = await users.find({});
  res.json(data);
}

async function deleteUserData(req, res) {
  const { id } = req.params;
  const deleteUser = await users.findByIdAndDelete({ _id: id });
  console.log(deleteUser);
  res.status(200).json({ success: true });
}

async function filterUserData(req, res) {
  const { tag } = req.params;
  const data = await users.find({ Tag: tag });
  res.json(data);
}

export {
  getUserdata,
  sendUserData,
  upload,
  editUserData,
  deleteUserData,
  filterUserData,
};
