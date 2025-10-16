"use server";

import OrderDetailClient from "@/app/(private)/order-detail/client";

async function OrderDetailServer({
  orderNumber,
}: {
  orderNumber?: string | string[];
}) {
  if (!orderNumber) return null;

  return <OrderDetailClient />;
}

export default OrderDetailServer;
