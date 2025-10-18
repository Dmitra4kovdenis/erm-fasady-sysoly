import { prisma } from "@/prisma-helpers/prisma";
import { ClientWorkers } from "@/app/(private)/(users)/workers/client";

const getWorkers = async () => {
  return prisma.worker.findMany({
    include: {
      type: true,
      user: true,
    },
  });
};

const getWorkTypes = async () => {
  return prisma.workType.findMany();
};

export type WorkerList = Awaited<ReturnType<typeof getWorkers>>;
export type WorkTypes = Awaited<ReturnType<typeof getWorkTypes>>;

async function Page() {
  const workers = await getWorkers();
  const workTypes = await getWorkTypes();

  return <ClientWorkers workTypes={workTypes} workers={workers} />;
}
export default Page;
