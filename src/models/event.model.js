import prisma from "../prisma/client.js";

const createEvent = (data) => {
  return prisma.event.create({ data });
};

const getEvents = (skip, take) => {
  return prisma.event.findMany({
    skip,
    take,
    orderBy: { date: "asc" },
  });
};

const countEvents = () => {
  return prisma.event.count();
};

const getEventById = (id) => {
  return prisma.event.findUnique({
    where: { id },
  });
};

const deleteEvent = (id) => {
  return prisma.event.delete({
    where: { id },
  });
};

const updateEvent = (id, data) => {
  return prisma.event.update({
    where: { id },
    data,
  });
};

export {
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  countEvents,
  getEventById,
};
