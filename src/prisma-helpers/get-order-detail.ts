"use order-detail";

import { prisma } from "@/prisma-helpers/prisma";

export const getOrderDetail = async (orderNumber: number) => {
  return prisma.order.findFirst({
    where: {
      orderNumber: orderNumber, // Добавляем условие поиска по номеру заказа
    },
    include: {
      customer: true,
      worker: true,
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
