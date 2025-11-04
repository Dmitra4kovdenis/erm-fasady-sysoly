import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { login } = await req.json();

    // Динамический импорт для диагностики
    const { prisma } = await import("@/prisma-helpers/prisma");

    // Простая проверка без сложных запросов
    const userCount = await prisma.user.count();

    return NextResponse.json({
      test: "success",
      url: req.url,
      login,
      userCount,
      prismaStatus: "connected",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        test: "prisma_failed",
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
