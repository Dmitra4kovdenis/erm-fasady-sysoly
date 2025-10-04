"use client";

import { Workers } from "@/app/(private)/reports/work-by-period/page";
import { PageContainer } from "@/components/page-container/page-container";
import { Button, Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Select from "@/components/select/select";
import DatePicker from "@/components/date-picker/date-picker";
import { useRouter } from "next/navigation";

export interface WorkByPeriodClientProps {
  workers: Workers;
  defaultValues?: FormValues;
}

interface FormValues {
  startDate: string;
  endDate: string;
  workerId: string;
}

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
    push(
      `/reports/work-by-period?startDate=${values.startDate}&endDate=${values.endDate}&workerId=${values.workerId}`,
    );
  });

  return (
    <PageContainer>
      <FormProvider {...form}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Select label="Работник" options={options} name="workerId" />
          </Grid>
          <Grid size={4}>
            <DatePicker label="Начало периода" name="startDate" />
          </Grid>
          <Grid size={4}>
            <DatePicker label="Конец периода" name="endDate" />
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
