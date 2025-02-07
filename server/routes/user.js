import express from "express";
import {
  getUserdata,
  sendUserData,
  upload,
  editUserData,
  deleteUserData,
  getUserPosts,
  testFunct,
} from "../controllers/user.js";

const router = express.Router();

router.get("/:search", sendUserData);
router.post("/create", upload.single("Image"), getUserdata);
router.patch("/edit/:id", upload.single("Image"), editUserData);
router.delete("/delete/:id", deleteUserData);
router.get("/user/:userName", getUserPosts);
export default router;
