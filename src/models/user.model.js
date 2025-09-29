import prisma from "../prisma/client.js";

const findByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

const createUser = (data) => {
  return prisma.user.create({ data });
};

const findById = (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const updateUser = (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export { findByEmail, createUser, findById, updateUser };
