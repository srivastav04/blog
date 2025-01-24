import express from "express";
import {
  getUserdata,
  sendUserData,
  upload,
  editUserData,
  deleteUserData,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", sendUserData);
router.post("/create", upload.single("Image"), getUserdata);
router.patch("/edit/:id", upload.single("Image"), editUserData);
router.delete("/delete/:id", deleteUserData);

export default router;
