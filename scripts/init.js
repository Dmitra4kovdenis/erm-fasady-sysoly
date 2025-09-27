// scripts/createUser.ts
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Скрипт для генерации пользователя

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10); // пароль "123456"

  try {
    await prisma.user.createMany({
      data: [
        {
          email: "admin@example.com",
          name: "Иван Дмитрачков",
          role: "Администратор",
          password: hashedPassword,
        },
        {
          email: "worker@example.com",
          name: "Михаил Андреев",
          role: "Мастер",
          password: hashedPassword,
        },
        {
          email: "customer@example.com",
          name: "Заказчик",
          role: "Заказчик",
          password: hashedPassword,
        },
      ],
    });
  } catch {}
  try {
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
        {
          id: 2,
          title: "Фасад Контик",
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }

  try {
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
  } catch (e) {
    console.log(e);
  }

  try {
    await prisma.customer.createMany({
      data: [
        {
          id: 0,
          name: "Иван Петров (Леруа Мерлен)",
          phone: "73243242134",
        },
        {
          id: 1,
          name: "Андрей Васильев (Любимая Кухня)",
          phone: "73243242134",
        },
        {
          id: 2,
          name: "Юлия Сергеева (ООО Шкафы и тумбочки)",
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
