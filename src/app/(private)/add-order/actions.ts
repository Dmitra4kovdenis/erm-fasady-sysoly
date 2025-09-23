"use server";

import { prisma } from "@/prisma-helpers/prisma";
import type { OrderModelType } from "@/zod-models/order-model";

const firstStatus = 1_000_000;

export const createOrder = async (data: OrderModelType) => {
  const prevOrder = await prisma.order.findFirst({
    orderBy: {
      orderNumber: "desc",
    },
  });

  const orderNumber = prevOrder ? prevOrder.orderNumber + 1 : firstStatus;

  await prisma.order.create({
    data: {
      ...data,
      orderNumber,
      statusId: 0,
      items: {
        create: data.items,
      },
    },
  });
};
