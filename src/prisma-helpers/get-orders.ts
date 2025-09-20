"use order-detail";

import { prisma } from "@/prisma-helpers/prisma";

export const getOrders = async () => {
  return prisma.order.findMany({
    include: {
      customer: true,
    },
  });
};

export type OrdersType = Awaited<ReturnType<typeof getOrders>>;
