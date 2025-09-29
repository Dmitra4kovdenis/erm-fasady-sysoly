import KanbanClient from "@/app/(private)/kanban/client";
import OrderDetailServer from "@/app/(private)/order-detail/server";
import { SearchParams } from "@/types";
import { prisma } from "@/prisma-helpers/prisma";

const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 30);

const getOrders = async () =>
  prisma.order.findMany({
    where: {
      OR: [
        {
          statusId: {
            not: 5,
          },
        },
        {
          endDate: {
            gt: oneWeekAgo,
          },
        },
      ],
    },
    include: {
      worker: true,
    },
  });

const getStatuses = async () => {
  return prisma.orderStatus.findMany({});
};

export type OrdersType = Awaited<ReturnType<typeof getOrders>>;
export type StatusesType = Awaited<ReturnType<typeof getStatuses>>;

export default async function OrderListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const orders = await getOrders();

  const data = await searchParams;

  const statuses = await getStatuses();

  const ordersObj: Record<number, OrdersType[0]> = {};
  const statusesObj: Record<number, StatusesType[0]> = {};
  const columns: Record<number, number[]> = {};

  statuses.forEach((item) => {
    statusesObj[item.id] = item;
    columns[item.id] = [];
  });

  orders.forEach((order) => {
    if (columns[order.statusId] === undefined) {
      columns[order.statusId] = [order.id];
    } else {
      columns[order.statusId].push(order.id);
    }
    ordersObj[order.id] = order;
  });

  return (
    <>
      <KanbanClient
        statusesObj={statusesObj}
        columns={columns}
        ordersObj={ordersObj}
      />
      <OrderDetailServer orderNumber={data?.orderNumber} />
    </>
  );
}
