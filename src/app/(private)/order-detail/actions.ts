"use server";

import { prisma } from "@/prisma-helpers/prisma";
import { revalidatePath } from "next/cache";

export const addWorker = async (orderId: number, workerId: number) => {
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      workers: {
        connect: {
          id: workerId,
        },
      },
    },
  });
  revalidatePath("/");
};

export const removeWorker = async (orderId: number, workerId: number) => {
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      workers: {
        disconnect: {
          id: workerId,
        },
      },
    },
  });
  revalidatePath("/");
};
