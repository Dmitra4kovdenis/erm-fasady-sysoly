import { SearchParams } from "@/types";
import { prisma } from "@/prisma-helpers/prisma";
import { WorkByPeriodForm } from "@/app/(private)/reports/work-by-period/form";
import { z } from "zod";
import { WorkByPeriodResult } from "@/app/(private)/reports/work-by-period/result";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { ADDRESS_MASK } from "@/app/(private)/reports/work-by-period/utils";

const formatParamDate = (date: string) => {
  return dayjs(date, ADDRESS_MASK).toDate();
};

const getWorkByPeriod = async (from: string, to: string, workerId: number) => {
  return prisma.order.findMany({
    where: {
      endDate: {
        gte: formatParamDate(from),
        lt: formatParamDate(to),
      },
      timeLines: {
        some: {
          workerId,
        },
      },
    },
    include: {
      timeLines: true,
    },
  });
};

const getWorkers = async () => {
  return prisma.worker.findMany();
};

export type WorkByPeriodType = Awaited<ReturnType<typeof getWorkByPeriod>>;
export type Workers = Awaited<ReturnType<typeof getWorkers>>;

const Model = z.object({
  from: z.string(),
  to: z.string(),
  workerId: z.string(),
});

async function WorkByPeriod({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  const result = Model.safeParse(params);
  const workers = await getWorkers();

  if (result.success) {
    const workByPeriod = await getWorkByPeriod(
      result.data.from,
      result.data.to,
      Number(result.data.workerId),
    );
    return (
      <>
        <Box mb={4}>
          <WorkByPeriodForm workers={workers} defaultValues={result.data} />
        </Box>
        <WorkByPeriodResult workByPeriod={workByPeriod} />
      </>
    );
  }

  return <WorkByPeriodForm workers={workers} />;
}

export default WorkByPeriod;
