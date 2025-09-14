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
        name: "Админ",
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
          title: "Тип L",
        },
        {
          id: 1,
          title: "Тип C",
        },
      ],
    });
  } catch {}
  try {
    await prisma.milling.createMany({
      data: [
        {
          id: 0,
          title: "Прямой",
        },
        {
          id: 1,
          title: "Классик",
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
      ],
    });
  } catch (e) {
    console.log(e);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
