import express from "express";
import {
  getUserdata,
  sendUserData,
  upload,
  editUserData,
  deleteUserData,
  filterUserData,
} from "../controllers/user.js";

const router = express.Router();

router.get("/:search", sendUserData);
router.post("/create", upload.single("Image"), getUserdata);
router.patch("/edit/:id", upload.single("Image"), editUserData);
router.delete("/delete/:id", deleteUserData);
router.get("/filter/:tag", filterUserData);

export default router;
