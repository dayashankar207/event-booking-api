import { Router } from "express";

import * as bookingController from "../controllers/booking.controller.js";
import auth from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  validateCreateBooking,
  validateCancelBooking,
} from "../validators/booking.validator.js";

const router = Router();

router.post(
  "/:eventId",
  auth(["ADMIN", "USER"]),
  validateCreateBooking,
  validate,
  bookingController.createBooking
);

router.patch(
  "/:bookingId/cancel",
  auth(["ADMIN", "USER"]),
  validateCancelBooking,
  validate,
  bookingController.cancelBooking
);

router.get("/", auth(["ADMIN"]), bookingController.getAllBookings);
router.get("/:userId", auth(["ADMIN"]), bookingController.getBookingByUser);

export default router;
