import * as eventModel from "../models/event.model.js";

export const createEvent = async (req, res, next) => {
  try {
    const { title, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({ error: "Title and Date is required" });
    }
    const event = await eventModel.createEvent({
      title,
      date: new Date(date),
    });
    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    next(err);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      eventModel.getEvents(skip, limit),
      eventModel.countEvents(),
    ]);
    const totalPages = Math.ceil(total / limit);
    res.json({ page, limit, events, total, totalPages });
  } catch (err) {
    next(err);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventModel.getEventById(id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json(event);
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, date } = req.body;

    const event = await eventModel.updateEvent(id, {
      title,
      date: date ? new Date(date) : undefined,
    });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await eventModel.deleteEvent(id);

    res.json({ message: "Event deleted", deleteEvent });
  } catch (err) {
    next(err);
  }
};
