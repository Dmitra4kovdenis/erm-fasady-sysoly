// scripts/createUser.ts
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Скрипт для генерации пользователя

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10); // пароль "123456"

  try {
    const user = await prisma.user.create({
      data: {
        email: "admin@example.com",
        name: "Администратор",
        role: "admin",
        password: hashedPassword,
      },
    });
    console.log("Создан пользователь:", user);
  } catch {}
  try {
    await prisma.handle.createMany({
      data: [
        {
          id: 0,
          title: "Ручка типа L",
        },
        {
          id: 1,
          title: "Ручка типа C",
        },
      ],
    });
  } catch {}
  try {
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
      ],
    });
  } catch (e) {
    console.log(e);
  }

  try {
    await prisma.customer.createMany({
      data: [
        {
          id: 0,
          name: "Иван Петров",
          phone: "73243242134",
        },
        {
          id: 1,
          name: "Сергей Бурунов",
          phone: "73243242134",
        },
        {
          id: 2,
          name: "Леруа Мерлен",
          phone: "73243242136",
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
