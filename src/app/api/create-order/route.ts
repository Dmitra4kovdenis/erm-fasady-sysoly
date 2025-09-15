import { prisma } from "@/prisma-helpers/prisma";

import { NextResponse } from "next/server";
import { OrderModel } from "@/zod-models/order-model";

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

  await prisma.order.create({
    data: {
      ...result.data,
      items: {
        create: result.data.items,
      },
    },
  });

  return NextResponse.json({ success: true });
}
