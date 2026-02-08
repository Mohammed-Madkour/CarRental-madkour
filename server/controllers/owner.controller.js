import CarModel from "../models/Car.js";
import UserModel from "../models/User.js";
import { catchError } from "../utils/catchError.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import { AppError } from "../utils/ErrorMessage.js";
import { bookingModel } from "../models/Booking.js";

export const changeRole = catchError(async (req, res, next) => {
  const { _id } = req.user;
  if (!_id) return next(new AppError("Unauthorized", 401));
  await UserModel.findByIdAndUpdate(_id, { role: "owner" });
  res.json({ statusMessage: "success", message: "You can now list cars" });
});

// List Cars API
export const addCar = catchError(async (req, res, next) => {
  const { _id } = req.user;
  let car = JSON.parse(req.body.carData);
  const imageFile = req.file;

  // Upload Image to ImageKit
  const fileBuffer = fs.readFileSync(imageFile.path);
  const response = await imagekit.upload({
    file: fileBuffer,
    fileName: imageFile.originalname,
    folder: "/cars",
  });

  // Optimaize through ImageKit URL transformation
  var optimaizedImageURL = imagekit.url({
    path: response.filePath,
    transformation: [
      { width: "1280px" }, // Width Resizing
      { format: "webp" }, // Auto Compression
      { quality: "auto" }, // Convert To Modern Format
    ],
  });

  const image = optimaizedImageURL;
  await CarModel.create({ owner: _id, ...car, image });

  res.status(201).json({ statusMessage: "success", message: "Car Added", car });
});

export const getOwnerCars = catchError(async (req, res, next) => {
  const { _id } = req.user;
  const cars = await CarModel.find({ owner: _id });
  res.status(201).json({ statusMessage: "success", cars });
});

// API to Toggle Car Availability

export const toggleCarAvailability = catchError(async (req, res, next) => {
  const { _id } = req.user;
  const { carId } = req.body;
  const car = await CarModel.findById(carId);

  if (car.owner.toString() !== _id.toString()) {
    return next(new AppError("Unauthorized", 401));
  }

  car.isAvailable = !car.isAvailable;
  await car.save();

  res
    .status(201)
    .json({ statusMessage: "success", message: "Availability Toggled" });
});

// API to Delete a car
export const deleteCar = catchError(async (req, res, next) => {
  const { _id } = req.user;
  const { carId } = req.body;
  const car = await CarModel.findById(carId);

  if (car.owner.toString() !== _id.toString()) {
    return next(new AppError("Unauthorized", 401));
  }

  car.owner = null;
  car.isAvailability = false;
  await car.save();

  res.status(201).json({ statusMessage: "success", message: "Car Removed" });
});

// API to Get Dashboard Data
export const getDashboardData = catchError(async (req, res, next) => {
  const { _id, role } = req.user;

  if (role !== "owner") return next(new AppError("Unauthorized", 401));

  const cars = await CarModel.find({ owner: _id });
  const bookings = await bookingModel
    .find({ owner: _id })
    .populate("car")
    .sort({ createdAt: -1 });

  const pendingBookings = await bookingModel.find({
    owner: _id,
    status: "pending",
  });
  const completedBookings = await bookingModel.find({
    owner: _id,
    status: "confirmed",
  });

  const montlyRevenue = bookings
    .slice()
    .filter((booking) => booking.status === "confirmed")
    .reduce((acc, booking) => acc + booking.price, 0);

  const dashboardData = {
    totalCars: cars.length,
    totalBookings: bookings.length,
    pendingBookings: pendingBookings.length,
    completedBookings: completedBookings.length,
    recentBookings: bookings.slice(0, 3),
    monthlyRevenue: montlyRevenue,
  };

  res.status(200).json({ statusMessage: "success", dashboardData });
});

export const updateUserImage = catchError(async (req, res, next) => {
  const { _id } = req.user;
  const imageFile = req.file;

  // Upload Image to ImageKit
  const fileBuffer = fs.readFileSync(imageFile.path);
  const response = await imagekit.upload({
    file: fileBuffer,
    fileName: imageFile.originalname,
    folder: "/cars",
  });

  // Optimaize through ImageKit URL transformation
  var optimaizedImageURL = imagekit.url({
    path: response.filePath,
    transformation: [
      { width: "1280px" }, // Width Resizing
      { format: "webp" }, // Auto Compression
      { quality: "auto" }, // Convert To Modern Format
    ],
  });

  const image = optimaizedImageURL;

  await UserModel.findByIdAndUpdate(_id, { image: image }, { new: true });

  res.status(200).json({ statusMessage: "success", message: "Image Updated" });
});
