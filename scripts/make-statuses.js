import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const list = [
  {
    title: "TODO",
    slug: "todo",
    index: 0,
  },
  {
    title: "Раскрой",
    slug: "shaving",
    index: 1,
  },
  {
    title: "Ремонт",
    slug: "repair",
    index: 1,
  },
  {
    title: "Подготовка",
    slug: "preparation",
    index: 3,
  },
  {
    title: "Покраска",
    slug: "painting",
    index: 4,
  },
  {
    title: "Полировка",
    slug: "polishing",
    index: 5,
  },
  {
    title: "Упаковка",
    slug: "package",
    index: 6,
  },
  {
    title: "Дополнительная обработка",
    slug: "package",
    index: 7,
  },
  {
    title: "Готово к отгрузке",
    slug: "ready-for-shipment",
    index: 8,
  },
  {
    title: "Архив",
    slug: "archive",
    index: 9,
  },
];

async function main() {
  const prev = await prisma.orderStatus.findMany({});

  for (const item of list) {
    if (prev.find((i) => i.id === item.id)) {
      await prisma.orderStatus.update({
        where: { id: item.id },
        data: item,
        select: { id: true },
      });
    } else {
      await prisma.orderStatus.create({
        data: item,
        select: { id: true },
      });
    }
  }
}

main();
