import { bookingModel } from "../models/Booking.js";
import CarModel from "../models/Car.js";
import { catchError } from "../utils/catchError.js";
import { AppError } from "../utils/ErrorMessage.js";

// Function to check Availability of Car for a given date
export const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await bookingModel.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });

  return bookings.length === 0;
};

// API to check Availability of Car for a given date and location
export const checkAvailabilityofCar = catchError(async (req, res) => {
  const { location, pickupDate, returnDate } = req.body;

  const cars = await CarModel.find({ location, isAvailable: true });

  const availableCarsPromise = cars.map(async (car) => {
    const isAvailable = await checkAvailability(
      car._id,
      pickupDate,
      returnDate
    );
    return { ...car._doc, isAvailable: isAvailable };
  });

  let availableCars = await Promise.all(availableCarsPromise);
  availableCars = availableCars.filter((car) => car.isAvailable === true);

  res.status(200).json({ statusMessage: "success", availableCars });
});

export const createBooking = catchError(async (req, res, next) => {
  const { _id } = req.user;
  const { car, pickupDate, returnDate } = req.body;

  const isAvailable = await checkAvailability(car, pickupDate, returnDate);
  if (!isAvailable) {
    return next(new AppError("Car is not available", 400));
  }

  const carData = await CarModel.findById(car);
  if (!carData) return next(new AppError("Car not found", 404));

  const picked = new Date(pickupDate);
  const returned = new Date(returnDate);
  const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
  const price = carData.pricePerDay * noOfDays;

  await bookingModel.create({
    user: _id,
    car,
    owner: carData.owner,
    pickupDate,
    returnDate,
    price,
  });

  res.status(201).json({
    statusMessage: "success",
    message: "Booking created successfully",
  });
});

export const getUserBookings = catchError(async (req, res) => {
  const { _id } = req.user;
  const bookings = await bookingModel
    .find({ user: _id })
    .populate("car")
    .sort({ createdAt: -1 });

  res.status(200).json({
    statusMessage: "success",
    bookings,
  });
});

export const getOwnerBookings = catchError(async (req, res, next) => {
  const { _id } = req.user;
  if (req.user.role !== "owner") return next(new AppError("Unauthorized", 403));

  const bookings = await bookingModel
    .find({ user: _id })
    .populate("car user")
    .select("-user.password")
    .sort({ createdAt: -1 });

  res.status(200).json({
    statusMessage: "success",
    bookings,
  });
});

export const changeBookingsStatus = catchError(async (req, res, next) => {
  const { _id } = req.user;
  const { bookingId, status } = req.body;

  const booking = await bookingModel.findById(bookingId);
  if (booking.owner.toString() !== _id.toString())
    return next(new AppError("Unauthorized", 403));

  booking.status = status;
  await booking.save();

  res.status(200).json({
    statusMessage: "success",
    message: "Status updated successfully",
  });
});
