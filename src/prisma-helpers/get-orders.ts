"use server";

import { prisma } from "@/prisma-helpers/prisma";

export const getOrders = async () => {
  return prisma.order.findMany({
    where: {
      statusId: {
        not: 5,
      },
    },
    include: {
      customer: true,
      status: true,
      workers: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export type OrdersType = Awaited<ReturnType<typeof getOrders>>;
