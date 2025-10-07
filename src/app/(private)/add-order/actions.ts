"use server";

import { prisma } from "@/prisma-helpers/prisma";
import type { OrderCreateModelType } from "@/zod-models/order-model";
import { calcFieldsByEditable } from "@/app/(private)/add-order/utils";

const charts = ["А", "Б", "В", "Г"];
const generateOrderNumber = (prevOrderNumber: string = "") => {
  const res = prevOrderNumber.split(" ");
  const orderChar = res[0];
  const orderNumber = +res[1];

  if (!orderChar || !orderNumber) {
    return "A 001";
  }

  if (orderNumber === 999) {
    const nextChart = charts[charts.indexOf(orderChar) + 1];
    return `${nextChart} 001`;
  }

  const nextOrderNumber = orderNumber + 1;

  return `${orderChar} ${nextOrderNumber}`;
};

export const createOrder = async (values: OrderCreateModelType) => {
  const prevOrder = await prisma.order.findFirst({
    orderBy: {
      orderNumber: "desc",
    },
  });

  const orderNumber = generateOrderNumber(prevOrder?.orderNumber);
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
