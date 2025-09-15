import { prisma } from "@/prisma-helpers/prisma";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json(
      { error: "Пользователь не найден" },
      { status: 401 },
    );

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
