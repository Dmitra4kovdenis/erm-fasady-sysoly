import KanbanClient from "@/app/(private)/kanban/client";
import { getColumns } from "@/app/(private)/kanban/actions";
import OrderDetailServer from "@/app/(private)/order-detail/server";
import { SearchParams } from "@/types";

export default async function OrderListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const columns = await getColumns();

  const data = await searchParams;

  return (
    <>
      <KanbanClient columns={columns} />
      <OrderDetailServer orderNumber={data?.orderNumber} />
    </>
  );
}
