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

export const confirmBooking = async (bookingId, userId, isAdmin) => {
  const booking = prisma.booking.findUnique({
    where: { id: bookingId },
    include: { seat: true },
  });
  if (!booking) {
    const error = new Error("Booking not found");
    error.statusCode = 404;
    throw error;
  }
  if (booking.status !== "PENDING") {
    const error = new Error(
      `Cannot confirm a booking with status ${booking.status}`
    );
    error.statusCode = 400;
    throw error;
  }
  if(booking.expiresAt)
};
