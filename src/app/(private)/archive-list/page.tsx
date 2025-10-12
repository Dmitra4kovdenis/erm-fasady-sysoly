import { SearchParams } from "@/types";
import OrderDetailServer from "@/app/(private)/order-detail/server";
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

export default async function ArchiveListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const orders = await getArchiveOrders();
  const data = await searchParams;

  return (
    <>
      <ArchiveListClient orders={orders} />
      <OrderDetailServer orderNumber={data?.orderNumber} />
    </>
  );
}
