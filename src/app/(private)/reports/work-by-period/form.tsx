"use client";

import { Workers } from "@/app/(private)/reports/work-by-period/page";
import { PageContainer } from "@/components/page-container/page-container";
import { Button, Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Select from "@/components/select/select";
import { useRouter } from "next/navigation";
import {
  ADDRESS_MASK,
  generatePeriods,
} from "@/app/(private)/reports/work-by-period/utils";
import dayjs from "dayjs";

export interface WorkByPeriodClientProps {
  workers: Workers;
  defaultValues?: FormValues;
}

interface FormValues {
  to: string;
  workerId: string;
}

const periods = generatePeriods();

export function WorkByPeriodForm({
  workers,
  defaultValues,
}: WorkByPeriodClientProps) {
  const form = useForm<FormValues>({
    defaultValues,
  });

  const options = workers.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const { push } = useRouter();

  const onSubmit = form.handleSubmit((values) => {
    const { to, workerId } = values;
    const from = dayjs(to, ADDRESS_MASK)
      .subtract(1, "month")
      .format(ADDRESS_MASK);

    push(`/reports/work-by-period?from=${from}&to=${to}&workerId=${workerId}`);
  });

  return (
    <PageContainer>
      <FormProvider {...form}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Select label="Работник" options={options} name="workerId" />
          </Grid>
          <Grid size={4}>
            <Select label="Период" options={periods} name="to" />
          </Grid>
          <Grid size={4}>
            <Button variant="contained" onClick={onSubmit}>
              Сделать отчет
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </PageContainer>
  );
}
