"use server";

import { getOrderDetail } from "@/prisma-helpers/get-order-detail";
import { getStatuses } from "@/prisma-helpers/get-statuses";
import OrderDetailClient from "@/app/(private)/order-detail/client";

async function OrderDetailServer({
  orderNumber,
}: {
  orderNumber?: string | string[];
}) {
  if (!orderNumber) return null;

  const result = await getOrderDetail(+orderNumber);

  if (!result) return null;

  const statuses = await getStatuses();

  const statusesOptions = statuses.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  return <OrderDetailClient order={result} statuses={statusesOptions} />;
}

export default OrderDetailServer;
