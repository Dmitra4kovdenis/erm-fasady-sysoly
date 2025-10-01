"use server";

import { prisma } from "@/prisma-helpers/prisma";
import type { OrderCreateModelType } from "@/zod-models/order-model";
import { calcFieldsByEditable } from "@/app/(private)/add-order/utils";

const firstStatus = 1_000_000;

export const createOrder = async (values: OrderCreateModelType) => {
  const prevOrder = await prisma.order.findFirst({
    orderBy: {
      orderNumber: "desc",
    },
  });

  const orderNumber = prevOrder ? prevOrder.orderNumber + 1 : firstStatus;
  const calcValues = calcFieldsByEditable(values);

  await prisma.order.create({
    data: {
      ...calcValues,
      ...values,
      orderNumber,
      statusId: 0,
      items: {
        create: values.items.map((item) => item),
      },
    },
  });
};
