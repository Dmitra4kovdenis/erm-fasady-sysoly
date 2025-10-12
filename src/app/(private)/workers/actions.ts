"use server";

import type { Worker, User } from "@prisma/client";
import { prisma } from "@/prisma-helpers/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// метод для добавления нового пользователя
export const addWorker = async (worker: Worker, user: User) => {
  const password = await bcrypt.hash(user.password, 10);

  await prisma.worker.create({
    data: {
      ...worker,
      user: {
        create: {
          ...user,
          roleId: 1,
          id: undefined,
          password,
        },
      },
    },
  });
  revalidatePath("/customers");
};

// метод для обновления текущего пользователя
export const updateWorker = async (id: number, worker: Worker, user: User) => {
  await prisma.worker.update({
    where: { id },
    data: worker,
  });
  await prisma.user.update({
    where: { workerId: id },
    data: user,
  });

  if (user.password) {
    const password = await bcrypt.hash(user.password, 10);
    await prisma.user.update({
      where: { workerId: id },
      data: {
        password,
      },
    });
  }

  revalidatePath("/workers");
};
