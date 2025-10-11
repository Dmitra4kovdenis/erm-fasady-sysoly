import { Button, Dialog, DialogContent, Grid } from "@mui/material";
import Input from "@/components/input/input";
import DatePicker from "@/components/date-picker/date-picker";
import { FormProvider, useForm } from "react-hook-form";
import { addTimeline, editTimeline } from "./actions";
import type { WorkTimeline } from "@prisma/client";
import {
  OrderTimelinesType,
  Workers,
} from "@/app/(private)/order-timeline/order-timeline";
import Select from "@/components/select/select";

interface FormAddTimelineProps {
  orderId: number;
  workerId?: number;
  statusId: number;
  editIndex: number;
  onClose: () => void;
  timelines: OrderTimelinesType;
  workers: Workers;
}

export function FormAddTimeline({
  workerId,
  orderId,
  statusId,
  editIndex,
  onClose,
  timelines,
  workers,
}: FormAddTimelineProps) {
  const defaultValues = timelines.find((item) => item.id === editIndex);

  const form = useForm<WorkTimeline>({
    defaultValues: {
      orderId,
      workerId: defaultValues?.workerId ?? workerId,
      statusId,
      dateStart: defaultValues?.dateStart,
      dateEnd: defaultValues?.dateEnd,
      comment: defaultValues?.comment,
    },
  });

  const options = workers.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const submit = form.handleSubmit(async (values) => {
    if (editIndex === -1) {
      await addTimeline(values);
    } else {
      await editTimeline(editIndex, values);
    }
    onClose();
    form.reset();
  });

  return (
    <Dialog open onClose={onClose}>
      <DialogContent>
        <FormProvider {...form}>
          <Grid spacing={2} container>
            {workerId === undefined && (
              <Grid size={12}>
                <Select label="Специалист" options={options} name="workerId" />
              </Grid>
            )}
            <Grid size={12}>
              <Input multiline label="Комментарий" name="comment" />
            </Grid>
            <DatePicker label="Дата начала" name="dateStart" />
            <DatePicker label="Дата конца" name="dateEnd" />
            <Button variant="contained" size="large" onClick={submit}>
              Сохранить
            </Button>
          </Grid>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
