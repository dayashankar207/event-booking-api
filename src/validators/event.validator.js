import { body, validationResult } from "express-validator";

const createEventValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid ISO8601 date")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Date must be in the future");
      }
      return true;
    }),

  // central place to check validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const updateEventValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid ISO8601 date")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Date must be in the future");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
export { createEventValidator, updateEventValidator };
