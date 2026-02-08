import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(`${process.env.MONGODB_URI}/car-rental`)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("Database failed to connect", error.message));
};

export default dbConnection;
