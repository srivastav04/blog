import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import router from "./routes/user.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.CONNECTION_URL;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

// Middleware for JSON parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve static files for file uploads
app.use(express.static("uploads"));

// CORS configuration based on the environment
if (NODE_ENV === "production") {
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*", // Use your production URL here
    })
  );
} else {
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://192.168.29.233:3000"], // Development URLs
    })
  );
}

// API Routes
app.use("/", router);

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Serve React front-end in production
if (NODE_ENV === "production") {
  // Serve static files from the React app (if you've built it using `npm run build`)
  app.use(express.static(path.join(__dirname, "client/build")));

  // For any route that doesn't match an API route, serve the React front-end app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
