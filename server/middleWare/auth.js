import UserModel from "../models/User.js";
import { catchError } from "../utils/catchError.js";
import { AppError } from "../utils/ErrorMessage.js";
import jwt from "jsonwebtoken";

export const protectRoutes = catchError(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Not Authorized", 401));

  let payload = jwt.verify(token, process.env.JWT_SECRET);
  if (!payload) return next(new AppError("Invalid or expired token"));

  const user = await UserModel.findById(payload.id).select("-password");
  if (!user) return next(new AppError("User not found", 404));

  req.user = user;

  next();
});
