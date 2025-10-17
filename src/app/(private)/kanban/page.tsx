import KanbanClient from "@/app/(private)/kanban/client";
import { prisma } from "@/prisma-helpers/prisma";
import { NoSsr } from "@mui/material";

const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 30);

const getOrders = async () =>
  prisma.order.findMany({
    where: {
      OR: [
        {
          statusId: {
            not: 9,
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
      workers: true,
    },
  });

const getStatuses = async () => {
  return prisma.orderStatus.findMany({
    orderBy: {
      index: "asc",
    },
  });
};

export type OrdersType = Awaited<ReturnType<typeof getOrders>>;
export type StatusesType = Awaited<ReturnType<typeof getStatuses>>;

export default async function OrderListPage() {
  const orders = await getOrders();

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
      <NoSsr>
        <KanbanClient
          statusesObj={statusesObj}
          columns={columns}
          ordersObj={ordersObj}
          statuses={statuses}
        />
      </NoSsr>
    </>
  );
}
