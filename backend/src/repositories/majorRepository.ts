import prisma from "../lib/prisma";

export async function getAllMajors() {
  return prisma.major.findMany();
}
