"use server";

import { prisma } from "@/prisma-helpers/prisma";

export const getColumns = async () => {
  return prisma.orderStatus.findMany({
    include: {
      orders: true,
    },
  });
};

export type GetColumnsType = Awaited<ReturnType<typeof getColumns>>;
