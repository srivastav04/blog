import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/user.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.CONNECTION_URL;

const app = express();

// Middleware for JSON parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// API Routes
app.use("/", router);

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB connection error:", err));
