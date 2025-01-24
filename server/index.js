import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/user.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.CONNECTION_URL;

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("uploads"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.29.233:3000"],
  })
);
app.use("/", router);

mongoose
  .connect(MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log("Working")))
  .catch((err) => console.log(err));
