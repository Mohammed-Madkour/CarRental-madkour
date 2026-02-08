import express from "express";
import {
  changeBookingsStatus,
  checkAvailabilityofCar,
  createBooking,
  getOwnerBookings,
  getUserBookings,
} from "../controllers/booking.controller.js";
import { protectRoutes } from "../middleWare/auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityofCar);
bookingRouter.post("/create", protectRoutes, createBooking);
bookingRouter.get("/user", protectRoutes, getUserBookings);
bookingRouter.get("/owner", protectRoutes, getOwnerBookings);
bookingRouter.post("/change-status", protectRoutes, changeBookingsStatus);

export default bookingRouter;
