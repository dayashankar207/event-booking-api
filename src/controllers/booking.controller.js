import * as bookingService from "../services/booking.service.js";

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.findAllBookings();
    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const userId = req.user.id;
    const { eventId, seatId } = req.body;

    const booking = await bookingService.createBooking({
      userId,
      eventId,
      seatId,
      expireMinutes: 5,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully (PENDING)",
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

export const confirmBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await bookingService.confirmBooking(bookingId, userId);
    res.status(200).json({
      success: true,
      message: "Booking confirmed successfully",
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const booking = await bookingService.getBookingById(bookingId);

    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const user = req.user;

    const result = await bookingService.cancelBooking(bookingId, user);

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
