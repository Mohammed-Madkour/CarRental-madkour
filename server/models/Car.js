import mongoose, { Schema, SchemaTypes } from "mongoose";

const carSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    seating_capacity: {
      type: Number,
      required: true,
    },
    fuel_type: {
      type: String,
      required: true,
      trim: true,
    },
    transmission: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
      min: [0, "The value of path pricePerDay is beneath the limit 0"],
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isAvailable: {
      type: SchemaTypes.Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CarModel = mongoose.model("Car", carSchema);

export default CarModel;
