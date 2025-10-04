import { SearchParams } from "@/types";
import { prisma } from "@/prisma-helpers/prisma";
import { WorkByPeriodForm } from "@/app/(private)/reports/work-by-period/form";
import { z } from "zod";
import { WorkByPeriodResult } from "@/app/(private)/reports/work-by-period/result";
import { Box } from "@mui/material";

const getWorkByPeriod = async (
  startDate: Date,
  endDate: Date,
  workerId: number,
) => {
  return prisma.order.findMany({
    where: {
      timeLines: {
        some: {
          AND: [
            {
              workerId,
            },
            {
              OR: [
                // Timeline полностью внутри периода
                {
                  dateStart: { gte: startDate },
                  dateEnd: { lte: endDate },
                },
                // Timeline начинается до периода, но заканчивается внутри
                {
                  dateStart: { lt: startDate },
                  dateEnd: {
                    gte: startDate,
                    lte: endDate,
                  },
                },
                // Timeline начинается внутри периода, но заканчивается после
                {
                  dateStart: {
                    gte: startDate,
                    lte: endDate,
                  },
                  dateEnd: { gt: endDate },
                },
                // Timeline охватывает весь период
                {
                  dateStart: { lt: startDate },
                  dateEnd: { gt: endDate },
                },
              ],
            },
          ],
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
  startDate: z.string(),
  endDate: z.string(),
  workerId: z.string(),
});

async function WorkByPeriod({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  const result = Model.safeParse(params);
  const workers = await getWorkers();

  if (result.success) {
    const workByPeriod = await getWorkByPeriod(
      new Date(result.data.startDate),
      new Date(result.data.endDate),
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
