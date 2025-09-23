"use server";

import { prisma } from "@/prisma-helpers/prisma";

export const updateStatus = async ({
  statusId,
  id,
}: {
  id: number;
  statusId: number;
}) => {
  await prisma.order.update({
    where: {
      id,
    },
    data: {
      statusId,
    },
  });
};
