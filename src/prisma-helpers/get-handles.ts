"use order-detail";

import { prisma } from "@/prisma-helpers/prisma";

// получить список всех интегрированных ручек
export const getHandles = async () => {
  return prisma.handle.findMany({});
};

export type HandlesType = Awaited<ReturnType<typeof getHandles>>;
