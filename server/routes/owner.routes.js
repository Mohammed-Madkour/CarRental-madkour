import express from "express";
import {
  addCar,
  changeRole,
  deleteCar,
  getDashboardData,
  getOwnerCars,
  toggleCarAvailability,
  updateUserImage,
} from "../controllers/owner.controller.js";
import { protectRoutes } from "../middleWare/auth.js";
import { addCarValidation } from "../validation/addCarValidation.js";
import upload from "../middleWare/multer.js";
import { validate } from "../middleWare/validate.js";

export const ownerRouter = express.Router();

ownerRouter.post("/change-role", protectRoutes, changeRole);
ownerRouter.post(
  "/add-car",
  protectRoutes,
  upload.single("image"),
  addCar
);
ownerRouter.get("/get-car", protectRoutes, getOwnerCars);
ownerRouter.post("/toggle-car", protectRoutes, toggleCarAvailability);
ownerRouter.delete("/delete-car", protectRoutes, deleteCar);
ownerRouter.get("/dashboard", protectRoutes, getDashboardData);
ownerRouter.post(
  "/update-image",
  protectRoutes,
  upload.single("image"),
  updateUserImage
);
