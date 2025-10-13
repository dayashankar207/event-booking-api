import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as bookingController from "../controllers/booking.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { validateCreateBooking } from "../validators/booking.validator.js";

const router = express.Router();

router.get("/", auth(["ADMIN", "USER"]), bookingController.getAllBookings);

router.post(
  "/",
  auth(["ADMIN", "USER"]),
  validateCreateBooking,
  validate,
  bookingController.createBooking
);

export default router;
