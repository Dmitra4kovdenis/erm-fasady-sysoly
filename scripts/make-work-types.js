import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const list = [
  {
    title: "Раскройщик",
  },
  {
    title: "Маляр",
  },
  {
    title: "Полировщик",
  },
  {
    title: "Упаковщик",
  },
  {
    title: "Прочее",
  },
  {
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
