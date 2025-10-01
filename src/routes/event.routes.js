import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import auth from "../middlewares/auth.middleware.js";
import {
  createEventValidator,
  updateEventValidator,
} from "../validators/event.validator.js";

const router = Router();

// Only admin can create, update, delete
router.post("/", auth(["ADMIN"]), createEventValidator, createEvent);
router.put("/:id", auth(["ADMIN"]), updateEventValidator, updateEvent);
router.delete("/:id", auth(["ADMIN"]), deleteEvent);

// Both user and admin can view
router.get("/", auth(["USER", "ADMIN"]), getEvents);
router.get("/:id", auth(["USER", "ADMIN"]), getEventById);

export default router;
