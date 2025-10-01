import { Router } from "express";
import * as seatController from "../controllers/seat.controller.js";
import auth from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  validateCreateSeat,
  validateCreateManySeats,
  validateUpdateSeat,
  validateUpdateManySeats,
  validateBulkSeatUpdates,
  validateDeleteManySeatsById,
} from "../validators/seat.validator.js";

const router = Router();

router.post(
  "/:eventId",
  auth(["ADMIN"]),
  validateCreateSeat,
  validate,
  seatController.createSeat
);

router.post(
  "/:eventId/many",
  auth(["ADMIN"]),
  validateCreateManySeats,
  validate,
  seatController.createManySeats
);

router.get(
  "/:eventId",
  auth(["ADMIN", "USER"]),
  seatController.getSeatsForEvent
);

router.patch(
  "/:eventId/:id",
  auth(["ADMIN"]),
  validateUpdateSeat,
  validate,
  seatController.updateSeat
);

router.put(
  "/:eventId/many",
  auth(["ADMIN"]),
  validateUpdateManySeats,
  validate,
  seatController.updateManySeats
);

router.put(
  "/:eventId/bulk",
  auth(["ADMIN"]),
  validateBulkSeatUpdates,
  validate,
  seatController.bulkSeatUpdates
);

router.delete("/:eventId", auth(["ADMIN"]), seatController.deleteSeatsByEvent);

router.delete(
  "/:eventId/many",
  auth(["ADMIN"]),
  validateDeleteManySeatsById,
  validate,
  seatController.deleteManySeatsById
);

router.delete("/:eventId/:id", auth(["ADMIN"]), seatController.deleteSeat);

export default router;
