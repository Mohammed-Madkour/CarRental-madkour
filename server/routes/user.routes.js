import express from "express";
import {
  getCars,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { validate } from "../middleWare/validate.js";
import { addUserValidation } from "../validation/addUserValidation.js";
import { protectRoutes } from "../middleWare/auth.js";

const userRouter = express.Router();

userRouter.post("/register", validate(addUserValidation), registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protectRoutes, getUserData);
userRouter.get("/cars",  getCars);

export default userRouter;
