import { prisma } from "@/prisma-helpers/prisma";
import type { OrderStatus } from "@/prisma-helpers/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.orderStatus.findMany({
    include: {
      orders: true,
    },
  });

  return NextResponse.json(result);
}

export type GetOrderResponse = OrderStatus;
