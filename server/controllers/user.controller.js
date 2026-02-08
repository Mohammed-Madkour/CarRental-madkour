import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { catchError } from "../utils/catchError.js";
import { AppError } from "../utils/ErrorMessage.js";
import CarModel from "../models/Car.js";

const generateToken = (userId) => {
  const payload = { id: userId };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// register User
export const registerUser = catchError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new AppError("fill all the fields", 400));
  }
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    return next(new AppError("User Already Exsits", 400));
  }
  const hassedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    name,
    email,
    password: hassedPassword,
  });

  const token = generateToken(user._id.toString());
  return res.status(200).json({
    statusMessage: "success",
    message: "signed up successfully",
    token,
  });
});

// Login User
export const loginUser = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      const token = generateToken(user._id.toString());
      return res.status(200).json({
        statusMessage: "success",
        message: "logged in successfully",
        token,
      });
    } else {
      return next(new AppError("Invalid Credentials", 400));
    }
  } else {
    return next(new AppError("User not found", 404));
  }
});

// Get User Data Using token (JWT)
export const getUserData = catchError(async (req, res, next) => {
  const { user } = req;
  res.status(201).json({ statusMessage: "success", user: user });
});

export const getCars = catchError(async (req, res, next) => {
  const cars = await CarModel.find({ isAvailable: true });
  res.status(200).json({
    statusMessage: "success",
    cars,
  });
});
