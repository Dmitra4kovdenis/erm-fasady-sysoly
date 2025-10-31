"use server";

import { prisma } from "@/prisma-helpers/prisma";
import { OrderModelType } from "@/zod-models/order-model";
import { calcFieldsByEditable } from "@/app/(private)/add-order/utils";

// const charts = ["А", "Б", "В", "Г"];
// const generateOrderNumber = (prevOrderNumber: string = "") => {
//   const res = prevOrderNumber.split(" ");
//   const orderChar = res[0];
//   const orderNumber = +res[1];
//
//   if (!orderChar || !orderNumber) {
//     return "A 001";
//   }
//
//   if (orderNumber === 999) {
//     const nextChart = charts[charts.indexOf(orderChar) + 1];
//     return `${nextChart} 001`;
//   }
//
//   const nextOrderNumber = orderNumber + 1;
//
//   return `${orderChar} ${nextOrderNumber}`;
// };

export const createOrder = async (values: OrderModelType) => {
  // const prevOrder = await prisma.order.findFirst({
  //   orderBy: {
  //     orderNumber: "desc",
  //   },
  // });

  // const orderNumber = generateOrderNumber(prevOrder?.orderNumber);
  const calcValues = calcFieldsByEditable(values);

  const { customerId, ...otherValues } = values;

  return await prisma.order.create({
    data: {
      ...calcValues,
      ...otherValues,
      // orderNumber,
      customer: {
        connect: {
          id: customerId,
        },
      },
      status: {
        connect: {
          id: 1,
        },
      },
      items: {
        create: values.items.map((item) => item),
      },
    },
  });
};

export const updateOrder = async (id: number, values: OrderModelType) => {
  const calcValues = calcFieldsByEditable(values);

  const existingItems = await prisma.facade.findMany({
    where: { orderId: id },
  });

  const itemsToUpdate = values.items.filter((i) => i.id); // уже есть id
  const itemsToCreate = values.items.filter((i) => !i.id); // новые
  const existingIds = existingItems.map((i) => i.id);
  const idsToKeep = itemsToUpdate.map((i) => i.id);
  const idsToDelete = existingIds.filter((id) => !idsToKeep.includes(id));

  const { customerId, ...otherValues } = values;

  return await prisma.order.update({
    where: {
      id,
    },
    data: {
      ...calcValues,
      ...otherValues,
      customer: {
        connect: {
          id: customerId,
        },
      },
      items: {
        // 1. Удаляем те, что пропали
        deleteMany: {
          id: { in: idsToDelete },
        },

        // 2. Обновляем существующие
        updateMany: itemsToUpdate.map((item) => ({
          where: { id: item.id },
          data: item,
        })),

        // 3. Добавляем новые
        create: itemsToCreate.map((item) => item),
      },
    },
  });
};
