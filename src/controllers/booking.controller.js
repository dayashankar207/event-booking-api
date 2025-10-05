import * as bookingModel from "../models/booking.model.js";

export const createBooking = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { seatId, userId, status } = req.body;

    const booking = await bookingModel.createBooking(
      userId,
      eventId,
      seatId,
      status
    );

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const cancelled = await bookingModel.cancelBooking(bookingId);

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking: cancelled,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const { status, eventId, userId } = req.query;
    const filters = {};
    if (status) filters.status = status;
    if (eventId) filters.eventId = eventId;
    if (userId) filters.userId = userId;

    const bookings = await bookingModel.getAllBookings(filters);
    res.status(200).json({
      message: "Bookings retrieved successfully",
      total: bookings.length,
      filters,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};

export const getBookingByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const bookings = await bookingModel.getBookingByUser(userId);
    res.status(200).json({
      message: `Bookings for user ${userId}`,
      count: bookings.length,
      bookings,
    });
  } catch (err) {
    next(err);
  }
};
