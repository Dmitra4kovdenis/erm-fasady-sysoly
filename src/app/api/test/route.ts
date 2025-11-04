import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  // app/api/env-test/route.ts
  return Response.json({ db: process.env.DATABASE_URL ?? "NO ENV" });
}
