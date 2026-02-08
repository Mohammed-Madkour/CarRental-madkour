import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnection from "./configs/db.js";
import userRouter from "./routes/user.routes.js";
import { ownerRouter } from "./routes/owner.routes.js";
import bookingRouter from "./routes/booking.routes.js";

// Initiliaze Server
const app = express();

// MiddleWare
app.use(cors());
app.use(express.json());

// Connect Database
dbConnection();

app.get("/", (req, res) => {
  res.send("Server Is Working");
});

app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// MiddelWare
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 400;

  return res.status(statusCode).json({
    statusMessage: error.status || "fail",
    message: error.message,
    statusCode: statusCode,
  });
});
