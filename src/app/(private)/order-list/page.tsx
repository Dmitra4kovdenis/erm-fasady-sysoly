import OrderListClient from "@/app/(private)/order-list/client";
import { getOrders } from "@/prisma-helpers/get-orders";
import { SearchParams } from "@/types";
import OrderDetailServer from "@/app/(private)/order-detail/server";

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
