import { getOrders } from "@/prisma-helpers/get-orders";
import Server from "@/app/(private)/order-list/order-detail/server";
import KanbanClient from "@/app/(private)/kanban/client";

export default async function OrderListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { orderNumber } = await searchParams;

  return (
    <>
      <KanbanClient />
      {orderNumber && <Server orderNumber={+orderNumber} />}
    </>
  );
}
