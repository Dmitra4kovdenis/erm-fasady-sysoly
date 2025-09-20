"use order-detail";

import { prisma } from "@/prisma-helpers/prisma";

export const getOrderDetail = async (orderNumber: string) => {
  return prisma.order.findFirst({
    where: {
      orderNumber: orderNumber, // Добавляем условие поиска по номеру заказа
    },
    include: {
      customer: true,
      items: true,
    },
  });
};

export type OrderDetailType = Awaited<ReturnType<typeof getOrderDetail>>;
