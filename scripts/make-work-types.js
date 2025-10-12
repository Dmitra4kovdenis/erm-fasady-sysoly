import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const list = [
  {
    id: 0,
    title: "Раскройщик",
  },
  {
    id: 1,
    title: "Маляр",
  },
  {
    id: 2,
    title: "Полировщик",
  },
  {
    id: 3,
    title: "Упаковщик",
  },
  {
    id: 4,
    title: "Прочее",
  },
  {
    id: 5,
    title: "Бригадир",
  },
];

async function main() {
  const prev = await prisma.workType.findMany({});

  for (const item of list) {
    if (prev.find((i) => i.id === item.id)) {
      await prisma.workType.update({
        where: { id: item.id },
        data: item,
      });
    } else {
      await prisma.workType.create({
        data: item,
      });
    }
  }
}

main();
