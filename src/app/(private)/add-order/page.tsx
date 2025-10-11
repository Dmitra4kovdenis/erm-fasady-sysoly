import { AddOrderClient } from "@/app/(private)/add-order/client";
import { getCustomers } from "@/prisma-helpers/get-customers";
import { getMillings } from "@/prisma-helpers/get-millings";
import { getHandles } from "@/prisma-helpers/get-handles";
import { SearchParams } from "@/types";
import { prisma } from "@/prisma-helpers/prisma";

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
  const customers = await getCustomers();
  const millings = await getMillings();
  const handles = await getHandles();

  const { editId } = await searchParams;

  let defaultValues = null;

  if (typeof editId === "string") {
    defaultValues = await getDefaultValues(+editId);
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
