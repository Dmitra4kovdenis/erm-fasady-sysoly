import { AddOrderClient } from "@/app/(private)/add-order/client";
import { SearchParams } from "@/types";
import { prisma } from "@/prisma-helpers/prisma";

// получить список всех фрезеровок
const getMillings = async () => {
  return prisma.milling.findMany({});
};

// получить список всех интегрированных ручек
const getHandles = async () => {
  return prisma.handle.findMany({});
};

const getCustomers = async () => {
  return prisma.customer.findMany({});
};

const getDefaultValues = async (id: number) => {
  return prisma.order.findFirst({
    where: {
      id,
    },
    include: {
      items: true,
    },
  });
};

export default async function AddOrderPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  let defaultValues = null;
  const { editId } = await searchParams;

  const [customers, millings, handles, _defaultValues] = await Promise.all([
    getCustomers(),
    getMillings(),
    getHandles(),
    // Условно выполняем запрос defaultValues только если есть editId
    typeof editId === "string"
      ? getDefaultValues(+editId)
      : Promise.resolve(null),
  ]);

  if (_defaultValues) {
    defaultValues = _defaultValues;
  }

  const customersOptions = customers.map((customer) => ({
    label: `${customer.name} (${customer.companyName})`,
    value: customer.id,
  }));

  const millingOptions = millings.map((customer) => ({
    label: customer.title,
    value: customer.id,
  }));

  const handlesOptions = handles.map((customer) => ({
    label: customer.title,
    value: customer.id,
  }));

  return (
    <AddOrderClient
      customers={customersOptions}
      handles={handlesOptions}
      millings={millingOptions}
      defaultValues={defaultValues}
      editId={typeof editId === "string" ? +editId : undefined}
    />
  );
}
