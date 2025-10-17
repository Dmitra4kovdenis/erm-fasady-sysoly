import ArchiveListClient from "@/app/(private)/archive-list/client";

import { prisma } from "@/prisma-helpers/prisma";

const getArchiveOrders = async () => {
  return prisma.order.findMany({
    where: {
      statusId: 9,
    },
    include: {
      customer: true,
      status: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export type ArchiveOrdersType = Awaited<ReturnType<typeof getArchiveOrders>>;

export default async function ArchiveListPage() {
  const orders = await getArchiveOrders();

  return <ArchiveListClient orders={orders} />;
}
