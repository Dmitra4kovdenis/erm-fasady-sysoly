import { SearchParams } from "@/types";
import OrderDetailServer from "@/app/(private)/order-detail/server";
import ArchiveListClient from "@/app/(private)/archive-list/client";
import { getArchiveOrders } from "@/prisma-helpers/get-archive-orders";

export default async function ArchiveListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const orders = await getArchiveOrders();
  const data = await searchParams;

  return (
    <>
      <ArchiveListClient orders={orders} />
      <OrderDetailServer orderNumber={data?.orderNumber} />
    </>
  );
}
