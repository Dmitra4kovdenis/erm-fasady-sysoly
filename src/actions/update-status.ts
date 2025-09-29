"use server";

import { prisma } from "@/prisma-helpers/prisma";
import { revalidatePath } from "next/cache";

export const updateStatus = async ({
  statusId,
  id,
  revalidate = true,
}: {
  id: number;
  statusId: number;
  revalidate?: boolean;
}) => {
  await prisma.order.update({
    where: {
      id,
    },
    data: {
      statusId,
    },
  });
  if (revalidate) revalidatePath("/");
};
