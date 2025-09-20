"use order-detail";

import { getOrderDetail } from "@/prisma-helpers/get-order-detail";

interface OrderDetailProps {
  orderNumber: string;
}

async function Server({ orderNumber }: OrderDetailProps) {
  const result = await getOrderDetail(orderNumber);

  console.log(result);

  if (!result) return null;

  return <div>{result.id}</div>;
}

export default Server;
