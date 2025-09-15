"use server";

import { prisma } from "@/prisma-helpers/prisma";

// получить список всех фасадов
export const getFacades = async () => {
  return prisma.facade.findMany({});
};

export type FacadesType = Awaited<ReturnType<typeof getFacades>>;
