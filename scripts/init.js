// scripts/createUser.ts
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Скрипт для генерации пользователя

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10); // пароль "123456"

  // создаем роли
  await prisma.role.createMany({
    data: [
      {
        title: "Администратор",
      },
      {
        title: "Мастер",
      },
      {
        title: "Клиент",
      },
    ],
  });

  await prisma.user.create({
    data: {
      login: "ivandmitrachkov",
      password: hashedPassword,
      role: {
        connect: {
          id: 1, // поменял на 1, так как роли создаются с id 1,2,3
        },
      },
    },
    select: { id: true },
  });

  await prisma.admin.create({
    data: {
      name: "Иван Дмитрачков", // убрал id: 0, так как автоинкремент
      phone: "89042370267",
      user: {
        connect: {
          login: "ivandmitrachkov",
        },
      },
    },
    select: { id: true },
  });

  await prisma.handle.createMany({
    data: [
      {
        title: "Без ручки",
      },
      {
        title: "Ручка типа L",
      },
      {
        title: "Ручка типа C",
      },
      {
        title: "Ручка типа U",
      },
    ],
  });

  await prisma.milling.createMany({
    data: [
      {
        title: "Фасад Прямой",
      },
      {
        title: "Фасад Классик",
      },
      {
        title: "Фасад Контик",
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
