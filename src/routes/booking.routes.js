import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as bookingController from "../controllers/booking.controller.js";
import validate from "../middlewares/validate.middleware.js";
import {
  validateCreateBooking,
  validateConfirmBooking,
  validateGetBookingById,
  validateCancelBooking,
} from "../validators/booking.validator.js";

const router = express.Router();

router.get("/", auth(["ADMIN", "USER"]), bookingController.getAllBookings);

router.post(
  "/",
  auth(["ADMIN", "USER"]),
  validateCreateBooking,
  validate,
  bookingController.createBooking
);

router.patch(
  "/:bookingId/confirm",
  auth(["ADMIN", "USER"]),
  validate,
  validateConfirmBooking,
  bookingController.confirmBooking
);

router.get(
  "/:bookingId",
  auth(["ADMIN", "USER"]),
  validate,
  validateGetBookingById,
  bookingController.getBookingById
);

router.patch(
  "/:bookingId/cancel",
  auth(["ADMIN", "USER"]),
  validateCancelBooking,
  validate,
  bookingController.cancelBooking
);

export default router;
