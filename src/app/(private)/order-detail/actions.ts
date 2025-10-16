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

export const getOrderDetail = async (id: number) => {
  return prisma.order.findFirst({
    where: {
      id,
    },
    include: {
      customer: true,
      workers: true,
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

export const getOrderTimelines = async (orderId: number) => {
  return prisma.workTimeline.findMany({
    where: {
      orderId,
    },
    include: {
      worker: true,
    },
  });
};

export type OrderTimelinesType = Awaited<ReturnType<typeof getOrderTimelines>>;

export const getWorkers = async () => {
  return await prisma.worker.findMany();
};
export const getComments = async (orderId: number) => {
  return prisma.workComment.findMany({
    where: {
      orderId,
    },
    include: {
      user: {
        include: {
          worker: true,
          admin: true,
        },
      },
    },
  });
};
export type CommentType = Awaited<ReturnType<typeof getComments>>;

export type Workers = Awaited<ReturnType<typeof getWorkers>>;
