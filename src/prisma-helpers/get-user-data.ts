import { cookies } from "next/headers";
import * as jose from "jose";
import { prisma } from "@/prisma-helpers/prisma";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function getUserData() {
  const cookiesData = await cookies();

  const token = cookiesData.get("token")?.value;
  if (!token) return null;

  const { payload } = await jose.jwtVerify(token, secret);

  return prisma.user.findFirst({
    where: { id: payload.id as number },
    include: {
      customer: true,
      admin: true,
      role: true,
      worker: true,
    },
  });
}

export type UserData = NonNullable<Awaited<ReturnType<typeof getUserData>>>;
