import prisma from "../prisma/client.js";

export const createBooking = async (userId, eventId, seatId, status) => {
  return prisma.$transaction(async (tx) => {
    const seat = await tx.seat.findUnique({
      where: { id: seatId },
    });

    if (!seat) {
      const error = new Error("Seat not found");
      error.statusCode = 404;
      throw error;
    }

    if (seat.eventId !== eventId) {
      throw new Error("This seat does not belong to the given event");
    }

    if (seat.status === "BOOKED") {
      const error = new Error("This seat is already booked");
      error.statusCode = 409;
      throw error;
    }

    const booking = await tx.booking.create({
      data: { userId, eventId, seatId, status },
    });

    await tx.seat.update({
      where: { id: seatId },
      data: { status: "BOOKED" },
    });

    return booking;
  });
};

export const cancelBooking = async (bookingId) => {
  return await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    if (booking.status === "CANCELLED") {
      const error = new Error("Booking is already cancelled");
      error.statusCode = 400;
      throw error;
    }

    const updatedBooking = await tx.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });

    await tx.seat.update({
      where: { id: booking.seatId },
      data: { status: "AVAILABLE" },
    });

    return updatedBooking;
  });
};

export const getAllBookings = async (filters = {}) => {
  return prisma.booking.findMany({
    where: filters,
    include: {
      event: { select: { title: true, date: true } },
      seat: { select: { number: true } },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "asc" },
  });
};

export const getBookingByUser = async (userId) => {
  return prisma.booking.findMany({
    where: { userId },
    include: {
      event: { select: { title: true, date: true } },
      seat: { select: { number: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};
