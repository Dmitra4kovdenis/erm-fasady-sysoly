"use order-detail";

import { prisma } from "@/prisma-helpers/prisma";

export const getStatuses = async () => {
  return prisma.orderStatus.findMany({});
};

export type OrdersType = Awaited<ReturnType<typeof getStatuses>>;
