import { body } from "express-validator";

const allowedStatuses = ["AVAILABLE", "BOOKED"];

const validateCreateSeat = [
  body("number")
    .isString()
    .notEmpty()
    .withMessage("Seat number must be a non-empty string"),
];

const validateCreateManySeats = [
  body("seats")
    .isArray({ min: 1 })
    .withMessage("Seats must be a non-empty array"),
  body("seats.*.number")
    .isString()
    .notEmpty()
    .withMessage("Each seat must have a non-empty string number"),
];

const validateUpdateSeat = [
  body("status")
    .isIn(allowedStatuses)
    .withMessage(`Status must be one of: ${allowedStatuses.join(", ")}`),
];

const validateUpdateManySeats = [
  body("seats")
    .isArray({ min: 1 })
    .withMessage("Seats must be a non-empty array"),
  body("seats.*.id").notEmpty().withMessage("Seat ID is required"),
  body("seats.*.status")
    .isIn(allowedStatuses)
    .withMessage(`Status must be one of: ${allowedStatuses.join(", ")}`),
];

const validateBulkSeatUpdates = [
  body("ids").isArray({ min: 1 }).withMessage("IDs must be a non-empty array"),
  body("status")
    .isIn(allowedStatuses)
    .withMessage(`Status must be one of: ${allowedStatuses.join(", ")}`),
];

const validateDeleteManySeatsById = [
  body("ids").isArray({ min: 1 }).withMessage("IDs must be a non-empty array"),
];

export {
  allowedStatuses,
  validateCreateSeat,
  validateCreateManySeats,
  validateUpdateSeat,
  validateUpdateManySeats,
  validateBulkSeatUpdates,
  validateDeleteManySeatsById,
};
