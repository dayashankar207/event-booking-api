import * as seatModel from "../models/seat.model.js";

// Create a single seat
export const createSeat = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { number } = req.body;

    const seat = await seatModel.createSeat(eventId, number);

    res.status(201).json({
      message: "Seat created successfully",
      eventId,
      seat: {
        id: seat.id,
        number: seat.number,
        status: seat.status,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Create many seats
export const createManySeats = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { seats } = req.body; // [{ number }, ...]

    const created = await seatModel.createManySeats(eventId, seats);

    res.status(201).json({
      message: "Seats created successfully",
      eventId,
      totalCreated: created.count,
      seats: created.seats?.map((s) => ({
        id: s.id,
        number: s.number,
        status: s.status,
      })),
    });
  } catch (err) {
    next(err);
  }
};

// Get all seats for an event
export const getSeatsForEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const seats = await seatModel.getSeatsForEvent(eventId);

    res.status(200).json({
      message: "Seats fetched successfully",
      eventId,
      totalSeats: seats.length,
      available: seats.filter((s) => s.status === "AVAILABLE").length,
      booked: seats.filter((s) => s.status === "BOOKED").length,
      seats,
    });
  } catch (err) {
    next(err);
  }
};

// Update a single seat
export const updateSeat = async (req, res, next) => {
  try {
    const { eventId, id } = req.params;
    const { status } = req.body;

    const updated = await seatModel.updateSeat(eventId, id, status);
    if (!updated) {
      return res.status(404).json({
        message: "Seat not found in this event",
        eventId,
        id,
      });
    }

    res.status(200).json({
      message: "Seat updated successfully",
      eventId,
      seat: {
        id: updated.id,
        number: updated.number,
        status: updated.status,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update many seats (different statuses)
export const updateManySeats = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { seats } = req.body; // [{id, status}]

    const result = await seatModel.updateManySeats(eventId, seats);

    res.status(200).json({
      message: "Seats updated successfully",
      eventId,
      requestedUpdates: seats.length,
      appliedUpdates: result.length,
      result,
    });
  } catch (err) {
    next(err);
  }
};

// Bulk update seats (same status for many ids)
export const bulkSeatUpdates = async (req, res, next) => {
  try {
    const { ids, status } = req.body;

    const result = await seatModel.bulkSeatUpdates(ids, status);

    res.status(200).json({
      message: "Bulk update successful",
      totalRequested: ids.length,
      totalUpdated: result.count,
      newStatus: status,
    });
  } catch (err) {
    next(err);
  }
};

// Delete a single seat
export const deleteSeat = async (req, res, next) => {
  try {
    const { eventId, id } = req.params;

    const deleted = await seatModel.deleteSeat(eventId, id);

    if (deleted.count === 0) {
      return res.status(404).json({
        message: "Seat not found for this event",
        eventId,
        id,
      });
    }

    res.status(200).json({
      message: "Seat deleted successfully",
      eventId,
      deletedCount: deleted.count,
    });
  } catch (err) {
    next(err);
  }
};

// Delete all seats for an event
export const deleteSeatsByEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const result = await seatModel.deleteSeatsByEvent(eventId);

    res.status(200).json({
      message: "All seats deleted for event",
      eventId,
      deletedCount: result.count,
    });
  } catch (err) {
    next(err);
  }
};

// Delete many seats by ids
export const deleteManySeatsById = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { ids } = req.body;

    const result = await seatModel.deleteManySeatsById(eventId, ids);

    if (result.found === 0) {
      return res.status(404).json({
        message: "No matching seats found for this event",
        eventId,
        requestedIds: ids,
      });
    }

    res.status(200).json({
      message: "Selected seats deleted successfully",
      eventId,
      requested: ids.length,
      matched: result.found,
      deletedCount: result.deleted,
      actuallyDeletedIds: result.existingIds,
    });
  } catch (err) {
    next(err);
  }
};
