import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const list = [
  {
    id: 0,
    title: "TODO",
    slug: "todo",
    index: 0,
  },
  {
    id: 2,
    title: "Раскрой",
    slug: "shaving",
    index: 1,
  },
  {
    id: 2,
    title: "Ремонт",
    slug: "repair",
    index: 1,
  },
  {
    id: 3,
    title: "Подготовка",
    slug: "preparation",
    index: 3,
  },
  {
    id: 4,
    title: "Покраска",
    slug: "painting",
    index: 4,
  },
  {
    id: 5,
    title: "Полировка",
    slug: "polishing",
    index: 5,
  },
  {
    id: 6,
    title: "Упаковка",
    slug: "package",
    index: 6,
  },
  {
    id: 7,
    title: "Дополнительная обработка",
    slug: "package",
    index: 7,
  },
  {
    id: 8,
    title: "Готово к отгрузке",
    slug: "ready-for-shipment",
    index: 8,
  },
  {
    id: 9,
    title: "Архив",
    slug: "sent",
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
      });
    } else {
      await prisma.orderStatus.create({
        data: item,
      });
    }
  }
}

main();
