import { prisma } from "@/prisma-helpers/prisma";

import { NextResponse } from "next/server";
import * as z from "zod";

const Model = z.object({
  id: z.number(),
  statusId: z.number(),
});

export async function POST(req: Request) {
  const data = await req.json();

  const result = Model.safeParse(data);

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

  const { statusId, id } = result.data;

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      statusId,
    },
  });

  return NextResponse.json({ success: true });
}
