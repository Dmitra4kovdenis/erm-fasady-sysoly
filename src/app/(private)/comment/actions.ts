"use server";

import { prisma } from "@/prisma-helpers/prisma";
import { WorkComment } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
