import { prisma } from "@/prisma-helpers/prisma";
import { ClientCustomers } from "@/app/(private)/(users)/customers/client";

const getCustomers = async () => {
  return prisma.customer.findMany();
};

export type CustomerList = Awaited<ReturnType<typeof getCustomers>>;

async function Page() {
  const customers = await getCustomers();

  return <ClientCustomers customers={customers} />;
}
export default Page;
