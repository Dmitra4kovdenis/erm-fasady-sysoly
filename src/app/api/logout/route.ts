import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Удаляем cookie
  res.cookies.set({
    name: "token",
    value: "",
    path: "/",
    maxAge: 0, // делает cookie недействительным
  });

  return res;
}
