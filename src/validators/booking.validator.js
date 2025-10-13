import { body } from "express-validator";

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
