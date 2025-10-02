"use server";

import { prisma } from "@/prisma-helpers/prisma";

export const getOrderDetail = async (id: number) => {
  return prisma.order.findFirst({
    where: {
      id,
    },
    include: {
      customer: true,
      workers: true,
      items: {
        include: {
          handle: true,
          milling: true,
        },
      },
    },
  });
};

export type OrderDetailType = Awaited<ReturnType<typeof getOrderDetail>>;
