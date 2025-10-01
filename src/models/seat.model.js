import prisma from "../prisma/client.js";

const createSeat = async (eventId, number) => {
  return prisma.seat.create({
    data: { number, eventId },
  });
};

const createManySeats = async (eventId, seats) => {
  const seatData = seats.map((seat) => ({
    number: seat.number,
    eventId,
  }));

  return prisma.seat.createMany({
    data: seatData,
    skipDuplicates: true,
  });
};

const getSeatsForEvent = (eventId) => {
  return prisma.seat.findMany({ where: { eventId } });
};

const updateSeat = async (eventId, id, status) => {
  const seat = await prisma.seat.findFirst({
    where: { id, eventId },
  });
  if (!seat) return null;
  return prisma.seat.update({
    where: { id },
    data: { status },
  });
};

// Update many seats (different statuses)
const updateManySeats = async (eventId, seats) => {
  const updates = seats.map((seat) =>
    prisma.seat.updateMany({
      where: { id: seat.id, eventId },
      data: { status: seat.status },
    })
  );

  return prisma.$transaction(updates);
};

// Bulk update (same status for many seats)
const bulkSeatUpdates = async (eventId, ids, status) => {
  return prisma.seat.updateMany({
    where: { id: { in: ids }, eventId },
    data: { status },
  });
};

const deleteSeat = async (eventId, id) => {
  return prisma.seat.deleteMany({
    where: { id, eventId },
  });
};

const deleteSeatsByEvent = async (eventId) => {
  return prisma.seat.deleteMany({ where: { eventId } });
};

// Delete many seats by IDs within an event
const deleteManySeatsById = async (eventId, ids) => {
  const existingSeats = await prisma.seat.findMany({
    where: { eventId, id: { in: ids } },
    select: { id: true },
  });

  if (existingSeats.length === 0) {
    return { found: 0, deleted: 0, existingIds: [] };
  }

  const result = await prisma.seat.deleteMany({
    where: { eventId, id: { in: ids } },
  });

  return {
    found: existingSeats.length,
    deleted: result.count,
    existingIds: existingSeats.map((s) => s.id),
  };
};

export {
  createSeat,
  createManySeats,
  getSeatsForEvent,
  updateSeat,
  updateManySeats,
  bulkSeatUpdates,
  deleteSeat,
  deleteSeatsByEvent,
  deleteManySeatsById,
};
