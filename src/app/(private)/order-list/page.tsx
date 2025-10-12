import OrderListClient from "@/app/(private)/order-list/client";
import { SearchParams } from "@/types";
import OrderDetailServer from "@/app/(private)/order-detail/server";
import { prisma } from "@/prisma-helpers/prisma";

const getOrders = async () => {
  return prisma.order.findMany({
    where: {
      statusId: {
        not: 5,
      },
    },
    include: {
      customer: true,
      status: true,
      workers: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export type OrdersType = Awaited<ReturnType<typeof getOrders>>;

export default async function OrderListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const orders = await getOrders();
  const data = await searchParams;

  return (
    <>
      <OrderListClient orders={orders} />
      <OrderDetailServer orderNumber={data?.orderNumber} />
    </>
  );
}
