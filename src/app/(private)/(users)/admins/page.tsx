import { prisma } from "@/prisma-helpers/prisma";
import { ClientAdmin } from "@/app/(private)/(users)/admins/client";

const getAdmin = async () => {
  return prisma.admin.findMany({
    include: {
      user: true,
    },
  });
};

export type AdminsList = Awaited<ReturnType<typeof getAdmin>>;

async function Page() {
  const admins = await getAdmin();

  return <ClientAdmin admins={admins} />;
}
export default Page;
