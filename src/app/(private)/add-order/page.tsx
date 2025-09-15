import AddOrderClient from "@/app/(private)/add-order/client";
import { getCustomers } from "@/prisma-helpers/get-customers";
import { getMillings } from "@/prisma-helpers/get-millings";
import { getHandles } from "@/prisma-helpers/get-handles";

export default async function AddOrderPage() {
  const customers = await getCustomers();
  const millings = await getMillings();
  const handles = await getHandles();

  const customersOptions = customers.map((customer) => ({
    label: customer.name,
    value: customer.id.toString(),
  }));

  const millingOptions = millings.map((customer) => ({
    label: customer.title,
    value: customer.id.toString(),
  }));

  const handlesOptions = handles.map((customer) => ({
    label: customer.title,
    value: customer.id.toString(),
  }));

  return (
    <AddOrderClient
      customers={customersOptions}
      handles={handlesOptions}
      millings={millingOptions}
    />
  );
}
