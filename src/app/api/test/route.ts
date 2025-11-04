import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { login } = await req.json();

  return NextResponse.json({
    test: "success",
    url: req.url,
    login,
  });
}
