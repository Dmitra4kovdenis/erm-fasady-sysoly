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
        id: 0,
        title: "Администратор",
      },
      {
        id: 1,
        title: "Мастер",
      },
      {
        id: 2,
        title: "Клиент",
      },
    ],
  });

  // создаем типы специалистов
  await prisma.workType.createMany({
    data: [
      {
        title: "Резчик",
      },
      {
        title: "Маляр",
      },
      {
        title: "Упаковщик",
      },
    ],
  });

  await prisma.user.create({
    data: {
      login: "ivandmitrachkov",
      password: hashedPassword,
      role: {
        connect: {
          id: 0,
        },
      },
    },
  });

  await prisma.admin.create({
    data: {
      id: 0,
      name: "Иван Дмитрачков",
      phone: "89042370267",
      user: {
        connect: {
          login: "ivandmitrachkov",
        },
      },
    },
  });

  await prisma.handle.createMany({
    data: [
      {
        id: 0,
        title: "Без ручки",
      },
      {
        id: 1,
        title: "Ручка типа L",
      },
      {
        id: 2,
        title: "Ручка типа C",
      },
      {
        id: 3,
        title: "Ручка типа U",
      },
    ],
  });
  await prisma.milling.createMany({
    data: [
      {
        id: 0,
        title: "Фасад Прямой",
      },
      {
        id: 1,
        title: "Фасад Классик",
      },
      {
        id: 2,
        title: "Фасад Контик",
      },
    ],
  });

  await prisma.orderStatus.createMany({
    data: [
      {
        id: 0,
        title: "TODO",
        slug: "todo",
        index: 0,
      },
      {
        id: 1,
        title: "Раскройка",
        slug: "shaving",
        index: 1,
      },
      {
        id: 2,
        title: "Шлифовка",
        slug: "grinding",
        index: 2,
      },
      {
        id: 3,
        title: "Покраска",
        slug: "painting",
        index: 3,
      },
      {
        id: 4,
        title: "Готово к отгрузке",
        slug: "ready-for-shipment",
        index: 4,
      },
      {
        id: 5,
        title: "Отправлено",
        slug: "sent",
        index: 4,
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
