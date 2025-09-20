import { prisma } from "@/prisma-helpers/prisma";

import { NextResponse } from "next/server";
import { OrderModel } from "@/zod-models/order-model";

const firstStatus = 1_000_000;

export async function POST(req: Request) {
  const data = await req.json();

  const result = OrderModel.safeParse(data);

  if (!result.success) {
    return NextResponse.json(
      {
        error: {
          name: result.error.name,
          message: JSON.parse(result.error.message),
        },
      },
      { status: 403 },
    );
  }

  const prevOrder = await prisma.order.findFirst({
    orderBy: {
      orderNumber: "desc",
    },
  });

  const orderNumber = prevOrder ? prevOrder.orderNumber + 1 : firstStatus;

  await prisma.order.create({
    data: {
      ...result.data,
      orderNumber,
      statusId: 0,
      items: {
        create: result.data.items,
      },
    },
  });

  return NextResponse.json({ success: true });
}
