import { Router } from "express";
import * as seatController from "../controllers/seat.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

// Admin can bulk add seats
router.post("/", auth(["ADMIN"]), seatController.createManySeats);

// Both Admin and User can view seats for an event
router.get(
  "/:eventId",
  auth(["ADMIN", "USER"]),
  seatController.getSeatsForEvent
);

export default router;
