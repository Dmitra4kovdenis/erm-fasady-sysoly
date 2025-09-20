"use server";

import { getOrderDetail } from "@/prisma-helpers/get-order-detail";
import { getStatuses } from "@/prisma-helpers/get-statuses";
import OrderDetailClient from "@/app/(private)/order-list/order-detail/client";

interface OrderDetailProps {
  orderNumber: number;
}

async function Server({ orderNumber }: OrderDetailProps) {
  const result = await getOrderDetail(orderNumber);

  if (!result) return null;

  const statuses = await getStatuses();

  const statusesOptions = statuses.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  return <OrderDetailClient order={result} statuses={statusesOptions} />;
}

export default Server;
