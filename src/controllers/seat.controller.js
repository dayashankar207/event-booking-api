import * as seatModel from "../models/seat.model.js";
import prisma from "../prisma/client.js";

const createManySeats = async (req, res, next) => {
  try {
    const { seats, eventId } = req.body;
    if (!eventId || !Array.isArray(seats) || seats.length === 0) {
      return res
        .status(400)
        .json({ error: "eventId and Seats [] are required" });
    }
    const result = await seatModel.createManySeats(eventId, seats);
    res.status(201).json({
      message: "Seats created successfully",
      count: result.count,
    });
  } catch (err) {
    next(err);
  }
};

const getSeatsForEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const eventExistsDB = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!eventExistsDB) {
      return res
        .status(404)
        .json({ error: `Event with ID ${eventId} not found` });
    }
    const seats = await seatModel.getSeatsForEvent(eventId);
    res.status(200).json({
      message: "Seats fetched successfully",
      eventId,
      totalSeats: seats.length,
      seats,
    });
  } catch (err) {
    next(err);
  }
};

export { createManySeats, getSeatsForEvent };
