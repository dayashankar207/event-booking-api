import prisma from "../prisma/client.js";

export const findAllBookings = async () => {
  return prisma.booking.findMany({
    include: {
      user: { select: { name: true } },
      event: { select: { title: true, date: true } },
      seat: { select: { number: true, status: true } },
    },
  });
};

/**
 * Create a booking for a seat
 * @param {string} userId - User making the booking
 * @param {string} eventId - Event ID
 * @param {string} seatId - Seat ID
 * @param {number} expireMinutes - How long the booking stays pending
 */

export const createBooking = async ({
  userId,
  eventId,
  seatId,
  expireMinutes = 5,
}) => {
  const activeBooking = await prisma.booking.findFirst({
    where: { seatId, status: { in: ["PENDING", "CONFIRMED"] } },
  });
  if (activeBooking) {
    const error = new Error("Seat is already booked or pending ");
    error.statusCode = 409; //CONFLICT
    throw error;
  }
  await prisma.seat.update({
    where: { id: seatId },
    data: { status: "RESERVED" },
  });

  const now = new Date();
  const expiresAt = new Date(now.getTime() + expireMinutes * 60 * 1000);
  const booking = await prisma.booking.create({
    data: {
      userId,
      eventId,
      seatId,
      status: "PENDING",
      expiresAt,
    },
    include: {
      seat: { select: { number: true, status: true } },
      event: { select: { title: true, date: true } },
    },
  });
  return booking;
};

export const confirmBooking = async (bookingId, userId) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });
  if (!booking) {
    const error = new Error("Booking not found");
    error.statusCode = 404;
    throw error;
  }
  console.log("DEBUG BOOKING:", booking);

  if (booking.status !== "PENDING") {
    const error = new Error(
      `Cannot confirm a booking with status ${booking.status}`
    );
    error.statusCode = 400;
    throw error;
  }
  if (booking.expiresAt && booking.expiresAt < new Date()) {
    const error = new Error("Booking expired. Cannot confirm");
    error.statusCode = 410;
    throw error;
  }
  if (booking.userId !== userId) {
    const error = new Error("Not authorized to confirm this booking");
    error.statusCode = 403;
    throw error;
  }

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CONFIRMED", seat: { update: { status: "BOOKED" } } },
    include: { seat: true, event: true },
  });
  return updatedBooking;
};

export const getBookingById = async (bookingId) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      user: { select: { name: true, email: true } },
      event: true,
      seat: true,
    },
  });
  if (!booking) {
    const error = new Error(`Booking with Id: ${bookingId} not found`);
    error.statusCode = 404;
    throw error;
  }
  return booking;
};

export const cancelBooking = async (bookingId, user) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });
  if (!booking) {
    const error = new Error("Booking not found");
    error.statusCode = 404;
    throw error;
  }
  if (user.role === "USER" && booking.status !== "PENDING") {
    const error = new Error("You can only cancel pending bookings ");
    error.statusCode = 403;
    throw error;
  }
  await prisma.seat.update({
    where: { id: booking.seatId },
    data: { status: "AVAILABLE" },
  });

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
    include: {
      seat: { select: { number: true } },
      user: { select: { name: true } },
    },
  });
  return updatedBooking;
};
