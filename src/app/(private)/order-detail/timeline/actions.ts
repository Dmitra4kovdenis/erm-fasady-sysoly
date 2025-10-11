"use server";

import { prisma } from "@/prisma-helpers/prisma";
import { WorkTimeline } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const addTimeline = async (data: WorkTimeline) => {
  console.log(data);
  await prisma.workTimeline.create({
    data,
  });

  revalidatePath("/");
};

export const editTimeline = async (id: number, data: WorkTimeline) => {
  await prisma.workTimeline.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath("/");
};

export const getTimeline = async (id: number) => {
  await prisma.workTimeline.findFirst({
    where: {
      id,
    },
  });
};
