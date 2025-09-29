import prisma from "../prisma/client.js";

const createManySeats = (eventId, seats) => {
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

const updateSeatsByEvent = (eventId, seatNumbers) => {
  return prisma.seat.updateMany({
    where: { eventId },
    seatNumbers,
  });
};

// const deleteSeatsByEvent = (eventId, seatNumbers) => {
//   return prisma.seat.delete({
//     where: { eventId },
//     seatNumbers,
//   });
// };

// export {
//   createManySeats,
//   findSeatsByEvent,
//   updateSeatsByEvent,
//   deleteSeatsByEvent,
// };
export { createManySeats, getSeatsForEvent };
