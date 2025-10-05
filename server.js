import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.routes.js";
import globalErrorHandler from "./src/middlewares/error.middlware.js";
import eventRoutes from "./src/routes/event.routes.js";
import seatRoutes from "./src/routes/seat.routes.js";
import bookingRoutes from "./src/routes/booking.routes.js";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

app.use("/api/user", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/booking", bookingRoutes);

app.use(globalErrorHandler);
app.use(helmet());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Backend server running on PORT ${PORT}`);
});
