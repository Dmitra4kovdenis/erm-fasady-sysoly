import OrderListClient from "@/app/(private)/order-list/client";
import { getOrders } from "@/prisma-helpers/get-orders";

export default async function OrderListPage() {
  const orders = await getOrders();

  return <OrderListClient orders={orders} />;
}
