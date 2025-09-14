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

  await prisma.handle.createMany({
    data: [
      {
        title: "Тип L",
      },
      {
        title: "Тип C",
      },
    ],
  });

  await prisma.milling.createMany({
    data: [
      {
        title: "Прямой",
      },
      {
        title: "Классик",
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
