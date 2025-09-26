"use server";

import { prisma } from "@/prisma-helpers/prisma";

export const getArchiveOrders = async () => {
  return prisma.order.findMany({
    where: {
      statusId: 5,
    },
    include: {
      customer: true,
      status: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export type ArchiveOrdersType = Awaited<ReturnType<typeof getArchiveOrders>>;
