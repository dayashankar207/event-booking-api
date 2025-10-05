import { body, param } from "express-validator";

const allowedStatuses = ["CONFIRMED", "PENDING", "CANCELLED"];

export const validateCreateBooking = [
  body("userId").notEmpty().withMessage("User ID is required"),
  body("seatId").notEmpty().withMessage("Seat ID is required"),
  body("status")
    .isIn(allowedStatuses)
    .withMessage(
      `Booking status must be one of: ${allowedStatuses.join(", ")}`
    ),
];

export const validateCancelBooking = [
  param("bookingId").isUUID().withMessage("Invalid booking ID format"),
];
