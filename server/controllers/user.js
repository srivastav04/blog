import users from "../models/user.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
async function getUserdata(req, res) {
  const { Title, Name, Date, Description } = req.body;
  const imageUrl = `https://blooog-ew1p.onrender.com/uploads/${req.file.filename}`;

  const newUser = new users({
    Title,
    Name,
    Date,
    Description,
    Image: imageUrl,
  });
  await newUser.save();

  res.json(newUser);
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
      return res.json(data);
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
    Image = `https://blooog-ew1p.onrender.com/uploads/${req.file.filename}`;
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
