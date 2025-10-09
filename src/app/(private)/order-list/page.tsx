import OrderListClient from "@/app/(private)/order-list/client";
import { getOrders } from "@/prisma-helpers/get-orders";
import { SearchParams } from "@/types";
import OrderDetailServer from "@/app/(private)/order-detail/server";
import { OrderTimeline } from "@/app/(private)/order-timeline/order-timeline";
import { Comment } from "@/app/(private)/comment/comment";

export default async function OrderListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const orders = await getOrders();
  const data = await searchParams;
  const comments = await searchParams;

  return (
    <>
      <OrderListClient orders={orders} />
      <OrderDetailServer orderNumber={data?.orderNumber} />
      <OrderTimeline orderId={data?.timelineId} />
      <Comment orderId={comments?.commentsId} />
    </>
  );
}
