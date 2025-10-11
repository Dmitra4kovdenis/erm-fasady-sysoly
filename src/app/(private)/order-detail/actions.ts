"use server";

import { prisma } from "@/prisma-helpers/prisma";
import { revalidatePath } from "next/cache";
import { WorkComment } from "@prisma/client";

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
export type AddCommentType = Omit<WorkComment, "id">;

export const addComment = async (data: AddCommentType) => {
  await prisma.workComment.create({
    data: {
      text: data.text,
      order: {
        connect: {
          id: data.orderId,
        },
      },
      user: {
        connect: {
          id: data.userId,
        },
      },
    },
  });

  revalidatePath("/");
};
