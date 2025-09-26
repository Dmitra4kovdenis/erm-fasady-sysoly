"use server";

import { prisma } from "@/prisma-helpers/prisma";

export const getUsers = async () => {
  return prisma.user.findMany({});
};

export type UsersType = Awaited<ReturnType<typeof getUsers>>;
