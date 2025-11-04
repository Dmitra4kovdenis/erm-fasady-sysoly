import { NextResponse } from "next/server";
import { prisma } from "@/prisma-helpers/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { login } = await req.json();

  const user = await prisma.user.findFirst({});

  return NextResponse.json({
    test: "success",
    url: req.url,
    login,
    user,
  });
}
