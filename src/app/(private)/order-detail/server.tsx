"use server";

import OrderDetailClient from "@/app/(private)/order-detail/client";
import { prisma } from "@/prisma-helpers/prisma";

const getOrderDetail = async (id: number) => {
  return prisma.order.findFirst({
    where: {
      id,
    },
    include: {
      customer: true,
      workers: true,
      items: {
        include: {
          handle: true,
          milling: true,
        },
      },
    },
  });
};

export type OrderDetailType = Awaited<ReturnType<typeof getOrderDetail>>;

const getStatuses = async () => {
  return prisma.orderStatus.findMany({});
};

const getOrderTimelines = async (orderId: number) => {
  return prisma.workTimeline.findMany({
    where: {
      orderId,
    },
    include: {
      worker: true,
    },
  });
};

export type OrderTimelinesType = Awaited<ReturnType<typeof getOrderTimelines>>;

const getWorkers = async () => {
  return await prisma.worker.findMany();
};
const getComments = async (orderId: number) => {
  return prisma.workComment.findMany({
    where: {
      orderId,
    },
    include: {
      user: {
        include: {
          worker: true,
          admin: true,
        },
      },
    },
  });
};
export type CommentType = Awaited<ReturnType<typeof getComments>>;

export type Workers = Awaited<ReturnType<typeof getWorkers>>;

async function OrderDetailServer({
  orderNumber,
}: {
  orderNumber?: string | string[];
}) {
  if (!orderNumber) return null;

  const [result, statuses, comments, workers, timelines] = await Promise.all([
    getOrderDetail(+orderNumber),
    getStatuses(),
    getComments(+orderNumber),
    getWorkers(),
    getOrderTimelines(+orderNumber),
  ]);
  if (!result) return null;

  const statusesOptions = statuses.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  return (
    <OrderDetailClient
      order={result}
      statuses={statusesOptions}
      workers={workers}
      timelines={timelines}
      comments={comments}
    />
  );
}

export default OrderDetailServer;
