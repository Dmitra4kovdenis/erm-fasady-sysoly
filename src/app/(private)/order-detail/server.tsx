"use server";

import { getOrderDetail } from "@/prisma-helpers/get-order-detail";
import { getStatuses } from "@/prisma-helpers/get-statuses";
import OrderDetailClient from "@/app/(private)/order-detail/client";
import { getUserData } from "@/prisma-helpers/get-user-data";
import { prisma } from "@/prisma-helpers/prisma";
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

  const result = await getOrderDetail(+orderNumber);

  const userData = await getUserData();

  if (!result || !userData) return null;

  const statuses = await getStatuses();

  const statusesOptions = statuses.map((item) => ({
    label: item.title,
    value: item.id,
  }));
  const comments = await getComments(+orderNumber);
  const workers = await getWorkers();
  const timelines = await getOrderTimelines(+orderNumber);
  return (
    <OrderDetailClient
      order={result}
      statuses={statusesOptions}
      userData={userData}
      workers={workers}
      timelines={timelines}
      comments={comments}
    />
  );
}

export default OrderDetailServer;
