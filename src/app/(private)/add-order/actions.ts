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

  const { allFacadesArea, ...bdData } = data;

  const orderNumber = prevOrder ? prevOrder.orderNumber + 1 : firstStatus;

  await prisma.order.create({
    data: {
      ...bdData,
      orderNumber,
      statusId: 0,
      items: {
        create: data.items.map(({ area, ...item }) => item),
      },
    },
  });
};
