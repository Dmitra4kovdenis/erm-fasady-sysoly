"use server";

import type { Customer } from "@prisma/client";
import { prisma } from "@/prisma-helpers/prisma";
import { revalidatePath } from "next/cache";

export type AddCustomerData = Customer;

// метод для добавления нового пользователя
export const addCustomer = async (customer: Customer) => {
  await prisma.customer.create({
    data: customer,
  });
  revalidatePath("/customers");
};

// метод для обновления текущего пользователя
export const updateCustomer = async (id: number, customer: Customer) => {
  await prisma.customer.update({
    where: { id },
    data: customer,
  });
  revalidatePath("/customers");
};
