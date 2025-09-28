"use server";

import { prisma } from "@/prisma-helpers/prisma";
import { revalidatePath } from "next/cache";

export const setWorker = async (orderId: number, workerId: number) => {
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      workerId,
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
      worker: {
        disconnect: {
          id: workerId,
        },
      },
    },
  });
  revalidatePath("/");
};
