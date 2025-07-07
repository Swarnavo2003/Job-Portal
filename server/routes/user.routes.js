import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", singleUpload, register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.post(
  "/profile/update",
  isAuthenticated,
  singleUpload,
  updateProfile
);
userRouter.get("/profile", isAuthenticated, getProfile);

export default userRouter;
