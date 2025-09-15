"use server";

import { prisma } from "@/prisma-helpers/prisma";

// получить список всех фрезеровок
export const getMillings = async () => {
  return prisma.milling.findMany({});
};

export type MillingsType = Awaited<ReturnType<typeof getMillings>>;
