"use server";

import { prisma } from "@/prisma-helpers/prisma";

export const getCustomers = async () => {
  return prisma.customer.findMany({});
};

export type CustomersType = Awaited<ReturnType<typeof getCustomers>>;
