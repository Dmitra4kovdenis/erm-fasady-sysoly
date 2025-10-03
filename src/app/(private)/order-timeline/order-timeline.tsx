import { prisma } from "@/prisma-helpers/prisma";
import { ClientOrderTimeline } from "@/app/(private)/order-timeline/client";
import { getOrderDetail } from "@/prisma-helpers/get-order-detail";
import { getUserData } from "@/prisma-helpers/get-user-data";

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

const getWorkers = async () => {
  return prisma.worker.findMany();
};

export type Workers = Awaited<ReturnType<typeof getWorkers>>;

export type OrderTimelinesType = Awaited<ReturnType<typeof getOrderTimelines>>;

export async function OrderTimeline({
  orderId,
}: {
  orderId?: string | string[];
}) {
  if (!orderId) return null;

  const userData = await getUserData();

  const order = await getOrderDetail(+orderId);

  if (!order || !userData) {
    return null;
  }

  const workers = await getWorkers();

  const timelines = await getOrderTimelines(+orderId);

  return (
    <ClientOrderTimeline
      timelines={timelines}
      order={order}
      userData={userData}
      workers={workers}
    />
  );
}
