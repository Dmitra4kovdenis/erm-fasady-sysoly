import OrderListClient from "@/app/(private)/order-list/client";
import { getOrders } from "@/prisma-helpers/get-orders";
import Server from "@/app/(private)/order-list/order-detail/server";

export default async function OrderListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const orders = await getOrders();

  const { orderNumber } = await searchParams;

  return (
    <>
      <OrderListClient orders={orders} />
      {orderNumber && <Server orderNumber={orderNumber.toString()} />}
    </>
  );
}
