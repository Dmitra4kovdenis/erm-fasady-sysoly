import OrderListClient from "@/app/(private)/order-list/client";
import { prisma } from "@/prisma-helpers/prisma";

const getOrders = async () => {
  return prisma.order.findMany({
    where: {
      statusId: {
        not: 9,
      },
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

export type OrdersType = Awaited<ReturnType<typeof getOrders>>;

export default async function OrderListPage() {
  const orders = await getOrders();

  return <OrderListClient orders={orders} />;
}
