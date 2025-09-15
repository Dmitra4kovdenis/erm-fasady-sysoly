import { cookies } from "next/headers";
import * as jose from "jose";
import { prisma } from "@/prisma-helpers/prisma";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function getUserData() {
  const cookiesData = await cookies();

  const token = cookiesData.get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jose.jwtVerify(token, secret);

    return await prisma.user.findUnique({
      where: { id: payload.id as number },
      select: { id: true, email: true, name: true, role: true },
    });
  } catch {
    return null;
  }
}
