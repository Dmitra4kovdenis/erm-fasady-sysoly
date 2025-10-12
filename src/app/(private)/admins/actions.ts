"use server";

import type { Admin, User } from "@prisma/client";
import { prisma } from "@/prisma-helpers/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// метод для добавления нового пользователя
export const addAdmin = async (admin: Admin, user: User) => {
  const password = await bcrypt.hash(user.password, 10);

  await prisma.admin.create({
    data: {
      ...admin,
      user: {
        create: {
          ...user,
          roleId: 0,
          id: undefined,
          password,
        },
      },
    },
  });
  revalidatePath("/admins");
};

// метод для обновления текущего пользователя
export const updateAdmin = async (id: number, admin: Admin, user: User) => {
  await prisma.admin.update({
    where: { id },
    data: admin,
  });
  await prisma.user.update({
    where: { adminId: id },
    data: user,
  });
  if (user.password) {
    const password = await bcrypt.hash(user.password, 10);
    await prisma.user.update({
      where: { adminId: id },
      data: {
        password,
      },
    });
  }
  revalidatePath("/admins");
};
