import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    car: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Car",
    },
    pickupDate: {
      type: String,
      required: true,
      trim: true,
    },
    returnDate: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const bookingModel = mongoose.model("Booking", bookingSchema);
