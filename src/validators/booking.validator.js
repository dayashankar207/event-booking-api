import { body, param } from "express-validator";

export const validateCreateBooking = [
  body("eventId")
    .notEmpty()
    .withMessage("eventId is required")
    .isUUID()
    .withMessage("Invalid eventId format"),

  body("seatId")
    .notEmpty()
    .withMessage("seatId is required")
    .isUUID()
    .withMessage("Invalid seatId format"),
];

export const validateConfirmBooking = [
  param("bookingId").isUUID().notEmpty().withMessage("Invalid booking ID"),
];

export const validateGetBookingById = [
  param("bookingId").isUUID().notEmpty().withMessage("Invalid booking ID"),
];

export const validateCancelBooking = [
  param("bookingId").isUUID().withMessage("Invalid booking ID"),
];
