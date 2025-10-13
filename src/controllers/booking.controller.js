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
